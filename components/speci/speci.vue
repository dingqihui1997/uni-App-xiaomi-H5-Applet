<template>
	<view>
		<view class="speic">
			<view class="flex-sb one" @click="click">
				<view class="flex font14">
					<view class="mar15">已选</view>
					<view v-for="(item,index) in detail.sku" :key="index" class="mal10">
						{{item.checked}}
					</view>
				</view>
				<view>
					<image src="../../static/right.png" class="right"></image>
				</view>
			</view>
			<view class="flex-sb one">
				<view class="flex font14">
					<view class="mar15">送至</view>
					<view class="overflow" style="width: 550rpx;">{{city}}</view>
				</view>
				<view>
					<image src="../../static/right.png" class="right"></image>
				</view>
			</view>
			<view class="flex-sb one">
				<view class="flex font14">
					<view class="mar15">门店</view>
					<view>小米之家四川成都锦江区</view>
				</view>
				<view>
					<image src="../../static/right.png" class="right"></image>
				</view>
			</view>
			<!-- 选择商品规格弹框 -->
			<cc-popup :show.sync="showPopup" mode="bottom" height="800" round :closeable="true">
				<view class="pad20 boxbottom ">
					<view class="flex-a mat10 marl25">
						<view>
							<image :src="detail.cover" class="goodsimg"></image>
						</view>
						<view class="marl25">
							<view class="presentPrice font20 font-w7 margin-b10">￥{{detail.presentPrice}}</view>
							<view class="flex font12">
								<view>{{detail.name}}</view>
								已选
								<view v-for="(item,index) in detail.sku" :key="index" class="mal10">
									{{item.checked}}
								</view>
							</view>
						</view>
					</view>
					<scroll-view scroll-y="true" style="height: 500rpx;">
						<view v-for="(item,index) in detail.spec" :key="index">
							<view class="margin-b10">{{item.name}}</view>
							<view class="flex-w">
								<view :class="{'choice':index1===item.showflag,'choice1':index1!==item.showflag}"
									@click="choice(item,item1,index,index1)" v-for="(item1,index1) in item.checkList"
									:key="index1" class="check font14">
									{{item1}}
								</view>
							</view>
						</view>
						<view class="flex-sb num">
							<view>购买数量</view>
							<view>
								<cc-stepper :value.sync="count"></cc-stepper>
							</view>
						</view>
					</scroll-view>
					<view class="flex  fff bottom">
						<view class="flex1 flex-ja add" @click="checkLogin(0)">加入购物车</view>
						<view class="flex1 flex-ja buy" @click="checkLogin(1)">立即购买</view>
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
			goods: {
				type: Object,
				required: true
			},
			show: {
				type: Boolean,
				required: true
			}
		},
		data() {
			return {
				user:{},
				count: 1,
				list: [],
				detail: {},
				showPopup: this.show,
				city:'定位中'
			}
		},
		methods: {
			...goodsActions(['addCart']),
			click() { //点击弹出选择商品
				this.showPopup = true
			},
			choice(item, item1, index, index1) { //选择规格
				this.$set(this.list, index, item1)
				this.$set(this.detail.sku, index, {
					name: item.name,
					checked: item1
				})
				item.showflag = index1
				// console.log(this.detail.sku);
			},
			add() { //加入购物车
			this.addCart({
				user_id:this.user._id,
					count:this.count,
					goods:this.detail,
					spec:this.detail.sku
			})
			this.showPopup=false
			},
			buy() {//立即购买
					let obj=[]
					obj.push({
						count:this.count,
						goods:this.detail,
						spec:this.detail.sku,
						_id:this.detail._id
					})
					uni.setStorageSync('price',this.count*this.detail.presentPrice)
					uni.setStorageSync('goods',obj)
					uni.navigateTo({
						url:"/pages/payment/payment"
					})
			},
			checkLogin(index) {
				this.$utils.checkLogin({
					key: 'userInfo',
					next: index ? this.buy : this.add
				})
			}
		},
		mounted() {
			// console.log(this.detail);
			this.user=uni.getStorageSync('userInfo')
			this.$utils.getLocation('').then(res=>{
				if(res.code===200){
					this.city=res.data.formattedAddress
				}
			}).catch(err=>{
				console.log(err);
			})
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {
			goods(val) {
				if (val) {
					this.detail = cloneDeep(val)
				}
			},
			show(val) {
				this.showPopup = val
			},
			showPopup(val) {
				this.$emit('setshow', val)
			}
		},
	}
</script>

<style scoped lang="scss">
	.right {
		width: 40rpx;
		height: 40rpx;
	}

	.speic {
		width: 100%;
		background-color: #F6F6F6;
		padding: 20rpx 0;
		// margin: auto;
	}

	.one {
		padding: 20rpx 20rpx;
		border-bottom: 1px #eee solid;
		background-color: #FFFFFF;
	}

	.goodsimg {
		width: 180rpx;
		height: 180rpx;
	}

	.presentPrice {
		color: #FF6E4E;
	}

	.check {
		padding: 10rpx 20rpx;
		background: #F5F5F5;
		margin: 10rpx;
		border-radius: 30rpx;
	}

	.add {
		background-color: #FDCA00;
		margin-left: 10rpx;
		border-bottom-left-radius: 40rpx;
		border-top-left-radius: 40rpx;
		box-sizing: border-box;
	}

	.buy {
		background-color: #FF7808;
		margin-right: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		border-bottom-right-radius: 40rpx;
		border-top-right-radius: 40rpx;
		box-sizing: border-box;
	}

	.bottom {
		position: fixed;
		bottom: 10rpx;
		left: 0;
		right: 0;
		z-index: 9999999;
	}

	.choice {
		color: #FF5934;
		border: 1px solid #FF5934;
		background-color: #FFF2EF;
	}

	.choice1 {
		border: 1px solid transparent;
	}
</style>
