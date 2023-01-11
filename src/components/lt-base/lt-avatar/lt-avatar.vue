<template>
  <span :class="avatarClass" :style="sizeStyle">
    <img
      v-if="(src || srcSet) && !hasLoadError"
      :src="src"
      :alt="alt"
      :srcset="srcSet"
      :style="fitStyle"
      @error="handleError"
    />
    <i v-else-if="icon" :class="icon"></i>
    <slot v-else></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { computed, ref } from "vue";
import { props } from "./avatar";
const ERROR_EVENT = "error";
export default defineComponent({
  name: "LtAvatar",
  props,
  emits: [ERROR_EVENT],
  setup(props, { emit }) {
    const hasLoadError = ref(false);
    // computed
    const fitStyle = computed(() => ({ objectFit: props.fit }));

    const avatarClass = computed(() => {
      const { shape, size, icon } = props;
      let classes = ["lt-avatar"];
      if (shape) {
        classes.push(`lt-avatar--${shape}`);
      }

      if (size && typeof size === "string") {
        classes.push(`lt-avatar--${size}`);
      }

      if (icon) {
        classes.push("lt-avatar--icon");
      }

      return classes;
    });

    const sizeStyle = computed(() => {
      const { size } = props;
      return typeof size === "number"
        ? {
            height: `${size}px`,
            width: `${size}px`,
            lineHeight: `${size}px`,
          }
        : {};
    });

    const handleError = (e) => {
      hasLoadError.value = true;
      emit(ERROR_EVENT, e);
    };

    return {
      hasLoadError,
      fitStyle,
      sizeStyle,
      handleError,
      avatarClass,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-avatar.scss";
</style>
