<template>
  <!-- 在teleport上使用disabled 可以控制是否添加到to指定的dom节点上 -->
  <teleport to="body" :disabled="!appendToBody">
    <transition
      name="dialog-fade"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <lt-overlay
        :overLayClass="modalClass"
        :mask="modal"
        :zIndex="zIndex"
        v-show="visible"
        @click="onModalClick"
      >
        <div
          :class="[
            'lt-dialog',
            customClass,
            {
              'is-fullscreen': fullscreen,
            },
          ]"
          :style="style"
        >
          <div class="lt-dialog__header">
            <!-- 标题 -->
            <slot name="title">
              <span class="lt-dialog__title">{{ title }}</span>
            </slot>
            <!-- 关闭按钮 -->
            <button
              v-if="showClose"
              class="lt-dialog__headerbtn"
              @click="handleClose"
            >
              x
            </button>
          </div>

          <!-- 内容区域 -->
          <template v-if="rendered">
            <div class="lt-dialog__body">
              <slot></slot>
            </div>
          </template>

          <!-- 底部区域 -->
          <div v-if="$slots.footer" class="lt-dialog__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </lt-overlay>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from "@vue/runtime-core";
import { props } from "./props.ts";
import useDialog from "./useDialog";
export default defineComponent({
  name: "LtDialog",
  props,
  setup(props, ctx: SetupContext) {
    return {
      ...useDialog(props, ctx),
    };
  },
});
</script>

<style lang="scss">
@import "./lt-dialog.scss";
</style>
