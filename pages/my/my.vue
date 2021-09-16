<template>
	<view class="hei100 backeee">
		<view class="back" style=" height: 160rpx">
			<image src="../../static/static/user/bj.png" class="img"></image>
			<view class="flex-sb static ">
				<view class="flex-ja">
					<view>
						<image src='../../static/static/user/touxiang.png' class="touxiang"></image>
					</view>
					<view class="marl25 fff font14" @click="login">{{user?user.username:'登录注册'}}</view>
				</view>
				<view v-if="user" class="flex-a fff" @click="out">点击退出</view>
			</view>
		</view>
		<view class="flex-sb font16 one-border box" @click="checkLogin({url:'/pages/order/order'})">
			<view>我的订单</view>
			<view class="flex-a">全部订单<image src="../../static/right.png" class="right"></image>
			</view>
		</view>
		<view class="flex order">
			<view v-for="(item,index) in arr" :key="index" class="flex1 flex-dji backfff">
				<view>
					<image :src="item.image" class="imgfuk"></image>
				</view>
				<view class="font14 padb20">{{item.name}}</view>
			</view>
		</view>
		<!-- <view> -->
		<view v-for="(item,index) in list" :key="index" class="backfff margin-b20">
			<view v-for="(item1,index1) in item" :key="index1" class="flex-a huanylist" @click="checkLogin(item1)">
				<view class="imageone flex-a">
					<image :src="item1.image" class="huiyuan"></image>
				</view>
				<view class="flex-sba name" :class="{'border1':index1===1}">
					<view>{{item1.name}}</view>
					<view>
						<image src="../../static/right.png" class="right">
					</view>
				</view>
			</view>
			<!-- </view> -->
		</view>
		<!-- #ifdef H5 -->
		<!-- <view style="height: 80rpx;"></view> -->
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				arr: [{
					name: "待付款",
					image: "../../static/static/user/daifukuan.png"
				}, {
					name: '待收货',
					image: "../../static/static/user/daishouhuo.png"
				}, {
					name: '退换修',
					image: "../../static/static/user/tuihuanxiu.png"
				}],
				list: [
					[{
						name: '会员中心',
						image: '../../static/static/user/huiyuanzhongxin.png'
					}, {
						name: '我的优惠',
						image: '../../static/static/user/youhui.png'
					}],
					[{
							name: '服务中心',
							image: '../../static/static/user/fuwuzhongxin.png'
						},
						{
							name: '小米之家',
							image: '../../static/static/user/xiaomizhijia.png',
							url: '/pages/city/city'
						}
					],
					[{
							name: '我的F码',
							image: '../../static/static/user/fma.png'
						},
						{
							name: '礼物兑换码',
							image: '../../static/static/user/liwu.png'
						}
					],
					[{
						name: '设置',
						image: '../../static/static/user/shezhi.png',
						url: '/pages/addresslist/addresslist'
					}]
				],
				user: {}
			}
		},
		methods: {
			login() { //登录
			if(!this.user){
				uni.navigateTo({
					url: '/pages/signIn/signIn'
				})
			}
			},
			out(){//退出
				uni.clearStorageSync()
				this.user=''
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			goto(item) { //
				uni.navigateTo({
					url: item.url
				})
			},
			
			checkLogin(item) {
				this.$utils.checkLogin({
					key: 'userInfo',
					next: this.goto,
					item: item
				})
			},
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {
			this.user = uni.getStorageSync('userInfo')
		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.back {
		background: #f37d0f;
		/* #ifdef MP-WEIXIN */
		margin-top: 48rpx;
		/* #endif */
		position: relative;
	}

	.img {
		width: 750rpx;
		height: 160rpx;
	}

	.touxiang {
		width: 100rpx;
		height: 100rpx;
	}

	.static {
		position: absolute;
		bottom: 20rpx;
		left: 40rpx;
		right: 20rpx;
	}

	.box {
		padding: 10rpx 20rpx;
	}

	.one-border {
		border-bottom: 1px solid #eee;
	}

	.imgfuk {
		margin-top: 20rpx;
		width: 50rpx;
		height: 50rpx;
	}

	.order {
		background-color: #eee;
		padding-bottom: 20rpx;
	}

	.imageone {
		width: 100rpx;
		height: 90rpx;
		margin-left: 20rpx;
	}

	.huiyuan {
		width: 60rpx;
		height: 60rpx;
	}

	.huanylist {
		// height: 110rpx;w
	}

	.name {
		width: 680rpx;
		padding: 24rpx 0;
	}

	.border1 {
		border-top: 1rpx solid #eee;
		// margin-top: -30rpx;
		// padding-top: 30rpx;
	}
</style>
