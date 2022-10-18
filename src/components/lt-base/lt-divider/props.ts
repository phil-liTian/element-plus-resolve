export const props = {
  direction: {
    type: String,
    default: "horizontal",
    validator(val: string): boolean {
      return ["horizontal", "vertical"].includes(val);
    },
  },

  contentPosition: {
    type: String,
    default: "center",
    validator(val: string): boolean {
      return ["left", "center", "right"].includes(val);
    },
  },
};
