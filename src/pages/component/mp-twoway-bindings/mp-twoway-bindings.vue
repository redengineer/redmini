<script lang="ts" setup>
import { ref, watch } from 'vue'
import uniEasyinput from '../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue'

const title = ref('测试双向绑定')
const placeholder = ref('我是placeholder')
const isFocus = ref(false)

const val = ref('')

const changePlaceholder = () => {
  placeholder.value =
    placeholder.value === '我是改变后的placeholder'
      ? '我是placeholder'
      : '我是改变后的placeholder'
}

const changeFocus = () => {
  isFocus.value = !isFocus.value
}

watch(val, (newVal) => {
  console.log('page的输入框的值改变了 ==>', newVal)
  uni.showToast({
    title: 'page的输入框的值改变了',
    icon: 'none',
  })
})

watch(placeholder, (newVal) => {
  console.log('page输入框的placeholder改变了 ==>', newVal)
  uni.showToast({
    title: 'page输入框的placeholder改变了',
    icon: 'none',
  })
})
</script>

<template>
  <view>
    <page-head :title="title"></page-head>
    <uni-section class="mb-10" title="自定义input" type="line"></uni-section>
    <view class="px-10">
      <uni-easyinput v-model="val" :placeholder="placeholder"></uni-easyinput>
    </view>
    <uni-section class="mb-10" title="自定义textarea" type="line"></uni-section>
    <view class="px-10">
      <uni-easyinput
        placeholder-style="color: #999;"
        type="textarea"
        v-model="val"
        :placeholder="placeholder"
      ></uni-easyinput>
    </view>
    <uni-section class="mb-10" title="改变" type="line"></uni-section>
    <view class="px-10">
      <button @tap="changePlaceholder">改变placeholder</button>
    </view>
    <input placeholder="测试聚焦" :focus="isFocus" />
    <button @tap="changeFocus">changeFocus</button>
  </view>
</template>

<style>
.mb-10 {
  margin-bottom: 10px;
}

.px-10 {
  padding: 0 10px;
}

uni-easyinput >>> textarea {
  padding-top: 0px;
}
</style>
