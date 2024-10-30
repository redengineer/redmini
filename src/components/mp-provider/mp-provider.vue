<script lang="ts" setup>
import { useDataInject } from '../../composables/useData'
const { count, decrement, increment } = useDataInject()
</script>

<template>
  <view class="uni-padding-wrap uni-common-mt">
    <view class="uni-title uni-common-mt">
      测试Provide/Inject
      <text>\n当前的 count 为: {{ count }}</text>
      <view>
        <button size="mini" @tap="decrement"> - </button>
        <!-- @vue-ignore -->
        <button type="primary" size="mini" @tap="increment"> + </button>
      </view>
    </view>
  </view>
</template>
