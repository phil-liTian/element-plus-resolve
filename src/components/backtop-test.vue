<template>
  <div class="backtopPage">
    <div class="inner">
      <el-backtop target=".backtopPage" :right="100" :bottom="100" />

      <lt-backtop target=".backtopPage"></lt-backtop>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Backtop",
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.backtopPage {
  width: 500px;
  height: 500px;
  background-color: #ccc;
  overflow-y: auto;

  .inner {
    height: 1000px;
  }
}
</style>
