// #ifdef APP-PLUS || APP-PLUS-NVUE || MP-WEIXIN
  import Fly from 'flyio/dist/npm/wx'
// #endif

// #ifdef H5
  import Fly from 'flyio/dist/npm/fly'
// #endif

const fly = new Fly

fly.config.baseURL = 'http://localhost:7001'

fly.interceptors.request.use(config => {
  uni.showLoading({
    title: '加载中...'
  })
	let token = uni.getStorageSync('token')
	 if (token) {
	  // headers属性是后端约定的
	  config.headers['Authorization'] = token
	 }
  return config
}, err => {
  uni.hideLoading()
  return Promise.reject(err)
})

fly.interceptors.response.use(res => {
  uni.hideLoading()
	 return res.data
}, err => {
  uni.hideLoading()
  console.log(err)
   let status = err.response && err.response.status
      if (status === 400) {
          uni.showToast({
              title: '参数错误',
              icon: 'error'
          })
      }
      if (status === 401) {
          uni.showToast({
              title: '登录过期',
              icon: 'error'
  
          })
      }
      if (status === 403) {
          uni.showToast({
              title: '没有全选',
              icon: 'error'
  
          })
      }
      if (status === 404) {
          uni.showToast({
              title: '路径错误',
              icon: 'error'
  
          })
      }
      if (status === 500) {
          uni.showToast({
              title: '服务器错误',
              icon: 'error'
  
          })
      }
      if (status === 503) {
          uni.showToast({
              title: '服务器维护',
              icon: 'error'
  
          })
      }
  return Promise.reject(err)
})

export default fly