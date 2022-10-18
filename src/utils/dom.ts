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
