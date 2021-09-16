<template>
	<view class="box">
		<view class="boxtop homeboxtop">
			<cc-nav-bar :background="background">
				<template #left>
					<div class="logo flex-ja">
						<!-- #ifdef H5 -->
						<image v-if="show" src="../../static/static/logo.png" class="imglogo"></image>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<image src="../../static/static/logo.png" class="imglogo"></image>
						<!-- #endif -->
					</div>
				</template>
				<template #default>
					<view class="focus">
						<cc-search @focus="focus" class="homesearch" placeholder="搜索商品" :value.sync="value" round
							:showAction="false">
						</cc-search>
					</view>
				</template>
			</cc-nav-bar>
		</view>
		<view style="height: 88rpx; width: 750rpx; background: #fff;"></view>
		<view class="banner-bg"></view>
		<view class="Bannerimg">
			<cc-swiper :list="list"></cc-swiper>
		</view>
		<Nav :nav="Nav" v-if="Nav.length>0" :news="news"></Nav>
		<Selected :recommend="recommend" v-if="recommend.length>0 &&goods.length>0" @send="send" :goods="goods">
		</Selected>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let homeModule = createNamespacedHelpers('home')
	let {
		mapState: homeState,
		mapActions: homeActions
	} = homeModule
	import Nav from "../../components/nav/nav.vue"
	import Selected from "../../components/selected/selected.vue"
	export default {
		components: {
			Nav,
			Selected
		},
		props: {},
		data() {
			return {
				value: '',
				recommendId: '',
				show: true,
				background: '#FF5700'
			}
		},
		methods: {
			...homeActions(['getBanner', "getNav", "getNew", "getReco", "getNavGoods"]), //调用方法	
			send(item) { //推荐
				console.log(item);
				this.getNavGoods({
					id: item._id
				})
			},
			focus() { //搜索
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		},
		// 路由组件监听滚动
		onPageScroll(e) {
			if (e.scrollTop >= 310) {
				this.show = false
				this.background = '#ffffff'
			} else {
				this.background = '#FF5700'
				this.show = true
			}
		},
		mounted() {
			this.getBanner()
			this.getNav()
			this.getNew()
			this.getReco()
		},
		onLoad() {

		},
		onShow() {
			//获取推荐商品
		},
		filters: {},
		computed: {
			...homeState(['list', 'Nav', "news", "recommend", "goods"])
		},
		watch: {
			recommend(val, oldval) {
				if (val) {
					this.recommendId = this.recommend[0]._id
					this.getNavGoods({
						id: this.recommend[0]._id
					})
				}
			},
			immediate: true,
			deep: true
		}
	}
</script>

<style scoped lang="scss">
	.imglogo {
		width: 40rpx;
		height: 40rpx;
	}

	.logo {
		width: 60rpx;
		height: 60rpx;
		border-radius: 20rpx;
		background: #FFFFFF;
	}

	.boxtop {
		position: fixed;
		background: #FFFFFF;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		/* #ifdef MP-WEIXIN */
		padding-top: 40rpx;
		/* #endif */
	}

	.homesearch {
		/* #ifdef MP-WEIXIN */
		position: relative;
		left: -60rpx;
		/* #endif */
	}

	.focus {
		/* #ifdef MP-WEIXIN */
		width: 460rpx;
		/* #endif */
	}

	.banner-bg {
		 
		&::after {
			content: '';
			width: 100%;
			height: 160px;
			position: absolute;
			top: 0;
			z-index: -1;
			border-radius: 0 0 40% 40%;
			background: #FF5700;
			overflow-x: hidden;
		}
	}

	.Bannerimg {
		border-radius: 40rpx;
		overflow: hidden;
		padding-left: 20rpx;
		padding-right: 20rpx;
		margin-top: 20rpx;
		/* #ifdef MP-WEIXIN */
		width: 94%;
		margin-right: 10rpx;
		/* #endif */
	}
</style>
