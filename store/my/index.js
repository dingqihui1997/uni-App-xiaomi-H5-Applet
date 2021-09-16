import fly from "../../http/api.js"
import Vue from "vue"
import dayjs from 'dayjs'
export default {
	// 命名空间
	namespaced: true,
	state: {
		order: [],
		Seckill: [],
		city:[],
		searchCity:{},
		Home:[]
	},
	mutations: {
		setorder(state, data) {
			state.order = data
		},
		setSeckill(state, data) {
			state.Seckill = data
		},
		setcity(state, data){
			state.city = data
		},
		setsearchCity(state, data){
			state.searchCity = data
		},
		setHome(state, data){
			state.Home = data
		}
	},
	// 发异步请求的
	actions: {
		// async await
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数

		async getAppOrder({ //获取订单
			commit
		}, params) {
			try {
				let res = await fly.getAppOrder(params)
				if (res.code === 200) {
					res.data.map(item => {
						item.pay_time = dayjs(item.pay_time).format(`YYYY-MM-DD HH:mm:ss`)
					})
					console.log(res.data);
					commit('setorder', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async createComment({ //获取订单
			commit
		}, params) {
			try {
				let res = await fly.createComment(params)
				if (res.code === 200) {
					uni.showToast({
						title: "评论成功"
					})
					uni.navigateTo({
						url: "/pages/order/order"
					})
				}
			} catch (err) {
				console.log(err)
			}
		},
		async getSeckill({ //获取m秒杀订单
			commit
		}, params) {
			try {
				let res = await fly.getSeckill()
				if (res.code === 200) {
					res.data.shift()
					let time = (new Date(new Date().toLocaleDateString())).valueOf()
					let endtime = dayjs().endOf('day').valueOf()
					let arr = res.data.filter((item,index) => {
						return (dayjs(item.start_time).valueOf() > time && dayjs(item.start_time)
							.valueOf() < endtime) || (dayjs(item.end_time).valueOf() > time && dayjs(
							item.start_time).valueOf() < time)
					})
					commit('setSeckill', arr)
					console.log(arr);
				}
			} catch (err) {
				console.log(err)
			}
		},
		async getAreaList({ //获取城市
			commit
		}, params) {
			try {
				let res = await fly.getAreaList()
				if (res.code === 200) {
				// console.log(res.data);
					commit('setcity', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
	async searchAreaList({ //获取搜索城市
			commit
		}, params) {
			try {
				let res = await fly.searchAreaList(params)
				if (res.code === 200) {
					commit('setsearchCity', res.data.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async getStoreHome({ //获取小米之家
				commit
			}, params) {
				try {
					let res = await fly.getStoreHome(params)
					if (res.code === 200) {
						// console.log(res);
						// console.log(res.data.data.store_type_list)
						commit('setHome', res.data.data.store_type_list)
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
