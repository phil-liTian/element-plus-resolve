<template>
  <div class="lt-button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "LtButtonGroup",
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
@import "./lt-button-group.scss";
</style>
