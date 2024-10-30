<script lang="ts" setup>
import { onMounted, onBeforeMount, ref, computed } from 'vue';

const props = defineProps({
  info: {
    type: String,
    default: 'I am mp-test'
  }
})

const lifeCycle = ref<string[]>([])

const emit = defineEmits({
  info: (e: any) => {
    console.log("%c Line:13 🍖", "color:#42b983", 'mp-test: test ===', e);
  }
})

onBeforeMount(() => {
  lifeCycle.value.push('onBeforeMount')
})

onMounted(() => {
  lifeCycle.value.push('onMounted')
})

const handleTap = () => {
  console.log("%c Line:24 🍟", "color:#3f7cff", 'mp-test: handleTap ===');
  emit('info', {
    detail: props.info
  });
}

const testResult = computed(() => {
  return {
    lifeCycle: lifeCycle.value.join(',') === 'onBeforeMount,onMounted' ? 'pass' : 'fail',
  }
})

</script>

<template>
  <view>
    <button size="mini" @tap="handleTap" :class="`${testResult.lifeCycle}-bg`">
      <slot />
    </button>
  </view>
</template>

<style scoped>
.pass-bg {
  background-color: var(--pass-color);
}

.fail-bg {
  background-color: var(--fail-color);
}
</style>