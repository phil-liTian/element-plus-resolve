<template>
  <div ref="root" class="lt-affix" :style="rootStyle">
    <div :class="{ 'lt-affix--fixed': fixed }" :style="affixStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  toRefs,
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  watch,
} from "@vue/runtime-core";
import { on, off, getScrollContainer } from "@u/dom.ts";
import throwError from "@u/error.ts";

type Position = "top" | "bottom";
const SCOPE = "Affix";

export default defineComponent({
  name: "LtAffix",
  props: {
    offset: {
      type: Number,
      default: 0,
    },
    target: {
      type: String,
      default: "",
    },
    position: {
      type: String as PropType<Position>,
      default: "top",
    },
    zIndex: {
      type: Number,
      default: 100,
    },
  },
  emits: ["change", "scroll"],
  setup(props, { emit }) {
    // 固定的目标区域
    const target = ref(null);
    const root = ref(null);
    // 滚动容器
    const scrollContainer = ref(null);

    const state = reactive({
      fixed: false,
      width: 0,
      height: 0,
      scrollTop: 0,
      clientHeight: 0,
      transform: 0,
    });

    const rootStyle = computed(() => {
      return {
        width: state.fixed ? `${state.width}px` : "",
        height: state.fixed ? `${state.height}px` : "",
      };
    });

    // affix的内容样式
    const affixStyle = computed(() => {
      if (!state.fixed) return {};
      const offset = props.offset ? `${props.offset}px` : 0;
      const transform = state.transform
        ? `translateY(${state.transform}px)`
        : "";

      return {
        height: `${state.height}px`,
        width: `${state.width}px`,
        top: props.position === "top" ? offset : "",
        bottom: props.position === "bottom" ? offset : "",
        zIndex: props.zIndex,
        transform,
      };
    });

    const update = () => {
      const rootRect = root.value.getBoundingClientRect();
      const targetRect = target.value.getBoundingClientRect();
      state.height = rootRect.height;
      state.width = rootRect.width;
      state.scrollTop =
        scrollContainer.value === window
          ? document.documentElement.scrollTop
          : scrollContainer.value.scrollTop;

      state.clientHeight = document.documentElement.clientHeight;

      if (props.position === "top") {
        // 顶部固定
        if (props.target) {
          // TODO: 指定了target
          const difference = targetRect.bottom - props.offset - state.height;
          state.fixed = props.offset > rootRect.top && targetRect.bottom > 0;
          state.transform = difference < 0 ? difference : 0;
        } else {
          state.fixed = props.offset > rootRect.top;
        }
      } else {
        // 底部固定
        if (props.target) {
          // TODO: 指定了target
        } else {
          state.fixed = state.clientHeight - props.offset < rootRect.bottom;
        }
      }
    };

    // 滚动事件
    const onScroll = () => {
      update();

      emit("scroll", {
        scrollTop: state.scrollTop,
        fixed: state.fixed,
      });
    };

    watch(
      () => state.fixed,
      () => {
        emit("change", state.fixed);
      }
    );

    onMounted(() => {
      if (props.target) {
        target.value = document.querySelector(props.target);
        if (!target.value) {
          throwError(SCOPE, `target is not exist:  ${props.target}`);
        }
      } else {
        target.value = document.documentElement;
      }
      scrollContainer.value = getScrollContainer(root.value);
      // 给滚动容器添加滚动事件
      on(scrollContainer.value, "scroll", onScroll);
    });

    onBeforeUnmount(() => {
      off(scrollContainer.value, "scroll", onScroll);
    });

    return {
      root,
      ...toRefs(state),
      affixStyle,
      rootStyle,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-affix.scss";
</style>
