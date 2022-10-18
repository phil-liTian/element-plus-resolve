<template>
  <a
    :class="[
      'lt-link',
      type ? `lt-link--${type}` : '',
      disabled && `is-disabled`,
      underline && !disabled && 'is-underline',
    ]"
    :href="href"
    @click="handleClick"
  >
    <span v-if="$slots.default" class="lt-link--inner">
      <slot></slot>
    </span>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { props } from "./props";
export default defineComponent({
  name: "LtLink",
  props,

  emits: ["click"],
  setup(props, { emit }) {
    const handleClick = (evt: Event) => {
      if (!props.disabled) {
        emit("click", evt);
      }
    };
    return {
      handleClick,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-link.scss";
</style>
