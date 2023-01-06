<template>
  <div
    class="lt-carousel__item"
    :class="{
      'is-animating': animating,
      'is-in-stage': isStage,
      'is-active': active,
      'lt-carousel__item--card': type === 'card',
    }"
    :style="itemStyle"
    v-show="ready"
    @click="handleItemClick"
  >
    <div v-if="type === 'card'" class="lt-carousel__mask"></div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted } from "@vue/runtime-core";
import { inject, getCurrentInstance, onMounted, reactive, toRefs } from "vue";
import {
  InjectCarouselScope,
  ICarouselItemProps,
} from "../lt-carousel/carousel";
const CARD_SCALE = 0.83;

export default defineComponent({
  name: "LtCarouselItem",
  props: {
    label: {
      type: [String, Number],
      default: "",
    },
  },
  setup(props: ICarouselItemProps) {
    // 组件实例对象
    const instance = getCurrentInstance();

    const state = reactive({
      ready: false,
      translate: 0,
      scale: 1,
      animating: false,
      isStage: false,
      active: false,
    });

    const injectCarouselScope: InjectCarouselScope = inject(
      "injectCarouselScope"
    );

    // computed
    const parentDirection = computed(() => {
      return injectCarouselScope.direction;
    });

    const itemStyle = computed(() => {
      const translateType =
        parentDirection.value === "vertical" ? "translateY" : "translateX";

      const value = `${translateType}(${state.translate}px) scale(${state.scale})`;

      const style = { transform: value };

      return style;
    });

    // 计算type为card时的偏移量
    const calcCardTranslate = (index, activeIndex) => {
      const parentWidth = injectCarouselScope.root.value?.offsetWidth || 0;
      if (state.isStage) {
        return (
          (parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1)) / 4
        );
      } else if (index < activeIndex) {
        return (-(1 + CARD_SCALE) * parentWidth) / 4;
      } else {
        return ((3 + CARD_SCALE) * parentWidth) / 4;
      }
    };

    // 计算当前index的值
    const processIndex = (index, activeIndex, length) => {
      // 当前是第一个
      if (activeIndex === 0 && index === length - 1) {
        return -1;
      } else if (activeIndex === length - 1 && index === 0) {
        // 最后一个
        return length;
      }
      return index;
    };

    // 计算非card类型偏移量
    const calcTranslate = (index, activeIndex, isVertical) => {
      const distance =
        (isVertical
          ? injectCarouselScope.root.value.offsetHeight
          : injectCarouselScope.root.value.offsetWidth) || 0;

      return distance * (index - activeIndex);
    };

    const translateItem = (
      index: number,
      activeIndex: number,
      oldIndex: number
    ) => {
      const parentType = injectCarouselScope.type;
      const length = injectCarouselScope.items.value?.length;

      // 给前一个激活的card和当前激活的card添加动画效果
      if (parentType !== "card" && oldIndex !== undefined) {
        state.animating = index === activeIndex || index === oldIndex;
      }

      if (parentType === "card") {
        if (parentDirection.value === "vertical") {
          console.warn("vertical carousel is not supported in card mode");
        }
        if (index !== activeIndex && length > 2) {
          index = processIndex(index, activeIndex, length);
        }

        state.active = index === activeIndex;
        state.isStage = Math.abs(index - activeIndex) <= 1;
        state.translate = calcCardTranslate(index, activeIndex);
        state.scale = state.active ? 1 : CARD_SCALE;
      } else {
        const isVertical = parentDirection.value === "vertical";
        // 设置偏移量
        state.translate = calcTranslate(index, activeIndex, isVertical);
      }

      state.ready = true;
    };

    const handleItemClick = () => {
      if (injectCarouselScope?.type === "card") {
        const index = injectCarouselScope.items.value.findIndex(
          (item) => item.uid === instance.uid
        );
        injectCarouselScope.setActiveItem(index);
      }
    };

    onMounted(() => {
      if (injectCarouselScope.addItem) {
        injectCarouselScope.addItem({
          uid: instance.uid,
          ...props,
          translateItem,
        });
      }
    });

    onUnmounted(() => {
      if (injectCarouselScope.removeItem) {
        injectCarouselScope.removeItem(instance.uid);
      }
    });

    return {
      ...toRefs(state),
      type: injectCarouselScope.type,
      itemStyle,
      handleItemClick,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-carousel-item.scss";
</style>
