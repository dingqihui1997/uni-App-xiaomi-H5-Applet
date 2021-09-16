import Vue from "vue"
import Vuex from 'vuex'
import home from './home/index.js'
import goods from './goods/index.js'
import user from './user/index.js'
import my from './my/index.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    
  },
  actions: {
    
  },
  // 模块化
  modules: {
    home,
		goods,
		user,
		my
  }
})