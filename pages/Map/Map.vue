<template>
	<view>
		<view class="mapbox" id="container">
			<view class="flex-sb backbox">
				<view class="back flex-ja" @click="back">
					<image src="../../static/back.png" class="backimg"></image>
				</view>
				<view class="city font14" @click="back">{{name}}</view>
			</view>
		</view>
		<view class="flex mat20">
			<view class="home">小米之家</view>
			<view class="home1">服务网点</view>
		</view>
		<scroll-view scroll-y="true" style=" height: 420rpx;"  v-if="list.length">
			<view>
				<view v-for="(item,index) in list" :key="index" class="marl25 mat20" @click="goto(item)">
					<view class="overflow store_name">{{item.store_name}}</view>
					<view class="a0a0 font14">{{item.shop_time}}</view>
					<view class="a0a0 font14">{{item.address}}</view>
				</view>
			</view>
		</scroll-view>
		<view v-if="!list.length" class="mat30 flex-ja">暂无门店</view>
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
				name: '',
				list:[]
			}
		},
		methods: {
			...myActions(['getStoreHome']),
			back(){//返回
				uni.navigateTo({
					url:'/pages/city/city'
				})
			},
			goto(item){//
				console.log(item);
				uni.setStorageSync('shop',item)
				uni.navigateTo({
					url:'/pages/shop/shop'
				})
			}
		},
		mounted() {

		},
		onLoad(e) {
			this.name = JSON.parse(e.arr).name
			console.log(JSON.parse(e.arr))
			this.getStoreHome({
				area_name: this.name,
				area_id: JSON.parse(e.arr).id
			})
		},
		onShow() {

		},
		filters: {},
		computed: {
			...myState(['Home'])
		},
		watch: {
			Home(val){
				if(val){
					this.list=val[0].store_list
					if(val[0].store_list[0]){
						this.$utils.getLocation(val[0].store_list[0])
					}
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.mapbox {
		width: 750rpx;
		height: 820rpx;
		background-color: #00D6B2;
	}

	.back {
		border-radius: 100%;
		height: 60rpx;
		width: 60rpx;
		background-color: #FFFFFF;
		margin-left: 20rpx;
		margin-top: 20rpx;
	}

	.backimg {
		height: 40rpx;
		width: 40rpx;
	}

	.city {
		padding: 10rpx 30rpx;
		border-radius: 40rpx;
		border: 2rpx solid #666666;
		margin-right: 20rpx;
		margin-top: 20rpx;
	}

	.home {
		padding: 10rpx;
		border: 2rpx solid #FF6A00;
		border-radius: 30rpx;
		margin-left: 20rpx;
	}

	.home1 {
		padding: 10rpx;
		border: 2rpx solid #666666;
		border-radius: 30rpx;
		margin-left: 20rpx;
	}
	.store_name{
		width: 680rpx;
	}
	.backbox{
		position: fixed;
		right: 0;
		left: 0;
		top: 0;
		z-index: 999999;
	}
</style>
