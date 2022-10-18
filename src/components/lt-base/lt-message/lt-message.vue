<template>
  <transition name="lt-message-fade">
    <div
      v-show="visible"
      role="alert"
      :style="customStyle"
      :id="id"
      :class="[
        'lt-message',
        type && `lt-message--${type}`,
        center && 'is-center',
        customClass,
      ]"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="lt-message__content">
          {{ message }}
        </p>
        <p v-else class="lt-message__content" v-html="message"></p>
      </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { ref, onMounted } from "vue";
import { props } from "./props";

export default defineComponent({
  name: "LtMessage",
  props,
  setup(props) {
    const customStyle = computed(() => {
      return {
        top: `${props.offset}px`,
        zIndex: props.zIndex,
      };
    });

    const visible = ref(false);
    let timer = null;

    const startTimer = () => {
      const { duration } = props;
      if (duration) {
        timer = setTimeout(() => {
          if (visible.value) {
            close();
          }
        }, duration);
      }
    };

    const close = () => {
      visible.value = false;
    };

    const clearTimer = () => {
      clearTimeout(timer);
      timer = null;
    };

    onMounted(() => {
      visible.value = true;
      startTimer();
    });

    return {
      customStyle,
      visible,
      startTimer,
      clearTimer,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-message.scss";
</style>
