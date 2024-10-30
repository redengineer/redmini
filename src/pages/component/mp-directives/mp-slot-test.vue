<template>
  <view>
    <text>测试slot</text>
    <slot name="slot1"></slot>
    <slot name="default"></slot>
  </view>
</template>

<script>

export default {
  name: 'mp-slot-test',
  data() {
    return {

    }
  },
  methods: {

  },
}
</script>
