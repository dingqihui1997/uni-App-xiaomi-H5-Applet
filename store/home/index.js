import fly from "../../http/api.js"
export default {
  // 命名空间
  namespaced: true,
  state: {
    list: [],
		Nav:[],
		news:[],
		recommend:[],
		goods:[],
		category:[]
  },
  mutations: {
    setBanner(state, data) {
      state.list = data
    },
		setNav(state, data){
			state.Nav = data
		},
		setNew(state, data){
			state.news = data
		},
		setRecommend(state, data){
			state.recommend = data
		},
		setGoods(state, data){
			state.goods = data
		},
		setCategory(state, data){
			state.category = data
		}
  },
  // 发异步请求的
  actions: {
    // async await
    // 异步操作同步化: 用一个变量接收请求的结果
    // 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
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
		async getNav({//获取新品
		  commit
		}) {
		  try {
		    let res = await fly.getNav()
		    if (res.code===200) {
					// console.log(res);
		      commit('setNav', res.data)
		    }
		  } catch (err) {
		    console.log(err)
		  }
		}, 
		async getNew({//获取新品
		  commit
		}) {
		  try {
		    let res = await fly.getNew()
		    if (res.code===200) {
			let arr=res.data.slice(0,3)
					// console.log(res);
		      commit('setNew', arr)
		    }
		  } catch (err) {
		    console.log(err)
		  }
		}, 
		async getReco({//获取推荐导航
		  commit
		}) {
		  try {
		    let res = await fly.getRecommendNav()
		    if (res.code===200) {
			// console.log(res);
		      commit('setRecommend', res.data)
		    }
		  } catch (err) {
		    console.log(err)
		  }
		}, 
		async getNavGoods({//获取推荐商品
		  commit
		},params) {
		  try {
		    let res = await fly.getNavGoods(params)
		    if (res.code===200) {
			// console.log(res);
		      commit('setGoods', res.data)
		    }
		  } catch (err) {
		    console.log(err)
		  }
		}, 
		async getCategory({//获取分类
		  commit
		}) {
		  try {
		    let res = await fly.getCategory()
		    if (res.code===200) {
		      commit('setCategory', res.data)
					// console.log(res.data);
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
