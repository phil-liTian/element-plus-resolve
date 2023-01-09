<template>
  <button
    :class="[
      'lt-button',
      type ? `lt-button--${type}` : '',
      buttonSize && `lt-button--${buttonSize}`,
      {
        'is-round': round,
        'is-circle': circle,
        'is-disabled': buttonDisabled,
      },
    ]"
    :disabled="buttonDisabled"
    :type="nativeType"
    @click="handleClick"
  >
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script lang="ts">
import { props } from "./props";
import { computed, defineComponent } from "@vue/runtime-core";
import { useGlobalConfig } from "@u/utils.ts";

export default defineComponent({
  name: "LtButton",
  props,
  emits: ["click"],
  setup(props, { emit }) {
    const $ELEMENT = useGlobalConfig();

    const buttonSize = computed(() => {
      return props.size || $ELEMENT.size;
    });

    const buttonDisabled = computed(() => {
      return props.disabled;
    });

    // methods
    const handleClick = (evt: MouseEvent) => {
      emit("click", evt);
    };

    return {
      buttonSize,
      buttonDisabled,
      handleClick,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-button.scss";
</style>
