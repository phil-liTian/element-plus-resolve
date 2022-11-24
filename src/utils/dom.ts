// 添加事件
export const on = function (
  element: HTMLElement | Document | Window,
  event: string,
  handler: any,
  useCapture = false
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture);
  }
};

// 移除事件
export const off = function (
  element: HTMLElement | Document | Window,
  event: string,
  handler: any,
  useCapture = false
) {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture);
  }
};

/**
 *
 * @param el 待添加类的元素
 * @param cls 欲添加的类名
 */
export const addClass = (el: HTMLElement, cls: string): void => {
  if (!el) return;
  const curClass = el.className;
  // 待添加类，处理成数组的形式
  const classes = (cls || "").split(" ");

  for (let i = 0, len = classes.length; i < len; i++) {
    const clsName = classes[i];
    if (el.classList) {
      el.classList.add(clsName);
    }
  }
};

/**
 *
 * @param el 待处理的dom元素
 * @param cls 待移除的类名
 * @returns
 */
export const removeClass = (el: HTMLElement, cls: string): void => {
  if (!el) return;
  const curClass = el.className;
  // 待移除类
  const classes = (cls || "").split(" ");

  for (let i = 0, len = classes.length; i < len; i++) {
    const clsName = classes[i];
    // 支持classList
    if (el.classList) {
      el.classList.remove(clsName);
    }
  }
};

/**
 *
 * @param el 当前元素
 * @param cls 待判断的类名
 * @returns
 */
export const hasClass = (el: HTMLElement, cls: string): boolean => {
  if (!el || !cls) return;
  // 不可包含空格
  if (cls.indexOf(" ") !== -1) {
    throw new Error("classNames should not contain space");
  }

  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return ` ${el.className} `.includes(` ${cls} `);
  }
};
