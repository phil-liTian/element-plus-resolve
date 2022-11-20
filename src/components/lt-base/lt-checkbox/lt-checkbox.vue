<template>
  <label
    class="lt-checkbox"
    role="checkbox"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled"
    :class="[
      border && checkboxSize ? `lt-checkbox--${checkboxSize}` : '',
      {
        'is-checked': isChecked,
        'is-disabled': isDisabled,
        'is-bordered': border, // 带边框
      },
    ]"
  >
    <!-- 用于标记是否选中 -->
    <span
      class="lt-checkbox__input"
      :class="{
        'is-checked': isChecked,
        'is-disabled': isDisabled,
        'is-focus': focus,
      }"
    >
      <span class="lt-checkbox__inner"></span>

      <!-- 模仿原生type=[checkbox]的input的行为 -->
      <input
        v-model="model"
        class="lt-checkbox__original"
        :name="name"
        :value="label"
        :disabled="isDisabled"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        type="checkbox"
      />
    </span>

    <!-- 内容区域，有默认插槽 -->
    <span v-if="$slots.default || label" class="lt-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { props } from "./props";
import { useCheckbox } from "./useCheckbox";

export default defineComponent({
  name: "LtCheckbox",
  props,
  setup(props) {
    return useCheckbox(props);
  },
});
</script>

<style lang="scss">
@import "./lt-checkbox.scss";
</style>
