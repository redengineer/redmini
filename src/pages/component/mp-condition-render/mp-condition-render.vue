<template>
  <view>
    <page-head title="条件渲染"></page-head>
    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试v-if</text>
      </view>
      <view class="uni-card-content">
        <view v-if="show1" class="box1">Box1</view>
        <button @tap="toggleShow1">切换Box1</button>
      </view>
    </view>
    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试template + v-if</text>
      </view>
      <view class="uni-card-content">
        <template v-if="show2">
          <view class="box2">Box2</view>
        </template>
        <button @tap="toggleShow2">切换Box2</button>
      </view>
    </view>
    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试v-show</text>
      </view>
      <view class="uni-card-content">
        <view v-show="show3" class="box3">Box3</view>
        <button @tap="toggleShow3">切换Box3</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'mp-condition-render',
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
  }
}
</script>


<style scoped>
.box {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box1 {
  background-color: bisque;
}

.box2 {
  background-color: burlywood;
}

.box3 {
  background-color: cadetblue;
}
</style>