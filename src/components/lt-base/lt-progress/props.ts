export const props = {
  // 进度条类型
  type: {
    type: String,
    default: "line",
    validator: (val) => {
      return ["line", "dashboard", "circle"].includes(val);
    },
  },
  // 进度条的高度
  strokeWidth: {
    type: Number,
    default: 6,
  },

  // 占比
  percentage: {
    type: Number,
    default: 0,
    required: true,
    validator: (val: number) => val >= 0 && val <= 100,
  },

  // color可以是一个字符串、函数、数组
  color: {
    type: [Array, Function, String],
    default: "",
  },

  // 进度条内容的文字
  format: {
    type: Function,
    default: (val: string) => {
      return `${val}%`;
    },
  },

  //是否展示进度条内的文字
  textInside: {
    type: Boolean,
    default: false,
  },

  // 进度条状态
  status: {
    type: String,
    default: "",
    validator: (val: string) => {
      return ["success", "exception", "warning"].includes(val);
    },
  },

  width: {
    type: Number,
    default: 126,
  },
};
