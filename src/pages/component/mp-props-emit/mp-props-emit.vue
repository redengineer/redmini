<template>
  <view class="page-container">
    <page-head title="Props & Emit"></page-head>
    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试props和emit</text>
      </view>
      <view class="uni-card-content">
        <props-emit-component @tap="handleTap" :my-props="myProps" :my-function="logMyProps" @my-emit="handleMyEmit" />
      </view>
    </view>
  </view>
</template>

<script>
import PropsEmitComponent from '@/pages/component/mp-props-emit/props-emit-component.vue'
export default {
  name: 'mp-props-emit',
  components: {
    PropsEmitComponent
  },
  data() {
    return {
      myProps: 'mp-props-emit -> props-emit-component',
    }
  },
  methods: {
    logMyProps() {
      console.log(this.myProps)
    },
    handleMyEmit(payload) {
      console.log('mp-props-emit: handleMyEmit', payload)
    },
    handleTap(e){
      console.log("%c Line:35 🍌 handleTap", "color:#7f2b82", e);
    }
  },
}
</script>
