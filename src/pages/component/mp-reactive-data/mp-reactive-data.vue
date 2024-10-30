<template>
  <view class="page-container">
    <page-head title="响应式数据"></page-head>
    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试响应式数据</text>
      </view>
      <view class="uni-card-content">
        <view>
          count: {{ count }}
        </view>
        <view>
          double: {{ doubleCount }}
        </view>
        <button @tap="add">点我+1</button>
      </view>
    </view>
  </view>
</template>

<script>

export default {
  name: 'mp-reactive-data',
  data() {
    return {
      count: 0,
      array: [0],
      obj: {
        a: 'a'
      }
    }
  },
  methods: {
    add() {
      this.count++
    }
  },
  computed: {
    doubleCount() {
      return 2 * this.count
    }
  },
  watch: {
    count(newVal, oldVal) {
      console.log('count change', newVal, oldVal)
    }
  }
}
</script>
