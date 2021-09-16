<template>
	<view>
		<swiper class="img_img" indicator-dots="true" interval="2000" duration="500" aspectFit="true" circular="true">
			<swiper-item v-for="(item,index) in goods.pic" :key="index">
				<image :src="item" class="img_img"></image>
			</swiper-item>
		</swiper>
		<view class="box">
			<view class="font20 font-w7 presentPrice">￥{{goods.presentPrice}}</view>
			<view class="flex-sba more" @click="open">
				<view class="font12 estimate">预计得40米金</view>
				<view class="font14 fff estimate2">更多</view>
			</view>
			<view>{{goods.name}}</view>
			<view class="font14 mat10">① {{goods.introduction}}</view>
			<scroll-view scroll-x="true"  style=" white-space: nowrap;" v-if="goods.params">
					<view v-for="(item,index) in goods.params" :key="index" class="params font12  mat10">
						<view class="flex-ja">
							<image :src="item.url" class="imageurl"></image>
						</view>
						<view class="flex-ja">{{item.name}}</view>
						<view class="flex-ja">{{item.desc}}</view>
					</view>
			</scroll-view>
		</view>
		<cc-popup :show.sync="show" mode="bottom" height="800" round :closeable="true">
			<view class="flex-ja mat30">优惠</view>
			<view v-for="(item,index) in coupon" :key="index" class="coupon">
				<view class="couponname font16">{{item.name}}</view>
				<view class="font14 a0a0">预计减满金额:{{item.threshold}}</view>
			</view>
		</cc-popup>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			goods: {
				type: Object,
				required: true
			},
			coupon: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				show: false
			}
		},
		methods: {
			open() {
				this.show = true
			}
		},
		mounted() {
			// console.log(this.goods);
			// console.log(this.coupon);
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.box {
		padding: 10rpx 20rpx;
	}

	.presentPrice {
		color: #FF5934;
	}

	.more {
		width: 98%;
		background-color: #FFF7F2;
		margin: 10rpx auto;
		height: 60rpx;
		padding: 20rpx 15rpx;
	}

	.estimate {
		color: #FF6900;
		border: 2rpx solid #FF6900;
	}

	.estimate2 {
		padding: 5rpx 10rpx;
		background-color: #FF6900;
		border-radius: 10rpx;
	}

	.img_img {
		width: 750rpx;
		height: 700rpx;
	}

	.imageurl {
		width: 40rpx;
		height: 40rpx;
	}

	.coupon {
		margin-left: 20rpx;
		margin-top: 20rpx;
	}

	.couponname {
		color: #FF6900;
	}
	.params{
		width: 180rpx;
		display: inline-block;
	}
</style>
