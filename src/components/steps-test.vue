<template>
  <div class="stepTest">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps>

    <lt-button @click="next">toggle</lt-button>
    <lt-steps>
      <lt-step>step</lt-step>
    </lt-steps>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ref } from "vue";
export default defineComponent({
  name: "StepTest",
  setup() {
    const active = ref(0);

    const next = () => {
      if (active.value++ > 2) active.value = 0;
    };
    return {
      active,
      next,
    };
  },
});
</script>

<style lang="scss"></style>
