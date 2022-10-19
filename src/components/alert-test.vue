<template>
  <div>
    <el-alert type="success" effect="dark" title="ALERT"
      >这是el的alert</el-alert
    >
    <br />
    <lt-alert type="info" effect="dark" title="PHIL" @close="handleClose"
      >这是phil的alert</lt-alert
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "AlertTest",
  setup() {
    const handleClose = () => {
      console.log("alert关闭了");
    };
    return {
      handleClose,
    };
  },
});
</script>

<style lang="scss"></style>
