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
		<cc-search :value.sync="value" round actionText="搜索"  @cancel="goto" @confirm="goto">
		</cc-search>
		<view class="flex">
			<view class="flex1 flex-ja a0a0 font14" v-for="(item,index) in arr" :key="index">{{item}}</view>
		</view>
		<scroll-view scroll-y="true" style="height: 1100rpx;">
			<view v-if="search.length>0">
				<view v-for="(item,index) in search" :key="index" class="flex mat20 padr10" @click="details(item)">
					<view>
						<image :src="item.cover" class="cover"></image>
					</view>
					<view class="flex-dj marl25 mat20">
						<view>{{item.name}}</view>
						<view class="linsyans font12">{{item.introduction}}</view>
						<view>￥{{item.presentPrice}}起</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view v-if="search.length===0" class="block wi100 flex-ja mat30">暂无数据</view>
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
				arr: ['综合', '销量', '价格', '筛选']
			}
		},
		methods: {
			...goodsActions(['getallGoods', 'getsearch']),
			goto() { //点击搜索或回车
				this.getsearch({
					current: 1,
					pageSize: 999,
					query: this.value
				})
			},
			clickLeft(){
				uni.navigateBack({})
			},
			details(item){
				uni.navigateTo({
					url: `/pages/details/details?id=${item._id}`
				})
			}
		},
		mounted() {

		},
		onLoad(e) {
			this.getsearch({
				current: 1,
				pageSize: 999,
				query: e.value
			})
			console.log(this.search);
			this.value = e.value
		},
		onShow() {

		},
		filters: {},
		computed: {
			...goodsState(['search', 'search1'])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.top {
		/* #ifdef MP-WEIXIN */
		padding-top: 40rpx;
		/* #endif */
	}

	.cover {
		width: 240rpx;
		height: 240rpx;
		margin-left: 20rpx;
	}
	.block{
		margin:20rpx auto;
		}
</style>
