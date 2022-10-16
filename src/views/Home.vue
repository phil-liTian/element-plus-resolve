<template>
  <div>
    <!-- <CardTest></CardTest> -->
    <!-- <ResultTest></ResultTest> -->
    <!-- <TagTest></TagTest> -->
    <ButtonTest></ButtonTest>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
// import CardTest from "@c/card-test.vue";
import ButtonTest from "@c/button-test.vue";
// import ResultTest from "@c/result-test.vue";
// import TagTest from "@c/tag-test.vue";
export default defineComponent({
  name: "Home",

  components: {
    // CardTest,
    // ResultTest,
    // TagTest,
    ButtonTest,
  },

  setup() {
    return {};
  },
});
</script>

<style lang="scss"></style>
