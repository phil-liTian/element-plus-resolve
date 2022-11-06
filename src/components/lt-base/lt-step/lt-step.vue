<template>
  <div
    :style="style"
    :class="[
      'lt-step',
      isCenter && 'is-center',
      isLast && 'is-flex',
      isSimple ? 'is-simple' : `is-${parent.props.direction}`,
    ]"
  >
    <div :class="['lt-step__head', `is-${currentStatus}`]">
      <!-- 线条 -->
      <div :class="['lt-step__line', `is-${currentStatus}`]">
        <i class="lt-step__line-inner" :style="lineStyle"></i>
      </div>

      <!-- 中间icon或者数据显示区域 -->
      <div :class="['lt-step__icon', `is-${icon ? 'icon' : 'text'}`]">
        <div class="lt-step__icon-inner">
          {{ index + 1 }}
        </div>
      </div>
    </div>

    <!-- title & description -->
    <div class="lt-step__main">
      <div :class="['lt-step__title', `is-${currentStatus}`]">
        <slot name="title"> {{ title }} </slot>
      </div>
      <div v-if="isSimple" class="lt-step__arrow"></div>
      <div :class="['lt-step__description', `is-${currentStatus}`]">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, ref } from "vue";
import type { StatusType } from "../lt-steps/props";
import {
  defineComponent,
  getCurrentInstance,
  reactive,
} from "@vue/runtime-core";
import type { IStepsInject } from "./props";
import { inject, computed, onMounted, watch } from "vue";

const props = {
  title: {
    type: String,
    default: "",
  },

  description: {
    type: String,
    default: "",
  },

  status: {
    type: String as PropType<StatusType>,
    default: "",
  },

  icon: {
    type: String,
    default: "",
  },
};

export default defineComponent({
  name: "LtStep",
  props,
  setup(props) {
    const index = ref(-1);
    const parent: IStepsInject = inject("LtSteps");
    const lineStyle = ref({});
    const internalStatus = ref("");
    const currentInstance = getCurrentInstance();

    const setIndex = (val) => {
      index.value = val;
    };

    const isCenter = computed(() => {
      return parent.props.alignCenter;
    });

    const isSimple = computed(() => {
      return parent.props.simple;
    });

    const isLast = computed(() => {
      return (
        parent.steps.value[stepsCount.value - 1]?.uid === currentInstance.uid
      );
    });

    const isVertical = computed(() => {
      return parent.props.direction === "vertical";
    });

    const currentStatus: any = computed(() => {
      return props.status || internalStatus.value;
    });

    const stepsCount = computed(() => {
      return parent.steps.value.length;
    });

    const space = computed(() => {
      return isSimple.value ? "" : parent.props.space;
    });

    const style = computed(() => {
      const style = {
        flexBasis:
          typeof space.value === "number"
            ? `${space.value}px`
            : space.value
            ? space.value
            : `${100 / (stepsCount.value - (isCenter.value ? 0 : 1))}%`,
      };
      if (isVertical.value) return style;
      return style;
    });

    onMounted(() => {
      watch(
        [() => parent.props.active],
        ([active]) => {
          updateStatus(active);
        },
        {
          immediate: true,
        }
      );
    });

    const prevStatus = computed(() => {
      const prevStep = parent.steps.value[index.value - 1];
      return prevStep ? prevStep.currentStatus : "wait";
    });

    const updateStatus = (activeIndex) => {
      if (activeIndex > index.value) {
        internalStatus.value = parent.props.finishStatus;
      } else if (activeIndex === index.value && prevStatus.value !== "error") {
        // 当前激活步骤且前面的步骤状态不是error的时候
        internalStatus.value = parent.props.processStatus;
      } else {
        internalStatus.value = "wait";
      }
    };

    const calcProgress = () => {
      const step = 100;
      const style = {};

      style[
        parent.props.direction === "vertical" ? "height" : "width"
      ] = `${step}%`;

      lineStyle.value = style;
    };

    const stepItemState = reactive({
      uid: currentInstance.uid,
      currentStatus,
      setIndex,
      calcProgress,
    });

    parent.steps.value = [...parent.steps.value, stepItemState];

    return {
      index,
      isSimple,
      isCenter,
      isLast,
      isVertical,
      currentStatus,
      setIndex,
      parent,
      space,
      style,
      lineStyle,
      updateStatus,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-step.scss";
</style>
