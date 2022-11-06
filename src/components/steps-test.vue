<template>
  <div class="stepTest">
    <!-- direction="vertical" -->
    <el-steps :active="active" finish-status="success">
      <el-step title="Step 1" description="这是一段简单描述" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps>

    <lt-button @click="next">toggle</lt-button>

    <lt-steps :active="active" finish-status="success">
      <lt-step title="step1"></lt-step>
      <lt-step title="step2" description="这是一段描述信息"></lt-step>
      <lt-step title="step3"></lt-step>
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
