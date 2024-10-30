<template>
  <view>
    <text>props-emit-component 组件</text>
    <text>接到的 myProps: {{ myProps }}</text>
    <button @tap="myFunction">点击执行myFunction</button>
    <button @tap="handleTap">点击emit事件</button>

    <son-component :my-props="myDataProps" :my-function="logMyProps" @my-emit="handleTap" />
  </view>
</template>

<script>
import sonComponent from './son-component.vue'
export default {
  name: 'props-emit-component',
  components: {
    sonComponent
  },
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
      myDataProps: 'props-emit-component -> son-component'
    }
  },
  methods: {
    handleTap() {
      this.$emit('myEmit', 'myEmit payload')
    },
    logMyProps() {
      console.log(this.myProps)
    },
  },
}
</script>
