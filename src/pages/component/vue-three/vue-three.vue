<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { onReady, onLoad, onShow, onHide, onUnload } from '@dcloudio/uni-app';
import { useDataProvider } from '../../../composables/useData';
import PageHead from '../../../components/page-head/page-head.vue'
import MpTest from '../../../components/mp-test/mp-test.vue'

useDataProvider()

const data = reactive({
  lifeCycle: [] as string[],
  customComponentRef: null,
  info: 'I am mp-test',
  message: '',
})

const title = ref('Vue3 基本语法验证')
const pageHeadRef = ref()

onLoad(() => {
  data.lifeCycle.push('onLoad')
  console.log("%c Line:21 🍰 onLoad pageHeadRef.value", "color:#42b983", pageHeadRef.value);
})

onShow(() => {
  data.lifeCycle.push('onShow')
  console.log("%c Line:25 🍢 onShow pageHeadRef.value", "color:#3f7cff", pageHeadRef.value);
})

onReady(() => {
  data.lifeCycle.push('onReady')
  console.log("%c Line:20 🍢 onReady pageHeadRef.value", "color:#3f7cff", pageHeadRef.value);
  data.customComponentRef = pageHeadRef.value
  console.log("%c Line:29 🍪 data.customComponentRef", "color:#7f2b82", data.customComponentRef);
})

onHide(() => {
  console.log("%c Line:21 🍖", "color:#42b983", 'Vue Three Page: onHide ===');
})

onUnload(() => {
  console.log("%c Line:24 🍟", "color:#3f7cff", 'Vue Three Page: onUnload ===');
})

const handleInfo = (e: any) => {
  console.log("%c Line:36 🥔 handleInfo", "color:#4fff4B", e);
  data.message = e.detail ? e.detail : ''
}


const testResult = computed(() => ({
  lifeCycle: data.lifeCycle.join(',') === 'onLoad,onShow,onReady' ? 'pass' : 'fail',
  customComponentRef: !!data.customComponentRef ? 'pass' : 'fail',
  emitEvent: data.message !== '' ? 'pass' : 'fail',
}))
</script>

<template>
  <view>
    <page-head :title="title" ref="pageHeadRef"></page-head>
    <!--  生命周期测试结果 -->
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-title uni-common-mt">
        生命周期测试结果
        <text>\n{{ data?.lifeCycle?.join(',') }}</text>
        <text :class="testResult.lifeCycle">\n{{ testResult.lifeCycle }}</text>
      </view>
    </view>
    <!-- onReady中是否能拿到自定义组件refs -->
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-title uni-common-mt">
        onReady中是否能拿到自定义组件refs
        <text>\n{{ !!pageHeadRef }}</text>
        <text :class="testResult.customComponentRef">\n{{ testResult.customComponentRef }}</text>
      </view>
    </view>
    <!-- 测试组件父子传参和事件 -->
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-title uni-common-mt">
        测试组件父子传参和事件
        <mp-test :info="data.info" @info="handleInfo">点击触发emit</mp-test>
        <text v-if="data.message">\n接收到子组件的消息: {{ data.message }}</text>
        <text :class="testResult.emitEvent">\n{{ testResult.emitEvent }}</text>
      </view>
    </view>
    <!-- 测试provide inject -->
    <mp-provider></mp-provider>
    <!-- 测试vuex -->
    <mp-vuex></mp-vuex>
    <!-- 测试pinia -->
    <mp-pinia></mp-pinia>
  </view>
</template>

<style>
:root {
  --pass-color: #42b983;
  --fail-color: #ff4949;
}

.pass {
  color: var(--pass-color);
}

.fail {
  color: var(--fail-color);
}
</style>