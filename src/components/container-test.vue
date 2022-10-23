<template>
  <!-- <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside>Aside</el-aside>
      <el-main>Main</el-main>
      <el-footer>phil footer</el-footer>
    </el-container>
  </el-container> -->

  <lt-container>
    <lt-header>phil header</lt-header>
    <lt-container>
      <lt-aside>phil aside</lt-aside>
      <lt-container>
        <lt-main>phil main</lt-main>
        <lt-footer>phil footer</lt-footer>
      </lt-container>
      <!-- <lt-footer>phil footer</lt-footer> -->
    </lt-container>
  </lt-container>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Container-test",
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.el-container {
  height: 100vh;
  .el-header {
    height: 100px;
    background-color: #0ac;
  }

  .el-main {
    background-color: #0a0;
  }

  .el-aside {
    background-color: orange;
  }
}

.lt-container {
  height: 100vh;
  .lt-header {
    height: 100px;
    background-color: #0ac;
  }

  .lt-main {
    background-color: #0a0;
  }

  .lt-aside {
    background-color: orange;
  }

  .lt-footer {
    background-color: #ccc;
  }
}
</style>
