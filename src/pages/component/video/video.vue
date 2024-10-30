<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap uni-common-mt" v-if="showVideo">
      <view>
        <video id="myVideo" :src="src" poster="https://web-assets.dcloud.net.cn/unidoc/zh/poster.png"
          :danmu-list="danmuList" enable-danmu :controls="controlValue" :show-mute-btn="showMuteBtn"
          :show-fullscreen-btn="showFullscreenBtn" :show-play-btn="showPlayBtn"
          :show-center-play-btn="showCenterPlayBtn" @play="onPlay" @pause="onPause" @ended="onEnded"
          @timeupdate="onTimeupdate" @fullscreenchange="onFullscreenchange" @waiting="onWaiting" @progress="onProgress"
          @loadedmetadata="onLoadedmetadata" @error="videoErrorCallback" @tap="bindtap"></video>
      </view>
      <!-- #ifndef MP-ALIPAY || MP-TOUTIAO || MP-KUAISHOU || MP-LARK || MP-JD-->
      <view class="uni-list uni-common-mt">
        <view class="block">
          <view class="uni-label">视频源格式</view>
          <picker mode="selector" @change="handleChange" :range="srcArr" :value="srcIndex">
            {{ srcArray[srcIndex].name }}
          </picker>
        </view>
        <view class="block">
          <view class="uni-label">视频控制显示</view>
          <switch @change="controlValue = !controlValue" :checked="controlValue"></switch>
        </view>
        <view class="block">
          <view>
            <view class="uni-label">静音按钮显示</view>
          </view>
          <switch @change="showMuteBtn = !showMuteBtn" :checked="showMuteBtn"></switch>
        </view>
        <view class="block">
          <view>
            <view class="uni-label">全屏按钮显示</view>
          </view>
          <switch @change="showFullscreenBtn = !showFullscreenBtn" :checked="showFullscreenBtn"></switch>
        </view>
        <view class="block">
          <view>
            <view class="uni-label">播放按钮显示</view>
          </view>
          <switch @change="showPlayBtn = !showPlayBtn" :checked="showPlayBtn"></switch>
        </view>
        <view class="block">
          <view>
            <view class="uni-label">中央按钮显示</view>
          </view>
          <switch @change="showCenterPlayBtn = !showCenterPlayBtn" :checked="showCenterPlayBtn"></switch>
        </view>
        <view class="uni-list-cell">
          <view>
            <view class="uni-label">弹幕内容</view>
          </view>
          <view class="uni-list-cell-db">
            <input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
          </view>
        </view>
      </view>
      <view class="uni-btn-v">
        <button @click="sendDanmu" class="page-body-button">发送弹幕</button>
      </view>
      <!-- #endif -->
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title: 'video',
      src: '',
      srcIndex: 0,
      srcArray: [
        {
          name: 'mp4',
          src: 'https://fe-video-qc.xhscdn.com/fe-platform/f2102fa0f36aee8027282f43fb0b92d81fb5c5ef.mov_video_mp4_compress',
        },
        {
          name: 'm4v',
          src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v',
        },
        {
          name: 'mov',
          src: 'https://fe-video-qc.xhscdn.com/fe-platform/0fa30b4c1a35af02f4f9ac6b2628f203d886440d/1041035o315bm9nmqgu06adekvpi000000000020r7eehi.mov',
        },
        {
          name: 'm3u8',
          src: 'https://fe-video-qc.xhscdn.com/fe-platform/eef9ac3a054a8bea5482c892120ba693d47c5007.mov_video_m3u8_compress',
        },
        {
          name: '3gp',
          src: 'https://fe-video-qc.xhscdn.com/fe-platform/ebf5d50d0df186f2ddf7c960c2ba1beefe32dc93.3gp?attname=fe-platform/ebf5d50d0df186f2ddf7c960c2ba1beefe32dc93.3gp.3gp',
        },
        {
          name: 'avi',
          src: 'https://fe-video-qc.xhscdn.com/fe-platform/364e8893d31cfcc003cb13f374e1bbb6e5af97c4.avi',
        },
        {
          name: 'webm',
          src: 'https://fe-video-qc.xhscdn.com/fe-platform/cf902534c42a24bfd9350e2bd99234b7b4e2d5d4.webm?attname=fe-platform/cf902534c42a24bfd9350e2bd99234b7b4e2d5d4.webm.webm',
        }
      ],

      danmuList: [
        {
          text: '第 1s 出现的弹幕',
          color: '#ff0000',
          time: 1,
        },
        {
          text: '第 3s 出现的弹幕',
          color: '#ff00ff',
          time: 3,
        },
      ],
      danmuValue: '',
      showVideo: false,
      controlValue: true,
      showMuteBtn: true,
      showFullscreenBtn: true,
      showPlayBtn: true,
      showCenterPlayBtn: true,
    }
  },
  computed: {
    srcArr() {
      return this.srcArray.map(item => item.name)
    }
  },
  onReady: function (res) {
    this.src = this.srcArray[this.srcIndex].src
    // #ifndef MP-ALIPAY || MP-TOUTIAO
    this.videoContext = uni.createVideoContext('myVideo')
    // #endif
    // #ifdef APP-PLUS || MP-BAIDU
    setTimeout(() => {
      this.showVideo = true
    }, 350)
    // #endif
    // #ifndef APP-PLUS || MP-BAIDU
    this.showVideo = true
    // #endif
  },
  methods: {
    sendDanmu: function () {
      this.videoContext.sendDanmu({
        text: this.danmuValue,
        color: this.getRandomColor(),
      })
      this.danmuValue = ''
    },
    handleChange(e) {
      this.srcIndex = e.detail.value
      this.src = this.srcArray[e.detail.value].src
    },
    videoErrorCallback: function (e) {
      console.log('视频错误触发了', e)
      uni.showModal({
        title: '视频错误触发了',
        showCancel: false,
      })
    },
    bindtap(e) {
      console.log('视频被点击了', e)
    },
    getRandomColor: function () {
      const rgb = []
      for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
      }
      return '#' + rgb.join('')
    },
    onEnded(e) {
      console.log('onEnded', e)
      uni.showToast({
        title: '视频播放结束了',
        icon: 'none',
      })
    },
    onPlay(e) {
      console.log('onPlay', e)
      uni.showToast({
        title: '视频播放了',
        icon: 'none',
      })
    },
    onPause(e) {
      console.log('onPause', e)
      uni.showToast({
        title: '视频暂停了',
        icon: 'none',
      })
    },
    onEnd(e) {
      console.log('onEnd', e)
      uni.showToast({
        title: '视频播放结束了',
        icon: 'none',
      })
    },
    onTimeupdate(e) {
      // console.log('onTimeupdate', e)
    },
    onFullscreenchange(e) {
      console.log('onFullscreenchange', e)
      uni.showToast({
        title: '视频全屏切换了',
        icon: 'none',
      })
    },
    onWaiting(e) {
      console.log('onWaiting', e)
    },
    onProgress(e) {
      // console.log('onProgress', e)
    },
    onLoadedmetadata(e) {
      console.log('onLoadedmetadata', e)
    },
  },
}
</script>

<style>
video {
  width: 690rpx;
  width: 100%;
  height: 400px;
}

.block {
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
}
</style>
