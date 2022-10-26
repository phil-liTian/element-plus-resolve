import { isValidWidthUnit } from "@u/validator.ts";
import type { PropType } from "vue";

export const props = {
  modelValue: Boolean,

  // 自定义modal的类名
  modalClass: String,

  title: {
    type: String,
    default: "title",
  },

  top: {
    type: String,
    default: "15vh",
  },

  width: {
    type: [String, Number],
    default: "50%",
    validator: isValidWidthUnit,
  },

  closeOnClickModal: {
    type: Boolean,
    default: true,
  },

  openDelay: {
    type: Number,
    default: 0,
  },

  closeDelay: {
    type: Number,
    default: 0,
  },

  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },

  fullscreen: {
    type: Boolean,
    default: false,
  },

  modal: {
    type: Boolean,
    default: true,
  },

  // overlay的层级
  zIndex: Number,

  // 是否添加到body上
  appendToBody: {
    type: Boolean,
    default: true,
  },

  // customClass
  customClass: {
    type: String,
    default: "",
  },

  // 是否显示关闭按钮
  showClose: {
    type: Boolean,
    default: true,
  },

  // 关闭modal操作之前执行的方法，没有返回结果前，modal不会关闭
  beforeClose: {
    type: Function as PropType<(...args: any[]) => unknown>,
  },

  // 当关闭dialog的时候，销毁其中的元素
  destroyOnClose: Boolean,

  // lock-scroll 父容器禁止滚动
  lockScroll: {
    type: Boolean,
    default: true,
  },
};
