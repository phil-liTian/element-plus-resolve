<template>
  <div :class="['lt-divider', `lt-divider--${direction}`]">
    <div
      v-if="$slots.default && direction !== 'vertical'"
      :class="['lt-divider__text', `is-${contentPosition}`]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { props } from "./props";
export default defineComponent({
  name: "LtDivider",
  props,
});
</script>

<style lang="scss">
@import "./lt-divider.scss";
</style>
