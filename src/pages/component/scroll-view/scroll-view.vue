<template>
  <view>
    <page-head title="scroll-view,区域滚动视图"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-title uni-common-mt">
        <text> Swiper 内部使用 ScrollView </text>
      </view>
      <swiper>
        <swiper-item>
          <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" @touchmove.stop="()=>{}">
            <view id="demo1" class="scroll-view-item_H uni-bg-red">A</view>
            <view id="demo2" class="scroll-view-item_H uni-bg-green">B</view>
            <view id="demo3" class="scroll-view-item_H uni-bg-blue">C</view>
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" @touchmove.stop="()=>{}">
            <view id="demo1" class="scroll-view-item_H uni-bg-red">D</view>
            <view id="demo2" class="scroll-view-item_H uni-bg-green">E</view>
            <view id="demo3" class="scroll-view-item_H uni-bg-blue">F</view>
          </scroll-view>
        </swiper-item>
      </swiper>
      <view class="uni-title uni-common-mt">
        Vertical and Horizontal Scroll
        <text>\n同时开启横向和纵向滚动</text>
      </view>
      <view>
        <scroll-view class="scroll-Y" show-scrollbar :scroll-top="scrollTop" scroll-x="true" scroll-y="true"
          @touchmove.stop="handleMove" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
          <view style="
              width: 1200px;
              height: 100px;
              display: flex;
              justify-content: space-around;
              background-color: #ddd;
            ">
            <view>2</view>
            <view>3</view>
          </view>
          <view style="height: 100px; background-color: blue;">2</view>
          <view style="height: 100px; background-color: blueviolet;">3</view>
          <view style="height: 100px; background-color: yellow;">4</view>
          <view style="height: 100px; background-color: skyblue;">5</view>
          <view style="height: 100px; background-color: red;">6</view>
        </scroll-view>
      </view>

      <view class="uni-title uni-common-mt">
        Vertical Scroll
        <text>\n纵向滚动</text>
      </view>
      <view>
        <scroll-view @touchmove.stop="handleMove" show-scrollbar :scroll-top="scrollTop" scroll-y="true"
          class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
          <view id="demo1" class="scroll-view-item uni-bg-red">A</view>
          <view id="demo2" class="scroll-view-item uni-bg-green">B</view>
          <view id="demo3" class="scroll-view-item uni-bg-blue">C</view>
        </scroll-view>
      </view>
      <view @tap="goTop" class="uni-link uni-center uni-common-mt">
        点击这里返回顶部
      </view>

      <view class="uni-title uni-common-mt">
        Horizontal Scroll
        <text>\n横向滚动</text>
      </view>
      <view>
        <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
          <view id="demo1" class="scroll-view-item_H uni-bg-red">A</view>
          <view id="demo2" class="scroll-view-item_H uni-bg-green">B</view>
          <view id="demo3" class="scroll-view-item_H uni-bg-blue">C</view>
        </scroll-view>
      </view>
      <view class="uni-common-pb"></view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      scrollTop: 0,
      old: {
        scrollTop: 0,
      },
    }
  },
  methods: {
    upper: function (e) {
      console.log(e)
    },
    handleMove(e) {
      console.log('touchmove ======> ', e)
    },
    lower: function (e) {
      console.log(e)
    },
    scroll: function (e) {
      console.log(e)
      this.old.scrollTop = e.detail.scrollTop
    },
    goTop: function (e) {
      // 解决view层不同步的问题
      this.scrollTop = this.old.scrollTop
      this.$nextTick(function () {
        this.scrollTop = 0
      })
      uni.showToast({
        icon: 'none',
        title: '纵向滚动 scrollTop 值已被修改为 0',
      })
    },
  },
}
</script>

<style>
.scroll-Y {
  height: 300rpx;
}

.scroll-view_H {
  white-space: nowrap;
  width: 100%;
}

.scroll-view-item {
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  font-size: 36rpx;
}

.scroll-view-item_H {
  display: inline-block;
  width: 100%;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  font-size: 36rpx;
}
</style>
