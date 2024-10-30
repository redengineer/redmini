<template>
	<view>
		<web-view :src="url" @message="getMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// url: 'https://uniapp.dcloud.io/static/web-view.html'
				// 先使用小红书的域名
				url: 'https://www.xiaohongshu.com/miniapp/miniapp-webview?fullscreen=true&disableDragBack=yes&disableBackForwardNavigationGestures=true'
			}
		},
		onLoad(options) {
			if (options && options.url) {
				this.url = options.url;
			}
		},
		methods: {
			getMessage(event) {
				console.log("%c Line:23 🍪 event", "color:#e41a6a", event);
				uni.showModal({
					content: JSON.stringify(event.detail),
					showCancel: false
				});
			}
		}
	}
</script>

<style>

</style>
