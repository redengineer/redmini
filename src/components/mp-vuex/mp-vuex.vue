<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const changeA = 'new A'
const asyncChangeA = 'async A'

const moduleAName = computed(() => store.state.moduleA.name);
const btnLoading = computed(() => store.state.moduleA.loading);

const changeModuleAName = () => {
  store.commit('moduleA/setName', changeA);
}
const asyncChangeModuleAName = () => {
  store.dispatch('moduleA/asyncSetName', asyncChangeA)
}


const computedClassA = computed(() => {
  return {
    pass: moduleAName.value === changeA,
    normal: moduleAName.value !== changeA,
  }
})

const computedClassAsyncA = computed(() => {
  return {
    pass: moduleAName.value === asyncChangeA,
    normal: moduleAName.value !== asyncChangeA,
  }
})
</script>

<template>
  <view class="uni-padding-wrap uni-common-mt">
    <view class="uni-title uni-common-mt">
      测试Vuex
      <text>\n模块A: {{ moduleAName }}</text>
      <view class="flex">
        <button size="mini" :class="computedClassA" @tap="changeModuleAName">测试同步mutation</button>
        <button :loading="btnLoading" size="mini" :class="computedClassAsyncA" @tap="asyncChangeModuleAName">
          测试异步action
        </button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.pass {
  background-color: #4cd964;
}

.fail {
  background-color: #dd524d;
}

.normal {
  background-color: #007aff;
}

button {
  color: white;
}
</style>