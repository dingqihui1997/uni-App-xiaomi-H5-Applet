import fly from "../../http/api.js"
import Vue from "vue"
export default {
	// 命名空间
	namespaced: true,
	state: {
		list: [],
		Address:[]
	},
	mutations: {
		setBanner(state, data) {
			state.list = data
		},
		setAddress(state, data) {
			state.Address = data
		},
	},
	// 发异步请求的
	actions: {
		// async await
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
		async getCode({ //获取验证码
			commit
		}, params) {
			try {
				let res = await fly.getCode(params)
				console.log(res);
				if (res.code === 200) {
					console.log(res);
					// commit('setBanner', res.data)			
				}
			} catch (err) {
				console.log(err)
			}
		},
		async getregister({ //注册
			commit
		}, params) {
			try {
				let res = await fly.register(params)
				console.log(res);
				if (res.code === 200) {
					console.log(res);
					uni.navigateTo({
						url: "/pages/signIn/signIn"
					})
				}
			} catch (err) {
				console.log(err)
			}
		},
		async userLogin({ //用户名登录
			commit
		}, params) {
			try {
				let res = await fly.userLogin(params)
				console.log(res);
				uni.showToast({
					title: res.msg,
					icon: 'none'
				})
				if (res.code === 200) {
					let a = uni.getStorageSync('cart')
					if (a) {
						uni.switchTab({
							url:"/pages/cart/cart"
						})
					} else {
						uni.switchTab({
							url: "/pages/home/home"
						})
					}
					uni.setStorageSync('token', res.token)
					uni.setStorageSync('userInfo', res.data)
					uni.removeStorageSync('cart')
				}
			} catch (err) {
				console.log(err)
			}
		},
		async mobileLogin({ //验证码登录
			commit
		}, params) {
			try {
				let res = await fly.mobileLogin(params)
				console.log(res);
				uni.showToast({
					title: res.msg,
					icon: 'none'
				})
				if (res.code === 200) {
					let a = uni.getStorageSync('cart')
					if (a) {
						uni.switchTab({
							url:"/pages/cart/cart"
						})
					} else {
						uni.switchTab({
							url: "/pages/home/home"
						})
					}
					uni.setStorageSync('token', res.token)
					uni.setStorageSync('userInfo', res.data)
					uni.removeStorageSync('cart')
				}
			} catch (err) {
				console.log(err)
			}
		},
		async addAddress({ //添加地址
			commit,dispatch
		}, params) {
			try {
				let res = await fly.addAddress(params)
				if (res.code === 200) {
					uni.showToast({
						title:'新增成功'
					})
					dispatch('getAppAddress',uni.getStorageSync('userInfo')._id)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async getAppAddress({ //获取用户地址
			commit
		}, params) {
			try {
				let res = await fly.getAppAddress(params)
				if (res.code === 200) {
					res.data.map(item=>{
					item.address=	item.address.split(',')
					Vue.set(item,'addresslist',item.address)
					})
				commit('setAddress', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async delAddress({ //删除用户地址
			commit
		}, params) {
			try {
				let res = await fly.delAddress(params)
				console.log(res);
				if (res.code === 200) {
				// commit('setAddress', res.data)
				uni.showToast({
					title:'删除成功'
				})
				uni.navigateTo({
					url:"/pages/addresslist/addresslist"
				})
				}
			} catch (err) {
				console.log(err)
			}
		},
		async updateAddress({ //修改用户地址
			commit
		}, params) {
			try {
				let res = await fly.updateAddress(params)
				// console.log(res);
				if (res.code === 200) {
				// commit('setAddress', res.data)
				uni.showToast({
					title:'删除成功'
				})
				uni.navigateTo({
					url:"/pages/addresslist/addresslist"
				})
				}
			} catch (err) {
				console.log(err)
			}
		},
		async addOrder({ //添加订单
			commit
		}, params) {
			try {
				let res = await fly.addOrder(params)
				console.log(res);
				if (res.code === 200) {
				uni.navigateTo({
					url:'/pages/order/order'
				}),
				uni.removeStorageSync('useraddress')
				uni.removeStorageSync('num')
				}
			} catch (err) {
				console.log(err)
			}
		},
		// async login({commit}, params) {
		//   setTimeout(() => {
		//     console.log(params)
		//   }, 2000)
		// }
	},
}
