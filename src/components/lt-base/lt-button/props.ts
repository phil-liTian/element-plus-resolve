import type { PropType } from "vue";
import { isValidateComponentSize } from "@u/validator.ts";

type IButtonType = PropType<
  "primary" | "default" | "success" | "warning" | "info" | "text" | "danger"
>;

type ComponentSize = "small" | "default" | "large";

export interface IButtonProps {
  type?: IButtonType;
  size?: PropType<ComponentSize>;
  icon?: string;
  round?: boolean;
  circle?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export const props = {
  type: {
    type: String as IButtonType,
    default: "default",
    validator: (val: string) => {
      return [
        "primary",
        "default",
        "success",
        "warning",
        "info",
        "text",
        "danger",
      ].includes(val);
    },
  },

  size: {
    type: String as PropType<ComponentSize>,
    default: "small",
    validator: isValidateComponentSize,
  },

  disabled: Boolean,
};
