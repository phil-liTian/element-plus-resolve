import { Ref, VNode } from "vue";

// 可传入options的参数
export interface ILoadingOptions {
  target?: string | HTMLElement; // 加上loading的目标元素
  text?: string;
  customClass?: string;
  visible?: boolean;
  background?: string;
  fullscreen?: boolean;
  body?: boolean;
  lock?: boolean;
  parent?: HTMLElement;
}

// loading实例的类型
export interface ILoadingInstance {
  visible?: Ref<boolean>;
  vm?: VNode;
  $el: HTMLElement;
  originalPosition?: Ref<string>;
}

export type Nullable<T> = null | T;
