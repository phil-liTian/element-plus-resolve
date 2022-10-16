<template>
  <div>
    <el-result
      icon="error"
      title="Warning Tip"
      sub-title="Please follow the instructions"
    >
      <template #extra>
        <el-button type="primary">Back</el-button>
      </template>
    </el-result>

    <lt-result icon="success" title="phil" subtitle="subPhil">
      <template #extra>
        <el-button type="primary">Back</el-button>
      </template>
    </lt-result>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "ResultTest",
  setup() {
    return {};
  },
});
</script>

<style lang="scss"></style>
