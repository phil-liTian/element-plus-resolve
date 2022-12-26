export const props = {
  modelValue: {
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    default: "text",
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
};
