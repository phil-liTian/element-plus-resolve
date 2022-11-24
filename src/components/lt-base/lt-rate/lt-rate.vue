<template>
  <div class="lt-rate">
    <span
      class="lt-rate__item"
      v-for="(item, index) in max"
      :key="index"
      :style="{ cursor: rateDisabled ? 'auto' : 'pointer' }"
      @mousemove="setCurrentValue(item, $event)"
      @mouseleave="resetCurrentValue"
      @click="selectValue(item)"
    >
      <!-- 具体的icons -->
      <i
        class="lt-rate__icon"
        :class="[classes[item - 1], { hover: hoverIndex === item }]"
        :style="getIconStyle(item)"
      >
        <!-- 当可选部分的时候，使用这个元素盖到上面，这个元素也是使用的与父元素icon相同的class -->
        <i
          v-if="showDecimalIcon(item)"
          :class="['lt-rate__decimal', decimalIconClass]"
          :style="decimalStyle"
        ></i>
      </i>
    </span>

    <span
      v-show="showText || showScore"
      class="lt-rate__text"
      :style="{ color: textColor }"
      >{{ text }}</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { props } from "./props";
import { useRate } from "./useRate";
export default defineComponent({
  name: "LtRate",
  props,
  setup(props) {
    return useRate(props);
  },
});
</script>

<style lang="scss">
@import "./lt-rate.scss";
</style>
