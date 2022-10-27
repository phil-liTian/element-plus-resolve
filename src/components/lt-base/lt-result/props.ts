import type { PropType } from "vue";
type IIconType = "success" | "info" | "error" | "warning";

export const props = {
  title: {
    type: String,
    default: "",
  },

  subtitle: {
    type: String,
    default: "",
  },

  icon: {
    type: String as PropType<IIconType> | any,
    default: "info",
  },
};
