<template>
  <div ref="breadcrumb" role="navigation" class="lt-bread">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from "@vue/runtime-core";
import type { IBreadType } from "./bread.type";
export default defineComponent({
  name: "LtBread",

  props: {
    separator: {
      type: String,
      default: "/",
    },
    separatorClass: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    const breadcrumb = ref(null);
    provide<IBreadType>("breadcrumb", props);

    return {
      breadcrumb,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-bread.scss";
</style>
