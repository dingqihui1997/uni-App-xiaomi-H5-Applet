<template>
	<view>
		<view class="top">
			<cc-nav-bar leftArrow leftText="小米之家"></cc-nav-bar>
			<view class="backfff">
				<cc-search :value.sync="value" :show-action="false" @input="handleInput" placeholder="请输入城市名称或拼音">
				</cc-search>
			</view>
		</view>
		<view style="height: 200rpx;"></view>
		<view v-if="!show">
			<cc-index-bar v-if="city.length>0">
				<view v-for="(item, index) in city" :key="index">
					<view class="font18 font-w7">
						<cc-index-anchor :index="item.py_head"></cc-index-anchor>
					</view>
					<view v-if="item.name_list">
						<view v-for="(item1,index1) in item.name_list" :key="index1" class="list-item list" @click="click(item1)">
							{{item1.name}}</view>
					</view>
				</view>
			</cc-index-bar>
		</view>
		<!-- 城市搜索 -->
		<view v-if="show">
			<view class="a0a0 marl25">搜索结果</view>
			<view  v-if="list.length>0">
			<view v-for="(item,index) in list" :key="index" class="marl25 mat20 font16" @click="click(item)">
				{{item.name}}
			</view>
			</view>
			<view v-if="list.length===0">暂无城市</view>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let myModule = createNamespacedHelpers('my')
	let {
		mapState: myState,
		mapActions: myActions
	} = myModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				value: '',
				show:false,
				list:[]
			}
		},
		methods: {
			...myActions(['getAreaList','searchAreaList']),
			handleInput() {
				this.searchAreaList(this.value)
			},
			click(item){
				let obj={id:item.id,name:item.name}
				uni.navigateTo({
					url:`/pages/Map/Map?arr=${JSON.stringify(obj)}`
				})
			}
		},
		mounted() {
			this.getAreaList()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...myState(['city','searchCity'])
		},
		watch: {
			searchCity(val){
				if(val&&val.area_list.length){
					this.list=val.area_list
				}
			},
			value(val){
				val?this.show=true:this.show=false
			}
		},
	}
</script>

<style scoped lang="scss">
	.top {
		/* #ifdef MP-WEIXIN */
		padding-top: 40rpx;
		/* #endif */
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
	}

	.list {
		padding: 10rpx 20rpx;
	}
</style>
