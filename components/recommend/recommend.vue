<template>
	<view>
		<view class="wi100 backf6 padb">
			<swiper style="height: 180rpx;">
				<swiper-item v-for="(item,index) in list" :key="index" class="overflow">
					<image :src="item.image" class="imgBanner"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="flex">
			<view v-for="(item,index) in arr" :key="index" class="flex wi100">
				<view class="flex1 flex-dji font14 mat10" :class="index===active?'actve':''" @click="click(index)">
					<view>{{item}}</view>
					<view class="one" :class="index===active?'tow':''"></view>
				</view>
			</view>
		</view>
		<swiper @change="change" style="height: 740rpx;" indicator-dots="true" interval="2000" duration="500"
			aspectFit="true" circular="true">
			<swiper-item v-for="(i,s) in swiper" :key="s">
				<view class="flex-w">
					<view v-for="(item,index) in rec.slice(starnum,num)" :key="index" class="rec" @click="goto(item)">
						<view class="coverimg flex-ja">
							<image :src="item.cover" class="cover"></image>
						</view>
						<view class="font14 overflow name mat10">{{item.name}}</view>
						<view class="flex font12 mat10">
							<view class="presentPrice linsyans font-w7">￥{{item.presentPrice}}</view>
							<view class="a0a0 text-li">￥{{item.originalPrice}}</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="flex wi100 backf6 pad-t10">
			<view v-for="(item,index) in details" :key="index" class="pad20 font14 flex1 flex-ja backfff"
				:class="index===activeindex?'linsyans':''" @click="detail(index)">
				{{item}}
			</view>
		</view>
		<view style="margin-bottom: 70rpx;">
			<view v-if="!activeindex" v-html="goods.detail"></view>
			<view v-else v-html="goods.specParams"></view>
		</view>
	</view>
</template>

<script>
	import cloneDeep from 'lodash/cloneDeep'
	export default {
		components: {},
		props: {
			recommend: {
				type: Array,
				required: true
			},
			list: {
				type: Array,
				required: true
			},
			goods: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				arr: ['为您推荐', '爆款推荐'],
				active: 0,
				rec: [],
				num: 6,
				starnum: 0,
				swiper: [1, 2, 3],
				details: ['商品介绍', '规格参数'],
				activeindex: 0
			}
		},
		methods: {
			click(index) { //切换tab
				this.active = index
			},
			change(e) { //切换为您推荐轮播图
				if (e.detail.current === 0) {
					this.num = 6
					this.starnum = 0
				} else if (e.detail.current === 1) {
					this.starnum = 6
					this.num = 12
				} else {
					this.starnum = 12
					this.num = 18
				}
			},
			detail(index) {//点击详情
			this.activeindex=index
			},
			goto(item){
				uni.navigateTo({
					url: `/pages/details/details?id=${item._id}`
				})
			}
		},
		mounted() {
			// console.log(this.goods)
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {
			recommend(val) {
				if (val) {
					this.rec = cloneDeep(val)
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.actve {
		color: #FF6700;
	}

	.one {
		width: 40rpx;
		height: 4rpx;
		background-color: transparent;
		margin-top: 10rpx;
	}

	.tow {
		background-color: #FF6700;
	}

	.rec {
		width: 230rpx;
		height: 350rpx;
		margin-top: 10rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
	}

	.cover {
		height: 180rpx;
		width: 180rpx;
		// margin-bottom: 10rpx;
	}

	.name {
		width: 180rpx;
	}

	.coverimg {
		height: 230rpx;
		width: 230rpx;
		background-color: #F7F7F7;
		border-radius: 10rpx;
	}

	.imgBanner {
		width: 684rpx;
		height: 190rpx;
		margin: 10rpx;
		margin-left: 30rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}
</style>
