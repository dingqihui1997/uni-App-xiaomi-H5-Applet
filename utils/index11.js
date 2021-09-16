import uniqBy from "lodash/uniqBy"
import api from '../http/api.js'
// #ifdef H5
const key = '14770ab01180fa356de0e1185d024e9d'
import AMapLoader from '@amap/amap-jsapi-loader'
// #endif

// #ifdef MP-WEIXIN
const amapFile = require('../lib/amap-wx.js')
const key = '451ae6365c3cbea29efbda77a38db279'
const myAmapFun = new amapFile.AMapWX({
  key
})
// #endif


export default {
  // 保存数据到本地
  saveStorage(key, val, name) {
    let list = uni.getStorageSync(key)
    if (list) {
      let arr = []
      list.push(val)
      arr = uniqBy(list, name)
      uni.setStorageSync(key, arr)
    } else {
      let arr = []
      arr.push(val)
      uni.setStorageSync(key, arr)
    }
  },
  wechatLogin() {
    uni.getUserProfile({
      desc: '小米商场正在获取您的微信信息',
      success: (info) => {
        uni.login({
          provider: 'weixin',
          success: (res) => {
            if (res.code) {
              api.wechatLogin({
                code: res.code
              }).then(r => {
                if (r.code === 200) {
                  let user = {
                    ...info.userInfo,
                    openid: r.data.openid
                  }
                  uni.setStorageSync('xiaomiUser', user)
                  uni.setStorageSync('token', r.data.token)
                  uni.showToast({
                    title: r.msg
                  })
                }
              })
            }
          }
        })
      },
      fail: (err) => {
        uni.showToast({
          title: '您拒绝了授权',
          icon: 'none'
        })
      }
    })
  },
  checkLogin(item, next) {
    let user = uni.getStorageSync('xiaomiUser')
    if (user) {
      next(item)
    } else {
      uni.showModal({
        title: '系统检测到您暂时没登录,无法进行操作',
        content: '现在去登录?',
        confirmColor: '#ff6700',
        success: (res) => {
          if (res.confirm) {
            // #ifdef H5
            uni.navigateTo({
              url: '/pages/login/login'
            })
            // #endif
            // #ifdef MP-WEIXIN
            this.wechatLogin()
            // #endif
          } else {
            uni.showToast({
              title: '您取消了操作',
              icon: 'none'
            })
          }
        }
      })
    }
  },
  getLocation() {
    // #ifdef H5
    return new Promise((resovle, reject) => {
      AMapLoader.load({
          key,
          version: '1.4.15',
          Loca: {
            // 是否加载 Loca， 缺省不加载
            version: '1.3.2' // Loca 版本，缺省 1.3.2
          }
        })
        .then(AMap => {
          this.map = new AMap.Map('container')

          return this.map.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
              // 是否使用高精度定位，默认：true
              enableHighAccuracy: true,
              // 设置定位超时时间，默认：无穷大
              timeout: 10000,
              // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
              buttonOffset: new AMap.Pixel(10, 20),
              //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
              zoomToAccuracy: true,
              //  定位按钮的排放位置,  RB表示右下
              buttonPosition: 'RB'
            })

            geolocation.getCurrentPosition(function(status, result) {
              if (status == 'complete') {
                onComplete(result)
              } else {
                onError(result)
              }
            })

            function onComplete(data) {
              // data是具体的定位信息
              resovle({
                code: 200,
                msg: '定位成功',
                data
              })
              // console.log(data)
            }

            function onError(data) {
              // 定位出错
              reject({
                code: 500,
                msg: '定位失败',
                data
              })
            }
          })
        })
        .catch(e => {
          console.log(e)
        })
    })
    // #endif
    // #ifdef MP-WEIXIN
    return new Promise((resovle, reject) => {
      myAmapFun.getRegeo({
        success: data => {
          //成功回调
          resovle({
            code: 200,
            msg: '定位成功',
            data
          })
          // console.log(data)
        },
        fail: info => {
          //失败回调
          reject({
            code: 500,
            msg: '定位失败',
            info
          })
          console.log(info)
        }
      })
    })
    // #endif
  }
}

// 如果调用一个方法 想如果成功进入then 失败进入catch
// 不能处理失败的
// 高德地图api
// getLocation().then(res =>{}).catch(err => {})

// new Promise传入一个回调函数 回调函数传入两个参数 这两个参数都是函数
// resolve是处理成功的 reject是处理失败的
// return new Promise((resolve, reject) => {
  
// })