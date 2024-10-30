<template>
  <view class="page-container">
    <page-head title="动态样式 class & style"></page-head>
    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试 class 对象</text>
      </view>
      <view class="uni-card-content">
        <view :class="{
          box: true,
          'dynamic-class': show1
        }">Box1</view>
        <button @tap="toggleShow1">切换Box1</button>
      </view>
    </view>
    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试 class 数组</text>
      </view>
      <view class="uni-card-content">
        <view :class="['box', show2 ? 'dynamic-class' : '']">Box2</view>
        <button @tap="toggleShow2">切换Box2</button>
      </view>
    </view>
    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试 style 对象</text>
      </view>
      <view class="uni-card-content">
        <view :style="boxStyle">Box3</view>
      </view>
    </view>
    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试 style 数组</text>
      </view>
      <view class="uni-card-content">
        <view :style="[
          boxStyle,
          {
            backgroundColor: 'yellow',
            color: '#000'
          }
        ]">Box4</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'mp-dynamic-class-style',
  data() {
    return {
      show1: true,
      show2: true,
      show3: true,
    }
  },
  methods: {
    toggleShow1() {
      this.show1 = !this.show1
    },
    toggleShow2() {
      this.show2 = !this.show2
    },
    toggleShow3() {
      this.show3 = !this.show3
    }
  },
  computed: {
    boxStyle() {
      return {
        width: '200px',
        height: '200px',
        backgroundColor: 'skyblue',
        color: '#fff',
        margin: '10px',
        justifyContent: 'center',
        alignItems: 'center',
      }
    }
  }
}
</script>


<style scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: #f00;
  color: #fff;
  margin: 10px;
  justify-content: center;
  align-items: center;
}

.dynamic-class {
  background-color: darkgray;
  color: #000;
}
</style>