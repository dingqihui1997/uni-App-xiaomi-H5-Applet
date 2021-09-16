<template>
	<view>
		<view class="top">
			<cc-nav-bar leftArrow></cc-nav-bar>
		</view>
		<view class="marl30 font20 font-w7">注册小米账号</view>
		<view class="title font14">系统会根据您选择的国家/地区的法律法规存储您的个人信息</view>
		<!-- 用户名 -->
		<view>
			<view class="flex-sb boxone mat30 marginauto" :class="{'border':userflag,'':!userflag}">
				<input placeholder="请输入用户名" v-model="username" @blur="user(0)" />
			</view>
			<view class="marl90 font12" v-if="userflag" style="color: #F44336;">请输入用户名</view>
		</view>
		<!-- 手机号 -->
		<view class="flex-sba boxone mat20 marginauto" :class="{'border':mobileflag,'':!mobileflag}">
			<view class="flex-ja">+86<image src="../../static/right.png" class="right"></image>
			</view>
			<view><input @blur="user(1)" type="text" placeholder="请输入手机号码" maxlength="11" v-model="mobile" /></view>
		</view>
		<view class="marl90 font12" v-if="mobileflag" style="color: #F44336;">请输入正确手机号</view>
		<!-- 验证码 -->
		<view class="flex-sb boxone mat20 marginauto" :class="{'border':codeflag,'':!codeflag}">
			<view><input @blur="user(2)" type="text" placeholder="请输入短信的验证码" maxlength="6" v-model="code" /></view>
			<view class="font14" @click="getcode" :class="show?'show':'a0a0'">{{show?'获取验证码':`重新获取:${num}秒`}}</view>
		</view>
		<view class="marl90 font12" v-if="codeflag" style="color: #F44336;">请输入短信验证码</view>
		<!-- 密码 -->
		<view class="flex-sb boxone mat20 marginauto" :class="{'border':passwordflag,'':!passwordflag}">
			<view><input @blur="user(3)" type="password" placeholder="请输入密码" v-model="password" /></view>
		</view>
		<view class="marl90 font12" v-if="passwordflag" style="color: #F44336;">请输入密码</view>
		<view :class="username&&password&&code&&!mobileflag?'back':''" class="boxone register flex-ja mat30 marginauto" @click="register">立即注册</view>
		<view class="flex-ja a0a0 font12 corve">收不到验证码？</view>
		<view class="flex-ja font12">
			<cc-checkbox :checked.sync="check1" :option="item1"></cc-checkbox>
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
				item1: {
					label: '己阅读并同意小米帐号用户协议和隐私政策'
				},
				check1: false,
				mobile: '',
				code: '',
				password: '',
				username: '',
				userflag: false,
				// num: -1,
				mobileflag: false,
				codeflag: false,
				passwordflag: false,
				flag: false,
				timer: null,
				num: 60,
				show: true
			}
		},
		methods: {
			...userActions(['getCode', 'getregister']),
			user(e) { //用户名
				if (e === 0) {
					this.username ? this.userflag = false : this.userflag = true
				} else if (e === 1) {
					if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this
						.mobile)) {
						this.mobileflag = true
					} else {
						this.mobileflag = false
					}
				} else if (e === 2) {
					this.code ? this.codeflag = false : this.codeflag = true
				} else {
					this.passwordflag ? this.passwordflag = false : this.passwordflag = true
				}
			},
			register() { //点击注册
				if (this.username && this.mobile && this.code && this.password) { //吧
					if (!this.check1) {
						uni.showToast({
							title: '请您同意用户条款',
							icon: 'none'
						})
					} else {
						this.flag = true
						this.getregister({
							mobile:this.mobile,
							code:this.code,
							username:this.username,
							password:this.password,
						})
					}
				}
				// else{
				// 	uni.showToast({title:'表单填写有误,请检查',icon:'none'})
				// }
			},
			getcode() {
				if (this.mobile && !this.mobileflag) { //电话有值，并且验证成功
					if(this.num===60){
						console.log(this.mobile);
						this.getCode({
							mobile: this.mobile
						})
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
				
			
				} else {
					this.mobileflag = true
				}
			}
		},
		mounted() {},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...userState([])
		},
		watch: {
			show(val){
				if(val===true){
					this.num===60
					console.log(this.num);
					console.log(true);
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.top {
		/* #ifdef MP-WEIXIN */
		padding-top: 30rpx;
		/* #endif */
	}

	.title {
		color: #0B84FF;
		padding: 10rpx 30rpx;
	}

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

	.register {
		background-color: #B5DAFF;
		color: #FFFFFF;
	}

	.corve {
		margin: 60rpx;
	}

	.border {
		border: 2px solid #F44336;
	}

	.border2 {
		border: 2px solid #0B84FF;
	}

	.back {
		background-color: #0B84FF;
	}

	.show {
		color: #0B84FF;
	}
</style>
