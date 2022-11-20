import type { ComputedRef } from "vue";

export type AnyFunction<T> = (...args: any[]) => T;

export interface ICheckboxGroupInstance {
  name?: string;
  modelValue?: ComputedRef;
  changeEvent?: AnyFunction<any>;
  disabled?: ComputedRef<boolean>;
  min?: ComputedRef<number | string>;
  max?: ComputedRef<number | string>;
  checkboxGroupSize?: ComputedRef<string>;
}
