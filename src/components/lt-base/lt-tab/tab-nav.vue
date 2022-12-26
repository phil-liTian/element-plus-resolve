<script lang="ts">
import { defineComponent, h, inject } from "@vue/runtime-core";
import { NOOP } from "@vue/shared";
import type { PropType } from "vue";
import TabBar from "./tab-bar.vue";
import type { Pane, RootTabs, ITabType } from "./tabs.type";

export default defineComponent({
  name: "TabNav",
  components: {
    TabBar,
  },
  props: {
    // 这里传进来的是当前tabs内部的pane实例对象的数组
    panes: {
      type: Array as PropType<Pane[]>,
      default: () => [] as Pane[],
    },
    // 点击item的方法
    onTabClick: {
      type: Function,
      default: NOOP,
    },

    onTabRemove: {
      type: Function,
      default: NOOP,
    },

    type: {
      type: String as PropType<ITabType>,
      default: "",
    },

    stretch: Boolean,
  },
  setup() {
    const rootTabs = inject<RootTabs>("rootTabs");

    return {
      rootTabs,
    };
  },
  render() {
    const { panes, rootTabs, onTabClick, onTabRemove, type, stretch } = this;

    const tabs = panes.map((pane, index) => {
      const tabName = pane.paneName || index;
      const tabLabelContent = pane.props.label;
      const closable = pane.isClosable;

      const btnClose = closable
        ? h("span", {
            class: "el-icon-close",
            onClick: (ev) => onTabRemove(pane, ev),
          })
        : null;

      return h(
        "div",
        {
          class: {
            "lt-tabs__item": true,
            [`is-${rootTabs.props.tabPosition}`]: true,
            "is-disabled": pane.props.disabled,
            "is-active": pane.acitve,
          },
          onClick: (ev) => {
            onTabClick(pane, tabName, ev);
          },
          ref: `tab-${tabName}`,
        },
        [tabLabelContent, btnClose]
      );
    });

    return h("div", { class: "lt-tabs__nav-wrap" }, [
      h(
        "div",
        {
          class: "lt-tabs__nav-scroll",
        },
        [
          h(
            "div",
            {
              class: [
                "lt-tabs__nav",
                `is-${rootTabs.props.tabPosition}`,
                stretch &&
                ["top", "bottom"].includes(rootTabs.props.tabPosition)
                  ? "is-stretch"
                  : "",
              ],
              ref: "nav$",
              role: "tabList",
            },
            [!type ? h(TabBar, { tabs: panes }) : null, tabs]
          ),
        ]
      ),
    ]);
  },
});
</script>

<style lang="scss"></style>
