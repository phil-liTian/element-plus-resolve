<template>
  <div
    ref="root"
    :class="carouselClasses"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
  >
    <!-- 主要内容区域 -->
    <div class="lt-carousel__container" :style="{ height: height }">
      <transition v-if="arrowDisplay" name="carousel-arrow-left">
        <button
          v-show="(arrow === 'always' || hover) && (loop || activeIndex > 0)"
          type="button"
          class="lt-carousel__arrow lt-carousel__arrow--left"
          @click.stop="throttledArrowClick(activeIndex - 1)"
        >
          <i class="el-icon-arrow-left"></i>
        </button>
      </transition>

      <transition v-if="arrowDisplay" name="carousel-arrow-right">
        <button
          v-show="
            (arrow === 'always' || hover) &&
            (loop || activeIndex < items.length - 1)
          "
          type="button"
          class="lt-carousel__arrow lt-carousel__arrow--right"
          @click.stop="throttledArrowClick(activeIndex + 1)"
        >
          <i class="el-icon-arrow-right"></i>
        </button>
      </transition>
      <slot></slot>
    </div>

    <ul v-if="indicatorPosition !== 'none'" :class="indicatorsClasses">
      <li
        v-for="(item, index) in items"
        :key="item.key"
        :class="[
          'lt-carousel__indicator',
          `lt-carousel__indicator--${direction}`,
          { 'is-active': index === activeIndex },
        ]"
        @mouseenter="throttleIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)"
      >
        <button class="lt-carousel__button">
          <span v-if="hasLabel">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  watch,
} from "@vue/runtime-core";
import { computed, reactive, toRefs, ref, provide } from "vue";
import { props, CarouselItem, InjectCarouselScope } from "./carousel";
import { throttle } from "lodash";

export default defineComponent({
  name: "LtCarousel",
  props,
  emits: ["change"],
  setup(props, { emit }) {
    const state = reactive({
      activeIndex: -1, // 当activeIndex初始化变成0的时候，触发watch
      hover: false,
      timer: null,
    });
    // 根元素dom
    const root = ref(null);
    const items = ref([]);
    // computed

    // 动态处理carousel的类
    const carouselClasses = computed(() => {
      let classes = ["lt-carousel", `lt-carousel--${props.direction}`];

      if (props.type === "card") {
        classes.push("lt-carousel--card");
      }

      return classes;
    });

    // 底部切换样式类
    const indicatorsClasses = computed(() => {
      let classes = [
        "lt-carousel__indicators",
        `lt-carousel__indicators--${props.direction}`,
      ];
      // hasLabel
      if (hasLabel.value) {
        classes.push("lt-carousel__indicators--labels");
      }
      // 当type为card或者指定outside的时候, 指示器在容器外
      if (props.indicatorPosition === "outside" || props.type === "card") {
        classes.push("lt-carousel__indicators--outside");
      }

      return classes;
    });

    // 控制左右箭头是否展示
    const arrowDisplay = computed(() => {
      return props.arrow !== "never" && props.direction === "horizontal";
    });

    // 是否有label
    const hasLabel = computed(() => {
      return items.value.some((item) => item.label?.toString().length > 0);
    });

    // methods
    const handleMouseEnter = () => {
      state.hover = true;
      if (props.pauseOnHover) {
        pauseTimer();
      }
    };

    const handleMouseLeave = () => {
      state.hover = false;
      startTimer();
    };

    const throttledArrowClick = throttle(
      (index) => {
        setActiveItem(index);
      },
      300,
      { trailing: true }
    );

    const throttleIndicatorHover = throttle((index) => {
      handleIndicatorHover(index);
    }, 300);

    const handleIndicatorClick = (index) => {
      if (props.trigger === "hover") return;
      state.activeIndex = index;
    };

    const handleIndicatorHover = (index) => {
      if (props.trigger === "hover" && index !== state.activeIndex) {
        state.activeIndex = index;
      }
    };

    // 设置激活的Item
    const setActiveItem = (index) => {
      const length = items.value.length;
      index = Number(index);
      const oldIndex = state.activeIndex;
      // 当index小于0的时候查看最后一张，当index大于等于items的长度的时候，直接查看第一张，否则正常轮播
      if (index < 0) {
        state.activeIndex = props.loop ? length - 1 : 0;
      } else if (index >= length) {
        state.activeIndex = props.loop ? 0 : length - 1;
      } else {
        // 正常轮播
        state.activeIndex = index;
      }

      if (oldIndex === state.activeIndex) {
        resetItemPosition(state.activeIndex);
      }
    };

    // 重置激活的item的位置
    const resetItemPosition = (oldIndex) => {
      items.value.forEach((item, index) => {
        item.translateItem(index, state.activeIndex, oldIndex);
      });
    };

    // 自动播放
    const startTimer = () => {
      state.timer = setInterval(() => playSlides(), props.interval);
    };

    // 停止播放
    const pauseTimer = () => {
      if (state.timer) {
        clearInterval(state.timer);
        state.timer = null;
      }
    };

    // 按顺序轮播
    const playSlides = () => {
      if (state.activeIndex < items.value.length - 1) {
        state.activeIndex = state.activeIndex + 1;
      } else if (props.loop) {
        state.activeIndex = 0;
      }
    };

    // 添加item
    const addItem = (item) => {
      items.value.push(item);
    };

    // 移除item
    const removeItem = (uid) => {
      const index = items.value.findIndex((item) => item.uid === uid);
      if (index !== -1) {
        items.value.splice(index, 1);
        if (index === state.activeIndex) next();
      }
    };

    const next = () => {
      setActiveItem(state.activeIndex + 1);
    };

    provide<InjectCarouselScope>("injectCarouselScope", {
      root,
      items,
      type: props.type,
      direction: props.direction,
      addItem,
      removeItem,
      setActiveItem,
    });

    // 监听激活的carouselItem发生变化
    watch(
      () => state.activeIndex,
      (current, prev) => {
        resetItemPosition(prev);
        if (prev > -1) {
          emit("change", current, prev);
        }
      }
    );

    // 监听是否循环切换
    watch(
      () => props.loop,
      () => {
        setActiveItem(state.activeIndex);
      }
    );

    onMounted(() => {
      // 初始化activeIndex的值
      nextTick(() => {
        console.log("items.value.length", items.value.length);

        if (
          items.value.length > props.initialIndex &&
          props.initialIndex >= 0
        ) {
          state.activeIndex = props.initialIndex;
        }
        startTimer();
      });
    });

    onBeforeUnmount(() => {
      // 停止轮播
      pauseTimer();
    });

    return {
      root,
      ...toRefs(state),
      arrowDisplay,
      hasLabel,
      carouselClasses,
      indicatorsClasses,
      handleMouseEnter,
      handleMouseLeave,
      items,
      throttledArrowClick,
      throttleIndicatorHover,
      handleIndicatorClick,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-carousel.scss";
</style>
