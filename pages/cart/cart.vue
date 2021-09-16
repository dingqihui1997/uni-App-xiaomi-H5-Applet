<template>
	<view>
		<view class="font-w7 top">
			<cc-nav-bar title="购物车" titleSize="24"></cc-nav-bar>
		</view>
		<view style="height: 88rpx;"></view>
		<!-- 没登录状态 -->
		<view class="cart flex-dji" v-if="!user">
			<view>
				<image src="../../static/xiaomilogo.png" class="logo"></image>
			</view>
			<view class="font20 font-w7">小米商城</view>
			<view class="mat20 font14 a0a0 margin-b10">让每个人都能享受科技的乐趣</view>
			<view class="block wi100">
				<cc-button round type="success" block @click="gotolongin">去登录</cc-button>
			</view>
		</view>
		<!-- 登录了没商品 -->
		<view class="cart flex-dji" v-if="user&&cartlist.length===0">
			<view>
				<image src="../../static/cart1.png" class="cart1"></image>
			</view>
			<view class="font18 mat20">购物车还是空的</view>
			<view class="block">
				<cc-button type="warning" block @click="gotohome">到小米商城逛逛</cc-button>
			</view>
		</view>
		<view >
			<cartgoods :cartlist='list' v-if="user&&cartlist.length>0"></cartgoods>
		</view>
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
	import cloneDeep from 'lodash/cloneDeep'
	import cartgoods from '../../components/cartgoods/cartgoods.vue'
	export default {
		components: {
			cartgoods
		},
		props: {},
		data() {
			return {
				user: '',
				list:[]
			}
		},
		methods: {
			...goodsActions(['getCart']),
			gotolongin() { //去登录
				uni.setStorageSync('cart', 1)
				uni.navigateTo({
					url: '/pages/signIn/signIn'
				})
			},
			gotohome() { //登录了没商品
				uni.switchTab({
					url: '/pages/home/home'
				})
			}
		},
		mounted() {
			console.log(this.cartlist);
		},
		onLoad() {

		},
		onShow() {
			this.user = uni.getStorageSync('userInfo')
			this.getCart(this.user._id)
		},
		filters: {},
		computed: {
			...goodsState(['cartlist'])
		},
		watch: {
			cartlist(val){
				if(val){
					this.list=cloneDeep(val)
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.top {
		/* #ifdef MP-WEIXIN */
		padding-top: 30rpx;
		/* #endif */
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		z-index: 9999;
		background-color: #FFFFFF;
	}

	.logo {
		width: 140rpx;
		height: 140rpx;
	}

	.cart {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
	}

	.block {
		padding: 20rpx 20rpx;
		margin-top: 30rpx;
		width: 90%;
	}

	.cart1 {
		width: 200rpx;
		height: 200rpx;
	}
</style>
