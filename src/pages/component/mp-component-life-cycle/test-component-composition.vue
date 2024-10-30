<template>
  <view>
    <text class="uni-text-gray">Component生命周期（使用CompositionAPI）</text>
  </view>
  <view>
    <text v-for="(item, index) in componentLifeCycle" :key="index">\n{{ item }}</text>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { onBeforeMount, onBeforeUpdate, onMounted, onBeforeUnmount, onUnmounted, onUpdated, } from 'vue';

export default defineComponent({
  name: 'test-component-composition',
  setup() {
    const componentLifeCycle = ref<string[]>([])

    onBeforeMount(() => {
      componentLifeCycle.value.push('onBeforeMount')
      console.log("%c Line:24 🎂 onBeforeMount test-component-composition===", "color:#ffdd4d");
    })

    onMounted(() => {
      componentLifeCycle.value.push('onMounted')
      console.log("%c Line:28 🎂 onMounted test-component-composition===", "color:#ffdd4d");
    })

    onBeforeUpdate(() => {
      console.log("%c Line:29 🎂 onBeforeUpdate test-component-composition===", "color:#ffdd4d");
    })

    onUpdated(() => {
      console.log("%c Line:34 🎂 onUpdated test-component-composition===", "color:#ffdd4d");
    })

    onBeforeUnmount(() => {
      console.log("%c Line:39 🎂 onBeforeUnmount test-component-composition===", "color:#ffdd4d");
    })

    onUnmounted(() => {
      console.log("%c Line:44 🎂 onUnmounted test-component-composition===", "color:#ffdd4d");
    })

    return {
      componentLifeCycle
    }
  },
})
</script>
