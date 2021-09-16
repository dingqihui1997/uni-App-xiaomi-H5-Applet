<template>
	<view style="padding: 40rpx;">
		<view class="top">
			<view class="flex-ja">
				<image src='../../static/xiaomilogo.png' class="logo"></image>
			</view>
			<view class="flex-ja font14 a0a0 mat30">让每个人都能享受科技的乐趣</view>
		</view>
		<view class="font-w7 font18">小米账号登录</view>
		<!-- 手机号登录 -->
		<view v-if="show">
			<view class="flex-sba boxone mat20 marginauto" :class="{'border':mobileflag,'':!mobileflag}">
				<view class="flex-ja">+86<image src="../../static/right.png" class="right"></image>
				</view>
				<view><input type="text" placeholder="请输入手机号码" maxlength="11" v-model="mobile" /></view>
			</view>
			<view class="marl90 font12" v-if="mobileflag" style="color: #F44336;">请输入正确手机号</view>
			<view :class="mobile&&!mobileflag?'back':''" class="boxone register flex-ja mat30 marginauto" @click="next">下一步</view>
		</view>
		<!-- 账号登录 -->
		<view v-if="!show">
			<view class="flex-sb boxone mat20 marginauto" :class="{'border':userflag,'':!userflag}">
				<view><input @blur="blur(0)"  placeholder="请输入用户名" v-model="username" /></view>
			</view>
			<view class="marl90 font12" v-if="userflag" style="color: #F44336;">请输入用户名</view>
			<view class="flex-sb boxone mat20 marginauto" :class="{'border':passwordflag,'':!passwordflag}">
				<view><input @blur="blur(1)" type="password" placeholder="请输入密码" v-model="password" /></view>
			</view>
			<view class="marl90 font12" v-if="passwordflag" style="color: #F44336;">请输入密码</view>
			<view :class="password&&username?'back':''" class="boxone register flex-ja mat30 marginauto"
				@click="signin">登录</view>
		</view>
		<view class="flex-ja mat30 font14 a0a0">
			<view class="mar30" @click="user">{{show?'用户名密码登录':'手机号登录'}}</view>
			<view class="mal10" @click="register">立即注册</view>
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
				mobile: '',
				mobileflag: false,
				passwordflag: false,
				userflag: false,
				flag: false,
				show: true,
				password: '',
				username: '',
				flag1: false
			}
		},
		methods: {
			...userActions(['userLogin']),
			signin() {//用户名登录
				if (this.username && this.password) { //验证
					this.userLogin({
						username:this.username,
						password:this.password
					})
				}
			},
			user() { //切换登录状态
				this.show = !this.show
			},
			next(){//手机号登录
				if(this.mobile&&!this.mobileflag){
					uni.navigateTo({
						url:`/pages/code/code?mobile=${this.mobile}`
					})
				}
			},
			blur(e) { //光标移入
				if (e) {
					this.password ? this.passwordflag = false : this.passwordflag = true
				} else {
					this.username ? this.userflag = false : this.userflag = true
				}
			},
			register() { //跳往注册
				uni.navigateTo({
					url: '/pages/register/register'
				})
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {},
		filters: {},
		computed: {},
		watch: {
			mobile(val) {
				if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(val)) {
					this.mobileflag = true
				} else {
					this.mobileflag = false
					this.flag = true
					console.log(this.flag);
				}
			},
			// password(val){
			// 	if(val){
			// 		this.passwordflag=false
			// 	}else{
			// 		this.passwordflag=true
			// 	}
			// console.log(this.passwordflag);
			// }
		},
	}
</script>

<style scoped lang="scss">
	.logo {
		width: 100rpx;
		height: 100rpx;
	}

	.top {
		margin-top: 120rpx;
		margin-bottom: 60rpx;
		/* #ifdef MP-WEIXIN */
		margin-top: 150rpx;
		/* #endif */
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
		margin-top: 30rpx !important;
	}
</style>
