<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-title uni-common-pl"
      >输入区域高度自适应，不会出现滚动条</view
    >
    <view class="uni-textarea">
      <textarea
        @input="inputEvent"
        @change="changeEvent"
        @blur="bindTextAreaBlur"
        @linechange="lineChangeEvent"
        auto-height
        :value="value2"
      />
    </view>
    <view class="uni-title uni-common-pl">占位符字体是红色的textarea</view>
    <view class="uni-textarea">
      <textarea
        :value="value"
        @input="bindinput"
        placeholder-style="color:#F76260"
        placeholder="占位符字体是红色的"
      />
    </view>
    <button @tap="bindtap">点击复制文本</button>
    <button @tap="setValue">点击写入textarea</button>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title: 'textarea',
      focus: false,
      value: '',
      value2: '',
    }
  },
  methods: {
    bindTextAreaBlur: function (e) {
      console.log(e.detail.value)
    },
    setValue() {
      uni.getClipboardData({
        success: (res) => {
          this.value2 = res.data
        },
      })
    },
    lineChangeEvent(e) {
      console.log('lineChangeEvent', e)
    },
    bindinput(e) {
      this.value = e.detail.value
    },
    inputEvent(e) {
      this.value2 = e.detail.value
    },
    bindtap() {
      uni.setClipboardData({
        data: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis corporis cupiditate libero nostrum. A perspiciatis explicabo itaque eaque quaerat ipsa quam sint. Expedita quidem accusamus illo iure mollitia necessitatibus odit!',
        success: function () {
          uni.getClipboardData({
            success: function (res) {
              console.log(res.data) // data
            },
          })
        },
      })
    },
  },
}
</script>

<style></style>
