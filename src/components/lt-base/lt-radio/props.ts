import type { PropType } from "vue";
export const props = {
  label: {
    type: [String, Number, Boolean],
    default: "",
  },

  modelValue: {
    type: [Number, String, Number],
    default: "",
  },

  // 原生的name属性
  name: {
    type: String,
    default: "",
  },

  // radio尺寸
  size: {
    type: String as PropType<"large" | "default" | "small">,
    default: "default",
  },

  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },

  border: Boolean,
};
