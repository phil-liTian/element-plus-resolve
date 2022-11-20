import { PropType } from "vue";

export const props = {
  modelValue: {
    type: Array,
    default: () => [],
  },
  disabled: Boolean,
  // 可被勾选的最大数量和最小数量
  min: Number,
  max: Number,
  // 只有在checkbox指定border的时候生效
  size: {
    type: String as PropType<"large" | "default" | "small">,
    default: "",
  },
};
