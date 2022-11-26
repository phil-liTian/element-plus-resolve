import { nextTick } from "vue";
import { CreateLoadingComponent } from "./createLoadingComponent";
import { ILoadingOptions, ILoadingInstance } from "./loading.type";
import "./lt-loading.scss";
import { getStyle, addClass, removeClass } from "@u/dom.ts";

// loading的默认样式
const defaults: ILoadingOptions = {
  fullscreen: true,
};

// 添加样式
const addStyle = (
  options: ILoadingOptions,
  parent: HTMLElement,
  instance: ILoadingInstance
) => {
  const maskerStyle: Partial<CSSStyleDeclaration> = {};

  if (options.fullscreen) {
    // 全屏
  } else if (options.body) {
    // loading效果加在body上
  } else {
    // 这里是记录实例原来父元素的position属性值的
    instance.originalPosition.value = getStyle(parent, "position");
  }
};

// 添加类: 控制给父元素添加relative属性或者overflow:hidden属性
const addClassList = (
  options: ILoadingOptions,
  parent: HTMLElement,
  instance: ILoadingInstance
) => {
  // 当前父组件不包含绝对定位的时候，给父元素添加relative类
  if (!["absolute", "fixed"].includes(instance.originalPosition.value)) {
    addClass(parent, "lt-loading-parent--relative");
  }

  // 如果是全屏并且lock父元素，添加父元素overflow: hidden 样式
  if (options.fullscreen && options.lock) {
    addClass(parent, "lt-loading-parent--hidden");
  } else {
    removeClass(parent, "lt-loading-parent--hidden");
  }
};

// 使用loading的时候，可以传入配置项options
const Loading = (options: ILoadingOptions = {}) => {
  options = {
    ...defaults,
    ...options,
  };

  // 如果有target，则loading加到target元素上
  if (typeof options.target === "string") {
    options.target = document.querySelector(options.target) as HTMLElement;
  }
  // 这里target替补dom元素是body
  options.target = options.target || document.body;
  if (options.target !== document.body) {
    options.fullscreen = false;
  } else {
    options.body = true;
  }

  const parent = options.body ? document.body : options.target;
  // 给options挂载parent属性
  options.parent = parent;

  const instance = CreateLoadingComponent(options);

  // 添加style样式
  addStyle(options, parent, instance);
  // 添加class
  addClassList(options, parent, instance);

  parent.appendChild(instance.$el);

  nextTick().then(() => {
    instance.visible.value = true;
  });

  return instance;
};

export default Loading;
