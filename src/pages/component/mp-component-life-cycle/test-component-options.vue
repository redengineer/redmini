<template>
  <view>
    <text class="uni-text-gray">Component生命周期（使用OptionsAPI）</text>
  </view>
  <view>
    <text v-for="(item, index) in componentLifeCycle" :key="index">\n{{ item }}</text>
  </view>
</template>

<script>
export default {
  name: 'test-component-options',
  data() {
    return {
      componentLifeCycle: []
    }
  },
  beforeCreate() {
    console.log("%c Line:24 🎂 beforeCreate test-component-options===", "color:#ffdd4d");
  },
  created() {
    this.componentLifeCycle.push('created')
    console.log("%c Line:28 🎂 created test-component-options===", "color:#ffdd4d");
  },
  beforeMount() {
    this.componentLifeCycle.push('beforeMount')
    console.log("%c Line:33 🎂 beforeMount test-component-options===", "color:#ffdd4d")
  },
  mounted() {
    this.componentLifeCycle.push('mounted')
    console.log("%c Line:38 🎂 mounted test-component-options===", "color:#ffdd4d")
  },
  beforeUpdate() {
    console.log("%c Line:29 🎂 beforeUpdate test-component-options===", "color:#ffdd4d");
  },
  updated() {
    console.log("%c Line:34 🎂 updated test-component-options===", "color:#ffdd4d");
  },
  beforeDestroy() {
    console.log("%c Line:39 🎂 beforeDestroy test-component-options===", "color:#ffdd4d");
  },
  destroyed() {
    console.log("%c Line:44 🎂 destroyed test-component-options===", "color:#ffdd4d");
  },
}
</script>
