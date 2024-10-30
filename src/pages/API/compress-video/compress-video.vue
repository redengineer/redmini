<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-common-mt">
      <form>
        <view class="uni-list">
          <view class="uni-list-cell">
            <view class="uni-list-cell-left">
              <view class="uni-label">压缩质量</view>
            </view>
            <view class="uni-list-cell-right">
              <picker @change="bindPickerChange" header-text="请选择压缩视频质量" :value="qualityIndex" :range="qualityArr"
                range-key="value">
                <view class="uni-input">{{
      qualityArr[qualityIndex].value
    }}</view>
              </picker>
            </view>
          </view>

          <view class="uni-list-cell">
            <view class="uni-list-cell-left">
              <view class="uni-label">比特率</view>
            </view>
            <view class="uni-list-cell-right">
              <input class="uni-input" v-model="bitrate" type="number" placeholder="码率，单位 kbps" />
            </view>
          </view>

          <view class="uni-list-cell">
            <view class="uni-list-cell-left">
              <view class="uni-label">FPS</view>
            </view>
            <view class="uni-list-cell-right">
              <input class="uni-input" v-model="fps" type="number" placeholder="帧率" />
            </view>
          </view>

          <view class="uni-list-cell">
            <view class="uni-list-cell-left">
              <view class="uni-label">分辨率</view>
            </view>
            <view class="uni-list-cell-right">
              <input class="uni-input" v-model="resolution" placeholder="取值范围(0, 1]相对于原视频的分辨率比例" type="number" />
            </view>
          </view>
        </view>
      </form>
      <button @tap="onChoose">选择并压缩视频</button>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title: 'compressVideo',
      qualityArr: [
        {
          value: '不传',
        },
        {
          value: 'low',
        },
        {
          value: 'medium',
        },
        {
          value: 'high',
        },
      ],
      qualityIndex: 1,
      bitrate: undefined,
      fps: undefined,
      resolution: undefined,
    }
  },
  methods: {
    bindPickerChange: function (e) {
      this.qualityIndex = e.detail.value
    },
    onChoose: function () {
      uni.chooseMedia({
        count: 1,
        sizeType: ['original'],
        sourceType: ['camera', 'album'],
        mediaType: ['video'],
        success: (res) => {
          const originalSize = res.tempFiles[0].size
          const originalPath = res.tempFiles[0].tempFilePath

          console.log('src ==>', originalPath)
          console.log('quality ==>', this.qualityArr[this.qualityIndex].value)
          console.log('bitrate ==>', parseInt(this.bitrate, 10))
          console.log('fps ==>', parseInt(this.fps, 10))
          console.log('resolution ==>', parseFloat(this.resolution, 10))

          uni.compressVideo({
            src: originalPath,
            quality:
              this.qualityArr[this.qualityIndex].value !== '不传'
                ? this.qualityArr[this.qualityIndex].value
                : undefined,
            bitrate: parseInt(this.bitrate, 10),
            fps: parseInt(this.fps, 10),
            resolution: parseFloat(this.resolution, 10),
            success(res) {
              uni.showModal({
                title: `压缩成功, 压缩后的size: ${res.size}kB, 原来的size: ${originalSize / 1024
                }kB`,
              })
              console.log('compressVideo success', res)
              console.log(`压缩成功, 压缩后的size: ${res.size}kB, 原来的size: ${originalSize / 1024
              }kB`)
            },
            fail(res) {
              console.log('压缩视频失败', res)
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
