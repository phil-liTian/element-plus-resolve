<template>
  <div>
    <el-button-group>
      <el-button @click="onClick" type="primary">Primary</el-button>
      <el-button @click="onClick" type="primary">Primary</el-button>
      <el-button @click="onClick" type="primary">Primary</el-button>
    </el-button-group>
    <hr />
    <lt-button-group>
      <lt-button size="mini" plain @click="handleClick">Primary</lt-button>
      <lt-button @click="handleClick">Primary</lt-button>
      <lt-button @click="handleClick">Primary</lt-button>
    </lt-button-group>
    <hr />

    <el-button disabled>el primary</el-button>

    <lt-button disabled>primary</lt-button>
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
