import { PropType } from "vue";
import { isValidateComponentSize } from "@u/validator.ts";

export const props = {
  type: {
    type: String as PropType<"info" | "success" | "warning" | "danger" | "">,
    default: "",
  },

  hit: Boolean,

  effect: {
    type: String,
    default: "light",
    validator: (val: string): boolean => {
      return ["dark", "light", "plain"].includes(val);
    },
  },

  size: {
    type: String as PropType<ComponentSize>,
    default: "medium",
    validator: isValidateComponentSize,
  },

  color: {
    type: String,
    default: "",
  },
};
