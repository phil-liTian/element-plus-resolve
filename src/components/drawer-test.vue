<template>
  <div>
    <lt-drawer direction="btt" v-model="drawer">
      这是你想要的body的内容吗
    </lt-drawer>

    <!-- <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <span>Hi there!</span>
    </el-drawer> -->

    <lt-button @click="drawer = !drawer">show drawer</lt-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "DrawerTest",
  setup() {
    const drawer = ref(false);

    return {
      drawer,
    };
  },
});
</script>

<style lang="scss"></style>
