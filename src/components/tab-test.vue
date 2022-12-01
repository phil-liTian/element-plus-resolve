<template>
  <div class="tab-test">
    <el-tabs closable tab-position="top" v-model="activeName" class="demo-tabs">
      <el-tab-pane label="User" name="first">User</el-tab-pane>
      <el-tab-pane label="Config" name="second">Config</el-tab-pane>
      <el-tab-pane disabled label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>
    <hr />
    <lt-tabs addable closable tab-position="top" v-model="activeName">
      <lt-tab-pane label="User" name="first">User</lt-tab-pane>
      <lt-tab-pane disabled label="Config" name="second">Config</lt-tab-pane>
      <lt-tab-pane label="Role" name="third">Role</lt-tab-pane>
      <lt-tab-pane label="Task" name="fourth">Task</lt-tab-pane>
    </lt-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "TabTest",
  setup() {
    const activeName = ref("first");
    return {
      activeName,
    };
  },
});
</script>

<style lang="scss"></style>
