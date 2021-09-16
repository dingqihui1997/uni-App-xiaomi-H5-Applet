<template>
	<view>
		<view class="search">
			<cc-search @focus="focus" class="categorysearch" placeholder="搜索商品" :value.sync="value" round :showAction="false">
			</cc-search>
		</view>
		<view class="flex">
			<view>
				<scroll-view scroll-y="true" style="height: 1100rpx;">
					<view v-for="(item,index) in category" :key="index" class="box font14 flex-a"
						@click="click(item,index)">
						<view :class="index===active?'border':'border1'"></view>
						<view class="name" :class="index===active?'color1':''">{{item.name}}</view>
					</view>
				</scroll-view>
			</view>
			<view class="marl25">
					<image src="../../static/fenlei.png" class="fenlei flex-ja"></image>
					<scroll-view scroll-x="true" :show-scrollbar="false">
						<view class="flex nowrap mat10 margin-b20" style="width: 540rpx;">
							<view v-for="(item,index) in arr.list" :key="index" class="listname font12"
								@click="slide(item,index)" :class="index===activeindex?'listname1':''">
								{{item.name}}
							</view>
						</view>
					</scroll-view>
					<scroll-view scroll-y="true" show-scrollbar="false"	style="height: 900rpx;" :scroll-into-view="Item">
					<view v-for="(item,index) in arr.list" :key="index" :id="'dame'+index">
						<view class="font14 font-w7">{{item.name}}</view>
						<view v-if="!item.list" class="blank">暂无数据</view>
						<view v-if="item.list">
							<view v-for="(item1,index1) in item.list" :key="index1">
								<view v-for="(item2,index2) in Object.values(item1)" :key="index2">
									<view v-for="(item3,index3) in item2" :key="index3" class="flex-a goods" @click="goto(item3)">
										<view>
											<image :src="item3.cover" class="cover3"></image>
										</view>
										<view class="marl25">
											<view class="font14 overflow" style="width: 300rpx;">{{item3.name}}</view>
											<view class="mat10">￥{{item3.presentPrice}}起</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
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
	export default {
		components: {},
		props: {},
		data() {
			return {
				value: '',
				active: 0,
				arr: {},
				Item: '',
				activeindex:0
			}
		},
		methods: {
			...homeActions(["getCategory"]), //调用方法
			click(item, index) { //点击左侧的方法
				this.active = index
				console.log(item);
				this.arr = item
			},
			slide(item, index) {//右边定位
				console.log(item);
    this.Item=`dame${index}`
		this.activeindex=index
			},
			focus(){//搜索
				uni.navigateTo({
					url:'/pages/search/search'
				})
			},
			goto(item){
				uni.navigateTo({
					url: `/pages/details/details?id=${item._id}`
				})
			}
		},
		mounted() {
			this.getCategory()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...homeState(["category"])
		},
		watch: {
			category(val, oldval) {
				if (val) {
					console.log(val);
					this.arr = this.category[0]
					console.log(this.arr);
				}
			},
		},
	}
</script>

<style scoped lang="scss">
	.categorysearch {
		width: 600rpx;
	}

	.search {
		/* #ifdef MP-WEIXIN */
		margin-top: 20rpx;
		width: 500rpx;
		/* #endif */
	}

	.box {
		color: #a7a7a7;
		height: 80rpx;
	}

	.border {
		height: 30rpx;
		width: 4rpx;
		background-color: #FF5934;
	}

	.border1 {
		height: 30rpx;
		width: 4rpx;
		background-color: transparent;
	}

	.name {
		padding-left: 20rpx;
	}

	.fenlei {
		width: 540rpx;
		height: 160rpx;
	}

	.listname {
		padding: 10rpx;
	}
.listname1{
	background: #F1F1F1;
}
	.cover3 {
		width: 120rpx;
		height: 120rpx;
	}

	.goods {
		width: 540rpx;
		height: 170rpx;
		background: #F8F8F8;
		margin-top: 20rpx;
		padding: 20rpx;
		padding-left: 30rpx;
		margin-bottom: 10rpx;
		border-radius: 20rpx;
	}
	.blank {
		padding: 20rpx;
	}
	.color1{
		color: #000;
	}
</style>
