import type { Ref, ComputedRef } from "vue";

// tab的类型
export type ITabType = "card" | "border-card" | "";

// tabs的位置
export type ITabPosition = "top" | "right" | "bottom" | "left";

// paneState的回调函数的类型
export type UpdatePaneStateCallback = (pane: Pane) => void;

// pane实例类型
export interface Pane {
  uid: number;
  paneName?: ComputedRef<string>;
  props?: IPaneProps;
  acitve?: ComputedRef<boolean>;
  isClosable?: ComputedRef<boolean>;
  index?: Ref<string>;
}

// rootTabs，tabs提供给每一个子组件自己的props
export interface RootTabs {
  currentName: any;
  props: any;
}

// tabs接收的所有的参数类型
export interface ITabsProps {
  type: ITabType;
  tabPosition: ITabPosition;
  addable: boolean;
  closable: boolean;
}

export interface IPaneProps {
  label?: any;
  name?: any;
}
