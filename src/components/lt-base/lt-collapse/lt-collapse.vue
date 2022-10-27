<template>
  <div class="lt-collapse">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import type { PropType, Ref } from "vue";
import { ref, computed, provide, watch, onUnmounted } from "vue";
import mitt, { Emitter } from "mitt";
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from "@u/constant.ts";

export interface CollapseProvider {
  activeNames: Ref;
  collapseMitt: Emitter;
}

export default defineComponent({
  name: "LtCollapse",
  props: {
    // 是否打开手风琴模式
    accordion: Boolean,
    // 打开的值
    modelValue: {
      type: [String, Number, Array] as any,
      default: () => [],
    },
  },
  emits: [UPDATE_MODEL_EVENT],
  setup(props, { emit }) {
    // 打开面板的name组合
    const activeNames = ref([].concat(props.modelValue));
    const collapseMitt: Emitter = mitt();

    // 侦听modalValue的变化，从而改变打开的面板
    watch(
      () => props.modelValue,
      () => {
        activeNames.value = [].concat(props.modelValue);
      },
      {
        immediate: true,
      }
    );

    const setActiveNames = (_activeNames) => {
      activeNames.value = [].concat(_activeNames);
      const value = props.accordion ? activeNames.value[0] : activeNames.value;
      emit(UPDATE_MODEL_EVENT, value);
      emit(CHANGE_EVENT, value);
    };

    const handleItemClick = (name) => {
      if (props.accordion) {
        // TODO: 手风琴模式，只允许打开一个面板
        // 有的话就关闭，没有就将activeNames数组中的内容换成name
        const _name =
          (activeNames.value[0] || activeNames.value[0] === 0) &&
          activeNames.value[0] === name
            ? ""
            : name;
        setActiveNames(_name);
      } else {
        const _activeNames = activeNames.value.slice(0);
        const idx = _activeNames.indexOf(name);
        if (idx > -1) {
          // 存在
          _activeNames.splice(idx, 1);
        } else {
          _activeNames.push(name);
        }
        setActiveNames(_activeNames);
      }
    };

    collapseMitt.on("item-click", handleItemClick);

    provide("collapse", {
      activeNames,
      collapseMitt,
    });

    onUnmounted(() => {
      // 清除所有provider
      collapseMitt.all.clear();
    });

    return {
      activeNames,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-collapse.scss";
</style>
