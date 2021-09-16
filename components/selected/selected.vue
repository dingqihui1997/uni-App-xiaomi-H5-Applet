<template>
  <view class="box">
		<cc-sticky  :offsetTop="num">
			<scroll-view scroll-x="true" style="width: 100%;" >
				<view class="flex backeee">
					<view v-for="(item,index) in recommend"  :key="index"  class="recbox nowrap flex-dji" @click="click(item,index)" >
							 <view class="font18" :class="{active:active===index}">
							 	{{item.name}}
							 </view>
							 <view class="font12  mat10 a0a0" :class="{desc:active===index}">{{item.desc}}</view>
					</view>
				</view>
			</scroll-view>
			</cc-sticky>	
			<view class="flex-w mat10">
				<view v-for="(item,index) in goods" :key="index" class="goods1 flex-dji" @click="goto(item)">
					<view class="coverimg">
						<image :src="item.cover" class="img100"></image>
					</view>
					<view class="font14 name">{{item.name}}</view>
					<view class="presentPrice font-w7">￥{{item.presentPrice}}</view>
					<view class="originalPrice font12 a0a0 text-li">￥{{item.originalPrice}}</view>
					<image src="../../static/image/icon_close.png" class="imageclose" @click.stop="close(index)"></image>
					<view v-if="flag&&active===index" class="goods2 flex-dji" @click="cancel">
						<view class="reconm flex-ja">不感兴趣</view>
						<view class="reconm flex-ja">品类不喜欢</view>
						<view class="reconm flex-ja">看过了</view>
						<view class="reconm flex-ja">已经购买了</view>
					</view>
				</view>
			</view>
		
  </view>
</template>

<script>
  export default {
    components: {},
    props: {
			recommend:{
							type:Array,
							required:true
						},
						goods:{
							type:Array,
							required:true
						}
		},
    data() {
      return {
				active:0,
				flag:false,
				num:0
			}
    },
    methods: {
			click(item,index){
				this.active=index
				this.$emit('send',item)
			},
			close(index){//点击关闭
				this.active=index
				this.flag=true
			},
			cancel(){
				this.flag=false
			},
			goto(item){
				uni.navigateTo({
					url:`/pages/details/details?id=${item._id}`
				})
			}
		},
    mounted() {
		// console.log(this.goods);
		// #ifdef H5
		this.num=80
		// #endif
// #ifdef MP-WEIXIN
		this.num=120
// #endif
    },
    onLoad() {

    },
    onShow() {

    },
    filters: {},
    computed: {},
    watch: {},
  }
</script>

<style scoped lang="scss">
.recbox{
	// width: 180rpx;
	margin:10rpx 20rpx;
}
.active{
	color: #FF5934;
}
.desc{
	color: #fff;
	background-color:  #FF5934;
	padding: 5rpx 24rpx;
	border-radius: 20rpx;
}
.goods1{
	width: 47%;
	/* #ifdef MP-WEIXIN */
	width: 42%;
	/* #endif */
	height: 470rpx;
	margin: 10rpx 10rpx;
	background: #FFFFFF;
	padding: 20rpx 20rpx;
	border-radius: 10rpx;
	padding-top: 40rpx;
	position: relative;
}
.goods2{
	width: 100%;
	height: 470rpx;
	/* #ifdef MP-WEIXIN */
	height: 530rpx;
	/* #endif */
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	border-radius: 10rpx;
	background-color: rgba(0,0,0,.7);
	z-index: 999;
}
.coverimg{
	width: 95%;
	height: 320rpx;
}
.presentPrice{
	color: #FF5934;
	width: 90%;
}
.name{
	width: 90%;
	margin-top: 10rpx;
	margin-bottom: 10rpx;
}
.box{
	background-color: #eee;
}
.originalPrice{
	width: 90%;
}
.imageclose{
	width: 30rpx;
	height: 30rpx;
	border-radius: 100%;
	position: absolute;
	right: 10rpx;
	top: 10rpx;
}
.reconm{
	width: 80%;
	padding:10rpx;
	border-radius: 30rpx;
	background-color: #FFFFFF;
	margin: 10rpx;
}
</style>
