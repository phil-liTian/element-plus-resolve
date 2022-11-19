import type { InjectionKey } from "vue";

type IModelType = string | number | boolean;

export interface RadioGroupContext {
  name: "ltRadioGroup";
  modelValue: IModelType;
  changeEvent: (val: IModelType) => void;
}

export const radioGroupKey = "RadioGroup" as any;
