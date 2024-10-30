<template>
  <view>
    <view>
      <text>测试文本</text>
      <text>测试插值：{{ text1 }}</text>
      <button @tap="changeText1">测试change</button>
    </view>
    <view>
      <text>测试计算属性：{{ doubleCount }}</text>
      <text>测试watch(new old): {{ newVal }} {{ oldVal }}</text>
      <button @tap="() => { count += 1 }">点我+1</button>
    </view>
    <view>
      <mp-vue-parent @test="handleTest" :test-function="func"></mp-vue-parent>
    </view>

    <view>
      <text>测试动态class和动态style</text>
      <text :class="{ 'text-green': true }">I am green</text>
      <text :style="{ color: 'skyblue' }">I am skyblue</text>
      <text :class="['text-red', 'text-lg']">I am red & large</text>
      <text :style="['color: grey;', { 'font-weight': 'bold' }]">I am grey & bold</text>
    </view>


    <view>
      <text>手势事件测试</text>
      <view>

      </view>
    </view>
  </view>
</template>

<script>
import mpVueParent from '../../../components/mp-vue-parent/mp-vue-parent.vue';
export default {
  components: {
    'mp-vue-parent': mpVueParent
  },
  data() {
    return {
      text1: 'text1',
      oldVal: 0,
      newVal: 0,
      count: 0,
      func: () => {
        console.log("%c Line:29 🍖", "color:#42b983", 'vue-two: func ===');
      },
    }
  },
  methods: {
    changeText1() {
      this.text1 = 'text1 changed'
    },
    handleTest() {
      console.log("%c Line:38 🍖", "color:#42b983", 'vue-two emit: handleTest ===');
    },
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  watch: {
    count(newVal, oldVal) {
      this.oldVal = oldVal
      this.newVal = newVal
    }
  }
}
</script>


<style>
.text-red {
  color: red;
}

.text-green {
  color: green;
}

.text-bold {
  font-weight: bold;
}

.text-light {
  font-weight: lighter;
}

.text-grey {
  color: grey;
}

.text-lg {
  font-size: 30px;
}

.boxA{
  
}
</style>