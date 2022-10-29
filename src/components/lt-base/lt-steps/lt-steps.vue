<template>
  <div class="lt-steps">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "LtSteps",
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
@import "./lt-steps.scss";
</style>
