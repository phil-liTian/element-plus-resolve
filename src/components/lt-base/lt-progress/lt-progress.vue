<template>
  <div
    class="lt-progress"
    :class="[status && `is-${status}`]"
    role="progressbar"
  >
    <!-- type -> line -->
    <div v-if="type === 'line'" class="lt-progress-bar">
      <!-- 外轮廓线 -->
      <div
        class="lt-progress-bar__outer"
        :style="{ height: `${strokeWidth}px` }"
      >
        <!-- 内轮廓线 -->
        <div class="lt-progress-bar__inner" :style="barStyle">
          <div v-if="textInside" class="lt-progress-bar__innerText">
            <span>{{ content }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- type -> circle、dashboard -->
    <div
      v-else
      class="lt-progress-circle"
      :style="{ width: `${width}px`, height: `${width}px` }"
    >
      <svg viewBox="0 0 100 100">
        <path
          class="el-progress-circle__track"
          :d="trackPath"
          stroke="#e5e9f2"
          :stroke-width="relativeStrokeWidth"
          fill="none"
        />
        <!-- :style="trailPathStyle" -->

        <!-- <path
          class="el-progress-circle__path"
          :d="trackPath"
          :stroke="stroke"
          fill="none"
          :stroke-linecap="strokeLinecap"
          :stroke-width="percentage ? relativeStrokeWidth : 0"
          :style="circlePathStyle"
        /> -->
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { defineComponent } from "@vue/runtime-core";
import { props } from "./props";

type IColorArray = {
  percentage: number;
  color: string;
};

export default defineComponent({
  name: "LtProgress",
  props,
  setup(props, { emit }) {
    const barStyle = computed(() => {
      return {
        width: `${props.percentage}%`,
        backgroundColor: getCurrentColor(props.percentage),
      };
    });

    const relativeStrokeWidth = computed(() => {
      return ((props.strokeWidth / props.width) * 100).toFixed(1);
    });

    const radius = computed(() => {
      if (["dashboard", "circle"].includes(props.type)) {
        return parseInt(
          `${50 - parseFloat(relativeStrokeWidth.value) / 2}`,
          10
        );
      } else {
        return 0;
      }
    });

    const trackPath = computed(() => {
      const r = radius.value;
      const isDashboard = props.type === "dashboard";
      return `
          M 50 50
          m 0 ${isDashboard ? "" : "-"}${r}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "-" : ""}${r * 2}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "" : "-"}${r * 2}
          `;
    });

    const content = computed(() => {
      return props.format(props.percentage);
    });

    const getCurrentColor = (percentage) => {
      const { color } = props;
      if (typeof color === "string") {
        return color;
      } else if (typeof color === "function") {
        return color(percentage);
      } else {
        // 是一个数组
        const span = 100 / color.length;
        const seriesColors = color.map((seriesColor, index) => {
          if (typeof seriesColor === "string") {
            return {
              color: seriesColor,
              percentage: (index + 1) * span,
            };
          }

          return seriesColor;
        });

        // 按百分比排序
        const colorsArray: any = seriesColors.sort(
          (a: IColorArray, b: IColorArray) => a.percentage - b.percentage
        );

        const len = colorsArray.length;
        for (let i = 0; i < len; i++) {
          if (colorsArray[i].percentage > percentage) {
            return colorsArray[i]?.color;
          }
        }

        // 取最后一个的颜色
        return colorsArray[colorsArray.length - 1]?.color;
      }
    };

    return {
      barStyle,
      content,
      getCurrentColor,
      relativeStrokeWidth,
      trackPath,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-progress.scss";
</style>
