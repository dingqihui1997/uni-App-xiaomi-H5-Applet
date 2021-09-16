<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "styles/common.scss";
	svg{
		width: 120rpx;
		height: 70rpx;
	}
uni-page,html,body,	uni-page-body{
		/* height: 100%; */
	}
	::-webkit-scrollbar{display:none; width:0; height: 0;}
</style>
