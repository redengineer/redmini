<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left"> 当前选择 </view>
        <view class="uni-list-cell-db">
          <picker
            @change="bindPickerChange"
            header-text="请选择上传方式"
            :value="index"
            :range="array"
            range-key="name"
          >
            <view class="uni-input">{{ array[index].name }}</view>
          </picker>
        </view>
      </view>
    </view>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="demo">
        <block v-if="imageSrc">
          <image :src="imageSrc" class="image" mode="widthFix"></image>
        </block>
        <block v-else>
          <view class="uni-hello-addfile" @click="chooseMedia">请选择媒体进行上传</view>
        </block>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title: 'uploadFile',
      imageSrc: '',
      index: 0,
      array: [
        {
          name: '使用uploadFile普通上传',
        },
        // #ifdef MP-XHS
        {
          name: '使用uploadXhsFile分片上传',
        },
        // #endif
      ],
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
    bindPickerChange: function (e) {
      this.index = e.detail.value
    },

    uploadXhsFile() {
      // 内部上传
      xhs.uploadXhsFile({
        filePath: this.imageSrc,
        bizCode: 24,
        scene: 'kratosjr_file',
        success: (res) => {
          console.log('uploadXhsFile success, res is ==>:', res)
          uni.showToast({
            title: '调用uploadXhsFile上传成功',
          })
        },
      })
    },

    chooseMedia: function () {
      uni.chooseMedia({
        count: 1,
        sizeType: ['compressed', 'original'],
        sourceType: ['album', 'camera'],
        mediaType: ['image', 'video'],
        success: (res) => {
          console.log(
            'chooseMedia success, temp path is',
            res.tempFiles[0].tempFilePath
          )
          const imageSrc = res.tempFiles[0].tempFilePath
          if (this.index === 1) {
            this.imageSrc = imageSrc
            this.uploadXhsFile()
            return
          }
          uni.uploadFile({
            url: 'https://unidemo.dcloud.net.cn/upload',
            filePath: imageSrc,
            fileType: 'image',
            name: 'data',
            success: (res) => {
              console.log('uploadImage success, res is:', res)
              uni.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 1000,
              })
              this.imageSrc = imageSrc
            },
            fail: (err) => {
              console.log('uploadImage fail', err)
              uni.showModal({
                content: err.errMsg,
                showCancel: false,
              })
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
