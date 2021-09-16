<template>
	<view>
		<view class="top">
			<cc-nav-bar leftArrow title="收货地址" @clickLeft="clickLeft"></cc-nav-bar>
		</view>
		<cc-address-list @select="clickitem" v-if="list.length"  :value="chosenAddressId" :list="list" default-tag-text="默认" @add="add"
		@edit="edit"></cc-address-list>
		<view v-if="!list.length">
			<view class="mat20 flex-ja">暂无收货地址，去新增</view>
			<cc-address-list   :value="chosenAddressId" :list="list" default-tag-text="默认" @add="add"></cc-address-list>
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
	import cloneDeep from 'lodash/cloneDeep'
	export default {
		components: {},
		props: {},
		data() {
			return {
				user: {},
				chosenAddressId: '1',
				list: [],
			}
		},
		methods: {
			...userActions(["getAppAddress"]),
			add() { //点击新增
				uni.navigateTo({
					url: '/pages/address/address'
				})
			},
			edit(e){//编辑
				console.log(e);
				uni.navigateTo({
					url:`/pages/address/address?address=${JSON.stringify(e.item)}`
				})
			},
			clickLeft(){
				uni.navigateBack({})
			},
			clickitem(item){//点击地址
			if(uni.getStorageSync('num')){
				uni.setStorageSync('useraddress',item.item)
				uni.navigateTo({
					url:'/pages/payment/payment'
				})
			}
			}
		},
		mounted() {
		},
		onLoad() {

		},
		onShow() {
			this.user = uni.getStorageSync('userInfo')
			this.getAppAddress(this.user._id)
		},
		filters: {},
		computed: {
			...userState(['Address'])
		},
		watch: {
			Address(val) {
				if (val)
					this.list = cloneDeep(val)
				this.list.map(item => {
					// this.$set(item,'addresslist',item.address)
					this.$set(item, 'address', item.address.join('') + item.detailAddress)
					this.$set(item, 'name', item.username)
					this.$set(item, 'tel', item.mobile)
					if(item.isDefault===true){
						this.chosenAddressId=item.id
					}
				})
				// console.log(this.list);
			}
		},
	}
</script>

<style scoped lang="scss">
.top{
	/* #ifdef MP-WEIXIN */
	padding-top: 40rpx;
	/* #endif */
}
</style>
