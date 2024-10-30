<script lang="ts" setup>
import { ref } from 'vue'
import { onReady } from '@dcloudio/uni-app'

const fontFamily = ref('Montserrat')
const loaded = ref(false)

const drawText = () => {
  const ctx = uni.createCanvasContext('mycanvas')
  ctx.clearRect(0, 0, 300, 300)
  ctx.font = 'normal 20px Montserrat'
  ctx.fillText('Hello World', 10, 50)
  ctx.draw()
}

const loadFontFace = () => {
  uni.loadFontFace({
    family: fontFamily.value,
    source: 'url("https://dsplatweb.oss-cn-chengdu.aliyuncs.com/font/Montserrat-SemiBold.otf")',
    success(res) {
      console.log(res.status)
      loaded.value = true
      drawText()
    },
    fail: function (res) {
      console.log(res)
    },
    complete: function (res) {
      console.log(res.status)
    },
  })
}

const loadGlobalFontFace = () => {
  uni.loadFontFace({
    global: true,
    family: fontFamily.value,
    source: 'url("https://dsplatweb.oss-cn-chengdu.aliyuncs.com/font/Montserrat-SemiBold.otf")',
    success(res) {
      console.log(res.status)
      loaded.value = true
      drawText()
    },
    fail: function (res) {
      console.log(res)
    },
    complete: function (res) {
      console.log(res.status)
    },
  })
}

onReady(() => {
  console.log('load-fontface onReady')
  setTimeout(() => {
    drawText()
  })
})
</script>

<template>
  <view class="container">
    <page-head title="动态加载字体"></page-head>
    <!-- 文本字体 -->
    <uni-section title="文本字体" type="line" padding>
      <view class="example-body">
        <view :class="['page-body-info', 'display-area', 'font-loaded']">
          <text v-if="!loaded">Load {{ fontFamily }}</text>
          <text v-else>{{ fontFamily }} is loaded</text>
        </view>
        <view class="btn-area">
          <button @tap="loadFontFace">
            加载字体(重新进入后失效)
          </button>
          <button class="_ui-button" @tap="loadGlobalFontFace">
            全局加载字体(重新进入后仍然有效)
          </button>
        </view>
      </view>
    </uni-section>
    <!-- canvas字体 -->
    <uni-section title="canvas字体" type="line" padding>
      <view class="example-body">
        <canvas canvas-id="mycanvas"></canvas>
      </view>
    </uni-section>
  </view>
</template>

<style scoped>
.page-body-info {
  align-items: center;
  padding: 100rpx 0;
}

.font-loaded {
  font-family: "Montserrat";
}

.display-area {
  font-size: 40rpx;
  display: flex;
  justify-content: center;
}

.btn-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.btn-area button {
  width: 100%;
}
</style>
