import type { PropType, VNode } from "vue";

// 位置
export type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

// 类型
export type NotifycationType = PropType<
  "success" | "danger" | "info" | "error"
>;

//
export type TypedNotificationOptions =
  | Omit<INotificationOptions, "type">
  | string;

export interface INotificationHandle {
  close: () => void;
}

export interface INotification {
  options?: INotificationOptions;
  success?: (options?: TypedNotificationOptions) => INotificationHandle;
  danger?: (options?: TypedNotificationOptions) => INotificationHandle;
  info?: (options?: TypedNotificationOptions) => INotificationHandle;
  error?: (options?: TypedNotificationOptions) => INotificationHandle;
  closeAll: () => void;
}

// props的类型
export type INotificationOptions = {
  type?: NotifycationType;
  customClass?: string;
  duration?: number;
  id?: string;
  iconClass?: string;
  dangerouslyUseHTMLString?: boolean;
  message?: string | VNode;
  zIndex?: number;
  onClose?: () => void;
  onClick?: () => void;
  offset?: number;
  position?: Position;
  showClose?: boolean;
  title?: string;
};

export type NotificationVM = VNode;

type NotificationQueueItem = {
  vm: NotificationVM;
};

export type NotificationQueue = Array<NotificationQueueItem>;
