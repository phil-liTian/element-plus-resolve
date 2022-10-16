<template>
  <div>
    <el-button @click="onClick" type="primary">Primary</el-button>
    <lt-button type="info" size="medium" @click="handleClick"
      >phil todo</lt-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "ButtonTest",
  setup() {
    const onClick = () => {
      console.log("bb");
    };

    const handleClick = () => {
      console.log("aa");
    };

    return {
      handleClick,
      onClick,
    };
  },
});
</script>

<style lang="scss"></style>
