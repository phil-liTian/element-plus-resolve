<template>
  <transition name="lt-fade-in">
    <div
      v-show="visible"
      class="lt-backtop"
      :style="backtopStyle"
      @click.stop="handleClick"
    >
      <slot>
        <i class="el-icon-caret-top"></i>
      </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  PropType,
} from "@vue/runtime-core";
import { computed } from "vue";
import { on, off } from "@u/dom.ts";
import throttle from "lodash/throttle";
import { easeInOutCubic } from "@u/animation.ts";
import throwError from "@u/error.ts";
export default defineComponent({
  name: "LtBacktop",
  props: {
    right: {
      type: Number,
      default: 40,
    },

    bottom: {
      type: Number,
      default: 40,
    },

    visibleHeight: {
      type: Number,
      default: 200,
    },

    target: {
      type: String as any,
      default: "",
    },
  },

  emits: ["click"],
  setup(props, { emit }) {
    const visible = ref(false);
    const el = ref(null);
    const container = ref(null);
    const scope = "LtBacktop";

    const backtopStyle = computed(() => {
      return {
        right: `${props.right}px`,
        bottom: `${props.bottom}px`,
      };
    });

    const onScroll = () => {
      visible.value = el.value.scrollTop >= props.visibleHeight;
    };

    // 节流，300ms只可以调用一次
    const throttleScrollHandler = throttle(onScroll, 300);

    const scrollTop = () => {
      const beginTime = Date.now();
      const beginValue = el.value.scrollTop;

      const rAF =
        window.requestAnimationFrame || ((func) => setTimeout(func, 16));

      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500;

        if (progress < 1) {
          el.value.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          rAF(frameFunc);
        } else {
          el.value.scrollTop = 0;
        }
      };

      rAF(frameFunc);
    };

    const handleClick = (evt) => {
      scrollTop();
      emit("click", evt);
    };

    onMounted(() => {
      container.value = document;
      el.value = document.documentElement;

      if (props.target) {
        el.value = document.querySelector(props.target);
        if (!el.value) {
          return throwError(
            scope,
            `this element is not exist: ${props.target}`
          );
        }
        container.value = el.value;
      }

      // 给document注册scroll事件
      on(container.value, "scroll", throttleScrollHandler);
    });

    onBeforeUnmount(() => {
      off(container.value, "scroll", throttleScrollHandler);
    });

    return {
      backtopStyle,
      visible,
      onScroll,
      handleClick,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-backtop.scss";
</style>
