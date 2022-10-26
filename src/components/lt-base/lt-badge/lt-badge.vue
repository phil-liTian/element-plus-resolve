<template>
  <div class="lt-badge">
    <slot></slot>
    <!-- 右上角的内容 -->
    <transition name="lt-zoom-in-center">
      <sup
        v-show="!hidden && (content || isDot || content === 0)"
        class="lt-badge__content"
        :class="[
          isDot ? 'is-dot' : `lt-badge__content--${type}`,
          { 'is-fixed': $slots.default },
        ]"
        v-text="content"
      >
      </sup>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { defineComponent } from "@vue/runtime-core";
import { props } from "./props";
export default defineComponent({
  name: "LtBadge",
  props,
  setup(props) {
    const content: any = computed(() => {
      if (props.isDot) return;

      if (typeof props.value === "number" && typeof props.max === "number") {
        return props.max < props.value ? `${props.max}+` : props.value;
      }

      return props.value;
    });
    return {
      content,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-badge.scss";
</style>
