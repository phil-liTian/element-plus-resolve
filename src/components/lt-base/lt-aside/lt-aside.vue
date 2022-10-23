<template>
  <aside class="lt-aside">
    <slot></slot>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "LtAside",
  props: {
    width: {
      type: String,
      default: null,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
@import "./lt-aside.scss";
</style>
