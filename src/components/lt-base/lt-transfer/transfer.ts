import type { PropType } from "vue";

export type Key = string | number;

export type DataItem = {
  label: string;
  key: Key;
  disabled: boolean;
};

export type Props = {
  label: string;
  key: string;
  disabled: string;
};

// transfer
export const transferProps = {
  modelValue: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },

  data: {
    type: Array as PropType<DataItem[]>,
    default: [],
  },

  props: {
    type: Object as PropType<Props>,
    default: () => ({
      label: "lable",
      key: "key",
      disabled: "disabled",
    }),
  },
  // 控制目标panel中数据的排列顺序
  targetOrder: {
    type: String as PropType<"original" | "push" | "unshift">,
    default: "push",
  },
  // 穿梭框标题
  titles: {
    type: Array as PropType<any> as PropType<[string, string]>,
    default: () => ['list1', 'list2']
  },
  // 按钮文案
  buttonTexts: {
    type: Array as PropType<any> as PropType<[string, string]>,
    default: () => []
  },

  // 搜索占位符
  filterPlaceholder: {
    type: String,
    default: '请输入'
  },

  // 筛选函数
  filterMethod: Function as PropType<(query, item) => boolean>,

  leftDefaultChecked: Array,
  rightDefaultChecked: Array
};

// transfer-panel
export const panelProps = {
  data: {
    type: Array,
    default: () => [],
  },
  title: String,
  filterable: Boolean,
  filterMethod: Function,
  placeholder: String,
  props: Object,
  defaultChecked: Array
};
