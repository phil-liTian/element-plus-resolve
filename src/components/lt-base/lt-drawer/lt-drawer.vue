<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition
      name="lt-drawer-fade"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <lt-overlay
        v-show="visible"
        :overlay-class="modalClass"
        :z-index="zIndex"
        @click="onModalClick"
      >
        <div
          :class="['lt-drawer', direction, customClass]"
          :style="
            isHorizontal ? `width: ${drawerSize}` : `height:${drawerSize}`
          "
        >
          <!-- header -->
          <header v-if="withHeader" class="lt-drawer__header">
            <slot name="title">
              <span class="lt-drawer__title">{{ title }}</span>
            </slot>
            <button
              @click="handleClose"
              class="lt-drawer__headerbtn"
              v-if="showClose"
            >
              x
            </button>
          </header>

          <!-- 主要内容 -->
          <template v-if="rendered">
            <section class="lt-drawer__body">
              <slot></slot>
            </section>
          </template>
        </div>
      </lt-overlay>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { computed } from "vue";
import { defineComponent, SetupContext } from "@vue/runtime-core";
import { props } from "./props.ts";
import useDialog from "../lt-dialog/useDialog";

export default defineComponent({
  name: "LtDrawer",
  props,
  emits: ["update:modalValue"],

  setup(props, ctx: SetupContext) {
    // 指定drawer的宽度或者高度的
    const drawerSize = computed(() => {
      return typeof props.size === "number"
        ? `${props.size}px`
        : `${props.size}`;
    });

    // drawer的方向

    const isHorizontal = computed(() => {
      return props.direction === "rtl" || props.direction === "ltr";
    });

    return {
      ...useDialog(props, ctx),
      drawerSize,
      isHorizontal,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-drawer.scss";
</style>
