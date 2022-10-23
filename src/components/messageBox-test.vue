<template>
  <div>
    <!-- <el-button @click="open"> open the Message Box</el-button> -->

    <lt-messageBox title="phil message"></lt-messageBox>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ElMessageBox, ElMessage } from "element-plus";
import type { Action } from "element-plus";

export default defineComponent({
  name: "messageboxTest",
  setup() {
    const open = () => {
      ElMessageBox.alert("This is a message", "Title", {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: "OK",
        callback: (action: Action) => {
          ElMessage({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    };

    return {
      open,
    };
  },
});
</script>

<style lang="scss"></style>
