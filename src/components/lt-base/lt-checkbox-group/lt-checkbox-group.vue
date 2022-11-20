<template>
  <div class="lt-checkbox-group" role="group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, provide } from "@vue/runtime-core";
import { computed, toRefs } from "vue";
import { props } from "./props";
import { UPDATE_MODEL_EVENT } from "@u/constant.ts";
export default defineComponent({
  name: "LtCheckboxGroup",
  props,
  emits: [UPDATE_MODEL_EVENT, "change"],
  setup(props, { emit }) {
    const changeEvent = (value) => {
      emit(UPDATE_MODEL_EVENT, value);

      nextTick(() => {
        emit("change", value);
      });
    };

    const checkboxGroupSize = computed(() => props.size);

    const modelValue = computed({
      get() {
        return props.modelValue;
      },

      set(val) {
        changeEvent(val);
      },
    });

    provide("CheckboxGroup", {
      name: "LtCheckboxGroup",
      modelValue,
      changeEvent,
      ...toRefs(props),
      checkboxGroupSize,
    });
  },
});
</script>

<style lang="scss"></style>
