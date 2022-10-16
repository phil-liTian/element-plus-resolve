<template>
  <button
    :class="[
      'lt-button',
      `lt-button--${type}`,
      buttonSize && `lt-button--${buttonSize}`,
    ]"
    @click="handleClick"
  >
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script lang="ts">
import { props } from "./props";
import { computed, defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "LtButton",
  props,
  emits: ["click"],

  setup(props, { emit }) {
    // const $ELEMENT = useGlobalConfig();

    const buttonSize = computed(() => {
      return props.size;
    });

    // const buttonDisabled = computed(() => {
    //   return props.disabled;
    // });

    // methods
    const handleClick = (evt: MouseEvent) => {
      emit("click", evt);
    };

    return {
      buttonSize,
      // buttonDisabled,
      handleClick,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-button.scss";
</style>
