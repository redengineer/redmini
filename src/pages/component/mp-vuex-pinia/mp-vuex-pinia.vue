<template>
  <view class="page-container">
    <page-head title="Vuex and Pinia"></page-head>
    <!-- 测试vuex -->
    <mp-vuex></mp-vuex>
    <!-- 测试pinia -->
    <mp-pinia></mp-pinia>
  </view>
</template>

<script>
import MpVuex from '@/components/mp-vuex/mp-vuex.vue'
import MpPinia from '@/components/mp-pinia/mp-pinia.vue'
export default {
  name: 'mp-vuex-pinia',
  components: {
    MpVuex,
    MpPinia
  },
  data() {
    return {

    }
  },
  methods: {

  },
}
</script>
