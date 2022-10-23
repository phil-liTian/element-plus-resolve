import type { PropType } from "vue";

export const props = {
  type: {
    type: String as PropType<"info" | "success" | "danger" | "warning">,
    default: "info",
    validator(val: string): boolean {
      return ["info", "success", "danger", "warning"].includes(val);
    },
  },

  title: {
    type: String,
    default: "",
  },

  description: {
    type: String,
    default: "",
  },

  effect: {
    type: String as PropType<"light" | "dark">,
    default: "light",
    validator(val: string): boolean {
      return ["light", "dark"].includes(val);
    },
  },

  center: {
    type: Boolean,
    default: false,
  },

  bold: Boolean,
};
