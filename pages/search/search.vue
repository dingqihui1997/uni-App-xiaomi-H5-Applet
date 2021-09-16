<template>
	<view>
		<view class="top">
			<cc-nav-bar leftArrow @clickLeft="clickLeft">
				<template #default>
					<view class="demo-rate">
						小米Lite
					</view>
				</template>
			</cc-nav-bar>
		</view>
		<view class="search">
			<cc-search :value.sync="value" round actionText="搜索" @clear="clear" @cancel="goto" @confirm="goto"
				@input="input">
			</cc-search>
		</view>
		<view v-if="show">
			<view v-if="history.length>0">
				<view class="flex-sb mat20 marl25 mar15">
					<view>搜索历史</view>
					<view @click="del">
						<image src="../../static/del.png" class="del"></image>
					</view>
				</view>
				<view class="flex-w">
					<view  @click="Searchhistory(item)" v-for="(item,index) in history" :key="index" class="history">{{item.name}}</view>
				</view>
			</view>
			<view class="marl25 mat20">搜索发现</view>
			<image src='../../static/note10.jpg' class="note10"></image>
			<view class="flex-w">
				<view @click="all(item,index)" v-for="(item,index) in allgoods.slice(0,8)" :key="index" class="allgoods overflow font14">
					{{item.name}}
				</view>
			</view>
		</view>
		<view v-if="!show">
			<view v-for="(item,index) in search" :key="index" class="name" @click="details(item)">
				{{item.name}}
			</view>
		</view>
		<cc-dialog
		  ref="dialog"
		  :show.sync="flag"
		  showCancelButton
		  title=""
		  content="确认是否删除全部搜索历史吗？"
			@confirm="confirm"
		></cc-dialog>
	</view>
</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let goodsModule = createNamespacedHelpers('goods')
	let {
		mapState: goodsState,
		mapActions: goodsActions
	} = goodsModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				value: '',
				show: true,
				history: [],
				flag:false
			}
		},
		methods: {
			...goodsActions(['getallGoods', 'getsearch']),
			goto() { //点击搜索或回车
				uni.navigateTo({
					url:`/pages/list/list?value=${this.value}`
				})
				this.$utils.saveHistory({
					key: 'search',
					data: this.value,
					attr: 'name'
				})
			},
			input() { //监听input
				console.log(this.value);
				if (this.value) {
					this.show = false
					this.getsearch({
						current: 1,
						pageSize: 999,
						query: this.value
					})
				} else {
					this.show = true
				}
			},
			clear() {//清空
				this.show = true
			},
			details(item) { //点击搜索详情
				uni.navigateTo({
					url: `/pages/details/details?id=${item._id}`
				})
			},
			all(item,index){//点击搜索发现
				if(index){//
					this.value=item.name
					this.$utils.saveHistory({
						key: 'search',
						data: this.value,
						attr: 'name'
					}),
					uni.navigateTo({
						url:`/pages/details/details?id=${item._id}`
					})
				}else{
					uni.navigateTo({
						url:`/pages/list/list?value=${0}`
					})
				}
				this.value=''
			},
			Searchhistory(item){//点击搜索历史
				uni.navigateTo({
					url:`/pages/list/list?value=${item.name}`
				}),
				this.$utils.saveHistory({
					key: 'search',
					data: this.value,
					attr: 'name'
				})
			},
		del(){
			this.flag=true
		},
		confirm(){
			this.history=[]
			uni.removeStorageSync('searchHistory')
		},
		clickLeft(){
			uni.navigateBack({})
		}
		},
		mounted() {
			this.getallGoods()
			console.log(this.allgoods);
			let a = this.$utils.getHistory({
				key: 'search'
			})
			if (a) {
				this.history = a
			}
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...goodsState(['allgoods', 'search',])
		},
		watch: {

		},
	}
</script>

<style scoped lang="scss">
	.top {
		/* #ifdef MP-WEIXIN */
		padding-top: 40rpx;
		/* #endif */
	}

	.search {
		margin-top: -20rpx;
		background-color: #eeeeee;
	}

	.del {
		width: 60rpx;
		height: 60rpx;
	}

	.note10 {
		width: 620rpx;
		height: 140rpx;
		margin-top: 20rpx;
		margin-left: 40rpx;
	}

	.allgoods {
		width: 350rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
	}

	.name {
		margin: 0 20rpx;
		width: 700rpx;
		border-bottom: 1px solid #eee;
		padding: 20rpx;
	}
	.history{
		padding: 10rpx;
		background-color: #F5F5F5;
		border-radius: 20rpx;
		margin: 20rpx;
	}
</style>
