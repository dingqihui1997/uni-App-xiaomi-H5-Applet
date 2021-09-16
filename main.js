import Vue from 'vue'
import App from './App'
import ccUI from 'cc-ui-uni-app'
import api from './http/api.js'
Vue.use(ccUI)
Vue.config.productionTip = false

import store from'./store/index.js'
Vue.prototype.$store=store
import utils from './utils/index.js'
Vue.prototype.$utils = utils

import io from '@hyoga/uni-socket.io';

const socket = io('http://localhost:3000', {
  query: {},
  transports: [ 'websocket', 'polling' ],
  timeout: 5000,
});
Vue.prototype.$socket= socket

App.mpType = 'app'
Vue.prototype.$api = api
const app = new Vue({
    ...App,
		store
})
app.$mount()
