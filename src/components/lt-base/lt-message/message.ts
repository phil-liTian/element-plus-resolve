import MessageConstructor from "./lt-message.vue";
import PopupManager from "@u/popup-manager.ts";
import {
  IMessage,
  MessageParams,
  IMessagehandler,
  IMessageOptions,
  MessageQueue,
} from "./type";
import { createVNode, render } from "vue";

let seed = 1;
const instances: MessageQueue = [];

const Message: IMessage = (
  opts: MessageParams = {} as MessageParams
): IMessagehandler => {
  // 可直接传一个string类型的数据
  if (typeof opts === "string") {
    opts = {
      message: opts,
    };
  }
  const id = `message_${++seed}`;
  let options: IMessageOptions = opts;

  let verticalOffset = opts.offset || 20;

  instances.forEach(({ vm }) => {
    verticalOffset += (vm.el.offsetHeight || 0) + 16;
  });

  verticalOffset += 16;

  options = {
    ...options,
    zIndex: PopupManager.nextZIndex(),
    offset: verticalOffset,
  };

  const container = document.createElement("div");
  container.className = `container_${id}`;

  const vm = createVNode(MessageConstructor, options);

  instances.push({ vm });
  render(vm, container);
  document.body.appendChild(container.firstElementChild);

  return {
    close: () => {
      console.log(111);
    },
  };
};

(["success", "info", "warning", "error"] as const).forEach((type) => {
  Message[type] = (opts: IMessageOptions) => {
    if (typeof opts === "string") {
      opts = {
        message: opts,
        type,
      };
    } else {
      opts.type = type;
    }
    return Message(opts);
  };
});

export default Message;
