<template>
  <div class="rate-test">
    <el-rate v-model="value1" show-score allow-half />
    <lt-rate v-model="value1" allow-half show-score text-color="#0a0"></lt-rate>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "RateTest",
  setup() {
    const value1 = ref(2);
    return {
      value1,
    };
  },
});
</script>

<style lang="scss"></style>
