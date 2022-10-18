import { PropType } from "vue";

export const props = {
  dangerouslyUseHTMLString: Boolean, // 是否可使用html

  id: {
    type: String,
    default: "",
  },

  message: {
    type: String,
    default: "",
  },

  type: {
    type: String as PropType<"success" | "info" | "warning" | "error">,
    default: "info",
  },

  offset: {
    type: Number,
    default: 20,
  },

  center: Boolean,

  customClass: String,

  zIndex: Number,

  duration: {
    type: Number,
    default: 3000,
  },
};
