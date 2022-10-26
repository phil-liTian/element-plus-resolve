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

  console.log("classes", classes);

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
