<template>
  <div>
    <!-- <CardTest></CardTest> -->
    <!-- <ResultTest></ResultTest> -->
    <!-- <TagTest></TagTest> -->
    <!-- <ButtonTest></ButtonTest> -->
    <!-- <SwitchTest></SwitchTest> -->
    <MessageTest></MessageTest>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
// import CardTest from "@c/card-test.vue";
// import ButtonTest from "@c/button-test.vue";
// import ResultTest from "@c/result-test.vue";
// import TagTest from "@c/tag-test.vue";
// import SwitchTest from "@c/switch-test.vue";
import MessageTest from "@c/message-test.vue";
export default defineComponent({
  name: "Home",

  components: {
    // CardTest,
    // ResultTest,
    // TagTest,
    // ButtonTest,
    // SwitchTest,
    MessageTest,
  },

  setup() {
    return {};
  },
});
</script>

<style lang="scss"></style>
