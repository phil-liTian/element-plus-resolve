<template>
  <div
    :class="[
      type === 'textarea' ? 'lt-textarea' : 'lt-input',
      inputSize ? `lt-input--${inputSize}` : '',
      {
        'is-disabled': inputDisabled,
        'is-exceed': inputExceed,
        'lt-input-group': $slots.prepend || $slots.append,
        'lt-input-group--prepend': $slots.prepend,
        'lt-input-group--append': $slots.append,
        'lt-input--prefix': $slots.prefix || prefixIcon,
        'lt-inpit--suffix': $slots.suffix || suffixIcon,
      },
      $attrs.class,
    ]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- 不为textarea -->
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div v-if="$slots.prepend" class="lt-input-group__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="lt-input__wrapper">
        <input
          v-bind="attrs"
          ref="input"
          class="lt-input__inner"
          :placeholder="placeholder"
          :disabled="inputDisabled"
          :readonly="readonly"
          :tabindex="tabindex"
          :autocomplete="autocomplete"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :style="inputStyle"
          @compositionstart="handleCompositionStart"
          @compositionend="handleCompositionEnd"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          @keydown="handleKeydown"
        />
        <!-- 前置内容 -->
        <div v-if="$slots.prefix || prefixIcon" class="lt-input__prefix">
          <slot name="prefix"></slot>
          <i v-if="prefixIcon" :class="['lt-input__icon', prefixIcon]"></i>
        </div>
        <!-- 后置内容 -->
        <div v-if="getSuffixVisible()" class="lt-input__suffix">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <i v-if="suffixIcon" :class="['lt-input__icon', suffixIcon]"></i>
          </template>
          <!-- 清空 -->
          <i v-if="showClear" class="el-icon-circle-close" @click="clear"></i>
          <!-- 显示显示、隐藏按钮 -->
          <i
            v-if="showPwdVisible"
            @click="handlePasswordVisible"
            class="el-icon-view"
          ></i>
          <!-- 计数 -->
          <span v-if="isWordLimitVisible" class="lt-input__count">
            <span class="lt-input__count-inner">
              {{ textLength }} / {{ maxlength }}
            </span>
          </span>
        </div>
      </div>
      <!-- 后置元素 -->
      <div v-if="$slots.append" class="lt-input-group__append">
        <slot name="append"></slot>
      </div>
    </template>

    <textarea
      ref="textarea"
      class="lt-textarea__inner"
      v-bind="attrs"
      :tabindex="tabindex"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :disabled="inputDisabled"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @keydown="handleKeydown"
      v-else
    ></textarea>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  nextTick,
  onMounted,
  watch,
  shallowRef,
} from "@vue/runtime-core";
import { props } from "./props";
import { UPDATE_MODEL_EVENT } from "@u/constant.ts";
import useAttrs from "../hooks/use-attrs/index";

export default defineComponent({
  name: "LtInput",
  props,
  emits: [
    UPDATE_MODEL_EVENT,
    "mouseenter",
    "mouseleave",
    "clear",
    "input",
    "change",
    "keydown",
    "focus",
    "blur",
  ],
  setup(props, { emit, slots }) {
    const input = ref(null);
    const textarea = ref(null);
    // 透传属性
    const attrs = useAttrs();
    // 正在输入中文的过程中
    const isComposing = ref(false);
    // 标志鼠标是否正在经过
    const hovering = ref(false);
    // 聚焦
    const focused = ref(false);
    const passwordVisible = ref(false);
    const inputOrTextarea = computed(() => input.value || textarea.value);
    const inputSize = computed(() => props.size);
    const _textareaCalcStyle = shallowRef(props.inputStyle);
    // 原始输入的值
    const nativeInputValue = computed(() =>
      props.modelValue === null || props.modelValue === undefined
        ? ""
        : String(props.modelValue)
    );

    // textarea的样式
    const computedTextareaStyle = computed(() => {
      return {
        ...props.inputStyle,
        ..._textareaCalcStyle.value,
        resize: props.resize,
      };
    });

    // 控制密码的显示隐藏
    const showPwdVisible = computed(() => {
      return (
        props.showPassword &&
        !inputDisabled.value &&
        !props.readonly &&
        (!!nativeInputValue.value || focused.value)
      );
    });
    // 控制后置内容是否展示
    const getSuffixVisible = () => {
      return (
        slots.suffix ||
        props.suffixIcon ||
        isWordLimitVisible.value ||
        showClear.value
      );
    };

    // 控制输入内容长度是否限制
    const isWordLimitVisible = computed(() => {
      return props.showWordLimit && props.maxlength && !inputDisabled;
    });

    // 是否显示清空按钮
    const showClear = computed(() => {
      return (
        props.clearable &&
        hovering.value &&
        nativeInputValue.value &&
        !inputDisabled.value
      );
    });

    // 禁用input
    const inputDisabled = computed(() => {
      return props.disabled;
    });

    // 当前输入内容长度
    const textLength = computed(() => {
      return Array.from(nativeInputValue.value).length;
    });

    // 计算当前input输入的长度是否超过上限
    const inputExceed = computed(() => {
      return (
        isWordLimitVisible.value && textLength.value > Number(props.maxlength)
      );
    });

    // 实现更改当前input中的值
    const setNativeInputValue = () => {
      const input = inputOrTextarea.value;
      if (!input || input.value === nativeInputValue.value) return;
      input.value = nativeInputValue.value;
    };

    const handleCompositionStart = () => {
      isComposing.value = true;
    };

    const handleCompositionEnd = (e) => {
      if (isComposing.value) {
        isComposing.value = false;
        handleInput(e);
      }
    };

    // 真正处理输入的逻辑
    const handleInput = (e) => {
      if (isComposing.value) return;
      let { value } = e.target;
      // 值没发生改变的时候，不触发input事件
      if (value === nativeInputValue.value) return;

      // 如果设置了最大长度，则走当前逻辑
      if (props.maxlength) {
        const sliceIndex = inputExceed.value
          ? textLength.value
          : props.maxlength;
        value = Array.from(value).slice(0, Number(sliceIndex)).join("");
      }

      // 用于实现v-model双向绑定
      emit(UPDATE_MODEL_EVENT, value);
      // 抛出iuput事件
      emit("input", value);

      // 更改当前input中的value, 这里需要页面渲染结束之后再去改变nativeValue的值
      nextTick(setNativeInputValue);
    };

    // 聚焦
    const handleFocus = (event) => {
      focused.value = true;
      emit("focus", event);
    };

    // 改变值
    const handleChange = (event) => {
      emit("change", event.target.value);
    };

    // 失焦
    const handleBlur = (event) => {
      focused.value = false;
      emit("blur", event);
      // TODO: form表单校验
      // if(props.validateEvent) {

      // }
    };

    // 清空输入的内容
    const clear = () => {
      emit(UPDATE_MODEL_EVENT, "");
      emit("clear");
      emit("input", "");
      emit("change", "");
    };

    // 展示密码
    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value;
      focus();
    };

    // 键盘按下事件
    const handleKeydown = (e) => {
      emit("keydown", e);
    };

    const focus = () => {
      nextTick(() => {
        inputOrTextarea.value.focus();
      });
    };

    const blur = () => {
      inputOrTextarea.value.blur();
    };

    // 鼠标经过事件
    const onMouseEnter = (e) => {
      hovering.value = true;
      emit("mouseenter", e);
    };

    const onMouseLeave = (e) => {
      hovering.value = false;
      emit("mouseleave", e);
    };

    // input中的value可带初始化的值
    onMounted(() => {
      setNativeInputValue();
    });

    // input中的value可能由其它事件触发改变
    watch(
      () => nativeInputValue.value,
      () => {
        setNativeInputValue();
      }
    );

    return {
      input,
      textarea,
      attrs,
      textLength, // 输入内容的长度
      inputExceed, // 是否达到输入长度上限
      isComposing,
      handleCompositionStart,
      handleCompositionEnd,
      handleInput,
      handleFocus,
      handleBlur,
      handleChange,
      nativeInputValue,
      isWordLimitVisible,
      showPwdVisible,
      getSuffixVisible,
      onMouseEnter,
      onMouseLeave,
      showClear,
      clear,
      inputDisabled,
      inputSize, // input的尺寸
      passwordVisible, // 标志密码是否可见
      handlePasswordVisible,
      handleKeydown,
      computedTextareaStyle,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-input.scss";
</style>
