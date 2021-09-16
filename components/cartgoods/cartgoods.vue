<template>
	<view class="box ">
		<!-- 购物车2 -->
		<view class="flex-end padr10  backfff complete" @click="complete">{{show?'编辑':'完成'}}</view>
		<view class="checked font14 mal10">
			<cc-checkbox :checked.sync="check1" :option="item1" @change="allchange"></cc-checkbox>
		</view>
		<view class="cartbox">
			<view v-for="(item,index) in cartlist&&cartlist" :key="index" class="cartlist flex-a">
				<view class="mal10">
					<cc-checkbox v-if="!show" :checked.sync="item.checked" :option="{}"
						@change="onechange(item,$event)"></cc-checkbox>
					<cc-checkbox @change="delchange(item,$event)" v-if="show" :checked.sync="item.delchecked"
						:option="{}">
					</cc-checkbox>
				</view>
				<view>
					<image :src="item.goods.cover" class="cover"></image>
				</view>
				<view class="marl30">
					<view class="font14 overflow name">{{item.goods.name}}</view>
					<view class="flex mat10 font12 a0a0">
						<view v-for="(item1,index1) in item.spec" :key="index1">{{item1.checked}}</view>
					</view>
					<view class="flex-sb mat20">
						<view class="linsyans font18 font-w7">￥{{item.goods.presentPrice}}</view>
						<view>
							<cc-stepper @minus="minus(item,$event)" @plus="minus(item,$event)" :value.sync="item.count">
							</cc-stepper>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- #ifdef H5 -->
		<view style="height: 200rpx; width: 740rpx;"></view>
		<!-- #endif -->
		<view class="flex-sba all">
			<view class="mal10">
				<cc-checkbox :checked.sync="check1" :option="{label:'全选'}" @change="allchange"></cc-checkbox>
			</view>
			<view class="flex-ja" v-if="!show">
				<view>合计:<text class="linsyans mar15">￥{{num.toFixed(2)}}</text></view>
				<view>
					<cc-button round :disabled="Boolean(!amount)" :type="amount?'warning':'info'" size="small" @click="payment">
						结算{{amount? 	`(${amount})`:''}}</cc-button>
				</view>
			</view>
			<view v-if="show">
				<cc-button round size="small" @click='del'>删除</cc-button>
			</view>
		</view>
		<view class="cartgoodsbox overflow"> 
			<cc-popup :show.sync="flag" mode="bottom">
				<view style="height: 320rpx;"class="flex-dji backspace overflow"> 
					<view class="mat30 flex-ja font16">确定删除所选商品吗?</view>
					<view class="flex mat30" >
						<view class="flex-ja flex1 a0a0">
							<view class="cancel">取消</view>
						</view>
						<view class="flex-ja flex1">
						<view class="sure fff" @click="confirm ">	确定</view>
						</view>
					</view>
				</view>
			</cc-popup>
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
	export default {
		components: {},
		props: {
			cartlist: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				item1: {
					label: '小米自营'
				},
				item: {},
				check1: false,
				list: [],
				show: false,
				user: {},
				flag: false
			}
		},
		methods: {
			...goodsActions(['updateCart', 'delCart']),
			complete() { //点击编辑或完成
				this.show = !this.show
				if (this.show) {
					this.check1 = false
					this.cartlist.map(item => {
						item.delchecked = false
					})
				} else {
					this.check1 = this.cartlist.every(item => {
						return item.checked
					})
				}
			},
			allchange(e) { //全选
				if (this.show) {
					this.cartlist.map(item => {
						item.delchecked = e
					})
				} else {
					this.cartlist.map(item => {
						item.checked = e
					})
				}
			},
			onechange(item1, e) { //完成时的单选
				item1.checked = e
				this.check1 = this.cartlist.every(item => {
					return item.checked
				})
			},
			delchange(item1, e) { //编辑时的单选
				item1.delchecked = e
				this.check1 = this.cartlist.every(item => {
					return item.delchecked
				})
			},
			minus(item, e) { //添加或者减少数量
				this.updateCart({
					id: item._id,
					user_id: this.user._id,
					count: e
				})
			},
			del() { //删除购物车商品
				this.flag = true
			},
			confirm(){//确认删除
				let arr = []
				// this.list.map(item => {
				// 	if (item.delchecked === true) {
				// 		arr.push(item._id)
				// 	}
				// })
				// console.log(arr);
				// this.delCart({user_id:this.user._id,id:arr})
			},
			payment(){//结算
			let arr = this.cartlist.filter(item => {
				return item.checked === true
			})
			console.log(arr);
				if(arr){
				uni.setStorageSync('goods',arr)
				uni.setStorageSync('price',this.num)
				uni.navigateTo({
					url:'/pages/payment/payment'
				})
				}
			}
		},
		mounted() {
			console.log(this.cartlist);
			this.user = uni.getStorageSync('userInfo')
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			num() { //选中商品金额
				let sum = 0
				let arr = this.cartlist.filter(item => {
					return item.checked === true
				})
				arr.map(item => {
					sum += item.goods.presentPrice * item.count
				})
				return sum
			},
			amount() { //选中商品数量
				let sum = 0
				let arr = this.cartlist.filter(item => {
					return item.checked === true
				})
				arr.map(item => {
					sum += item.count
				})
				return sum
			}

		},
		watch: {
			cartlist(val) {
				if (val) {
					this.list = cloneDeep(this.cartlist)
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.box {
		background-color: #F6F6F6;
		height: 100vh;
	}

	.checked {
		padding: 10rpx 20rpx;
		padding-top: 60rpx;
		/* #ifdef MP-WEIXIN */
		padding-top: 90rpx;
		/* #endif */
	}

	.cartlist {
		height: 240rpx;
		width: 700rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		margin: 20rpx auto;
	}

	.cover {
		width: 200rpx;
		height: 200rpx;
	}

	.name {
		width: 380rpx;
	}

	.all {
		z-index: 999;
		background-color: #FFFFFF;
		padding: 20rpx;
		position: fixed;
		/* #ifdef MP-WEIXIN */
		bottom: 0rpx;
		/* #endif */
		/* #ifdef H5 */
		bottom: 100rpx;
		/* #endif */
		left: 0;
		right: 0;
	}

	.cartbox {
		/* #ifdef MP-WEIXIN */
		margin-bottom: 120rpx;
		/* #endif */
	}

	.complete {
		/* #ifdef MP-WEIXIN */
		padding-top: 30rpx;
		padding-right: 20rpx;
		/* #endif */
		position: fixed;
		top: 88rpx;
		right: 0;
		left: 0;
		padding-bottom: 10rpx;
	}
	.cancel{
		padding: 20rpx 120rpx;
		background: #F7F7F7;
		border-radius: 40rpx;
		margin-right: 20rpx;
		margin-top: 40rpx;
	}
	.sure{
		padding: 20rpx 120rpx;
		background: #FE6F05;
		border-radius: 40rpx;
		margin-left: 20rpx;
		margin-top: 40rpx;
	}
</style>
