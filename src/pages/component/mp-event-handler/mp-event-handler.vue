<template>
  <view class="page-container">
    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试disabled元素不会触发tap事件</text>
      </view>
      <view class="uni-card-content">
        <view>
          <radio class="box-animation" checked disabled @tap="radioTap" @longpress="radioLongPress">点击我不会抛出tap事件</radio>
          <button @tap="buttonTap" disabled @longpress="buttonLongPress">但是长按还是会抛出longpress事件</button>
        </view>
      </view>
    </view>

    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试手势事件</text>
      </view>
      <view class="uni-card-content">
        <view v-for="(value, name) in guestureEventTest" :key="name">
          {{ name }}: {{ value }}
        </view>
        <button
          @tap="handleTap"
          @longtap="handleLongTap"
          @longpress="handleLongPress"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          用我测试手势事件 👀
        </button>
      </view>
    </view>

    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试事件修饰符stop</text>
      </view>
      <view class="uni-card-content">
        <view class="parent" @tap="parentTap">
          <view class="son" @tap.stop="sonTap"> son使用了stop </view>
        </view>
      </view>
    </view>

    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试事件修饰符capture</text>
      </view>
      <view class="uni-card-content">
        <view class="parent" @tap.capture="parentTap">
          <view class="son" @tap="sonTap">
            parent使用了capture，触发比son早
          </view>
        </view>
      </view>
    </view>

    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试动画事件</text>
      </view>
      <view class="uni-card-content">
        <view v-for="(value, name) in animationEventTest" :key="name">
          {{ name }}: {{ value }}
        </view>
        <view
          id="boxView"
          @animationstart="handleAnimationStart"
          @animationiteration="handleAnimationIteration"
          @animationend="handleAnimationEnd"
          :class="{
            box: true,
            'box-animation': boxAnimation,
          }"
        ></view>
        <button @tap="startAnimation">点击开始动画 👀</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'mp-event-handler',
  data() {
    return {
      guestureEventTest: {
        tap: 0,
        longtap: 0,
        longpress: 0,
        touchstart: 0,
        touchmove: 0,
        touchend: 0,
      },
      boxAnimation: false,
      animationEventTest: {
        animationstart: 0,
        animationiteration: 0,
        animationend: 0,
      },
    }
  },
  methods: {
    radioTap(e) {
      uni.showToast({
        title: 'radio触发了tap事件',
        icon: 'none',
      })
    },
    radioLongPress(e){
      uni.showToast({
        title: 'radio触发了longpress事件',
        icon: 'none',
      })
    },
    buttonTap(e){
      uni.showToast({
        title: 'button触发了tap事件',
        icon: 'none',
      })
    },
    buttonLongPress(e){
      uni.showToast({
        title: 'button触发了longpress事件',
        icon: 'none',
      })
    },
    parentTap(e) {
      console.log('parentTap', e)
    },
    sonTap(e) {
      console.log('sonTap', e)
    },
    startAnimation() {
      this.boxAnimation = !this.boxAnimation
    },
    handleAnimationStart(e) {
      console.log('animationstart ==>', e)
      uni.showToast({
        title: '动画开始',
        icon: 'none',
      })
      this.animationEventTest.animationstart++
    },
    handleAnimationIteration(e) {
      console.log('animationiteration ==>', e)
      uni.showToast({
        title: '动画重复',
        icon: 'none',
      })
      this.animationEventTest.animationiteration++
    },
    handleAnimationEnd(e) {
      console.log('animationend ==>', e)
      uni.showToast({
        title: '动画结束',
        icon: 'none',
      })
      this.animationEventTest.animationend++
      this.boxAnimation = false
    },
    handleTap() {
      this.guestureEventTest.tap++
    },
    handleLongTap() {
      this.guestureEventTest.longtap++
    },
    handleLongPress() {
      this.guestureEventTest.longpress++
    },
    handleTouchStart() {
      this.guestureEventTest.touchstart++
    },
    handleTouchMove(e) {
      console.log('touchmove ==>', e)
      this.guestureEventTest.touchmove++
    },
    handleTouchEnd() {
      this.guestureEventTest.touchend++
    },
  },
}
</script>

<style scoped>
.box-animation {
  animation: fade 1s ease-in-out 2;
}

.box {
  height: 100px;
  width: 100px;
  background-color: #f00;
}

@keyframes fade {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.parent {
  width: 200px;
  height: 200px;
  background-color: #f00;
}

.son {
  width: 100px;
  height: 100px;
  background-color: #0f0;
}
</style>
