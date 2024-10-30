<template>
	<view>
		<view class="area">
			<view @touchstart="test.touchstart" @touchmove="test.touchmove" class="movable">{{ test.msg }}</view>
		</view>
	</view>
</template>

<script module="test" lang="sjs" src="./utils.sjs"></script>

<script>
	export default {
		data() {
			return {
			}
		},
		created() {
		},
		methods: {
		}
	}
</script>

<style>
.area {
	position: absolute;
	width: 100%;
	height: 100%;
}

.movable {
	position: absolute;
	width: 100px;
	height: 100px;
	left: 50px;
	top: 50px;
	color: white;
	text-align: center;
	line-height: 100px;
	background-color: red;
}
</style>