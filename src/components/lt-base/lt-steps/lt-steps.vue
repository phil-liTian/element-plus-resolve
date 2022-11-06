<template>
  <div
    class="lt-steps"
    :class="simple ? 'lt-steps--simple' : `lt-steps--${direction}`"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { provide, ref, watch } from "vue";
import { CHANGE_EVENT } from "@u/constant.ts";
import { props } from "./props";

export default defineComponent({
  name: "LtSteps",
  props,
  emits: [CHANGE_EVENT],
  setup(props, { emit }) {
    const steps = ref([]);

    provide("LtSteps", { props, steps });

    watch(steps, () => {
      steps.value.forEach((instance, idx) => {
        instance.setIndex(idx);
      });
    });

    watch(
      () => props.active,
      (newVal, oldVal) => {
        emit(CHANGE_EVENT, newVal, oldVal);
      }
    );

    return {
      steps,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-steps.scss";
</style>
