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
  const userOnClose = options.onClose;

  let verticalOffset = opts.offset || 20;
  console.log("verticalOffset", verticalOffset);

  instances.forEach(({ vm }) => {
    verticalOffset += (vm.el.offsetHeight || 0) + 16;
  });

  verticalOffset += 16;

  options = {
    ...options,
    zIndex: PopupManager.nextZIndex(),
    offset: verticalOffset,
    id,
    onClose: () => {
      close(id, userOnClose);
    },
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

export function close(id?: string): void {
  const idx = instances.findIndex(({ vm }) => {
    const _id = vm.component.props.id;
    return id === _id;
  });

  if (idx === -1) return;
  const { vm } = instances[idx];
  if (!vm) return;

  const len = instances.length;
  const removeHeight = vm.el.offsetHeight;
  if (len < 1) return;
  for (let i = idx; i < len; i++) {
    const pos = parseInt(instances[i].vm.el.style["top"]) - removeHeight - 16;

    instances[i].vm.component.props.offset = pos;
  }
  instances.splice(idx, 1);
}

export function closeAll(): void {
  for (let i = instances.length - 1; i > 0; i--) {
    const instance = instances[i].vm.component as any;
    instance.ctx.close();
  }
}

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
