<template>
	<view class="hei100 backeee seckillbox">
		<view class="top backfff">
			<cc-nav-bar leftArrow title="小米秒杀" @clickLeft="back"></cc-nav-bar>
		</view>
		<view class="flex">
			<view v-for="(item,index) in timeList.slice(0,5)" :key="index" class="flex1 flex-dji"
				@click="clicktab(item,index)">
				<view class="font-w7 font16" :class="{'indexone':active===index}">{{item}}:00</view>
				<view class="font12 a0a0" :class="{'qianggou':active===index ,'two':active!==index}">
					{{index===0?'抢购中':'即将开始'}}
				</view>
			</view>
		</view>
		<view v-for="(item,index) in goods" :key="index" class="boxone">
			<view class="flex">
				<view>
					<image :src="item.goods.cover" class="cover"></image>
				</view>
				<view class="mal10">
					<view class="overflow mat20" style="width: 380rpx">{{item.goods.name}}</view>
					<view class="flex-a Price ">
						<view class="linsyans font16" style="width: 100rpx;">￥{{item.price}}</view>
						<view class="font12 a0a0 text-li mal10" style="width: 100rpx;">￥{{item.goods.originalPrice}}
						</view>
						<view class="marl25" :class="{'progress':active===0,'progress1':active!==0}">
							<view >{{active===0?'去抢购':'去预约'}}</view>
							<view v-if="active===0">
								<cc-progress :percentage="item.num>Number(100)?100:item.num" style="width: 150rpx;">
								</cc-progress>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	import {
		createNamespacedHelpers
	} from 'vuex'
	let myModule = createNamespacedHelpers('my')
	let {
		mapState: myState,
		mapActions: myActions
	} = myModule
	import cloneDeep from 'lodash/cloneDeep'
	export default {
		components: {},
		props: {},
		data() {
			return {
				timeList: [8, 10, 12, 14, 16, 18, 20, 22, 0, ],
				active: 0,
				list: [],
				time: '',
				goods: [],

			}
		},
		methods: {
			...myActions(['getSeckill']),
			clicktab(item, index) {
				console.log(item);
				this.active = index
				this.gettime(item)
			},
			gettime(num) {
				let s = num //当前场次开始小时
				let e = num + 2 //当前结束场次
				this.goods = this.list.filter(item => {
					let n = dayjs(item.start_time).hour() //商品开始秒杀时间
					let i = dayjs(item.end_time).hour() //商品秒杀结束时间
					if ((n - s) < (e - s) && (i - s) >= 0) {
						return (item)
					}
				})
				this.goods.map(item => {
					let sum = (Date.now() - dayjs(item.start_time).valueOf()) / (dayjs(item.end_time).valueOf() -
						dayjs(item.start_time).valueOf()) * 100
					this.$set(item, 'num', sum.toFixed(2))
				})
			},
			back(){
				
			}
		},
		mounted() {
			this.getSeckill()

		},
		onLoad() {
 
		},
		onShow() {},
		filters: {},
		computed: {
			...myState(['Seckill'])
		},
		watch: {
			Seckill(val) {
				if (val) {
					this.list = cloneDeep(val)
					let time = (dayjs().hour() % 2 === 0 && dayjs().hour() >= 8) ? dayjs().hour() : dayjs().hour() - 1
					if (time === 24) {
						time = 0
					}
					let a = this.timeList.indexOf(time)
					if (a > 4) {
						let arr = this.timeList.concat(this.timeList)
						this.timeList = arr.slice(a, a + 5)
					} else {
						this.timeList = this.timeList.slice(a, a + 5)
					}
					let s = time //当前场次开始小时18
					let e = time + 2 //当前结束场次20
					// 1.商品开始时间大于等于当前场次开始时间，商品结束时间小于当前场次结束时间
					// 1.商品开始时间小于等于当前场次时间，商品结束时间大于当前场次开始时间
					this.goods = val.filter(item => {
							let n = dayjs(item.start_time).hour() //商品开始秒杀时间
							let i = dayjs(item.end_time).hour() //商品秒杀结束时间
							// if ((n >= s && i <= e) || (n <= s && i > s)) {
							// 	return (item)
							if ((n - s) < (e - s) && (i - s) >= 0) {
								return (item)
							}	
					})
				this.goods.map(item => { //
					let sum = (Date.now() - dayjs(item.start_time).valueOf()) / (dayjs(item.end_time).valueOf() -
						dayjs(item.start_time).valueOf()) * 100
					this.$set(item, 'num', sum.toFixed(2))
				})
			}
		}
	},
	}
</script>

<style scoped lang="scss">
	.top {
		/* #ifdef MP-WEIXIN */
		padding-top: 40rpx;
		/* #endif */
	}

	.indexone {
		color: #FF6900;
	}

	.qianggou {
		color: #FFFFFF;
		background-color: #FF6900;
		padding: 8rpx 15rpx;
		border-radius: 20rpx;
	}

	.two {
		color: #a0a0a0;
		background-color: transparent;
		padding: 8rpx 15rpx;
		border-radius: 20rpx;
	}

	.cover {
		width: 240rpx;
		height: 240rpx;
	}

	.boxone {
		border-radius: 20rpx;
		margin: 20rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
	}

	.Price {
		margin-top: 80rpx;
	}

	.progress {
		padding: 10rpx;
		background-color: #FF6900;
		border-radius: 20rpx;
		color: #FFFFFF;
		margin-left: 50rpx;
	}
	.progress1{
		padding: 10rpx;
		background-color: #1AA034;
		border-radius: 20rpx;
		color: #FFFFFF;
		margin-left: 50rpx;
	}
</style>
