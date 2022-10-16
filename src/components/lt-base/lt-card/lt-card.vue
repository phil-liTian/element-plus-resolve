<template>
  <div
    class="lt-card"
    :class="shadow ? `is-${shadow}-shadow` : `is-always-shadow`"
  >
    <div v-if="$slots.header || header" class="lt-card__header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="lt-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { props } from "./props";
export default defineComponent({
  name: "LtCard",
  props,
});
</script>

<style lang="scss">
@import "./lt-card.scss";
</style>
