<script lang="ts">
import {
  defineComponent,
  h,
  PropType,
  ref,
  getCurrentInstance,
  onMounted,
  VNode,
  Component,
  provide,
  watch,
  onUpdated,
} from "@vue/runtime-core";
import {
  ITabType,
  ITabPosition,
  Pane,
  RootTabs,
  UpdatePaneStateCallback,
} from "./tabs.type";
import TabNav from "./tab-nav.vue";
import { isPromise } from "@vue/shared";
import { UPDATE_MODEL_EVENT } from "@u/constant.ts";
export default defineComponent({
  name: "ltTabs",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    activeName: {
      type: String,
      default: "",
    },
    type: {
      type: String as PropType<ITabType>,
      default: "",
    },
    tabPosition: {
      type: String as PropType<ITabPosition>,
      default: "top",
    },
    beforeLeave: {
      type: Function as any,
    },
    addable: Boolean,
    closable: Boolean,
  },
  emits: [UPDATE_MODEL_EVENT, "tab-click", "tab-add"],
  setup(props, ctx) {
    const panes = ref([]);
    const currentName = ref(props.modelValue || props.activeName || "0");
    const instance = getCurrentInstance();
    // 暂存pane的映射关系
    const paneStatesMap = {};

    // 这个provide提供了根组件tabs的所有props属性
    provide<RootTabs>("rootTabs", {
      props,
      currentName,
    });
    // 真正的改变modelValue的值
    const changeCurrentName = (value) => {
      currentName.value = value;
      ctx.emit("UPDATE_MODEL_EVENT", value);
    };

    // 设置当前值，处理before的相关逻辑
    const setCurrentName = (value) => {
      if (currentName.value === value) return;
      const beforeLeave = props.beforeLeave;
      const before = beforeLeave && beforeLeave(value, currentName.value);

      if (before && isPromise(before)) {
        // before可以是一个promise对象
      } else if (before !== false) {
        console.log("beforeLeave", value);

        changeCurrentName(value);
      }
    };

    watch([() => props.modelValue, () => props.activeName], ([modelValue]) => {
      setCurrentName(modelValue);
    });

    // 当currentName发生变化的时候，强制更新panes对象
    watch(
      () => currentName.value,
      () => {
        setPaneInstance(true);
      }
    );

    // provide提供更新pane信息的方法
    provide<UpdatePaneStateCallback>("updatePaneState", (pane: Pane) => {
      paneStatesMap[pane.uid] = pane;
    });

    // 从slot里面获取当前包含pane实例的数组
    // 第一个参数是slot的实例对象，第二个参数为之前panes的数组对象
    const getPaneInstanceFromSlot = (vnode, paneInstanceList = []) => {
      Array.from((vnode.children || []) as ArrayLike<VNode>).forEach((node) => {
        let type = node.type;

        type = (type as Component).name || type;

        if (type === "LtTabPane" && node.component) {
          paneInstanceList.push(node.component);
        }
      });

      return paneInstanceList;
    };

    const setPaneInstance = (isFouceUpdate = false) => {
      if (ctx.slots.default) {
        // tabs的默认插槽中有内容
        const children = instance.subTree.children;

        const content = Array.from(children as ArrayLike<VNode>).find(
          ({ props }) => {
            return props.class === "lt-tabs__content";
          }
        );

        if (!content) return;
        // 这里是实际的pane数组
        const paneInstanceList: Pane[] = getPaneInstanceFromSlot(content).map(
          (paneComponent) => {
            return paneStatesMap[paneComponent.uid];
          }
        );

        // 用于标明panes是否发生改变
        const panesChanged =
          paneInstanceList.length !== panes.value.length ||
          paneInstanceList.some((item, index) => {
            item.uid !== panes.value[index].uid;
          });

        if (isFouceUpdate || panesChanged) {
          panes.value = paneInstanceList;
        }
      } else if (panes.value.length) {
        // 插槽中没有内容，而且当前变量panes不为空,则置为空
        panes.value = [];
      }
    };

    // 点击tab__item触发的方法
    const handleItemClick = (pane, tabName, ev) => {
      // TODO: pane有可能是不可被点击的
      if (pane.props.disabled) return;
      setCurrentName(tabName);
      ctx.emit("tab-click");
    };

    // 点击移除按钮
    const handleTabRemove = (pane, ev) => {
      if (pane.props.disabled) return;
    };

    // 点击添加按钮
    const handleTabAdd = () => {
      console.log("add");
      ctx.emit("tab-add");
    };

    onMounted(() => {
      setPaneInstance();
    });

    onUpdated(() => {
      setPaneInstance();
    });

    return {
      panes,
      setPaneInstance,
      handleItemClick,
      handleTabAdd,
    };
  },

  render() {
    const {
      type,
      tabPosition,
      panes,
      handleItemClick,
      addable,
      handleTabAdd,
      handleTabRemove,
    } = this;

    // 添加按钮
    const newButton = addable
      ? h(
          "span",
          {
            class: "lt-tabs__new-tab",
            onClick: handleTabAdd,
          },
          h("i", { class: "el-icon-plus" })
        )
      : null;

    // 这是header的内容
    const header = h(
      "div",
      {
        class: "lt-tabs__header",
      },
      [
        newButton,
        h(TabNav, {
          // 传进去的是元素是当前pane的实例对象的数组
          panes,
          onTabClick: handleItemClick,
          onTabRemove: handleTabRemove,
        }),
      ]
    );

    // 主要的面板内容区域
    const panels = h(
      "div",
      { class: "lt-tabs__content" },
      this.$slots?.default()
    );

    return h(
      "div",
      {
        class: {
          "lt-tabs": true,
          [`lt-tabs--${tabPosition}`]: true,
        },
      },
      tabPosition !== "bottom" ? [header, panels] : [panels, header]
    );
  },
});
</script>

<style lang="scss">
@import "./lt-tabs.scss";
</style>
