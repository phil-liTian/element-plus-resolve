<template>
  <div class="input-test">
    <!-- disabled -->
    <el-input
      v-model="input"
      prefixIcon="Search"
      suffix-icon="CloseBold"
      placeholder="Please input"
      :maxlength="10"
      clearable
      autocomplete
      size="medium"
    >
      <!-- <template #prefix> 这个前置内容 </template> -->
      <template #prepend>Http://</template>
    </el-input>
    <br />
    <br />
    <!-- disabled -->
    <lt-input
      v-model="input"
      prefixIcon="el-icon-search"
      placeholder="Please input"
      clearable
      showPassword
      :tabindex="1"
      size="medium"
    >
      <template #prepend>Http://</template>
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
    const formatter = (value) => {
      return `$ ${value}`;
    };

    return {
      ...toRefs(state),
      formatter,
    };
  },
});
</script>

<style lang="scss"></style>
