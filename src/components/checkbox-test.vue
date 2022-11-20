<template>
  <div>
    <el-checkbox-group v-model="checkList">
      <el-checkbox border label="Option A" />
      <el-checkbox border label="Option B" />
      <el-checkbox border true-label="A" false-label="B" label="Option C" />
      <el-checkbox label="disabled" />
      <el-checkbox label="selected and disabled" />
    </el-checkbox-group>

    <br />

    <lt-checkbox-group v-model="checkList" size="mini">
      <lt-checkbox label="Option A" border></lt-checkbox>
      <lt-checkbox label="Option B" border></lt-checkbox>
      <lt-checkbox label="Option C"></lt-checkbox>
      <lt-checkbox label="disabled"></lt-checkbox>
    </lt-checkbox-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "CheckboxTest",
  setup() {
    const checkList = ref(["Option A", "A"]);
    return {
      checkList,
    };
  },
});
</script>

<style lang="scss"></style>
