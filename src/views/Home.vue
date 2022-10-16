<template>
  <div>
    <!-- <CardTest></CardTest> -->
    <ResultTest></ResultTest>
    <!-- <ButtonTest></ButtonTest> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
// import CardTest from "@c/card-test.vue";
// import ButtonTest from "@c/button-test.vue";
import ResultTest from "@c/result-test.vue";
export default defineComponent({
  name: "Home",

  components: {
    // CardTest,
    ResultTest,
    // ButtonTest,
  },

  setup() {
    return {};
  },
});
</script>

<style lang="scss"></style>
