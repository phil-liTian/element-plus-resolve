<template>
  <div class="lt-collapse-item" :class="{ 'is-disabled': disabled }">
    <!-- 头部标题内容 -->
    <div role="tab">
      <div
        class="lt-collapse-item__header"
        :class="{
          'is-active': isActive,
        }"
        @click="handleHeaderClick"
        @keyup.enter.space.stop="handleEnterClick"
      >
        <slot name="title">{{ title }}</slot>

        <i :class="['lt-collapse-item__arrow', { 'is-active': isActive }]">></i>
      </div>
    </div>
    <!-- 折叠框中内容 -->
    <lt-collapse-transition>
      <div v-show="isActive" class="lt-collapse-item__wrap">
        <div class="lt-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </lt-collapse-transition>
  </div>
</template>

<script lang="ts">
import { computed, inject } from "vue";
import { defineComponent } from "@vue/runtime-core";
import { props } from "./props";
import type { CollapseProvider } from "../lt-collapse/lt-collapse.vue";
export default defineComponent({
  name: "LtCollapseItem",
  props,
  setup(props) {
    const collapse = inject<CollapseProvider>("collapse");
    const collapseMitt = collapse?.collapseMitt;

    // 标识当前面板的激活状态，activeNames包含即激活
    const isActive = computed(() => {
      return collapse?.activeNames.value.includes(props.name);
    });

    // 点击header
    const handleHeaderClick = () => {
      if (props.disabled) return;
      collapseMitt.emit("item-click", props.name);
    };

    const handleEnterClick = () => {
      console.log("handleEnterClick");

      collapseMitt.emit("item-click", props.name);
    };

    return {
      isActive,
      handleHeaderClick,
      handleEnterClick,
    };
  },
});
</script>

<style lang="scss"></style>
