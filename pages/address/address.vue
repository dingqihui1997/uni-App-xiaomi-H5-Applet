<template>
	<view>
		<view class="top">
			<cc-nav-bar leftArrow title="编辑地址" @clickLeft="clickLeft"></cc-nav-bar>
		</view>
		<!-- 编辑 -->
		<cc-address-edit :addressInfo="addressInfo" v-if="Object.keys(addressInfo).length" saveButtonColor="#FF6700"
			@save="save(0,$event)" @delete="del"></cc-address-edit>
		<!-- 新增 -->
		<view v-if="!Object.keys(addressInfo).length">
			<cc-address-edit saveButtonColor="#FF6700" @save="save(1,$event)" :showDelete='false'></cc-address-edit>
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
				user: {},
				addressInfo: {}
			}
		},
		methods: {
			...userActions(["addAddress", 'delAddress']),
			save(num, e) { //保存地址
				let province = e.province + "," + e.city + "," + e.county
					let id=null
					num?id='':id=this.id
					if (e.name && e.tel && e.county && e.addressDetail) { //新增 或编辑
						this.addAddress({
							user_id: this.user._id,
							username: e.name,
							mobile: e.tel,
							address: province,
							detailAddress: e.addressDetail,
							isDefault: e.isDefault,
							id:id
						})
						uni.navigateBack({})
					}
			},
			clickLeft() {
				uni.navigateBack({})
			},
			del(e) { //删除地址
				console.log(e);
				this.delAddress({
					addressId: this.id,
					user_id: e.user_id
				})
			}
		},
		mounted() {
			this.user = uni.getStorageSync('userInfo')
		},
		onLoad(e) {
			if (Object.keys(e).length > 0) {//获取编辑地址信息
				this.addressInfo = JSON.parse(e.address)
				this.id = this.addressInfo.id
				this.addressInfo.province = this.addressInfo.addresslist[0]
				this.addressInfo.city = this.addressInfo.addresslist[1]
				this.addressInfo.county = this.addressInfo.addresslist[2]
				this.addressInfo.addressDetail = this.addressInfo.detailAddress
			}
		},
		onShow() {
		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.top {
		/* #ifdef MP-WEIXIN */
		padding-top: 20rpx;
		/* #endif */
	}
</style>
