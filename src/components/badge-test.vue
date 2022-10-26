<template>
  <div>
    <el-badge :hidden="hidden" value="new" type="info" class="item">
      <lt-button>comments</lt-button>
    </el-badge>
    <br />
    <el-badge :hidden="hidden" type="success" is-dot class="item">
      zs
    </el-badge>
    <br />
    <lt-badge value="90" :hidden="hidden" type="success">
      <lt-button type="info">phil</lt-button>
    </lt-badge>
    <br />

    <lt-button @click="hidden = !hidden">show</lt-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "BadgeTest",
  setup() {
    const hidden = ref(false);
    return {
      hidden,
    };
  },
});
</script>

<style lang="scss"></style>
