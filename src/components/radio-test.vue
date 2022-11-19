<template>
  <div class="radio-test">
    <el-radio-group v-model="radio1" size="small">
      <!-- <el-radio label="1">Option 1</el-radio>
      <el-radio label="2">Option 2</el-radio> -->
    </el-radio-group>

    <el-radio-group v-model="radio2">
      <el-radio-button label="New York" />
      <el-radio-button label="Washington" />
      <el-radio-button label="Los Angeles" />
      <el-radio-button label="Chicago" />
    </el-radio-group>

    <br />
    <br />

    <!-- <lt-radio-group v-model="radio1">
      <lt-radio label="1">Option 1</lt-radio>
      <lt-radio label="2">Option 1</lt-radio>
    </lt-radio-group> -->

    <lt-radio-group v-model="radio2" size="large">
      <lt-radio-button label="New York" />
      <lt-radio-button label="Washington" />
      <lt-radio-button label="Los Angeles" />
      <lt-radio-button label="Chicago" />
    </lt-radio-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ref } from "vue";
export default defineComponent({
  name: "RadioTest",
  setup() {
    const radio1 = ref("2");
    const radio2 = ref("New York");
    return {
      radio1,
      radio2,
    };
  },
});
</script>

<style lang="scss"></style>
