<template>
  <div class="breadTest">
    <el-breadcrumb separator-icon="Delete">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item
        ><a href="/">promotion management</a></el-breadcrumb-item
      >
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }"
        >promotion detail</el-breadcrumb-item
      >
    </el-breadcrumb>
    <hr />
    <lt-bread separatorClass="el-icon-connection">
      <lt-bread-item :to="{ path: '/' }">homepage</lt-bread-item>
      <lt-bread-item><a href="/">promotion management</a></lt-bread-item>
      <lt-bread-item><a href="/">promotion list</a></lt-bread-item>
    </lt-bread>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  name: "BreadTest",
  setup() {
    return {};
  },
});
</script>

<style lang="scss"></style>
