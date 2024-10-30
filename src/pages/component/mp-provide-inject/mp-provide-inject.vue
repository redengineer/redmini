<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { onReady, onLoad, onShow, onHide, onUnload } from '@dcloudio/uni-app';
import { useDataProvider } from '../../../composables/useData';
import mpProvider from '../../../components/mp-provider/mp-provider.vue'

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
})

onShow(() => {
  data.lifeCycle.push('onShow')
})

onReady(() => {
  data.lifeCycle.push('onReady')
  data.customComponentRef = pageHeadRef.value
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
    <!-- 测试provide inject -->
    <mp-provider></mp-provider>
  </view>
</template>

<style scoped>
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