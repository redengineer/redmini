<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-common-mt">
      <form>
        <view class="uni-list">
          <view class="uni-list-cell">
            <view class="uni-list-cell-left">
              <view class="uni-label">质量调节</view>
            </view>
            <view class="uni-list-cell-right">
              <slider
                class="uni-input"
                :value="quality"
                @change="qualityChange"
                show-value
                max="100"
                min="0"
              ></slider>
            </view>
          </view>

          <view class="uni-list-cell">
            <view class="uni-list-cell-left">
              <view class="uni-label">压缩宽度</view>
            </view>
            <view class="uni-list-cell-right">
              <input
                class="uni-input"
                placeholder="请输入..."
                type="number"
                :value="compressedWidth"
                @change="compressedWidthChange"
              />
            </view>
          </view>

          <view class="uni-list-cell">
            <view class="uni-list-cell-left">
              <view class="uni-label">压缩高度</view>
            </view>
            <view class="uni-list-cell-right">
              <input
                class="uni-input"
                placeholder="请输入..."
                type="number"
                :value="compressedHeight"
                @change="compressedHeightChange"
              />
            </view>
          </view>
        </view>
        <view class="uni-list-cell uni-list-cell-switch">
          <view class="uni-list-cell-left">
            <view class="uni-label">选择图片</view>
          </view>
          <view class="uni-list-cell-right">
            <button class="uni-btn" @click="onChooseImage">选择图片</button>
          </view>
        </view>
        <view class="uni-list-cell uni-list-cell-switch">
          <view class="uni-list-cell-left">
            <view class="uni-label">原图大小</view>
          </view>
          <view class="uni-list-cell-right">
            <view class="uni-input">{{
              originalSize === undefined ? "请选择图片" : `${originalSize} 字节`
            }}</view>
          </view>
        </view>
        <view class="uni-list-cell uni-list-cell-switch">
          <view class="uni-list-cell-left">
            <view class="uni-label">压缩后大小</view>
          </view>
          <view class="uni-list-cell-right">
            <view class="uni-input">{{
              compressedSize === undefined
                ? "请选择图片"
                : `${compressedSize} 字节`
            }}</view>
          </view>
        </view>

        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            <view class="uni-label">原图展示</view>
          </view>
          <view class="uni-list-cell-right">
            <image style="width: 100%;" v-if="tempOriginalPath" :src="tempOriginalPath"></image>
            <view class="uni-input" v-else>请选择图片</view>
          </view>
        </view>
        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            <view class="uni-label">压缩展示</view>
          </view>
          <view class="uni-list-cell-right">
            <image style="width: 100%;" v-if="tempCompressedPath" :src="tempCompressedPath"></image>
            <view class="uni-input" v-else>请选择图片</view>
          </view>
        </view>
      </form>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title: 'compressImage',
      quality: 80,
      compressedWidth: undefined,
      compressedHeight: undefined,
      originalSize: undefined,
      compressedSize: undefined,
      tempOriginalPath: '',
      tempCompressedPath: '',
    }
  },
  methods: {
    qualityChange: function (e) {
      this.quality = e.detail.value
    },
    compressedWidthChange: function (e) {
      this.compressedWidth = e.detail.value
    },
    compressedHeightChange: function (e) {
      this.compressedHeight = e.detail.value
    },
    onChooseImage: function () {
      uni.chooseMedia({
        count: 1,
        sizeType: ['original'],
        sourceType: ['camera', 'album'],
        mediaType: ['image'],
        success: (res) => {
          this.originalSize = res.tempFiles[0].size
          // 原图路径
          const tempFilePath = res.tempFiles[0].tempFilePath
          this.tempOriginalPath = tempFilePath
          uni.compressImage({
            src: tempFilePath,
            quality: this.quality,
            compressedWidth: parseInt(this.compressedWidth, 10),
            compressedHeight: parseInt(this.compressedHeight, 10),
            success: (res) => {
              console.log('%c Line:147 🥒 res', 'color:#4fff4B', res)
              console.log('压缩成功, 临时路径 ==> ', res.tempFilePath)
              // 压缩后路径
              this.tempCompressedPath = res.tempFilePath
              // size赋值
              this.compressedSize = res.compressedSize
              this.originalSize = res.originalSize
              uni.showToast({
                title: '压缩成功',
                icon: 'none',
              })
            },
          })
        },
      })
    },
  },
}
</script>

<style>
.cell-pd {
  padding: 22rpx 30rpx;
}

.list-pd {
  margin-top: 50rpx;
}
</style>
