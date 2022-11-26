import { getCurrentInstance } from "vue";
import type { Ref } from "vue";
import { camelize } from "@vue/shared";
// 获取全局配置
export function useGlobalConfig(): any {
  const vm: any = getCurrentInstance();

  if ("$ELEMENT" in vm.proxy) {
    return vm.proxy.$ELEMENT;
  }

  return {};
}
// 判断是数字
export const isNumber = (val: unknown): boolean => typeof val === "number";

// 判断是布尔值
export const isBoolean = (val: unknown): boolean => typeof val === "boolean";

// 生成一个id
export const generateId = (): number => Math.floor(Math.random() * 10000);

export { isVNode } from "vue";

// 清除定时器
export const clearTimer = (timer: Ref) => {
  clearTimeout(timer.value);
  timer.value = null;
};

export { camelize };
