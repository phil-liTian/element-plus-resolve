import { inject, computed } from "vue";
import { radioGroupKey } from "./token.ts";

export const useRadio = () => {
  const radioGroup = inject(radioGroupKey, {} as any);

  const isGroup = computed(() => radioGroup?.name === "ltRadioGroup");

  return {
    radioGroup,
    isGroup,
  };
};

// 处理radio的属性值
export const useRadioAttr = (props, { isGroup, radioGroup }) => {
  const isDisabled = computed(() =>
    isGroup.value ? radioGroup.disabled || props.disabled : props.disabled
  );

  const radioSize = computed(() =>
    isGroup.value ? radioGroup.radioGroupSize || props.size : props.size
  );

  return {
    isDisabled,
    radioSize,
  };
};
