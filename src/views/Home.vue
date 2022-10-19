<template>
  <div>
    <!-- <CardTest></CardTest> -->
    <!-- <ResultTest></ResultTest> -->
    <!-- <TagTest></TagTest> -->
    <!-- <ButtonTest></ButtonTest> -->
    <!-- <SwitchTest></SwitchTest> -->
    <!-- <MessageTest></MessageTest> -->
    <!-- <DividerTest></DividerTest> -->
    <!-- <LinkTest></LinkTest> -->
    <AlertTest></AlertTest>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
// import CardTest from "@c/card-test.vue";
// import ButtonTest from "@c/button-test.vue";
// import ResultTest from "@c/result-test.vue";
// import TagTest from "@c/tag-test.vue";
// import SwitchTest from "@c/switch-test.vue";
// import MessageTest from "@c/message-test.vue";
// import DividerTest from "@c/divider-test.vue";
// import LinkTest from "@c/link-test.vue";
import AlertTest from "@c/alert-test.vue";
export default defineComponent({
  name: "Home",

  components: {
    // CardTest,
    // ResultTest,
    // TagTest,
    // ButtonTest,
    // SwitchTest,
    // MessageTest,
    // DividerTest,
    // LinkTest,
    AlertTest,
  },

  setup() {
    return {};
  },
});
</script>

<style lang="scss"></style>
