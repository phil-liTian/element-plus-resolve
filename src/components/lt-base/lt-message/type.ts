import { VNode } from "vue";

//
export interface IMessagehandler {
  close: () => void;
}

export type IMessageOptions = {
  type?: "info" | "error" | "warning" | "success";
  customClass?: string;
  id?: string;
  center?: boolean;
  zIndex?: number;
  message?: string;
  offset?: number; // default 20
  onClose?: () => void;
};

export type MessageType = "success" | "info" | "warning" | "danger" | "error";

export type MessageParams = IMessageOptions | string;

export type TypedMessageParams<T extends MessageType> =
  | ({ type: T } & Omit<IMessageOptions, "type">)
  | string;

export interface IMessage {
  (options?: MessageParams): IMessagehandler;
  success?: (options: TypedMessageParams<"success">) => IMessagehandler;
  warning?: (options: TypedMessageParams<"warning">) => IMessagehandler;
  info?: (options: TypedMessageParams<"info">) => IMessagehandler;
  error?: (options: TypedMessageParams<"error">) => IMessagehandler;
}

export type MessageVm = VNode;

type MessageQueueItem = {
  vm: MessageVm;
};

export type MessageQueue = Array<MessageQueueItem>;
