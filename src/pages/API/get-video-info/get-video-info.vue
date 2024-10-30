<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="demo">
        <block v-if="mediaSrc">
          <video :src="mediaSrc"></video>
        </block>
        <block v-else>
          <view class="uni-hello-addfile" @click="chooseMedia">请选择视频</view>
        </block>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title: 'getVideoInfo',
      mediaSrc: '',
    }
  },
  onUnload() {
    this.imageSrc = ''
  },
  onLoad() {
    // #ifdef MP-XHS
    this.index = 1
    // #endif
  },
  methods: {
    chooseMedia: function () {
      uni.chooseMedia({
        count: 1,
        sizeType: ['compressed', 'original'],
        sourceType: ['album', 'camera'],
        mediaType: ['video'],
        success: (res) => {
          console.log(
            'chooseMedia success, temp path is',
            res.tempFiles[0].tempFilePath
          )
          this.mediaSrc = res.tempFiles[0].tempFilePath

          // 开始获取视频信息
          uni.getVideoInfo({
            src: res.tempFiles[0].tempFilePath,
            success: (res) => {
              console.log('getVideoInfo success', res)
              uni.showModal({
                title: '成功: ' + JSON.stringify(res),
                icon: 'none',
              })
            },
            fail: (err) => {
              console.log('getVideoInfo fail', err)
            },
          })
        },
        fail: (err) => {
          console.log('chooseMedia fail', err)
          // #ifdef MP
          uni.getSetting({
            success: (res) => {
              let authStatus = res.authSetting['scope.album']
              if (!authStatus) {
                uni.showModal({
                  title: '授权失败',
                  content:
                    'Hello uni-app需要从您的相册获取图片，请在设置界面打开相关权限',
                  success: (res) => {
                    if (res.confirm) {
                      uni.openSetting()
                    }
                  },
                })
              }
            },
          })
          // #endif
        },
      })
    },
  },
}
</script>

<style>
.image {
  width: 100%;
}

.demo {
  background: #fff;
  padding: 50rpx;
}
</style>
