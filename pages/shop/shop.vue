<template>
	<view>
		<view class="top">
			<cc-nav-bar leftArrow title="小米之家"  ></cc-nav-bar>
		</view>
		<view class="shopbox" id="container"></view>
		<view class="box">
			<view class="flex-a home ">
				<view><image src="../../static/mihome/store_name.png" class="store_name"></image></view>
				<view class="overflow font16 marl25" style="width: 680rpx;">{{shop.store_name}}</view>
			</view>
			<view class="flex-a home">
				<view><image src="../../static/static/mihome/time.png" class="store_name"></image></view>
				<view class="marl25">
					<view>营业时间</view>
					<view class="font12">{{shop.shop_time}}</view>
				</view>
			</view>
			<view class="flex-a home tel">
				<view><image src="../../static/mihome/location.png" class="store_name"></image></view>
				<view class="marl25">
					<view>地址</view>
					<view class="font12">{{shop.address}}</view>
				</view>
				<view class="goto1 flex-dji">
					<view><image src="../../static/mihome/go.png" class="store_name1"></image></view>
					<view style="color: #6A9BE4;" class="font14">到这去</view>
				</view>
			</view>
			<view class="flex-a home tel">
				<view><image src="../../static/mihome/location.png" class="store_name"></image></view>
				<view class="marl25">
					<view>电话</view>
					<view class="font12">{{shop.tel}}</view>
				</view>
				<view class="goto1 flex-dji">
					<a :tel="shop.tel">
						<view><image src="../../static/mihome/phone.png" class="store_name1"></image></view>
						<view style="color: #09BB07;" class="font14">去联系</view>
					</a>
				</view>
			</view>
			<view class="flex-a home">
				<view>
					<image src="../../static/mihome/service.png" class="store_name"></view>
				<view class="marl25 mat10">
					<view>支持服务</view>
					<view class="a0a0 font14">{{shop.support_service}}</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				shop: {}
			}
		},
		methods: {},
		mounted() {
		
		},
		onLoad() {

		},
		onShow() {
	this.shop = uni.getStorageSync('shop')
	this.shop.support_service=this.shop.support_service.join(',')
			this.$utils.getLocation(this.shop)
		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.top {
		/* #ifdef MP-WEIXIN */
		padding-top: 20rpx;
		/* #endif */
		background-color: #F2F2F2;
	}

	.shopbox {
		width: 355px;
		height: 219px;
		background-color: #00D6B2;
		margin: 10rpx auto;
	}
	.box{
		padding: 20rpx;
	}
	.store_name{
		width: 30rpx;
		height: 30rpx;
	}
	.home{
		height: 140rpx;
		border-bottom: 2rpx solid #f6f6f6;
	}
	.goto{
		margin-left: 250rpx;
	}
	.store_name1{
		width: 60rpx;
		height: 60rpx;
	}
	.tel{
		position: relative;
	}
	.goto1{
		position: absolute;
		right: 0;
	}
</style>
