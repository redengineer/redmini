<template>
  <view>
    <page-head title="Page生命周期"></page-head>
    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">Page生命周期</text>
      </view>
      <view class="uni-card-content">
        <text class="uni-text-gray">Page生命周期列表</text>
        <view>
          <text v-for="(item, index) in lifeCycleList" :key="index">\n{{ item }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'mp-page-life-cycle',
  data() {
    return {
      lifeCycleList: [],
    }
  },
  onLoad() {
    console.log("%c Line:127 🍖", "color:#42b983", 'mp-page-life-cycle: onLoad ===');
    this.lifeCycleList.push('onLoad');
  },
  onShow() {
    console.log("%c Line:131 🍖", "color:#42b983", 'mp-page-life-cycle: onShow ===');
    this.lifeCycleList.push('onShow');
  },
  onReady() {
    console.log("%c Line:135 🍖", "color:#42b983", 'mp-page-life-cycle: onReady ===');
    this.lifeCycleList.push('onReady');
  },
  onHide() {
    console.log("%c Line:139 🍖", "color:#42b983", 'mp-page-life-cycle: onHide ===');
    this.lifeCycleList.push('onHide');
  },
  onUnload() {
    console.log("%c Line:142 🍖", "color:#42b983", 'mp-page-life-cycle: onUnload ===');
    this.lifeCycleList.push('onUnload');
  },
}
</script>
