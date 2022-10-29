<template>
  <div class="emptyTest">
    <!-- <el-empty :image-size="200" /> -->
    <lt-empty :image-size="100">
      <lt-button>返回查看详情</lt-button>
    </lt-empty>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "EmptyTest",
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.el-empty {
  // background-color: var(--el-empty-fill-color-6);
}
</style>
