<template>
  <transition
    name="lt-notification-fade"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      class="lt-notification"
      :class="[horizontalClass, typeClass]"
      :style="positionStyle"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      @click="onClick"
    >
      <div class="lt-notification__group">
        <!-- 标题 -->
        <h2 class="lt-notification__title" v-text="title"></h2>

        <!-- message信息 -->
        <div v-show="message" class="lt-notification__content">
          <slot>
            <p v-if="dangerouslyUseHTMLString" v-html="message"></p>
            <p v-else>{{ message }}</p>
          </slot>
        </div>

        <!-- 关闭按钮 -->
        <button @click.stop="close" class="lt-notification__closeBtn">X</button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { ref, onMounted, onUnmounted } from "vue";
import { props } from "./props.ts";
import { on, off } from "@u/dom.ts";
import { EVENT_CODE } from "@u/aria.ts";
export default defineComponent({
  name: "LtNotify",
  props,

  setup(props) {
    let timer: any = null;
    const visible = ref(false);

    const typeClass = computed(() => {
      const type = props.type;
      return `lt-notification--${type}`;
    });

    // 水平类名：是左边还是右边
    const horizontalClass = computed(() => {
      return props.position.endsWith("left") ? "left" : "right";
    });

    // 垂直属性
    const verticalProperty = computed(() => {
      return props.position.startsWith("top") ? "top" : "bottom";
    });

    const positionStyle = computed(() => {
      return {
        [verticalProperty.value]: `${props.offset}px`,
        zIndex: props.zIndex,
      };
    });

    const close = () => {
      visible.value = false;
    };

    const startTimer = () => {
      if (props.duration > 0) {
        timer = setTimeout(() => {
          if (visible.value) {
            close();
          }
        }, props.duration);
      }
    };

    const clearTimer = () => {
      clearTimeout(timer);
      timer = null;
    };

    // 按删除和回退清除定时器，取消关闭notify，否则开启定时关闭
    const onKeyDown = ({ code }: KeyboardEvent) => {
      if (EVENT_CODE.backspace === code || EVENT_CODE.delete === code) {
        clearTimer();
      } else if (EVENT_CODE.esc === code) {
        if (visible.value) {
          close();
        }
      } else {
        startTimer();
      }
    };

    // 挂载 开启延时
    onMounted(() => {
      startTimer();
      on(document, "keydown", onKeyDown);
      visible.value = true;
    });

    onUnmounted(() => {
      clearTimer();
      off(document, "keydown", onKeyDown);
      visible.value = false;
    });

    return {
      visible,
      close,
      verticalProperty,
      horizontalClass,
      positionStyle,
      startTimer,
      typeClass,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-notify.scss";
</style>
