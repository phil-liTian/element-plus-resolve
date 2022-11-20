import { PropType } from "vue";

export const props = {
  label: {
    type: [Boolean, Number, String],
    default: "",
  },
  // checkbox的原生的name
  name: String,
  // 是否禁用
  disabled: Boolean,
  size: {
    type: String as PropType<"large" | "default" | "small">,
    default: "",
  },
  border: Boolean,

  trueLabel: [String, Number],
  falseLabel: [String, Number],
};
