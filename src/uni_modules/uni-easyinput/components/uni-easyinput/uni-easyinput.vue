<template>
  <view class="uni-easyinput" :class="{ 'uni-easyinput-error': msg }" :style="boxStyle">
    <view class="uni-easyinput__content" :class="inputContentClass" :style="inputContentStyle">
      <uni-icons v-if="prefixIcon" class="content-clear-icon" :type="prefixIcon" color="#c0c4cc"
        @click="onClickIcon('prefix')" size="22"></uni-icons>
      <textarea v-if="type === 'textarea'" class="uni-easyinput__content-textarea"
        :class="{ 'input-padding': inputBorder }" :name="name" :value="val" :placeholder="placeholder"
        :placeholderStyle="placeholderStyle" :disabled="disabled" placeholder-class="uni-easyinput__placeholder-class"
        :maxlength="inputMaxlength" :focus="focused" :autoHeight="autoHeight" @input="onInput" @blur="_Blur"
        @focus="_Focus" @confirm="onConfirm"></textarea>
      <input v-else :type="type === 'password' ? 'text' : type" class="uni-easyinput__content-input" :style="inputStyle"
        :name="name" :value="val" :password="!showPassword && type === 'password'" :placeholder="placeholder"
        :placeholderStyle="placeholderStyle" placeholder-class="uni-easyinput__placeholder-class" :disabled="disabled"
        :maxlength="inputMaxlength" :focus="focused" :confirmType="confirmType" @focus="_Focus" @blur="_Blur"
        @input="onInput" @confirm="onConfirm" />
      <template v-if="type === 'password' && passwordIcon">
        <!-- 开启密码时显示小眼睛 -->
        <uni-icons v-if="isVal" class="content-clear-icon" :class="{ 'is-textarea-icon': type === 'textarea' }"
          :type="showPassword ? 'eye-slash-filled' : 'eye-filled'" :size="22"
          :color="focusShow ? primaryColor : '#c0c4cc'" @click="onEyes">
        </uni-icons>
      </template>
      <template v-else-if="suffixIcon">
        <uni-icons v-if="suffixIcon" class="content-clear-icon" :type="suffixIcon" color="#c0c4cc"
          @click="onClickIcon('suffix')" size="22"></uni-icons>
      </template>
      <template v-else>
        <uni-icons v-if="clearable && isVal && !disabled && type !== 'textarea'" class="content-clear-icon"
          :class="{ 'is-textarea-icon': type === 'textarea' }" type="clear" :size="clearSize"
          :color="msg ? '#dd524d' : (focusShow ? primaryColor : '#c0c4cc')" @click="onClear"></uni-icons>
      </template>
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script>
/**
   * Easyinput 输入框
   * @description 此组件可以实现表单的输入与校验，包括 "text" 和 "textarea" 类型。
   * @tutorial https://ext.dcloud.net.cn/plugin?id=3455
   * @property {String}	value	输入内容
   * @property {String }	type	输入框的类型（默认text） password/text/textarea/..
   * 	@value text			文本输入键盘
   * 	@value textarea	多行文本输入键盘
   * 	@value password	密码输入键盘
   * 	@value number		数字输入键盘，注意iOS上app-vue弹出的数字键盘并非9宫格方式
   * 	@value idcard		身份证输入键盘，信、支付宝、百度、QQ小程序
   * 	@value digit		带小数点的数字键盘	，App的nvue页面、微信、支付宝、百度、头条、QQ小程序支持
   * @property {Boolean}	clearable	是否显示右侧清空内容的图标控件，点击可清空输入框内容（默认true）
   * @property {Boolean}	autoHeight	是否自动增高输入区域，type为textarea时有效（默认true）
   * @property {String }	placeholder	输入框的提示文字
   * @property {String }	placeholderStyle	placeholder的样式(内联样式，字符串)，如"color: #ddd"
   * @property {Boolean}	focus	是否自动获得焦点（默认false）
   * @property {Boolean}	disabled	是否禁用（默认false）
   * @property {Number }	maxlength	最大输入长度，设置为 -1 的时候不限制最大长度（默认140）
   * @property {String }	confirmType	设置键盘右下角按钮的文字，仅在type="text"时生效（默认done）
   * @property {Number }	clearSize	清除图标的大小，单位px（默认15）
   * @property {String}	prefixIcon	输入框头部图标
   * @property {String}	suffixIcon	输入框尾部图标
   * @property {String}	primaryColor	设置主题色（默认#2979ff）
   * @property {Boolean}	trim	是否自动去除两端的空格
   * @value both	去除两端空格
   * @value left	去除左侧空格
   * @value right	去除右侧空格
   * @value start	去除左侧空格
   * @value end		去除右侧空格
   * @value all		去除全部空格
   * @value none	不去除空格
   * @property {Boolean}	inputBorder	是否显示input输入框的边框（默认true）
   * @property {Boolean}	passwordIcon	type=password时是否显示小眼睛图标
   * @property {Object}	styles	自定义颜色
   * @event {Function}	input	输入框内容发生变化时触发
   * @event {Function}	focus	输入框获得焦点时触发
   * @event {Function}	blur	输入框失去焦点时触发
   * @event {Function}	confirm	点击完成按钮时触发
   * @event {Function}	iconClick	点击图标时触发
   * @example <uni-easyinput v-model="mobile"></uni-easyinput>
   */
function obj2strClass(obj) {
  let classess = ''
  for (const key in obj) {
    const val = obj[key]
    if (val) {
      classess += `${key} `
    }
  }
  return classess
}

function obj2strStyle(obj) {
  let style = ''
  for (const key in obj) {
    const val = obj[key]
    style += `${key}:${val};`
  }
  return style
}
export default {
  name: 'uni-easyinput',
  emits: ['click', 'iconClick', 'update:modelValue', 'input', 'focus', 'blur', 'confirm', 'clear', 'eyes', 'change'],
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  options: {
    virtualHost: true
  },
  inject: {
    form: {
      from: 'uniForm',
      default: null
    },
    formItem: {
      from: 'uniFormItem',
      default: null
    }
  },
  props: {
    name: String,
    value: [Number, String],
    modelValue: [Number, String],
    type: {
      type: String,
      default: 'text'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    autoHeight: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ' '
    },
    placeholderStyle: String,
    focus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    confirmType: {
      type: String,
      default: 'done'
    },
    clearSize: {
      type: [Number, String],
      default: 24
    },
    inputBorder: {
      type: Boolean,
      default: true
    },
    prefixIcon: {
      type: String,
      default: ''
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    trim: {
      type: [Boolean, String],
      default: true
    },
    passwordIcon: {
      type: Boolean,
      default: true
    },
    primaryColor: {
      type: String,
      default: '#2979ff'
    },
    styles: {
      type: Object,
      default() {
        return {
          color: '#333',
          disableColor: '#F7F6F6',
          borderColor: '#e5e5e5'
        }
      }
    },
    errorMessage: {
      type: [String, Boolean],
      default: ''
    }
  },
  data() {
    return {
      focused: false,
      val: '',
      showMsg: '',
      border: false,
      isFirstBorder: false,
      showClearIcon: false,
      showPassword: false,
      focusShow: false,
      localMsg: '',
      isEnter: false // 用于判断当前是否是使用回车操作
    }
  },
  computed: {
    // 输入框内是否有值
    isVal() {
      const val = this.val
      // fixed by mehaotian 处理值为0的情况，字符串0不在处理范围
      if (val || val === 0) {
        return true
      }
      return false
    },

    msg() {
      // console.log('computed', this.form, this.formItem);
      // if (this.form) {
      // 	return this.errorMessage || this.formItem.errMsg;
      // }
      // TODO 处理头条 formItem 中 errMsg 不更新的问题
      return this.localMsg || this.errorMessage
    },
    // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，用户可以传入字符串数值
    inputMaxlength() {
      return Number(this.maxlength)
    },

    // 处理外层样式的style
    boxStyle() {
      return `color:${this.inputBorder && this.msg ? '#e43d33' : this.styles.color};`
    },
    // input 内容的类和样式处理
    inputContentClass() {
      return obj2strClass({
        'is-input-border': this.inputBorder,
        'is-input-error-border': this.inputBorder && this.msg,
        'is-textarea': this.type === 'textarea',
        'is-disabled': this.disabled
      })
    },
    inputContentStyle() {
      const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor
      const borderColor = this.inputBorder && this.msg ? '#dd524d' : focusColor
      return obj2strStyle({
        'border-color': borderColor || '#e5e5e5',
        'background-color': this.disabled ? this.styles.disableColor : '#fff'
      })
    },
    // input右侧样式
    inputStyle() {
      const paddingRight = this.type === 'password' || this.clearable || this.prefixIcon ? '' : '10px'
      return obj2strStyle({
        'padding-right': paddingRight,
        'padding-left': this.prefixIcon ? '' : '10px'
      })
    }
  },
  watch: {
    value(newVal) {
      this.val = newVal
    },
    modelValue(newVal) {
      this.val = newVal
    },
    focus(newVal) {
      console.log('%c Line:276 🍆focus newVal', 'color:#2eafb0', newVal)
      this.$nextTick(() => {
        this.focused = this.focus
        this.focusShow = this.focus
      })
    },
    placeholder(newVal) {
      console.log('子组件的placeholder改变了 ==>', newVal)
      uni.showToast({
        title: '子组件的placeholder改变了',
        icon: 'none'
      })
    },
  },
  created() {
    console.log('uni-easyinput created')
    this.init()
    // TODO 处理头条vue3 computed 不监听 inject 更改的问题（formItem.errMsg）
    if (this.form && this.formItem) {
      this.$watch('formItem.errMsg', (newVal) => {
        this.localMsg = newVal
      })
    }
  },
  mounted() {
    console.log('uni-easyinput mounted')
    this.$nextTick(() => {
      this.focused = this.focus
      console.log('%c Line:295 🍻mounted this.focused', 'color:#93c0a4', this.focused)
      this.focusShow = this.focus
    })
  },
  methods: {
    /**
       * 初始化变量值
       */
    init() {
      if (this.value || this.value === 0) {
        this.val = this.value
      } else if (this.modelValue || this.modelValue === 0) {
        this.val = this.modelValue
      } else {
        this.val = null
      }
    },

    /**
       * 点击图标时触发
       * @param {Object} type
       */
    onClickIcon(type) {
      this.$emit('iconClick', type)
    },

    /**
       * 显示隐藏内容，密码框时生效
       */
    onEyes() {
      this.showPassword = !this.showPassword
      this.$emit('eyes', this.showPassword)
    },

    /**
       * 输入时触发
       * @param {Object} event
       */
    onInput(event) {
      if (!event.detail) {
        return
      }
      console.log('%c Line:336 🥝 event', 'color:#93c0a4', event)
      let value = event.detail.value
      // 判断是否去除空格
      if (this.trim) {
        if (typeof (this.trim) === 'boolean' && this.trim) {
          value = this.trimStr(value)
        }
        if (typeof (this.trim) === 'string') {
          value = this.trimStr(value, this.trim)
        }
      };
      if (this.errMsg) this.errMsg = ''
      this.val = value
      // TODO 兼容 vue2
      this.$emit('input', value)
      // TODO　兼容　vue3
      this.$emit('update:modelValue', value)
    },

    /**
       * 外部调用方法
       * 获取焦点时触发
       * @param {Object} event
       */
    onFocus() {
      this.$nextTick(() => {
        this.focused = true
      })
      this.$emit('focus', null)
    },

    _Focus(event) {
      console.log('内置组件focus触发', event)
      this.focusShow = true
      this.$emit('focus', event)
    },

    /**
       * 外部调用方法
       * 失去焦点时触发
       * @param {Object} event
       */
    onBlur() {
      this.focused = false
      this.$emit('focus', null)
    },
    _Blur(event) {
      const value = event.detail.value
      this.focusShow = false
      this.$emit('blur', event)
      // 根据类型返回值，在event中获取的值理论上讲都是string
      if (this.isEnter === false) {
        this.$emit('change', this.val)
      }
      // 失去焦点时参与表单校验
      if (this.form && this.formItem) {
        const {
          validateTrigger
        } = this.form
        if (validateTrigger === 'blur') {
          this.formItem.onFieldChange()
        }
      }
    },

    /**
       * 按下键盘的发送键
       * @param {Object} e
       */
    onConfirm(e) {
      this.$emit('confirm', this.val)
      this.isEnter = true
      this.$emit('change', this.val)
      this.$nextTick(() => {
        this.isEnter = false
      })
    },

    /**
       * 清理内容
       * @param {Object} event
       */
    onClear(event) {
      this.val = ''
      // TODO 兼容 vue2
      this.$emit('input', '')
      // TODO 兼容 vue2
      // TODO　兼容　vue3
      this.$emit('update:modelValue', '')
      // 点击叉号触发
      this.$emit('clear')
    },

    /**
       * 去除空格
       */
    trimStr(str, pos = 'both') {
      if (pos === 'both') {
        return str.trim()
      } else if (pos === 'left') {
        return str.trimLeft()
      } else if (pos === 'right') {
        return str.trimRight()
      } else if (pos === 'start') {
        return str.trimStart()
      } else if (pos === 'end') {
        return str.trimEnd()
      } else if (pos === 'all') {
        return str.replace(/\s+/g, '')
      } else if (pos === 'none') {
        return str
      }
      return str
    }
  }
}
</script>

<style lang="scss">
$uni-error: #e43d33;
$uni-border-1: #DCDFE6 !default;

.uni-easyinput {
  /* #ifndef APP-NVUE */
  width: 100%;
  /* #endif */
  flex: 1;
  position: relative;
  text-align: left;
  color: #333;
  font-size: 14px;
}

.uni-easyinput__content {
  flex: 1;
  /* #ifndef APP-NVUE */
  width: 100%;
  display: flex;
  box-sizing: border-box;
  // min-height: 36px;
  /* #endif */
  flex-direction: row;
  align-items: center;
  // 处理border动画刚开始显示黑色的问题
  border-color: #fff;
  transition-property: border-color;
  transition-duration: 0.3s;
}

.uni-easyinput__content-input {
  /* #ifndef APP-NVUE */
  width: auto;
  /* #endif */
  position: relative;
  overflow: hidden;
  flex: 1;
  line-height: 1;
  font-size: 14px;
  height: 35px;
  // min-height: 36px;
}

.uni-easyinput__placeholder-class {
  color: #999;
  font-size: 12px;
  // font-weight: 200;
}

.is-textarea {
  align-items: flex-start;
}

.is-textarea-icon {
  margin-top: 5px;
}

.uni-easyinput__content-textarea {
  position: relative;
  overflow: hidden;
  flex: 1;
  line-height: 1.5;
  font-size: 14px;
  margin: 6px;
  margin-left: 0;
  height: 80px;
  min-height: 80px;
  /* #ifndef APP-NVUE */
  min-height: 80px;
  width: auto;
  /* #endif */
}

.input-padding {
  padding-left: 10px;
}

.content-clear-icon {
  padding: 0 5px;
}

.label-icon {
  margin-right: 5px;
  margin-top: -1px;
}

// 显示边框
.is-input-border {
  /* #ifndef APP-NVUE */
  display: flex;
  box-sizing: border-box;
  /* #endif */
  flex-direction: row;
  align-items: center;
  border: 1px solid $uni-border-1;
  border-radius: 4px;
  /* #ifdef MP-ALIPAY */
  overflow: hidden;
  /* #endif */
}

.uni-error-message {
  position: absolute;
  bottom: -17px;
  left: 0;
  line-height: 12px;
  color: $uni-error;
  font-size: 12px;
  text-align: left;
}

.uni-error-msg--boeder {
  position: relative;
  bottom: 0;
  line-height: 22px;
}

.is-input-error-border {
  border-color: $uni-error;

  .uni-easyinput__placeholder-class {
    color: mix(#fff, $uni-error, 50%);
    ;
  }
}

.uni-easyinput--border {
  margin-bottom: 0;
  padding: 10px 15px;
  // padding-bottom: 0;
  border-top: 1px #eee solid;
}

.uni-easyinput-error {
  padding-bottom: 0;
}

.is-first-border {
  /* #ifndef APP-NVUE */
  border: none;
  /* #endif */
  /* #ifdef APP-NVUE */
  border-width: 0;
  /* #endif */
}

.is-disabled {
  background-color: #F7F6F6;
  color: #D5D5D5;

  .uni-easyinput__placeholder-class {
    color: #D5D5D5;
    font-size: 12px;
  }
}
</style>
