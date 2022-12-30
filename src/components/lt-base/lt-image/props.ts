import type { PropType } from "vue";
export const props = {
  src: {
    type: String,
    default: "",
  },
  // 填充模式
  fit: {
    type: String,
    default: "",
  },
  // 图片懒加载
  lazy: {
    type: Boolean,
    default: false,
  },
  // 开启懒加载功能后，监听scroll事件的容器
  scrollContainer: {
    type: [String, Object],
    default: null,
  },
  // 预览的图片数组
  previewSrcList: {
    type: Array as PropType<string[]>,
    default: () => [] as string[],
  },

  appendToBody: Boolean,

  hideOnClickModal: {
    type: Boolean,
    default: true,
  },
};

// imageViewer可接收的属性
export const imageViewerProps = {
  hideOnClickModal: {
    type: Boolean,
    default: true,
  },

  urlList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  // 初始化的index
  initialIndex: {
    type: Number,
    default: 0,
  },

  // 无限循环预览
  infinite: {
    type: Boolean,
    default: true,
  },

  zIndex: {
    type: Number,
    default: 2000,
  },
};
