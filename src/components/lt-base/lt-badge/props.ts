import type { PropType } from "vue";

type IBadgeType = "info" | "success" | "danger" | "warning" | "primary";

export const props = {
  value: [Number, String],
  isDot: Boolean,

  max: {
    type: Number,
    default: 99,
  },

  hidden: {
    type: Boolean,
    default: false,
  },

  type: {
    type: String as PropType<IBadgeType>,
    default: "info",
  },
};
