<template>
  <view>
    <text>son-component 组件</text>
    <text>接到的 myProps: {{ myProps }}</text>
    <button @tap="myFunction">点击执行myFunction</button>
    <button @tap="handleTap">点击emit事件</button>
  </view>
</template>

<script>

export default {
  name: 'props-emit-component',
  props: {
    myProps: {
      type: String,
      default: 'default value'
    },
    myFunction: {
      type: Function,
      default: () => {
        console.log('default function')
      }
    }
  },
  emits: {
    myEmit: (payload) => {
      console.log('myEmit', payload)
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleTap() {
      this.$emit('myEmit', 'myEmit payload')
    }
  },
}
</script>
