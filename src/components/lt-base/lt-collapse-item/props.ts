import { generateId } from "@u/utils.ts";

export const props = {
  title: {
    type: String,
    default: "标题",
  },

  name: {
    type: [String, Number],
    default: () => {
      return generateId();
    },
  },

  disabled: Boolean,
};
