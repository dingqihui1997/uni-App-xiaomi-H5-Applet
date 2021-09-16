import fly from "../../http/api.js"
import Vue from "vue"
export default {
	// 命名空间
	namespaced: true,
	state: {
		goods: {},
		coupon:[],
		recom:[],
		Banner:[],
		allgoods:[],
		search:[],
		cartlist:[],
		cartnum:0,
	},
	mutations: {
		setGoods(state, data) {
			state.goods = data
		},
		setCoupon(state, data) {
			state.coupon = data
		},
		setRecommend(state, data) {
			state.recom = data
		},
		setBanner(state, data) {
		  state.Banner = data
		},
		setallgoods(state, data) {
		  state.allgoods = data
		},
		setsearch(state, data){
		  state.search = data
		},
		setcartlist(state, data){
		  state.cartlist = data
		},
		setCartnum(state, data){
			state.cartnum = data
		}
	},
	// 发异步请求的
	actions: {
		// async await
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
		async getGoods({ //获取推荐商品详情
			commit
		}, params) {
			try {
				let res = await fly.goodsDetail(params)
				if (res.code === 200) {
					let arr=[]
				res.data.spec.map(item=>{
				Vue.set(item,'showflag',0)
				arr.push({name:item.name,checked:item.checkList[0]})
				})
				Vue.set(res.data,'sku',arr)
					commit('setGoods', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async getCoupon({ //获取优惠券
			commit
		}, params) {
			try {
				let res = await fly.getCoupon()
				if (res.code === 200) {
					// console.log(res);
					commit('setCoupon', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async getRecommend1({ //获取推荐
			commit
		}, params) {
			try {
				let res = await fly.getRecommend()
				if (res.code === 200) {
					// console.log(res);
					commit('setRecommend', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async getBanner({//获取轮播图
		  commit
		}) {
		  try {
		    let res = await fly.getBanner()
		    if (res.code===200) {
					// console.log(res);
					res.data.map((item,index)=>{
						item.image=item.url
					})
		      commit('setBanner', res.data)		
		    }
		  } catch (err) {
		    console.log(err)
		  }
		},
		async getallGoods({//获取全部商品
		  commit
		}) {
		  try {
		    let res = await fly.getGoods()
		    if (res.code===200) {
					// console.log(res);
					res.data.unshift({name:'全部商品'})
		      commit('setallgoods', res.data)	
		    }
		  } catch (err) {
		    console.log(err)
		  }
		},
		async getsearch({//获取搜索
		  commit
		},params) {
		  try {
		    let res = await fly.search(params)
		    if (res.code===200) {
					console.log(res);
		      commit('setsearch', res.data)	
		    }
		  } catch (err) {
		    console.log(err)
		  }
		},
		async addCart({//添加商品
		  commit,dispatch
		},params) {
		  try {
		    let res = await fly.addCart(params)
		    if (res.code===200) {
					dispatch('getCart',uni.getStorageSync('userInfo')._id)
					uni.showToast({
						title:'加入购物车成功'
					})
		    }
		  } catch (err) {
		    console.log(err)
		  }
		},
		async getCart({//获取购物车商品 
		  commit,dispatch
		},params) {
		  try {
		    let res = await fly.getCart(params)
		    if (res.code===200) {
					res.data.map(item=>{
						Vue.set(item,'checked',false)
						Vue.set(item,'delchecked',false)
					})
					
		      commit('setcartlist', res.data)	
					commit('setCartnum', res.total)	
		    }
		  } catch (err) {
		    console.log(err)
		  }
		},
		async updateCart({//修改购物车数量
		  commit
		},params) {
		  try {
		    let res = await fly.updateCart(params)
		    if (res.code===200) {
					uni.showToast({
						title:res.msg
					})
		    }
		  } catch (err) {
		    console.log(err)
		  }
		},
		async delCart({//修改购物车数量
		  commit
		},params) {
		  try {
		    let res = await fly.delCart(params)
				console.log(res);
		    if (res.code===200) {
		    }
		  } catch (err) {
		    console.log(err)
		  }
		},
	},
}
