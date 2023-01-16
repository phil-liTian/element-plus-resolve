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

  targetOrder: {
    type: String as PropType<"original" | "push" | "unshift">,
    default: "push",
  },
};

// transfer-panel
export const panelProps = {
  data: {
    type: Array,
    default: () => [],
  },
  title: String,
  filterable: Boolean,
};
