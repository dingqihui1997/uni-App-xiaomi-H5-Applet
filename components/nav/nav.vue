<template>
  <view>
  <view class="flex-wa navtop">
		<view v-for="(item,index) in nav" :key="index" class="navbox" @click="click(index)">
				<image :src="item.url" class="img100"></image>
		</view>
	</view>
	<view class="new">
		<view class=" font16 font-w7">人气上新</view>
		<view class="flex">
			<view @click="goto(item)" v-for="(item,index) in news":key="index" class="newimg font14 flex-dji" :class="{newimg1:index===0,newimg2:index!==0}">
				<view ><image :src="item.cover" class="img100 oneimg" :class="index===0?'oneimg1':'oneimg'"></image></view>
				<view class="name overflow 333">{{item.name}}</view>
			</view>
		</view>
	</view>
  </view>
</template>

<script>
  export default {
    components: {},
    props: {
			nav:{
							type:Array,
							required:true
						},
				news:{
								type:Array,
								required:true
							},		
		},
    data() {
      return {}
    },
    methods: {
			goto(item){
				uni.navigateTo({
					url:`/pages/details/details?id=${item._id}`
				})
			},
			click(index){//
			if(index===5){
				uni.navigateTo({
				url:'/pages/seckill/seckill'
				})
			}
			}
		},
    mounted() {
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
.navbox{
	width: 20%;
	height: 160rpx;
}
.navtop{
	margin: 20rpx;
}
.new{
	background-color: #FFFFFF;
	padding: 10rpx 20rpx;
	
}
.newimg{
	// width: 100%;
	height: 240rpx;
}
.newimg1{
	width: 50%;
}
.newimg2{
	width: 25%;
	margin-left: 20rpx;
}
.oneimg{
	width: 180rpx;
	height: 180rpx;
}
.oneimg1{
	width: 320rpx;
	height: 180rpx;
}
.name{
	width: 160rpx;
}
</style>
