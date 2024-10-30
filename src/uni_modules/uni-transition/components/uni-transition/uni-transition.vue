<template>
  <view
    ref="ani"
    :animation="animationData"
    :class="customClass"
    :style="transformStyles"
    @click="onClick"
    @transitionend="onTransitionEnd"
    ><slot></slot
  ></view>
</template>

<script>
import { createAnimation } from "./createAnimation";

/**
 * Transition 过渡动画
 * @description 简单过渡动画组件
 * @tutorial https://ext.dcloud.net.cn/plugin?id=985
 * @property {Boolean} show = [false|true] 控制组件显示或隐藏
 * @property {Array|String} modeClass = [fade|slide-top|slide-right|slide-bottom|slide-left|zoom-in|zoom-out] 过渡动画类型
 *  @value fade 渐隐渐出过渡
 *  @value slide-top 由上至下过渡
 *  @value slide-right 由右至左过渡
 *  @value slide-bottom 由下至上过渡
 *  @value slide-left 由左至右过渡
 *  @value zoom-in 由小到大过渡
 *  @value zoom-out 由大到小过渡
 * @property {Number} duration 过渡动画持续时间
 * @property {Object} styles 组件样式，同 css 样式，注意带’-‘连接符的属性需要使用小驼峰写法如：`backgroundColor:red`
 */
export default {
  name: "uniTransition",
  emits: ["click", "change"],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    modeClass: {
      type: [Array, String],
      default() {
        return "fade";
      },
    },
    duration: {
      type: Number,
      default: 300,
    },
    styles: {
      type: Object,
      default() {
        return {};
      },
    },
    customClass: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isShow: false,
      transform: "",
      opacity: 1,
      animationData: {},
      durationTime: 300,
      config: {},
    };
  },
  watch: {
    show: {
      handler(newVal) {
        if (newVal) {
          this.open();
        } else {
          // 避免上来就执行 close,导致动画错乱
          if (this.isShow) {
            this.close();
          }
        }
      },
      immediate: true,
    },
    opacity: {
      handler(newVal) {
        console.log("opacity被改变了", newVal);
      },
    },
  },
  computed: {
    // 生成样式数据
    stylesObject() {
      let styles = {
        ...this.styles,
        "transition-duration": this.duration / 1000 + "s",
      };
      let transform = "";
      for (let i in styles) {
        let line = this.toLine(i);
        transform += line + ":" + styles[i] + ";";
      }
      return transform;
    },
    // 初始化动画条件
    transformStyles() {
      console.log(
        "%c Line:113 🍧transformStyles this.opacity",
        "color:#7f2b82",
        this.opacity
      );
      return (
        "transform:" +
        this.transform +
        ";" +
        "opacity:" +
        this.opacity +
        ";" +
        this.stylesObject
      );
    },
  },
  created() {
    // 动画默认配置
    this.config = {
      duration: this.duration,
      timingFunction: "ease",
      transformOrigin: "50% 50%",
      delay: 0,
    };
    this.durationTime = this.duration;
  },
  methods: {
    onTransitionEnd(e) {
      console.log("动画结束了", e);
    },
    /**
     *  ref 触发 初始化动画
     */
    init(obj = {}) {
      if (obj.duration) {
        this.durationTime = obj.duration;
      }
      this.animation = createAnimation(Object.assign(this.config, obj), this);
      console.log(
        "%c Line:116 🍪 init this.animation",
        "color:#b03734",
        this.animation
      );
    },
    /**
     * 点击组件触发回调
     */
    onClick() {
      this.$emit("click", {
        detail: this.isShow,
      });
    },
    /**
     * ref 触发 动画分组
     * @param {Object} obj
     */
    step(obj, config = {}) {
      if (!this.animation) return;
      for (let i in obj) {
        console.log(
          "%c Line:137 🥚 this.animation[i]",
          "color:#ffdd4d",
          this.animation[i]
        );
        try {
          if (typeof obj[i] === "object") {
            this.animation[i](...obj[i]);
          } else {
            this.animation[i](obj[i]);
          }
        } catch (e) {
          console.error(`方法 ${i} 不存在`);
        }
      }
      this.animation.step(config);
      console.log("step==>", this.animation);
      return this;
    },
    /**
     *  ref 触发 执行动画
     */
    run(fn) {
      if (!this.animation) return;
      console.log(this.animation);
      this.animation.run(fn);
    },
    // 开始过度动画
    open() {
      clearTimeout(this.timer);
      this.transform = "";
      this.isShow = true;
      let { opacity, transform } = this.styleInit(false);
      console.log("%c Line:192 🥕open opacity", "color:#4fff4B", opacity);
      if (typeof opacity !== "undefined") {
        this.opacity = 1;
      }
      this.transform = transform;
      // 确保动态样式已经生效后，执行动画，如果不加 nextTick ，会导致 wx 动画执行异常
      this.$nextTick(() => {
        // TODO 定时器保证动画完全执行，目前有些问题，后面会取消定时器
        this.timer = setTimeout(() => {
          this.animation = createAnimation(this.config, this);
          this.tranfromInit(false).step();
          this.animation.run();
          this.$emit("change", {
            detail: this.isShow,
          });
        }, 20);
      });
    },
    // 关闭过度动画
    close(type) {
      if (!this.animation) return;
      this.tranfromInit(true)
        .step()
        .run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          console.log("%c Line:220 🥕close opacity", "color:#6ec1c2", opacity);
          this.opacity = opacity;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow,
          });
        });
    },
    // 处理动画开始前的默认样式
    styleInit(type) {
      let styles = {
        transform: "",
      };
      let buildStyle = (type, mode) => {
        if (mode === "fade") {
          styles.opacity = this.animationType(type)[mode];
        } else {
          styles.transform += this.animationType(type)[mode] + " ";
        }
      };
      if (typeof this.modeClass === "string") {
        buildStyle(type, this.modeClass);
      } else {
        this.modeClass.forEach((mode) => {
          buildStyle(type, mode);
        });
      }
			console.log("%c Line:256 🎂 styles", "color:#2eafb0", styles);
      return styles;
    },
    // 处理内置组合动画
    tranfromInit(type) {
      let buildTranfrom = (type, mode) => {
        let aniNum = null;
        if (mode === "fade") {
          aniNum = type ? 0 : 1;
        } else {
          aniNum = type ? "-100%" : "0";
          if (mode === "zoom-in") {
            aniNum = type ? 0.8 : 1;
          }
          if (mode === "zoom-out") {
            aniNum = type ? 1.2 : 1;
          }
          if (mode === "slide-right") {
            aniNum = type ? "100%" : "0";
          }
          if (mode === "slide-bottom") {
            aniNum = type ? "100%" : "0";
          }
        }
        this.animation[this.animationMode()[mode]](aniNum);
      };
      if (typeof this.modeClass === "string") {
        buildTranfrom(type, this.modeClass);
      } else {
        this.modeClass.forEach((mode) => {
          buildTranfrom(type, mode);
        });
      }

      return this.animation;
    },
    animationType(type) {
      return {
        fade: type ? 1 : 0,
        "slide-top": `translateY(${type ? "0" : "-100%"})`,
        "slide-right": `translateX(${type ? "0" : "100%"})`,
        "slide-bottom": `translateY(${type ? "0" : "100%"})`,
        "slide-left": `translateX(${type ? "0" : "-100%"})`,
        "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
        "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`,
      };
    },
    // 内置动画类型与实际动画对应字典
    animationMode() {
      return {
        fade: "opacity",
        "slide-top": "translateY",
        "slide-right": "translateX",
        "slide-bottom": "translateY",
        "slide-left": "translateX",
        "zoom-in": "scale",
        "zoom-out": "scale",
      };
    },
    // 驼峰转中横线
    toLine(name) {
      return name.replace(/([A-Z])/g, "-$1").toLowerCase();
    },
  },
};
</script>

<style></style>
