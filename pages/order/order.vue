<template>
	<view>
		<view class="top backfff">
			<cc-nav-bar leftArrow title="我的订单" @clickLeft='clickLeft'></cc-nav-bar>
			<view class="flex backfff">
				<view v-for="(item,index) in arr" :key="index" class="flex1 flex-ja font14 a0a0">
					<view :class="{'linsyans':active===index,'border':active===index}">{{item}}</view>
				</view>
			</view>
		</view>
		<view style="height:178rpx;"></view>
		<view v-for="(item,index) in order" :key='index' class="order">
			<view class="flex-sb">
				<view>{{item.pay_time}}</view>
				<view>
					<image src="../../static/del.png" class="del"></image>
				</view>
			</view>
			<view v-for="(item1,index1) in item.goods_list" :key="index1" class="flex mat10">
				<view>
					<image :src="item1.goods.cover" class="cover"></image>
				</view>
				<view class="mal10">
					<view class="flex-sb " style="width: 400rpx; ">
						<view class="font14 overflow name">{{item1.goods.name}}</view>
						<view class="linsyans font-w7">￥{{item1.goods.presentPrice}}</view>
					</view>
					<view class="flex-sb a0a0 mat20">
						<view class="mar15 flex">
							<view v-for="(item2,index2) in item1.spec" :key="index2">{{item2.checked}}</view>
						</view>
						<view>X{{item.count}}</view>
					</view>
					<view class="linsyans mat30 font-w7 flex-end font12" @click="goto(item,item1)">
						<view class="pingjia">评价</view>
					</view>
				</view>
			</view>
			<view class="flex-end mar15 linsyans font-w7">总价:￥{{item.price}}</view>
			<view class="flex-end mar15">电话:{{item.mobile}}</view>
			<view class="flex-end  mat10 mar15 font14">收货地址:{{item.address}}</view>
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
				user: {},
				arr: ['全部', '待付款', '待收货'],
				active: 0
			}
		},
		methods: {
			...myActions(['getAppOrder']),
			goto(item,item1){//去评价
			// console.log(item1);
				let obj={order_id:item.id,goodsId:item1._id,spec:item1.spec,goods:item1.goods}
				uni.setStorageSync('comment',obj)
				uni.navigateTo({
					url:`/pages/evaluate/evaluate`
				})
			},
			clickLeft(){
				uni.switchTab({
					url:'/pages/my/my'
				})
			}
		},
		mounted() {
			this.user = uni.getStorageSync('userInfo')
			this.getAppOrder(this.user._id)
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...myState(['order'])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.top {
		/* #ifdef MP-WEIXIN */
		padding-top: 40rpx;
		/* #endif */
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;
	}

	.border {
		border-bottom: 2rpx solid #FF6700;
		padding: 10rpx;
	}

	.del {
		width: 60rpx;
		height: 60rpx;
	}

	.order {
		margin: 20rpx;
		border: 2rpx solid #666;
		border-radius: 20rpx;
		padding: 20rpx;
	}

	.cover {
		width: 260rpx;
		height: 260rpx;
	}

	.name {
		width: 300rpx;
	}

	.pingjia {
		margin-top: 10rpx;
		padding: 8rpx 20rpx;
		border-radius: 40rpx;
		border: 2rpx solid #FF6700;
	}

	.delorder {
		margin-top: 10rpx;
		padding: 8rpx 30rpx;
		border-radius: 40rpx;
		border: 2rpx solid #666666;
		margin-right: 20rpx;
	}
</style>
