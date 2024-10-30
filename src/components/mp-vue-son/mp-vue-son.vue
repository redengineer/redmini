<template>
  <view>
    mp-vue-son
    <view>
      <text>测试自定义组件 mp-vue-son props</text>
      <text>props.testValue = {{ testValue }}</text>
      <text>props.testFunction = {{ testFunction.toString() }}</text>
    </view>
    <view>
      <text>测试 mp-vue-son emit</text>
      <button @tap="handleTap">测试emit</button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'mp-vue-son',
  props: {
    testValue: {
      type: String,
      default: 'testValue'
    },
    testFunction: {
      type: Function,
      default: () => {
        console.log("%c Line:64 🍖", "color:#42b983", 'mp-son: testFunction default ===');
      }
    }
  },
  emits: {
    test: (e) => {
      console.log("%c Line:71 🍖", "color:#42b983", 'mp-son: test ===', e);
    }
  },
  data() {
    return {}
  },
  methods: {
    handleTap() {
      console.log("%c Line:73 🍖", "color:#42b983", 'mp-son: handleTap ===');
      this.$emit('test', {
        detail: 'test'
      });
    }
  },
  beforeCreate() {
    console.log("%c Line:85 🍖", "color:#42b983", 'mp-son: beforeCreate ===');
  },
  created() {
    console.log("%c Line:88 🍖", "color:#42b983", 'mp-son: created ===');
  },
  beforeMount() {
    console.log("%c Line:91 🍖", "color:#42b983", 'mp-son: beforeMount ===');
  },
  mounted() {
    console.log("%c Line:94 🍖", "color:#42b983", 'mp-son: mounted ===');
  },
  beforeUpdate() {
    console.log("%c Line:97 🍖", "color:#42b983", 'mp-son: beforeUpdate ===');
  },
  updated() {
    console.log("%c Line:100 🍖", "color:#42b983", 'mp-son: updated ===');
  },
  beforeDestroy() {
    console.log("%c Line:103 🍖", "color:#42b983", 'mp-son: beforeDestroy ===');
  },
  destroyed() {
    console.log("%c Line:106 🍖", "color:#42b983", 'mp-son: destroyed ===');
  },
}
</script>
