<template>
  <div class="progressTest">
    <el-progress
      status="exception"
      text-inside
      type="circle"
      :percentage="percentage"
      :color="colors"
      :stroke-width="6"
    ></el-progress>

    <br />

    <!-- color="#0a0" -->
    <lt-progress
      type="circle"
      status="warning"
      textInside
      :stroke-width="26"
      :color="colors"
      :percentage="percentage"
    ></lt-progress>

    <lt-button @click="change">change percentage</lt-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ref } from "vue";
export default defineComponent({
  name: "ProgressTest",
  setup() {
    const customColors = [
      { color: "#f56c6c", percentage: 20 },
      { color: "#e6a23c", percentage: 40 },
      { color: "#5cb87a", percentage: 60 },
      { color: "#1989fa", percentage: 80 },
      { color: "#6f7ad3", percentage: 100 },
    ];

    const colors = ["#0a0", "orange", "blue"];
    const percentage = ref(10);
    const change = () => {
      if (percentage.value >= 100) {
        percentage.value = 10;
      } else {
        percentage.value += 10;
      }
    };
    return {
      change,
      percentage,
      customColors,
      colors,
    };
  },
});
</script>

<style lang="scss">
.progressTest {
  width: 50%;
}
</style>
