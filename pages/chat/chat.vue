<template>
	<view style="height: 100vh; background-color:#F3F3F3;" class="chatboxone">
		<view class="top">
			<cc-nav-bar leftArrow title="客服" background="#01B5FF"></cc-nav-bar>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view style="height: 128rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height: 88rpx;"></view>
		<!-- #endif -->
		<view  class="chatbox1">
			<view  class="mat20" v-for="(item,index) in messageList" :key="index" 
				:id="`chatItem-${index}`">
				<view v-if="item.platform==='app'" class="flex-end ">
					<view class="chatvalue ">{{item.value}}</view>
					<view class="flex-a">
						<image src="../../static/rightsanj.png" class="rightsanj"></image>
					</view>
				</view>
				<view v-if="item.platform!=='app'" class="flex ">
					<view class="flex-a">
						<image src="../../static/leftsan.png" class="leftsanj"></image>
					</view>
					<view class="chatvalue1">{{item.value}}</view>
				</view>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="chat backfff">
			<view class="flex-a ipt">
				<view class="searchchat">
					<cc-field :value.sync="value" round placeholder="请输入内容"></cc-field>
				</view>
				<view>
					<image src="../../static/emoji.png" class="emoji" @click="open"></image>
				</view>
				<view class="send" @click="send">发送</view>
			</view>
			<scroll-view scroll-y="true" style="height: 540rpx;" v-if="show">
				<view class="flex-w ">
					<view v-for="(item,index) in look" :key='index' class="emoji2 flex-ja" @click="click(item)">{{item}}
					</view>
				</view>
			</scroll-view>
		</view>
	</view>

</template>

<script>
	import emoji from '../../lib/emoji.js'
	export default {
		components: {},
		props: {},
		data() {
			return {
				value: '',
				hei: '',
				show: false,
				look: emoji,
				user: {},
				messageList: [],
			}
		},
		methods: {
			open() {
				this.show = !this.show
			},
			click(item) { //
				this.value = this.value + item

			},
			send() { //发送消息
				if (this.value) {
					this.$socket.emit('event', {
						username: this.user.username,
						value: this.value,
						platform: 'app'
					})
					this.value = ''
					this.show = false
				} else {
					uni.showToast({
						title: '不能发送空白消息',
						icon: 'none'
					})
				}
			}
		},
		mounted() {
			this.user = uni.getStorageSync('userInfo')
			// #ifdef H5
			this.hei = "1100rpx"
			// #endif
			// #ifdef MP-WEIXIN
			this.hei = "1050rpx"
			// #endif
			this.$socket.on('broadcast', val => {
				this.messageList.push(val)
				// console.log(this.messageList);
			})
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {
			messageList: {
				handler(val) {
					this.$nextTick(() => {
						let top = 0
						let length = this.messageList.length
						if (length) {
							for (let i = 0; i < length; i++) {
								let chatItem = uni.createSelectorQuery().in(this).select(`#chatItem-${i}`)
									.boundingClientRect(res => {
										top += res.height
										console.log(top);
										uni.pageScrollTo({//页面滚动到目标位置
											scrollTop: top,//距离顶部的位置
											duration: 0
										})
									}).exec()
							}
						}

					})
				},
				deep: true
			}
		},
	}
</script>

<style scoped lang="scss">
	.top {
		/* #ifdef MP-WEIXIN */
		padding-top: 48rpx;
		/* #endif */
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		z-index: 99999;
	}

	.ipt {
		margin-top: 20rpx;
	}

	.chatboxone-search {
		width: 560rpx;
	}

	.emoji {
		width: 55rpx;
		height: 55rpx;
	}

	.send {
		padding: 10rpx 20rpx;
		background-color: #01B5FF;
		border-radius: 20rpx;
		color: #FFFFFF;
		margin-left: 20rpx;
	}

	.emoji2 {
		width: 125rpx;
		height: 90rpx;
		font-size: 28px;
		padding: 10rpx;
		/* #ifdef MP-WEIXIN */
		width: 100rpx;
		/* #endif */
	}

	.chat {
		position: fixed;
		right: 0;
		left: 0;
		bottom: 0;
	}

	.rightsanj {
		width: 30rpx;
		height: 30rpx;
		margin-left: -8rpx;
	}

	.chatvalue {
		margin-top: 10rpx;
		padding: 10rpx 20rpx;
		background-color: #01B5FF;
		border-radius: 20rpx;
		color: #FFFFFF;
		max-width: 700rpx;
		word-wrap: break-word;
	}

	.leftsanj {
		margin-right: -8rpx;
		width: 30rpx;
		height: 30rpx;
	}

	.chatvalue1 {
		margin-top: 10rpx;
		padding: 10rpx 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		max-width: 700rpx;
		word-wrap: break-word;
	}

	.searchchat {
		width: 540rpx;
		height: 70rpx;
	}

	.chatbox1 {
		overflow-y: scroll;
		background-color: #F3F3F3;
	}
</style>
