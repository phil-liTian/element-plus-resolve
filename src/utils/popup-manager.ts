import type { Ref } from "vue";

interface Instance {
  closeOnClickModal: Ref<boolean>;
  closeOnPressEscape: Ref<boolean>;
  close: () => void;
  handleClose?: () => void;
  handleAction?: (action: string) => void;
}

type StackFrame = { id: string; zIndex: number; modalClass: string };

interface IPopupManager {
  getInstance: (id: string) => Instance;
  modalFade: boolean;
  zIndex: number;
  modalDom?: HTMLElement;
  modalStack: StackFrame[];
  register: (id: string, instance: Instance) => void;
  deRegister: (id: string) => void;
  nextZIndex: () => number;
}

const instances: any = {};
let zIndex: number;

const PopupManager: IPopupManager = {
  modalFade: false,
  modalDom: undefined,
  modalStack: [],
  zIndex,

  getInstance: (id) => {
    return instances[id];
  },

  // 注册实例
  register(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },

  // 删除实例
  deRegister(id) {
    instances[id] = null;
    delete instances[id];
  },

  // 下一个索引
  nextZIndex() {
    return ++PopupManager.zIndex;
  },

  // 点击modal

  // 打开modal

  // 关闭modal
};

Object.defineProperty(PopupManager, "zIndex", {
  get() {
    if (zIndex === undefined) {
      zIndex = 2000;
    }

    return zIndex;
  },

  set(value) {
    zIndex = value;
  },
});

export default PopupManager;
