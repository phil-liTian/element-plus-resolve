export interface UseDialogProps {
  top?: string;
  fullscreen?: boolean;
  width?: [string, number];
  closeOnClickModal?: boolean;
  modelValue?: boolean;
  openDelay?: number; // 延迟打开
  closeDelay?: number; // 延迟关闭
  closeOnPressEscape?: boolean; // 点击esc关闭弹框
  beforeClose?: (close: (shouldCancel: boolean) => void) => void; // 关闭modal之前执行的操作
  destroyOnClose?: boolean;
  lockScroll?: boolean;
}
