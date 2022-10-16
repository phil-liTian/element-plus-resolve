<template>
  <span
    :style="{ backgroundColor: color }"
    :class="classes"
    @click="handleClick"
  >
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { computed } from "vue";
import { props } from "./props";
import { useGlobalConfig } from "@u/utils.ts";

export default defineComponent({
  name: "LtTag",

  props,

  emits: ["close", "click"],
  setup(props, { emit }) {
    const ELEMENT = useGlobalConfig();

    const tagSize = computed(() => {
      return props.size || ELEMENT.size;
    });

    const classes = computed(() => {
      const { type, hit, effect } = props;
      return [
        "lt-tag",
        type ? `lt-tag--${type}` : "",
        hit && `is-hit`,
        effect && `lt-tag--${effect}`,
        tagSize.value ? `lt-tag--${tagSize.value}` : "",
      ];
    });

    // methods
    const handleClick = (evt: MouseEvent) => {
      emit("click", evt);
    };

    return {
      classes,
      handleClick,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-tag.scss";
</style>
