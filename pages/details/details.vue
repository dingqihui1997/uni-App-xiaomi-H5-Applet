<template>
	<view>
		<view class="boxtop">
			<cc-nav-bar leftArrow :background="background" @clickLeft="back">
				<template #left>
					<image src="../../static/back.png" class="back"></image>
				</template>
				<template #default>
					<view class="flex" v-if="flag">
						<view v-for="(item,index) in arr" :key="index" class="title font14 a0a0 "
							:class="active===index?'color':''">{{item}}</view>
					</view>
				</template>
			</cc-nav-bar>
		</view>
		<introduce :goods="goods" v-if="goods" :coupon="coupon"></introduce>
		<speci :goods="goods" v-if="goods" :show='show' @setshow="setshow"></speci>
		<recommend :recommend='recom' :list="Banner" v-if="goods" :goods="goods"></recommend>
		<view class="flex wi100 add">
			<view class="flex-ja">
				<view class="tabbarimg flex-dji a0a0" v-for="(item,index) in tabbar" :key="index" @click="goto(item)">
					<view>
						<image :src="item.image" class="tabbar"></image>
					</view>
					<view class="font12">{{item.name}}</view>
					<view v-if="index===2&&num" class="badge flex-ja">{{num}}</view>
				</view>
			</view>
			<view class="flex-ja font14">
				<view class="fff addcart flex-ja" @click="add">加入购物车</view>
				<view class="fff buy flex-ja" @click="buy">立即购买</view>
			</view>
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
	import introduce from "../../components/introduce/introduce.vue"
	import speci from "../../components/speci/speci.vue"
	import recommend from '../../components/recommend/recommend.vue'
	export default {
		components: {
			introduce,
			speci,
			recommend,
		},
		props: {},
		data() {
			return {
				list: [],
				arr: ['商品', '详情', '评价', '推荐'],
				background: 'transparent',
				active: 0,
				show: false,
				rec: [],
				num:0,
				tabbar: [{
					name: '首页',
					image: '../../static/tabbar/icon-home.png'
				}, {
					name: '客服',
					image: '../../static/static/tabbar/icon-user.png',
					url: '/pages/chat/chat'
				}, {
					name: '购物车',
					image: '../../static/icon/cart.png'
				}],
				flag: false,
				user:{}
			}
		},
		methods: {
			...goodsActions(['getGoods', 'getCoupon', 'getRecommend1', 'getBanner','getCart']),
			back() { //返回
				uni.navigateBack()
			},
			add() { //加入购物车
				this.show = true
			},
			buy() { //立即购买
				this.show = true
			},
			setshow(e) {
				this.show = e
			},
			goto(item) {
				uni.navigateTo({
					url: item.url
				})
			}
		},
		mounted() {
			this.getCoupon()
			this.getRecommend1()
			this.getBanner()
		},
		onPageScroll(e) {
			if (e.scrollTop >= 100) {
				this.flag = true
				this.background = '#ffffff'
			} else {
				this.background = 'transparent'
				this.flag = false
			}
		},
		onLoad(e) {
			this.getGoods(e)
		},
		onShow() {
			let a=uni.getStorageSync('userInfo')
			if(a){
				this.getCart(a._id)
			}
		},
		filters: {},
		computed: {
			...goodsState(["goods", "coupon", 'recom', 'Banner','cartnum'])
		},
		watch: {
			cartnum:{
				handler(val){
					if(val){
						this.num=val
					}
				},
				immediate:true //立即监听
			}
		},
	}
</script>

<style scoped lang="scss">
	.boxtop {
		/* #ifdef MP-WEIXIN */
		padding-top: 30rpx;
		background-color: #FFFFFF;
		/* #endif */
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999999;
	}

	.back {
		width: 40rpx;
		height: 40rpx;
	}

	.title {
		margin-left: 15rpx;
		margin-right: 15rpx;
		color: #333333;
	}

	.color {
		color: #FF5934;
		border-bottom: 2px solid #FF5934;
	}

	.add {
		padding: 0rpx 20rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
	}

	.tabbarimg {
		width: 90rpx;
		height: 90rpx;
		position: relative;
	}

	.badge {
		position: absolute;
		top: -15rpx;
		right: -10rpx;
		background-color: #FF6820;
		color: #ffffff;
		padding: 10rpx;
		width: 45rpx;
		height: 45rpx;
		border-radius: 100%;
		font-size: 14px;
		/* #ifdef MP-WEIXIN */
		width: 30rpx;
		height: 30rpx;
		/* #endif */
	}

	.tabbar {
		width: 45rpx;
		height: 45rpx;
	}

	.addcart {
		background-color: #FDCB00;
		width: 210rpx;
		height: 75rpx;
		border-bottom-left-radius: 40rpx;
		border-top-left-radius: 40rpx;
	}

	.buy {
		background-color: #FF6D0E;
		width: 210rpx;
		height: 75rpx;
		border-bottom-right-radius: 40rpx;
		border-top-right-radius: 40rpx;
	}
</style>
