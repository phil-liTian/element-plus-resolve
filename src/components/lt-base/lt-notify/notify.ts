import PopupManager from "@/utils/popup-manager";
import NotificationConstructor from "./lt-notify.vue";
import { isVNode } from "@u/utils.ts";
import { createVNode, render } from "vue";
import {
  INotificationOptions,
  INotification,
  Position,
  NotificationQueue,
  NotificationVM,
} from "./notify.type";

// notification分开存储
const notification: Record<Position, NotificationQueue> = {
  "top-left": [],
  "top-right": [],
  "bottom-left": [],
  "bottom-right": [],
};

let seed = 1;
const GAP_SIZE = 16;

const Notification: any = (options: INotificationOptions = {}) => {
  const position = options.position || "top-right";
  // 偏移量
  let verticalOffset = options.offset || 0;

  notification[position].forEach(({ vm }) => {
    verticalOffset += (vm?.el?.offsetHeight || 0) + GAP_SIZE;
  });

  verticalOffset += GAP_SIZE;

  const id = `notification_${seed++}`;
  const userOnClose = options.onClose;

  options = {
    ...options,
    onClose: () => {
      close(id, position, userOnClose);
    },
    id,
    zIndex: PopupManager.nextZIndex(),
    offset: verticalOffset,
  };

  const container = document.createElement("div");

  const vm = createVNode(
    NotificationConstructor,
    options,
    isVNode(options.message)
      ? {
          default: () => options.message,
        }
      : null
  );

  // 动画结束之后移除当前关闭元素的dom结构
  if (vm.props) {
    vm.props.onDestroy = () => {
      render(null, container);
    };
  }

  notification[position].push({ vm });
  render(vm, container);

  if (container.firstElementChild) {
    document.body.appendChild(container.firstElementChild);
  }
};

// 在动画结束之前调用，才能拿到当前移除el的offsetHeight属性的值
export function close(
  id: string,
  position: Position,
  userOnClose?: (vm: NotificationVM) => void
): void {
  // 当前关闭的notify的方位
  const orientedNotifications = notification[position];
  const idx = orientedNotifications.findIndex(
    ({ vm }) => vm.component?.props.id === id
  );

  if (idx === -1) return;
  const { vm } = orientedNotifications[idx];

  if (!vm) return;
  // 组件外部使用者调用的close方法
  userOnClose?.(vm);
  // 移除的元素的偏移高度
  const removedHeight = vm?.el?.offsetHeight;

  // 当前移除的是哪个方位
  const verticalPos = position.split("-")[0];
  // 将关闭的元素从数组中移除
  orientedNotifications.splice(idx, 1);
  const len = orientedNotifications.length;
  // 移除完毕
  if (len < 1) return;

  for (let i = idx; i < len; i++) {
    // vnode里面存在的属性
    const { el, component } = orientedNotifications[i].vm;
    const pos = parseInt(el?.style[verticalPos]) - removedHeight - GAP_SIZE;
    if (component?.props) {
      component.props.offset = pos;
    }
  }
}

(["success", "info", "danger", "error"] as const).forEach((type) => {
  Notification[type] = (options: any = {}) => {
    if (typeof options === "string" || isVNode(options)) {
      options = {
        message: options,
      };
    }

    options.type = type;
    return Notification(options);
  };
});

export default Notification;
