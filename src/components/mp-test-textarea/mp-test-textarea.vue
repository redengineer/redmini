<script lang="ts" setup>
import { computed, watch } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入内容...'
  }
})

watch(() => props.modelValue, (val) => {
  uni.showToast({
    title: '组件 modelValue 属性发生了变化',
    icon: 'none'
  })
})

watch(() => props.placeholder, (val) => {
  uni.showToast({
    title: '组件 placeholder 属性发生了变化',
    icon: 'none'
  })
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
</script>

<template>
  <view>
    <textarea v-model="value" :placeholder="placeholder"></textarea>
  </view>
</template>
