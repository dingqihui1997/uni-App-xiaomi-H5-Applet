<template>
	<view>
		<view class="top">
			<cc-nav-bar leftArrow @clickLeft="clickLeft"></cc-nav-bar>
		</view>
		<view style="padding: 40rpx;">
			<view class="font-w7 font18">小米账号登录</view>
			<view class="flex-sb font14 mat30">
				<view>验证码已发送至+86 {{mobile}}</view>
				<view class="show">修改</view>
			</view>
			<view class="flex-sb boxone mat30 marginauto" :class="{'border':codeflag,'':!codeflag}">
				<view><input type="text" placeholder="请输入短信的验证码" maxlength="6" v-model="code" /></view>
				<view class="font14" :class="show?'show':'a0a0'" @click="agin">{{show?'获取验证码':`重新发送 ${num}`}}</view>
			</view>
		</view>
		<view :class="code?'back':''" class="boxone register flex-ja  marginauto" @click="signin">登录</view>
		<view class="flex-ja mat30 font14 a0a0">
			<view class="mar15">用户密码登录</view>
			<view class="mal10">收不到验证码</view>
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
				code: '',
				show: true,
				codeflag: false,
				num: 60,
				mobile: '',
				code: '',
				timer:null
			}
		},
		methods: {
			...userActions(['getCode','mobileLogin']),
			signin(){//点击登录
				if(this.code){
					this.mobileLogin({mobile:this.mobile,code:this.code})
				}
			},
			agin(){//点击重新发送
			console.log(this.show);
				if(this.show){
					this.getCode({mobile:this.mobile})
					this.timer = setInterval(() => {
						this.show = false
						this.num--
						if (this.num === 0) {
							clearInterval(this.timer)
							this.show = true
							this.num=60
						}
					}, 1000)
				}
			},
			clickLeft(){
				uni.navigateBack({})
			}
		},
		mounted() {

		},
		onLoad(e) {//获取验证码
			console.log(e);
			this.mobile = e.mobile 
				// this.getCode(e)
			this.timer = setInterval(() => {
				this.show = false
				this.num--
				if (this.num === 0) {
					clearInterval(this.timer)
					this.show = true
					this.num=60
				}
			}, 1000)
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.right {
		width: 50rpx;
		height: 50rpx;
	}

	.boxone {
		width: 620rpx;
		background-color: #F0F0F0;
		padding: 20rpx 30rpx;
		border-radius: 30rpx;
	}

	.right {
		width: 50rpx;
		height: 50rpx;
	}

	.border {
		border: 2px solid #F44336;
	}

	.back {
		background-color: #0B84FF !important;
	}

	.register {
		background-color: #B5DAFF;
		color: #FFFFFF;
		padding: 20rpx;
	}

	.top {
		/* #ifdef MP-WEIXIN */
		margin-top: 40rpx;
		/* #endif */
	}

	.show {
		color: #0B84FF;
	}
</style>
