import throwError from "@u/error.ts";
import { isFunction } from "@vue/shared";
import type { ComponentPublicInstance } from "vue";
import { entries } from "@u/utils.ts";
import { getScrollContainer } from "@u/dom.ts";
import { throttle } from "lodash";

export const SCOPE = "LtInfiniteScroll";
export const CHECK_INTERVAL = 50;
export const DEFAULT_DELAY = 200;
export const DEFAULT_DISTANCE = 0;

const attributes = {
  delay: {
    type: Number,
    default: DEFAULT_DELAY,
  },
  distance: {
    type: Number,
    default: DEFAULT_DISTANCE,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  immediate: {
    type: Boolean,
    default: true,
  },
};

type Attrs = typeof attributes;
type ScrollOptions = { [K in keyof Attrs]: Attrs[K]["default"] };
// 滚动事件的回调
type InfiniteScrollCallback = () => void;
// 滚动的元素
type InfiniteScrollEl = HTMLElement & {
  [SCOPE]: {
    container: HTMLElement | Window;
    containerEl: HTMLElement; // 真是dom元素
    instance: ComponentPublicInstance;
    delay: number;
    lastScrollTop: number;
    onScroll: () => void;
    cb: InfiniteScrollCallback;
    observer?: MutationObserver;
  };
};

// 获取scroll配置选项信息
const getScrollOptions = (
  el: HTMLElement,
  instance: ComponentPublicInstance
): ScrollOptions => {
  return entries(attributes).reduce((pre, [name, option]) => {
    const { type, default: defaultValue } = option;
    const attrVal = el.getAttribute(`infinite-scroll-${name}`);
    let value = instance[attrVal] ?? attrVal ?? defaultValue;
    value = value === "false" ? false : value;
    value = type(value);
    pre[name] = Number.isNaN(value) ? defaultValue : value;

    return pre;
  }, {} as ScrollOptions);
};

// 销毁observer
const destroyObserver = (el: InfiniteScrollEl) => {
  const { observer } = el[SCOPE];
  if (observer) {
    observer.disconnect();
    delete el[SCOPE].observer;
  }
};

const checkFull = (el: InfiniteScrollEl, cb: InfiniteScrollCallback) => {
  const { containerEl, instance } = el[SCOPE];
  const { disabled } = getScrollOptions(el, instance);
  if (disabled) return;
  if (containerEl.scrollHeight <= containerEl.clientHeight) {
    cb.call(instance);
  } else {
    destroyObserver(el);
  }
};

// 滚动事件
const handleScroll = (el: InfiniteScrollEl, cb: InfiniteScrollCallback) => {
  const { container, containerEl, instance, lastScrollTop } = el[SCOPE];
  const { scrollTop, scrollHeight, clientHeight } = containerEl;

  const { disabled, distance } = getScrollOptions(el, instance);
  const delta = scrollTop - lastScrollTop;

  if (disabled || delta < 0) return;
  let shouldTrigger = false;

  if (el === container) {
    // 等式前面指的就是距离底部的距离
    shouldTrigger = scrollHeight - (clientHeight + scrollTop) <= distance;
  } else {
    //
  }

  // cb即指的是指令中的回调函数
  if (shouldTrigger) {
    cb.call(instance);
  }
};

const InfiniteScroll = {
  mounted(el, binding) {
    const { instance, value: cb } = binding;
    if (!isFunction(cb)) {
      throwError(
        SCOPE,
        "v-my-infinite-scroll binding value must be a function"
      );
    }
    const { delay, immediate } = getScrollOptions(el, instance);
    const container = getScrollContainer(el, true);
    const containerEl =
      container === window
        ? document.documentElement
        : (container as HTMLElement);

    const onScroll = throttle(handleScroll.bind(null, el, cb), delay);

    if (!container) return;

    el[SCOPE] = {
      instance,
      container,
      lastScrollTop: containerEl.scrollTop,
      containerEl,
      delay,
      cb,
    };

    // 立即执行加载方法，防止初始状态下内容无法填充满容器
    if (immediate) {
      const observer = new MutationObserver(
        throttle(checkFull.bind(null, el, cb), CHECK_INTERVAL)
      );
      el[SCOPE].observer = observer;
      observer.observe(el, { subtree: true, childList: true });
      checkFull(el, cb);
    }

    container.addEventListener("scroll", onScroll);
  },

  unmounted(el) {
    const { container, onScroll } = el[SCOPE];
    container?.removeEventListener("scroll", onScroll);
    destroyObserver(el);
  },
};

export default InfiniteScroll;
