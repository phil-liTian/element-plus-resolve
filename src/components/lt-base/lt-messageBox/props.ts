export const props = {
  title: String,

  dangerouslyUseHTMLString: Boolean,

  message: String,

  showInput: Boolean,

  // 取消按钮
  showCancelButton: {
    type: Boolean,
    default: true,
  },

  cancelButtonText: {
    type: String,
    default: "取消",
  },

  // 确认按钮
  showConfirmButton: {
    type: Boolean,
    default: true,
  },

  confirmButtonText: {
    type: String,
    default: "确认",
  },
};
