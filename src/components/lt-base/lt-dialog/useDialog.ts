import { computed, watch, ref, onMounted, SetupContext } from "vue";
import type { UseDialogProps } from "./dialog.type";
import { isNumber, clearTimer } from "@u/utils.ts";
import { UPDATE_MODEL_EVENT } from "@u/constant.ts";
import { useModal, useLockScreen } from "../hooks";

// 关闭的回调
export const CLOSE_EVENT = "close";
// 打开的回调
export const OPEN_EVENT = "open";
// 关闭结束时的回调
export const CLOSED_EVENT = "closed";
// 打开结束时的回调
export const OPEND_EVENT = "opened";
export { UPDATE_MODEL_EVENT };

export default function (props: UseDialogProps, ctx: SetupContext) {
  // 控制显示隐藏
  const visible = ref(false);
  const openTimer = ref(null);
  const closeTimer = ref(null);
  const rendered = ref(false);

  // 侦听modelValue属性
  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        rendered.value = true;
        ctx.emit(OPEN_EVENT);
        open();
      } else {
        if (visible.value) {
          close();
        }
      }
    }
  );

  // 宽度兼容纯数字和带单位的宽度
  const normalizeWidth = () => {
    if (isNumber(props.width)) {
      return `${props.width}px`;
    } else {
      return props.width;
    }
  };

  // 样式处理
  const style = computed(() => {
    const styles = {} as any;

    if (!props.fullscreen) {
      styles.marginTop = props.top;
      if (props.width) {
        styles.width = normalizeWidth();
      }
    }

    return styles;
  });

  // 真正的关闭
  const doClose = () => {
    visible.value = false;
  };

  const close = () => {
    if (props.closeDelay) {
      setTimeout(() => {
        doClose();
      }, props.closeDelay);
    } else {
      doClose();
    }
  };

  const hide = (shouldCancel: boolean) => {
    // done方法可穿参，如果参数是false则直接return，不可关闭modal
    if (shouldCancel) return;
    visible.value = false;
  };

  const handleClose = () => {
    if (props.beforeClose) {
      props.beforeClose(hide);
    } else {
      close();
    }
  };

  // 点击overlay
  const onModalClick = () => {
    if (props.closeOnClickModal) {
      handleClose();
    }
  };

  const open = () => {
    // 延迟打开
    if (props.openDelay) {
      window.setTimeout(() => {
        doOpen();
      }, props.openDelay);
    } else {
      doOpen();
    }
  };

  // 真正的打开modal操作
  const doOpen = () => {
    visible.value = true;
  };

  const afterLeave = () => {
    ctx.emit(UPDATE_MODEL_EVENT, false);
    if (props.destroyOnClose) {
      rendered.value = false;
    }
  };

  if (props.closeOnPressEscape) {
    useModal(
      {
        handleClose,
      },
      visible
    );
  }

  if (props.lockScroll) {
    useLockScreen(visible);
  }

  onMounted(() => {
    // visible.value = props.modelValue || false;
    if (props.modelValue) {
      rendered.value = true;
      visible.value = true;
      open();
    }
  });

  return {
    visible,
    style,
    rendered,
    onModalClick,
    handleClose,
    afterLeave,
  };
}
