<template>
  <view>
    <page-head title="Component生命周期"></page-head>
    <view ref="viewRef" class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">Component生命周期</text>
      </view>
      <view class="uni-card-content">
        <test-component-options ref="optionsRef" />
      </view>
      <view class="uni-card-content">
        <test-component-composition ref="compositionRef" />
      </view>
    </view>
  </view>
</template>

<script>
import testComponentOptions from './test-component-options.vue'
import testComponentComposition from './test-component-composition.vue'
export default {
  name: 'mp-component-life-cycle',
  components: {
    testComponentComposition,
    testComponentOptions
  },
  data() {
    return {
    }
  },
  onLoad() {
    console.log('onLoad ===')
    this.logRefs()
  },
  onShow() {
    console.log('onShow ===')
    this.logRefs()
  },
  onReady() {
    console.log('onReady ===')
    this.logRefs()
  },
  methods: {
    logRefs() {
      console.log("%c Line:45 🍻 this.$refs.compositionRef", "color:#33a5ff", this.$refs.compositionRef);
      console.log("%c Line:46 🍋 this.$refs.optionsRef", "color:#ea7e5c", this.$refs.optionsRef);
      console.log("%c Line:47 🌽 this.$refs.viewRef", "color:#b03734", this.$refs.viewRef);
    }
  }
}
</script>
