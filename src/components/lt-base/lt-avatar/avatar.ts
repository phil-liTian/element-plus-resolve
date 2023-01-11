import type { PropType } from "vue";

export const props = {
  size: {
    type: [String, Number] as PropType<number | string>,
    validator: (val) => {
      if (typeof val === "string") {
        return ["large", "default", "small"].includes(val);
      }
      return typeof val === "number";
    },
    default: "large",
  },
  shape: {
    type: String as PropType<"square" | "circle">,
    validator: (val) => {
      return ["square", "circle"].includes(val);
    },
    default: "circle",
  },
  src: {
    type: String,
    default: "",
  },
  alt: String,
  srcSet: String,
  icon: String,
  fit: {
    type: String,
    default: "cover",
  },
};
