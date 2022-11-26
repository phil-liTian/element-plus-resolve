import {
  h,
  render,
  createVNode,
  Transition,
  withCtx,
  withDirectives,
  vShow,
  reactive,
  toRefs,
  ref,
  VNode,
} from "vue";
import { ILoadingInstance, Nullable } from "./loading.type";

export function CreateLoadingComponent(options): ILoadingInstance {
  const afterLeaveFlag = ref(false);
  let vm: VNode = null;
  let afterLeaveTimer: Nullable<number> = null;

  const handleAfterLeave = () => {
    console.log("handleAfterLeave");
  };

  // 销毁当前的dom元素
  const destroySelf = () => {
    const target = data.parent;

    if (target) {
      console.log("target", target);
    }

    if (vm.el && vm.el.parentNode) {
      vm.el.parentNode.removeChild(vm.el);
    }
  };

  const data = reactive({
    ...options,
    visible: true,
    originalPosition: "", // 原来的position属性
  });

  const close = () => {
    afterLeaveFlag.value = true;
    clearTimeout(afterLeaveTimer);

    afterLeaveTimer = window.setTimeout(() => {
      if (afterLeaveFlag.value) {
        afterLeaveFlag.value = false;
        // 自我销毁
        destroySelf();
      }
    }, 400);

    data.visible = false;
  };

  const componentSetupConfig = {
    ...toRefs(data),
    close, // 可调用：用来关闭loading
    handleAfterLeave, // 关闭之后销毁loading组件
  };

  // loading组件
  const ltLoadingComponent = {
    name: "LtLoading",
    setup() {
      return componentSetupConfig;
    },

    render() {
      const spinner = h(
        "svg",
        {
          class: "circle",
          viewBox: "25 25 50 50",
        },
        h("circle", {
          class: "path",
          cx: "50",
          cy: "50",
          r: "20",
          fill: "none",
        })
      );

      // 加载图标下方的加载文案
      const spinnerText = h("p", { class: "lt-loading-text" }, [this.text]);

      return h(
        // 元素
        Transition,
        // 属性
        {
          name: "lt-loading-fade",
          onAfterLeave: this.handleAfterLeave,
        },
        // children
        {
          default: withCtx(() => [
            withDirectives(
              createVNode(
                "div",
                {
                  style: {
                    backgroundColor: this.background || "",
                  },
                  class: [
                    "lt-loading-mask",
                    this.customClass, // 自定义类
                    this.fullscreen ? "is-fullscreen" : "", // 是否全屏
                  ],
                },
                // 这里是loading的展示内容：加载图标和说明文字
                [
                  h(
                    "div",
                    {
                      class: "lt-loading-spinner",
                    },
                    [spinner, this.text ? spinnerText : null]
                  ),
                ]
              ),
              [[vShow, this.visible]]
            ),
          ]),
        }
      );
    },
  };

  // 这里通过调用createVNode创建了一个虚拟dom
  vm = createVNode(ltLoadingComponent);

  // 经过这一步之后才会在vm实例上有一个真正的el对象
  // 而这里所指的el就是将来渲染的真实的dom
  render(vm, document.createElement("div"));

  return {
    ...componentSetupConfig,
    vm,
    get $el() {
      return vm.el as HTMLElement;
    },
  };
}
