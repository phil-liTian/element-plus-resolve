import { watch } from "vue";
import type { Ref, ComputedRef } from "vue";
import { on } from "@u/dom.ts";
import { EVENT_CODE } from "@u/aria.ts";

/**
 * 功能：关闭modal， modalStack用于存储modal，
 * 展示的时候入栈，隐藏的时候出栈，当点击esc的时候，关闭最上面的一个modal
 */
type ModalInstance = {
  handleClose: () => void;
};

const modalStack: ModalInstance[] = [];

const closeModal = (e: KeyboardEvent) => {
  if (!modalStack.length) return;

  if (e.code === EVENT_CODE.esc) {
    e.stopPropagation();
    const topModal = modalStack[modalStack.length - 1];
    topModal.handleClose();
  }
};

export default (
  instance: ModalInstance,
  visibleRef: Ref<boolean> | ComputedRef
) => {
  watch(
    () => visibleRef.value,
    (val) => {
      // modal显示的时候入栈，隐藏的时候出栈
      if (val) {
        modalStack.push(instance);
      } else {
        modalStack.splice(
          modalStack.findIndex((modal) => modal === instance),
          1
        );
      }
    }
  );
};

on(document, "keydown", closeModal);
