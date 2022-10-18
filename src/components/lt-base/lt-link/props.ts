import { PropType } from "vue";

export const props = {
  type: {
    type: String as PropType<
      "primary" | "success" | "warning" | "info" | "danger" | "default"
    >,
    default: "default",
    validator(val: string): boolean {
      return [
        "primary",
        "success",
        "warning",
        "info",
        "danger",
        "default",
      ].includes(val);
    },
  },

  disabled: Boolean,

  underline: {
    type: Boolean,
    default: true,
  },

  href: String,
};
