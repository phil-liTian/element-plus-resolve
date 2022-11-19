<template>
  <label
    class="lt-radio-button"
    :class="[
      size && `lt-radio-button--${size}`,
      {
        'is-active': label === value,
      },
    ]"
    role="radio"
  >
    <input
      ref=""
      class="lt-radio-button__original-radio"
      v-model="value"
      type="radio"
      :value="label"
    />

    <span class="lt-radio-button__inner">
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { defineComponent } from "@vue/runtime-core";
import { useRadio } from "../lt-radio/useRadio";

export default defineComponent({
  name: "LtRadioButton",
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const radioRef = ref<HTMLInputElement>(null);
    const { radioGroup } = useRadio();
    const size = computed(() => {
      console.log("radioGroup1", radioGroup.size);

      return radioGroup.size;
    });

    const value = computed<boolean | string | number>({
      get() {
        return radioGroup.modelValue;
      },

      set(newVal) {
        radioGroup.changeEvent(newVal);
        radioRef.value.checked = radioGroup.modelValue === props.label;
      },
    });

    return {
      size,
      value,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-radio-button.scss";
</style>
