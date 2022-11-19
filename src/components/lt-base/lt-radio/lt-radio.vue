<template>
  <label
    class="lt-radio"
    role="radio"
    :class="{
      'is-checked': model === label,
      'is-disabled': isDisabled,
      'is-bordered': border,
      [`lt-radio--${radioSize || 0}`]: radioSize && border,
    }"
    @keydown="model = isDisabled ? model : label"
  >
    <span
      class="lt-radio__input"
      :class="{
        'is-checked': model === label,
        'is-disabled': isDisabled,
      }"
    >
      <span class="lt-radio__inner"></span>
      <!-- 原生的radio标签 -->
      <input
        class="lt-radio__original"
        ref="radioRef"
        v-model="model"
        :name="name"
        :value="label"
        :disabled="isDisabled"
        type="radio"
        @change="handleChange"
      />
    </span>
    <span class="lt-radio__label">
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick } from "@vue/runtime-core";
import { ref } from "vue";
import { props } from "./props";
import { UPDATE_MODEL_EVENT } from "@u/constant.ts";
import { useRadio, useRadioAttr } from "./useRadio";
export default defineComponent({
  name: "LtRadio",
  props,
  setup(props, { emit }) {
    const radioRef = ref(null);

    const { radioGroup, isGroup } = useRadio();
    const { isDisabled, radioSize } = useRadioAttr(props, {
      isGroup,
      radioGroup,
    });

    // 真正绑定的值
    const model = computed<string | number | boolean>({
      get() {
        return isGroup.value ? radioGroup.modelValue : props.modelValue;
      },

      set(newVal) {
        if (isGroup.value) {
          radioGroup.changeEvent(newVal);
        } else {
          emit(UPDATE_MODEL_EVENT, newVal);
        }
        radioRef.value.checked = props.modelValue === props.label;
      },
    });

    const handleChange = () => {
      nextTick(() => {
        emit("change", model.value);
      });
    };

    return {
      radioRef,
      model,
      handleChange,
      isDisabled,
      radioSize,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-radio.scss";
</style>
