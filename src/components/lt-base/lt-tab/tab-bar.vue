<template>
  <!-- bar被激活 底下的样式 -->
  <div
    :class="['lt-tabs__active-bar', `is-${rootTabs.props.tabPosition}`]"
    :style="barStyle"
  ></div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  ref,
  watch,
  inject,
  getCurrentInstance,
} from "@vue/runtime-core";
import type { PropType } from "vue";
import { Pane, RootTabs } from "./tabs.type";
import { capitalize } from "@vue/shared";

export default defineComponent({
  name: "TabBar",
  props: {
    tabs: {
      type: Array as any,
      default: () => [] as Pane[],
    },
  },
  setup(props) {
    const rootTabs = inject<RootTabs>("rootTabs");

    if (!rootTabs) {
      throw new Error("LtTabBar must be with LtTabs");
    }

    const instance = getCurrentInstance();

    // 这个方法是用来设置bar的样式的
    const getBarStyle = () => {
      const style = {} as any;
      let offset = 0;
      let tabSize = 0;
      // 计算出需要改变的size的类型
      const sizeName = ["top", "bottom"].includes(rootTabs.props.tabPosition)
        ? "width"
        : "height";

      // 设置的当前尺寸的方向
      const sizeDir = sizeName === "width" ? "x" : "y";

      props.tabs.every((tab) => {
        const $el = instance.parent.refs?.[`tab-${tab.paneName}`] as Element;
        if (!$el) return false;

        if (!tab.acitve) {
          //
          offset += $el[`client${capitalize(sizeName)}`];

          return true;
        } else {
          // TODO： 有已被激活的pane
          tabSize = $el[`client${capitalize(sizeName)}`];
          // 这个api是获取$el身上的所有的属性
          const tabStyles = getComputedStyle($el);
          // console.log("tabStyles", tabStyles);
          if (sizeName === "width") {
            if (props.tabs.length > 1) {
              // 这里是为了确保activeBar的长度与内容长度保持一致，而非包含padding的长度
              tabSize -=
                parseFloat(tabStyles.paddingLeft) +
                parseFloat(tabStyles.paddingRight);
            }

            offset += parseFloat(tabStyles.paddingLeft);
          }
        }
      });

      const transform = `translate${capitalize(sizeDir)}(${offset}px)`;

      // 添加宽度、高度
      style[sizeName] = `${tabSize}px`;
      // 加一个动画效果
      style.transform = transform;

      return style;
    };

    const barStyle = ref(getBarStyle());

    const update = () => {
      barStyle.value = getBarStyle();
    };

    watch(
      () => props.tabs,
      () => {
        nextTick(() => {
          update();
        });
      }
    );

    return {
      rootTabs,
      barStyle,
    };
  },
});
</script>

<style lang="scss"></style>
