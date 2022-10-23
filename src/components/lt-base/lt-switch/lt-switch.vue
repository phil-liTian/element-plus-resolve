<template>
  <div
    class="lt-switch"
    :class="{
      'is-checked': checked,
      'is-disabled': switchDisabled,
    }"
    role="switch"
    @click.prevent="switchValue"
  >
    <input
      :id="id"
      :name="name"
      :true-value="activeValue"
      :false-value="inActiveValue"
      :disabled="switchDisabled"
      class="lt-switch__input"
      ref="input"
      type="checkbox"
      @keyup.enter="switchValue"
    />
    <!-- 前置内容 -->
    <span
      :class="[
        'lt-switch__label',
        'lt-switch__label--left',
        !checked ? 'is-active' : '',
      ]"
      v-if="inactiveText"
    >
      <span>{{ inactiveText }}</span>
    </span>
    <!-- 核心部分 -->
    <span ref="core" class="lt-switch__core" :style="`width: ${width}px`">
      <div class="lt-switch__action"></div>
    </span>
    <!-- 后置内容 -->
    <span
      :class="[
        'lt-switch__label',
        'lt-switch__label--right',
        checked ? 'is-active' : '',
      ]"
      v-if="activeText"
    >
      <span>{{ activeText }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { isPromise } from "@vue/shared";
import { computed, ref, onMounted, watch } from "vue";
import { props } from "./props";
export default defineComponent({
  name: "LtSwitch",
  props,
  emits: ["update:modelValue", "change", "input"],

  setup(props, { emit }) {
    const core = ref(null);

    const isModelValue = ref(props.modelValue !== false);

    const actualValue = computed(() => {
      return isModelValue.value ? props.modelValue : props.value;
    });

    const checked = computed(() => {
      return actualValue.value === props.activeValue;
    });

    // 改变值
    const handleChange = () => {
      const val = checked.value ? props.inActiveValue : props.activeValue;
      emit("update:modelValue", val);
      emit("change", val);
      emit("input", val);
    };

    const switchValue = (): void => {
      if (switchDisabled.value) return;

      const { beforeChange } = props;
      // 没有beforechange 直接改变值
      if (!beforeChange) {
        handleChange();
        return;
      }
      // 执行结果需要是一个promise或者是一个boolean类型的值
      const shouldChange = beforeChange();

      if (isPromise(shouldChange)) {
        shouldChange
          .then((res) => {
            if (res) {
              handleChange();
            }
          })
          .catch((err) => {
            console.warn(err);
          });
      } else if (shouldChange) {
        handleChange();
      }
    };

    const switchDisabled = computed(() => {
      return props.disabled;
    });

    // 设置背景色的共用方法
    const setBackgroundColor = () => {
      const newColor = checked.value ? props.activeColor : props.inActiveColor;
      const coreEl: any = core.value;

      if (props.borderColor) {
        coreEl.style.borderColor = props.borderColor;
      } else {
        coreEl.style.borderColor = newColor;
      }

      coreEl.style.backgroundColor = newColor;
    };

    watch(
      () => checked.value,
      () => {
        setBackgroundColor();
      }
    );

    // 初始化数据
    onMounted(() => {
      if (props.activeColor || props.inActiveColor || props.borderColor) {
        setBackgroundColor();
      }
    });

    return {
      core,
      checked,
      switchValue,
      switchDisabled,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-switch.scss";
</style>
