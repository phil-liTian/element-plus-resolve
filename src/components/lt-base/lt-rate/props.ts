import { PropType } from "vue";

export const props = {
  modelValue: {
    type: Number,
    default: 0,
  },
  // 低分和中分的分界线
  lowThreshold: {
    type: Number,
    default: 2,
  },
  // 中分和高分的分界线
  highThreshold: {
    type: Number,
    default: 4,
  },
  // 默认的颜色样式
  colors: {
    type: [Array, Object],
    default: ["#F7BA2A", "#F7BA2A", "#F7BA2A"],
  },

  // 默认的icon类名
  iconClasses: {
    type: [Array, Object],
    default: ["el-icon-star-on", "el-icon-star-on", "el-icon-star-on"],
  },

  // 只读时未被选中的图标
  disabledVoidIconClass: {
    type: String,
    default: "el-icon-star-on",
  },

  // 未被选中的icon组件
  voidIconClass: {
    type: String,
    default: "el-icon-star-off",
  },

  max: {
    type: Number,
    default: 5,
  },
  // 是否允许选择一半
  allowHalf: Boolean,
  // 展示text
  showText: Boolean,
  // 展示得分
  showScore: Boolean,
  // 辅助文字数组
  texts: {
    type: Array as PropType<string[]>,
    default: () => {
      return ["Extremely bad", "Disappointed", "Fair", "Satisfied", "完美"];
    },
  },
  // 说明文案的颜色
  textColor: {
    type: String,
    default: "#1F2D3D",
  },
  // 得分模板
  scoreTemplate: {
    type: String,
    default: "{value}",
  },

  size: {
    type: String as PropType<string>,
    default: "default",
  },
};
