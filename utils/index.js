//模块化导入和导出
// #ifdef H5
const key = '9352d9538034b4891d16b2ff811a3e5e'
import AMapLoader from '@amap/amap-jsapi-loader'
// #endif

// #ifdef MP-WEIXIN
const amapFile = require('../lib/amap-wx.js')
const key = '5d78acec7f66b3417949ead244c7e7db'
const myAmapFun = new amapFile.AMapWX({
	key
})
// #endif

export default {
	// 检测用户是否登录了
	//next函数需要的参数item
	checkLogin({
		key,
		next,
		item
	}) {
		//检测本地是否有登录有没有登录
		let user = uni.getStorageSync(key) //本地储存
		if (user) { //已经登录，继续下一步操作
			next(item)
		} else {
			//没登录提示用户
			//未登录 提示用户是否跳转
			uni.showModal({
				title: '登录后才可使用此功能',
				content: '点击跳转登录/注册',
				success: (res) => {
					if (res.confirm) {
						//跳转到登录页
						uni.navigateTo({
							url: '/pages/signIn/signIn'
						})
					} else {
						// Toast('您取消了操作')
					}
				}
			})
		}
	},
	// 储存记录(浏览记录browse，搜索记录search)
	// key:储存的历史
	// attr:判断元素是否存在的属性名
	saveHistory({
		key,
		data,
		attr
	}) {
		// 如果是其余的数据 判断的属性可能就不叫name了
		// 拼接一个名字
		let name = key + 'History'
		let history = uni.getStorageSync(name)
		if (history) {
			// 之前已经存储过了
			let arr = (uni.getStorageSync(name))
			// 检测数据是否已经存在
			let item = null
			if (typeof data === 'string') {
				item = arr.find(i => {
					return i[attr] === data
				})
			} else {
				item = arr.find(i => {
					return i[attr] === data[attr]
				})
			}
			// 数组当中没有当前数据
			if (!item) {
				if (typeof data === 'string') {
					let obj = {
						[attr]: data
					}
					arr.unshift(obj)
				} else {
					arr.unshift(data)
				}
				uni.setStorageSync(name, arr)
			}
		} else {
			// 第一次存储
			// 把存储的数据都转换成对象
			let arr = []
			if (typeof data === 'string') {
				let obj = {
					name: data
				}
				arr.unshift(obj)
			} else {
				arr.unshift(data)
			}
			uni.setStorageSync(name, arr)
		}
	},
	// 获取存储记录
	getHistory({
		key
	}) {
		let name = key + 'History'
		let arr = uni.getStorageSync(name)
		if (arr) return arr
		else return null
	},

	// 获取微信定位
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

	// H5获取定位
	getLocation(item) {
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
					if (!item) {
						this.map = new AMap.Map('container')
					} else {
						this.map = new AMap.Map('container', {
							'center': [item.position.lng, item.position
								.lat
							],
							zoom: 15
						})
						let temp =
							`<view><image src="http://i8.mifile.cn/v1/a1/87fbaa8d-73a4-247a-acea-dea9fed47099.png" style="width:70px;height:70px"></image></view><view class="font12 nowrap flex-ja web">${item.store_name}<view>`
						let marker = new AMap.Marker({
							position: new AMap.LngLat(item.position
								.lng, item.position.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
							title: item.store_name,
							content: temp
						});
						this.map.add(marker);

					}

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
	// Clearsingle({key,data,attr}){//清除单个收藏
	//  let name = key + 'History'
	//  let arr=uni.getStorageSync(name)
	//  let num=	arr.filter(item=>{
	//  		return item[attr] !== data[attr]
	//  	})
	//  	if(arr.length>0){
	//  		uni.setStorageSync('CollectionHistory',num)
	//  	}else{
	// 		uni.removeStorageSync('CollectionHistory')
	// 	}
	// }
}
