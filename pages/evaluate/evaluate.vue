<template>
	<view>
		<view class="top">
			<cc-nav-bar leftArrow title="提交评价"></cc-nav-bar>
		</view>
		<view class="box">
			<view class="flex ">
				<view>
					<image :src="comment.goods.cover" class="goodscover"></image>
				</view>
				<view class="mal10">
					<view class="font14">{{comment.goods.name}}</view>
					<view class="font14 linsyans font-w7 mat10">￥{{comment.goods.presentPrice}}</view>
				</view>
			</view>
			<view class="flex">评分：<cc-rate @change="change" :value.sync="value"></cc-rate>
			</view>
			<view>内容：</view>
			<cc-field :maxlength="200" show-word-limit :value.sync="evaluate" type="textarea" rows="6" :border="false">
			</cc-field>
			<view>
				<cc-upload :action="action" :header="header" @uplpadSuccess="uplpad" @delete="delimg"></cc-upload>
			</view>
			<view>是否匿名:</view>
			<view class="mat10">
				<cc-switch :value.sync="checked"></cc-switch>
			</view>
			<view class="mat30">
				<cc-button block color="#FF6F13" @click="goto">提交评价</cc-button>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let myModule = createNamespacedHelpers('my')
	let {
		mapState: myState,
		mapActions: myActions
	} = myModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				comment: {},
				value: 0,
				evaluate: '',
				action: 'http://localhost:7001/app/upload',
				header: {
					'Authorization': uni.getStorageSync('token')
				},
				checked: false, //是否匿名
				pic: [],
				user: {}
			}
		},
		methods: {
			...myActions(['createComment']),
			change(e) { //评分
				this.value = e
			},
			uplpad(e) { //图片上传
			console.log(e);
				if(e.statusCode===200){
					this.pic.push(e.data.data)
				}
				console.log(this.pic);
			},
			delimg(index){
				
				this.pic.splice(index.index,1)
			},
			// onChange(e){//是否匿名
			// 	console.log(e);
			// },
			goto() {
				this.createComment({
					user_id: this.user._id,
					goods_id:this.comment.goodsId,
					order_id: this.comment.order_id,
					rate: this.value,
					content: this.evaluate,
					pic: this.pic,
					isAnonymous: this.checked,
					comment_time: Date.now(),
				})
			}
		},
		mounted() {
			this.user = uni.getStorageSync('userInfo')
		},
		onLoad() {

		},
		onShow() {
			this.comment = uni.getStorageSync('comment')
			console.log(this.comment);
		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.top {
		/* #ifdef MP-WEIXIN */
		padding-top: 40rpx;
		/* #endif */
	}

	.box {
		padding: 20rpx;
	}

	.goodscover {
		width: 200rpx;
		height: 200rpx;
	}
</style>
