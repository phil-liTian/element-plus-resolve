<template>
  <div class="lt-notification" :class="horizontalClass" :style="positionStyle">
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
      <button class="lt-notification__closeBtn">X</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { props } from "./props.ts";
export default defineComponent({
  name: "LtNotify",
  props,

  setup(props) {
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
      };
    });

    return {
      verticalProperty,
      horizontalClass,
      positionStyle,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-notify.scss";
</style>
