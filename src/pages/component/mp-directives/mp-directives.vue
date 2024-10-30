<template>
  <view class="page-container">
    <page-head title="Vue指令"></page-head>
    <!-- v-once 和 自定义指令不支持 -->
    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试v-html</text>
      </view>
      <view class="uni-card-content">
        <view v-html="rawHtml"></view>
      </view>
    </view>

    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试slot</text>
      </view>
      <view class="uni-card-content">
        <mp-slot-test>
          <template v-slot:slot1>
            我是slot1
          </template>
          我是default
        </mp-slot-test>
      </view>
    </view>
  </view>
</template>

<script>
import mpSlotTest from './mp-slot-test.vue'
export default {
  name: 'mp-directives',
  components: {
    mpSlotTest
  },
  // 不支持自定义指令
  // directives: {
  //   focus: {
  //     inserted: function (el) {
  //       el.focus()
  //     }
  //   }
  // },
  data() {
    return {
      msg: '我是内容，只渲染一次',
      rawHtml: '<div style="text-align:center;background-color: #007AFF;"><div >我是内容</div><img src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png"/></div>'
    }
  },
  methods: {
    handleTap() {
      console.log('handleTap')
    },
    changeMsg() {
      this.msg = '我是内容，只渲染一次，我被修改了'
    }
  },
}
</script>
