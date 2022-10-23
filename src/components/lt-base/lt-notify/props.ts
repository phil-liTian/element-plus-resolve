import { PropType } from "vue";
import { Position } from "./notify.type";
export const props = {
  // 是否可使用html做message的内容
  dangerouslyUseHTMLString: Boolean,

  type: {
    type: String as PropType<"success" | "info" | "warning" | "error" | "">,
    default: "",
  },

  // 提示信息
  message: {
    type: String,
    default: "",
  },

  // 持续显示时长
  duration: {
    type: Number,
    default: 4500,
  },

  position: {
    type: String as PropType<Position>,
    default: "top-right",
  },

  offset: {
    type: Number,
    default: 0,
  },

  onClose: {
    type: Function as PropType<() => void>,
    required: true,
  },

  zIndex: {
    type: Number,
    default: 0,
  },

  id: String,
  title: String,

  onClick: {
    type: Function as PropType<() => void>,
    default: () => void 0,
  },
};
