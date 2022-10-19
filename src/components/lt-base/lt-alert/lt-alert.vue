<template>
  <transition name="lt-alert-fade">
    <div
      v-show="visible"
      class="lt-alert"
      :class="[typeClass, `is-${effect}`, center && 'is-center']"
    >
      <div class="lt-alert__conent" role="alert">
        <!-- 标题 -->
        <span
          v-if="title || $slots.default"
          class="lt-alert__title"
          :class="[isBoldTitle]"
        >
          <slot name="title">{{ title }}</slot>
        </span>

        <!-- 描述 -->
        <p v-if="$slots.default || !!description" class="lt-alert__description">
          <slot>{{ description }}</slot>
        </p>

        <!-- 关闭按钮 -->
        <span class="lt-alert__closeBtn" @click="close">x</span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { props } from "./props";
import { computed, ref } from "vue";
export default defineComponent({
  name: "LtAlert",
  props,
  emit: ["close"],
  setup(props, { emit }) {
    const visible = ref(true);
    const typeClass = computed(() => {
      return `lt-alert--${props.type}`;
    });

    const isBoldTitle = computed(() => {
      return props.description ? "is-bold" : "";
    });

    const close = () => {
      visible.value = false;
      emit("close");
    };

    return {
      visible,
      typeClass,
      isBoldTitle,
      close,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-alert.scss";
</style>
