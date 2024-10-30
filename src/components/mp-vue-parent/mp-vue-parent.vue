<template>
  <view>
    mp-vue-parent
    <view>
      <text>测试自定义组件 mp-vue-parent props</text>
      <text>props.testValue = {{ testValue }}</text>
      <text>props.testFunction = {{ testFunction.toString() }}</text>
    </view>
    <view>
      <text>测试 mp-vue-parent emit</text>
      <button @tap="handleTap">测试emit</button>
    </view>
    <view>
      <text>测试自定义组件 son 的 props和emit</text>
      <mp-vue-son :test-value="valueToSon" :test-function="iAmFunction" @test="testFunction"></mp-vue-son>
    </view>
  </view>
</template>

<script>
import mpVueSon from '../mp-vue-son/mp-vue-son.vue';
export default {
  name: 'mp-vue-parent',
  components:{
    'mp-vue-son': mpVueSon
  },
  props: {
    testValue: {
      type: String,
      default: 'testValue'
    },
    testFunction: {
      type: Function,
      default: () => {
        console.log("%c Line:64 🍖", "color:#42b983", 'mp-parent: testFunction default ===');
      }
    }
  },
  emits: {
    test: (e) => {
      console.log("%c Line:71 🍖", "color:#42b983", 'mp-parent emit: test ===', e);
    }
  },
  data() {
    return {
      iAmFunction: () => {
        console.log("%c Line:77 🍖", "color:#42b983", 'mp-parent: iAmFunction ===');
      }
    }
  },
  computed: {
    valueToSon() {
      return 'valueToSon: ' + this.testValue
    }
  },
  methods: {
    handleTap() {
      console.log("%c Line:73 🍖", "color:#42b983", 'mp-parent: handleTap ===');
      this.$emit('test', {
        detail: 'test'
      });
    }
  },
  beforeCreate() {
    console.log("%c Line:85 🍖", "color:#42b983", 'mp-parent: beforeCreate ===');
  },
  created() {
    console.log("%c Line:88 🍖", "color:#42b983", 'mp-parent: created ===');
  },
  beforeMount() {
    console.log("%c Line:91 🍖", "color:#42b983", 'mp-parent: beforeMount ===');
  },
  mounted() {
    console.log("%c Line:94 🍖", "color:#42b983", 'mp-parent: mounted ===');
  },
  beforeUpdate() {
    console.log("%c Line:97 🍖", "color:#42b983", 'mp-parent: beforeUpdate ===');
  },
  updated() {
    console.log("%c Line:100 🍖", "color:#42b983", 'mp-parent: updated ===');
  },
  beforeDestroy() {
    console.log("%c Line:103 🍖", "color:#42b983", 'mp-parent: beforeDestroy ===');
  },
  destroyed() {
    console.log("%c Line:106 🍖", "color:#42b983", 'mp-parent: destroyed ===');
  },
}
</script>
