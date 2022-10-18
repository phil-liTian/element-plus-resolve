import { VNode } from "vue";

//
export interface IMessagehandler {
  close: () => void;
}

export type IMessageOptions = {
  type?: "info" | "error" | "warning" | "success";
  customClass?: string;
  center?: boolean;
  zIndex?: number;
  message?: string;
  offset?: number; // default 20
};

export type MessageParams = IMessageOptions | string;

export interface IMessage {
  (options?: MessageParams): IMessagehandler;
  success: (options: any) => IMessagehandler;
  warning: (options: any) => IMessagehandler;
  info: (options: any) => IMessagehandler;
  error: (options: any) => IMessagehandler;
}

export type MessageVm = VNode;

type MessageQueueItem = {
  vm: MessageVm;
};

export type MessageQueue = Array<MessageQueueItem>;
