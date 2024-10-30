<script lang="ts" setup>
import { onShareAppMessage, onShareTimeline, onShareChat } from '@dcloudio/uni-app'
import { ref } from 'vue'
const title = ref('媒体选择 - chooseMedia')

const maxDuration = ref(60)

const mediaTypeIndex = ref(2)
const mediaType = [['image'], ['video'], ['image', 'video'], ['mix']]

const countIndex = ref(8)
const count = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const sourceTypeIndex = ref(2)
const sourceType = [['album'], ['camera'], ['album', 'camera']]

const sizeTypeIndex = ref(2)
const sizeType = [['compressed'], ['original'], ['compressed', 'original']]

const cameraIndex = ref(0)
const camera = ['back', 'front'] as const

const mediaTypeChange = (e) => {
  mediaTypeIndex.value = e.detail.value
}

const countChange = (e) => {
  countIndex.value = e.detail.value
}

const sourceTypeChange = (e) => {
  sourceTypeIndex.value = e.detail.value
}

const sizeTypeChange = (e) => {
  sizeTypeIndex.value = e.detail.value
}

const cameraChange = (e) => {
  cameraIndex.value = e.detail.value
}

const previewImage = (index) => {
  uni.previewImage({
    urls: mediaList.value.map((item) =>
      item.fileType === 'image' ? item.tempFilePath : item.thumbTempFilePath
    ),
    current: index,
  })
}

const mediaList = ref<Array<UniNamespace.MediaFile>>([])

const handleDelete = (index) => {
  mediaList.value.splice(index, 1)
}

const chooseMedia = () => {

  console.log('chooseMedia', {
    mediaType: mediaType[mediaTypeIndex.value],
    count: count[countIndex.value],
    sourceType: sourceType[sourceTypeIndex.value],
    sizeType: sizeType[sizeTypeIndex.value],
    maxDuration: typeof maxDuration.value === 'string' ? parseInt(maxDuration.value) : maxDuration.value,
    camera: camera[cameraIndex.value],
  })

  uni.chooseMedia({
    // @ts-ignore
    mediaType: mediaType[mediaTypeIndex.value],
    count: count[countIndex.value],
    // @ts-ignore
    sourceType: sourceType[sourceTypeIndex.value],
    sizeType: sizeType[sizeTypeIndex.value],
    maxDuration: typeof maxDuration.value === 'string' ? parseInt(maxDuration.value) : maxDuration.value,
    camera: camera[cameraIndex.value],
    success: (res) => {
      mediaList.value = [...mediaList.value, ...res.tempFiles]
      console.log('chooseMedia success', res)
    },
  })
}

onShareAppMessage(({ from, target }) => {
  return {
    title: '媒体选择',
    path: '/pages/API/choose-media/choose-media',
  }
})

onShareTimeline(() => {
  return {
    title: '媒体选择',
    path: '/pages/API/choose-media/choose-media',
  }
})

onShareChat(({ from, target }) => {
  return {
    title: '媒体选择',
    path: '/pages/API/choose-media/choose-media',
  }
})
</script>

<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-common-mt">
      <form>
        <view class="uni-list">
          <view class="uni-list-cell">
            <view class="uni-list-cell-left">
              <view class="uni-label">媒体类型</view>
            </view>
            <view class="uni-list-cell-right">
              <picker :range="['只选图片', '只选视频', '图片或视频', '混合选择']" @change="mediaTypeChange" :value="mediaTypeIndex"
                mode="selector">
                <view class="uni-input">{{
                  ["只选图片", "只选视频", "图片或视频", "混合选择"][
                  mediaTypeIndex
                  ]
                }}</view>
              </picker>
            </view>
          </view>

          <view class="uni-list-cell">
            <view class="uni-list-cell-left">
              <view class="uni-label">图片来源</view>
            </view>
            <view class="uni-list-cell-right">
              <picker :range="['相册', '相机', '相册or相机']" @change="sourceTypeChange" :value="sourceTypeIndex"
                mode="selector">
                <view class="uni-input">{{
      ["相册", "相机", "相册or相机"][sourceTypeIndex]
    }}</view>
              </picker>
            </view>
          </view>

          <view class="uni-list-cell">
            <view class="uni-list-cell-left">
              <view class="uni-label">图片质量</view>
            </view>
            <view class="uni-list-cell-right">
              <picker :range="['压缩', '原图', '压缩or原图']" @change="sizeTypeChange" :value="sizeTypeIndex" mode="selector">
                <view class="uni-input">{{
      ["压缩", "原图", "压缩or原图"][sizeTypeIndex]
    }}</view>
              </picker>
            </view>
          </view>

          <view class="uni-list-cell">
            <view class="uni-list-cell-left">
              <view class="uni-label">数量限制</view>
            </view>
            <view class="uni-list-cell-right">
              <picker :range="count" @change="countChange" mode="selector">
                <view class="uni-input">{{ count[countIndex] }}</view>
              </picker>
            </view>
          </view>

          <view class="uni-list-cell">
            <view class="uni-list-cell-left">
              <view class="uni-label">最大拍摄长度</view>
            </view>
            <view class="uni-list-cell-right">
              <input class="uni-input" placeholder="3~60s" v-model="maxDuration" />
            </view>
          </view>

          <view>
            <view class="uni-list-cell">
              <view class="uni-list-cell-left">
                <view class="uni-label">使用相机</view>
              </view>
              <view class="uni-list-cell-right">
                <picker :range="['后置相机', '前置相机']" @change="cameraChange" :value="cameraIndex" mode="selector">
                  <view class="uni-input">{{
                    ['后置相机', '前置相机'][cameraIndex]
                  }}</view>
                </picker>
              </view>
            </view>
          </view>
        </view>

        <view class="uni-list list-pd">
          <view class="uni-list-cell cell-pd">
            <view class="uni-uploader">
              <view class="uni-uploader-head">
                <view class="uni-uploader-title">点击可以预览（只支持图片）</view>
                <view class="uni-uploader-info">{{ mediaList.length }}/9</view>
              </view>
              <view class="uni-uploader-body">
                <view class="uni-uploader__files">
                  <block v-for="(media, index) in mediaList" :key="index">
                    <view class="uni-uploader__file" style="position: relative" @tap="previewImage(index)">
                      <image class="uni-uploader__img" :src="media.fileType === 'image'
                        ? media.tempFilePath
                        : media.thumbTempFilePath
                        "></image>
                      <image class="uni-uploader__play" style="height: 18px; width: 18px" src="./assets/play.png"
                        v-if="media.fileType === 'video'">
                      </image>
                      <image class="uni-uploader__close" style="height: 16px; width: 16px" src="./assets/close.png"
                        @tap.stop="handleDelete(index)"></image>
                    </view>
                  </block>
                  <view class="uni-uploader__input-box" v-if="mediaList.length < 9">
                    <view class="uni-uploader__input" @tap="chooseMedia"></view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </form>
    </view>
  </view>
</template>

<style>
.cell-pd {
  padding: 22rpx 30rpx;
}

.list-pd {
  margin-top: 50rpx;
}

.uni-uploader__play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.uni-uploader__close {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}
</style>
