<template>
  <view class="page-container">
    <page-head title="列表渲染"></page-head>
    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试v-for</text>
      </view>
      <view class="uni-card-content">
        <button type="primary" @tap="addOne">addOne</button>
        <button @tap="removeOne">removeOne</button>
        <view>
          <view v-for="(item, index) in list" :key="item.id" class="item">
            <text>{{ item.id }}</text> - <text>{{ item.time }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试v-for template</text>
      </view>
      <view class="uni-card-content">
        <button type="primary" @tap="addOne">addOne</button>
        <button @tap="removeOne">removeOne</button>
        <view>
          <template v-for="(item, index) in list" :key="item.id">
            <view>
              <text>{{ item.id }}</text> - <text>{{ item.time }}</text>
            </view>
          </template>
        </view>
      </view>
    </view>
    <view class="uni-card">
      <view class="uni-card-title">
        <text class="uni-title">测试v-for 与 v-if 一起使用</text>
      </view>
      <view class="uni-card-content">
        <button type="primary" @tap="addOne">addOne</button>
        <button @tap="removeOne">removeOne</button>
        <button @tap="toggleShow">切换可见性</button>
        <view>
          <template v-for="(item, index) in list" :key="item.id">
            <view v-if="show || (index % 2)">
              <text>{{ item.id }}</text> - <text>{{ item.time }}</text>
            </view>
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'mp-repeat-render',
  data() {
    return {
      current: 3,
      show: true,
      list: [
        { id: 'item-1', time: Date.now() },
        { id: 'item-2', time: Date.now() },
        { id: 'item-3', time: Date.now() },
      ]
    }
  },
  methods: {
    addOne() {
      this.current += 1
      this.list.push({
        id: 'item-' + this.current,
        time: Date.now()
      })
    },
    removeOne() {
      if (this.list.length === 0) {
        return
      }
      this.list.pop()
    },
    toggleShow() {
      this.show = !this.show
    }
  }
}
</script>
