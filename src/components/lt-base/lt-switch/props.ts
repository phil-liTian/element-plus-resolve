import { PropType } from "vue";
export const props = {
  modelValue: {
    type: [Boolean, String, Number],
    default: false,
  },

  value: {
    type: [Boolean, String, Number],
    default: false,
  },

  id: {
    type: String,
    default: "",
  },

  activeValue: {
    type: [Boolean, String, Number],
    default: true,
  },

  inActiveValue: {
    type: [Boolean, String, Number],
    default: false,
  },

  activeColor: {
    type: String,
    default: "",
  },

  inActiveColor: {
    type: String,
    default: "",
  },

  borderColor: {
    type: String,
    default: "",
  },

  inactiveIconClass: {
    type: String,
    default: "",
  },

  inactiveText: {
    type: String,
    default: "",
  },

  activeText: {
    type: String,
    default: "",
  },

  checked: Boolean,

  disabled: Boolean,

  width: {
    type: Number,
    default: 40,
  },
  // Function as PropType<() => Promise<boolean> | boolean>
  beforeChange: {
    type: String as any,
  },

  name: String,
};
