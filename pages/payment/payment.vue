<template>
	<view style="height: 100vh; background: #F6F6F6;">
		<view class="top font18 font-w7">
			<cc-nav-bar leftArrow leftText="确认订单" @clickLeft="clickLeft"></cc-nav-bar>
		</view>
		<!-- 地址 -->
		<view class="backfff address" @click="edit" v-if="useraddress">
			<view class="address1">
				<view class="font14 flex">
					<view v-for="(item,index) in useraddress.address" :key="index">{{item}}</view>
				</view>
				<view class="flex-sba mat20">
					<view class="font-w7 flex-ja">{{useraddress.detailAddress}}</view>
					<view class="flex-ja">
						<image src="../../static/right.png" class="right"></image>
					</view>
				</view>
				<view class="mat20 font14">{{useraddress.username}}{{ useraddress.mobile}}</view>
			</view>
			<image src="../../static/caitiao.jpg" class="caitiao wi100"></image>
		</view>
		<view v-if="!useraddress" @click="edit">
			<view class="flex-sb">
				<view class="font-w7 flex-ja">暂无地址,去添加</view>
				<view class="flex-ja">
					<image src="../../static/right.png" class="right"></image>
				</view>
			</view>
		</view>
		<!-- 商品 -->
		<view class="flex-sb goods" @click="open">
			<view class="flex overflow" style="width: 540rpx;">
				<view v-for="(item,index) in goods" :key="index">
					<image :src="item.goods.cover" class="cover"></image>
				</view>
			</view>
			<view class="flex-a">共{{num}}件<image src="../../static/right.png" class="right"></image>
			</view>
		</view>
		<!-- 价格 -->
		<view class="price font14">
			<view class="flex-sb">
				<view>运费总价</view>
				<view>￥{{price}}</view>
			</view>
			<view class="flex-sb mat20">
				<view>运费</view>
				<view>包邮</view>
			</view>
			<view class="flex-sba mat20">
				<view>优惠券</view>
				<view class="flex-a">无可用<image src="../../static/right.png" class="right"></image>
				</view>
			</view>
		</view>
		<view class="flex-sb address address1 backfff font14">
			<view>发票</view>
			<view class="flex-a">电子普通发票-个人<image src="../../static/right.png" class="right"></image>
			</view>
		</view>
		<view class="flex-sb heji">
			<view>共{{goods.length}}件,合计<text class="linsyans font-w7 font20">￥{{price}}</text></view>
			<view>
				<cc-button type="error" round size="small" @click="buy">去付款</cc-button>
			</view>
		</view>
		<cc-popup :show.sync="show" mode="bottom" height="700">
			<view class="flex-ja mat30">商品清单</view>
			<view class="flex-ja mat10 a0a0">共{{goods.length}}件</view>
			<scroll-view scroll-y="true" style="height: 470rpx;">
				<view>
					<view v-for="(item,index) in goods" :key="index" class="flex font14 popup">
						<view>
							<image :src="item.goods.cover" class="goodsimg"></image>
						</view>
						<view>
							<view class="flex-sba mat20">
								<view class="goodsname overflow mal10">{{item.goods.name}}</view>
								<view>￥{{item.goods.presentPrice}}</view>
							</view>
							<view class="flex-sba mat20">
								<view class="goodsname overflow mal10">
									<view v-for="(item1,index1) in item.spec" :key="index1">{{item1.checked}}</view>
								</view>
								<view>x{{item.count}}</view>
							</view>
						</view>
					</view>
					<view class="block">
						<cc-button type="warning" round block @click='sure'> 确定</cc-button>
					</view>
				</view>
			</scroll-view>
		</cc-popup>
		<view class="handleComplete">
			<cc-password-input
			  :value.sync="flag"
			  @complete="handleComplete"
			></cc-password-input>
		</view>
	</view>
</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let userModule = createNamespacedHelpers('user')
	let {
		mapState: userState,
		mapActions: userActions
	} = userModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				goods: [],
				price: 0,
				show: false,
				user: {},
				useraddress: {},
				flag:false
			}
		},
		methods: {
			...userActions(["getAppAddress","addOrder"]),
			open() { //打开弹窗
				this.show = true
			},
			sure() { //关闭弹窗
				this.show = false
			},
			edit() { //编辑选折地址
				uni.navigateTo({
					url: "/pages/addresslist/addresslist"
				})
				uni.setStorageSync('num', 1)
			},
			clickLeft() {
				uni.navigateBack({})
			},
			handleComplete(val){//输入完成
				let address1=this.useraddress.addresslist.join('')+this.useraddress.detailAddress
				console.log(address1);
				if(val==='123456'){
					this.addOrder({
						user_id:this.user._id,
						price:this.price,
						address:address1,
						count:this.num,
						pay_time:Date.now(),
						goods_list:this.goods,
						mobile:this.useraddress.mobile,
					})
				}else{
					uni.showToast({
						title:'密码错误',
						icon:"none"
					})
				}
			},
			buy(){//去付款
				this.flag=true
			}
		},
		mounted() {
			this.price = uni.getStorageSync('price')
			this.goods = uni.getStorageSync('goods')
		},
		onLoad() {

		},
		onShow() {
			this.user = uni.getStorageSync('userInfo')
			this.getAppAddress(this.user._id)
			let a = uni.getStorageSync('useraddress')
			if (a) { 
				this.useraddress = a
			} else {
				if(this.Address.length>0){
					let obj = {}
					let arr = this.Address.find(item => {
						return item.isDefault === true
					})
					if (arr) {
						this.useraddress = arr
					} else {
						this.useraddress = arr1[0]
					}
				}	
			}
		},
		filters: {},
		computed: {
			...userState(['Address']),
			num(){
				let sum=0
				this.goods.map(item=>{
					sum+=item.count
				})
				return sum
			}
		},
		watch: {
			Address(val){
				let a = uni.getStorageSync('useraddress')
				if (a) { 
					this.useraddress = a
				} else {
					if(val.length>0){
						let obj = {}
						let arr = this.Address.find(item => {
							return item.isDefault === true
						})
						if (arr) {
							this.useraddress = arr
						} else {
							this.useraddress = arr1[0]
						}
					}	
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

	.address {
		margin: 20rpx 20rpx 0 20rpx;
		border-radius: 20rpx;
	}

	.address1 {
		padding: 20rpx;
	}

	.caitiao {
		height: 4rpx;
	}

	.goods {
		margin: 20rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 20rpx 0 20rpx 20rpx;
	}

	.cover {
		width: 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
	}

	.price {
		margin: 20rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
	}

	.heji {
		background: #FFFFFF;
		padding: 20rpx;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
	}

	.goodsimg {
		height: 180rpx;
		width: 180rpx;
		margin-left: 30rpx;
		margin-top: 10rpx;
	}

	.goodsname {
		width: 420rpx;
	}

	.block {
		width: 90%;
		margin: 0 auto;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 999;
	}
	.cc-number-keyboard-wrap-content-item-key{
		width: 120rpx !important;
	}
</style>
