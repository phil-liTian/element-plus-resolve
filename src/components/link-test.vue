<template>
  <div>
    <el-link href="https://element.eleme.io" target="_blank">default</el-link>
    <el-link type="primary">primary</el-link>
    <el-link type="success">success</el-link>
    <el-link type="warning">warning</el-link>
    <el-link type="danger">danger</el-link>
    <el-link type="info">info</el-link>

    <hr />

    <lt-link href="https://ltement.lteme.io" target="_blank">default</lt-link>
    <lt-link disabled type="primary">primary</lt-link>
    <lt-link type="success">success</lt-link>
    <lt-link type="warning">warning</lt-link>
    <lt-link type="danger">danger</lt-link>
    <lt-link type="info">info</lt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "LinkTest",
  setup() {
    return {};
  },
});
</script>

<style lang="scss"></style>
