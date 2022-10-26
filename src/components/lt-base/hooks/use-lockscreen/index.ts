import { watch } from "vue";
import { addClass, removeClass } from "@u/dom.ts";
import type { Ref } from "vue";

/**
 * 在弹出modal的时候 父容器禁止滚动
 * 在父容器上添加overflow:hidden属性
 */

export default (trigger: Ref<boolean>) => {
  const cleanUp = () => {
    removeClass(document.body, "lt-popup-parent--hidden");
  };

  watch(trigger, (val: boolean) => {
    if (val) {
      // 添加父类溢出隐藏的类
      addClass(document.body, "lt-popup-parent--hidden");
    } else {
      cleanUp();
    }
  });
};
