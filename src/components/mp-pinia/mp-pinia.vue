<script lang="ts" setup>
import { useCounterStore } from '../../pinia'
const store = useCounterStore()
</script>

<template>
  <view class="uni-padding-wrap uni-common-mt">
    <view class="uni-title uni-common-mt">
      测试Pinia
      <text>\n当前的 count 为: {{ store.$state.count }}</text>
      <view>
        <button size="mini" @tap="store.decrement"> - </button>
        <!-- @vue-ignore -->
        <button type="primary" size="mini" @tap="store.increment"> + </button>

      </view>
    </view>
  </view>
</template>
