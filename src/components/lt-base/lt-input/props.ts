import type { ComponentSize } from "element-plus";
import type { PropType } from "vue";
import { isValidateComponentSize } from "@u/validator.ts";

export const props = {
  modelValue: {
    type: [String, Number],
    default: "",
  },
  // 原生type类型
  type: {
    type: String,
    default: "text",
  },
  // 大小尺寸
  size: {
    type: String as PropType<ComponentSize>,
    default: isValidateComponentSize,
  },
  placeholder: {
    type: String,
    default: "",
  },
  // 前置内容
  prefixIcon: {
    type: String,
    default: "",
  },
  // 后置内容
  suffixIcon: {
    type: String,
    default: "",
  },
  // 限制最大、最小长度
  maxlength: {
    type: [String, Number],
    default: "",
  },
  minLength: {
    type: [String, Number],
    default: "",
  },
  // 控制是否显示输入长度限制
  showWordLimit: {
    type: Boolean,
    default: false,
  },
  // 是否显示可清空输入框内容
  clearable: {
    type: Boolean,
    default: false,
  },
  // 禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否显示密码
  showPassword: {
    type: Boolean,
    default: false,
  },
  // 原生属性：只读
  readonly: {
    type: Boolean,
    default: false,
  },
  tabindex: {
    type: [Number, String],
  },
  autocomplete: {
    type: String,
    default: "off",
  },
  // input的自定义样式
  inputStyle: {
    type: Object,
    default: () => ({}),
  },
  // 可自己拖拽尺寸
  resize: Boolean,
};
