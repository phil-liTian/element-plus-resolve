import type { PropType } from "vue";

export type StatusType = "wait" | "success" | "error" | "finish" | "process";

export const props = {
  // 间距
  space: {
    type: [String, Number],
    default: "",
  },

  // 方向
  direction: {
    type: String as PropType<"vertical" | "horizontal">,
    default: "horizontal",
  },

  // 默认激活
  active: {
    type: Number,
    default: 0,
  },

  // 默认的进行中的状态
  processStatus: {
    tpye: String as PropType<StatusType>,
    default: "process",
  },

  // 默认的结束状态
  finishStatus: {
    tpye: String as PropType<StatusType>,
    default: "finish",
  },

  // 是否居中对齐
  alignCenter: {
    type: Boolean,
    default: false,
  },

  // 是否启用简约模式
  simple: {
    type: Boolean,
    default: false,
  },
};
