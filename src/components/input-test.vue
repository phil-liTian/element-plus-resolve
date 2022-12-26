<template>
  <div class="input-test">
    <!-- disabled -->
    <el-input
      v-model="input"
      prefixIcon="Search"
      suffix-icon="CloseBold"
      placeholder="Please input"
      showWordLimit
      :maxlength="10"
      clearable
      autocomplete
      type="password"
    >
      <template #prefix> 这个前置内容 </template>
    </el-input>
    <br />
    <br />
    <!-- disabled -->
    <lt-input
      v-model="input"
      prefixIcon="el-icon-search"
      placeholder="Please input"
      clearable
    >
      <!-- <template #prefix> 这个前置内容 </template> -->
    </lt-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";

export default defineComponent({
  name: "InputTest",
  setup() {
    const state = reactive({
      input: "",
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss"></style>
