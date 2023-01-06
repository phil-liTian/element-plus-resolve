import type { PropType, Ref } from "vue";

type ArrowType = "hover" | "always" | "never";

// carouselItem可接收的参数
export interface ICarouselItemProps {
  name: string;
  label: string | number;
  key: string;
}

// carouselItem中的data
export interface ICarouselItemData {
  hover: boolean;
}

export type UnionCarouselItemData = ICarouselItemProps & ICarouselItemProps;

export interface CarouselItem extends UnionCarouselItemData {
  uid: number;
  translateItem: (index: number, activeIndex: number, oldIndex: number) => void;
}

export interface InjectCarouselScope {
  root: Ref<HTMLElement>;
  type: string;
  direction: string;
  items: Ref<CarouselItem[]>;
  addItem: (item: CarouselItem) => void;
  removeItem: (uid: number) => void;
  setActiveItem: (index: number) => void;
}

export const props = {
  type: {
    type: String as PropType<"card" | "">,
    default: "",
  },
  initialIndex: {
    type: Number,
    default: 0,
  },
  height: {
    type: String,
    default: "",
  },
  direction: {
    type: String as PropType<"horizontal" | "vertical">,
    default: "horizontal",
  },
  arrow: {
    type: String as PropType<ArrowType>,
    default: "hover",
  },
  // 指示器的位置
  indicatorPosition: {
    type: String as PropType<"outside" | "none" | "">,
    default: "",
  },
  loop: {
    type: Boolean,
    default: true,
  },
  interval: {
    type: Number,
    default: 3000,
  },
  // 鼠标悬浮时暂停自动切换
  pauseOnHover: {
    type: Boolean,
    default: true,
  },
  // 指示器的触发方式
  trigger: {
    type: String as PropType<"hover" | "click">,
    default: "hover",
  },
};
