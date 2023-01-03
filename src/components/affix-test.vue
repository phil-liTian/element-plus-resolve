<template>
  <div class="affix-test">
    <el-affix :offset="120" position="bottom">
      <el-button type="primary">Offset top 120px</el-button>
    </el-affix>

    <div class="affix-container">
      <el-affix target=".affix-container" :offset="80">
        <el-button type="primary">Target container</el-button>
      </el-affix>
    </div>

    <hr />
    <lt-affix :offset="220">
      <lt-button>Offset top 220px</lt-button>
    </lt-affix>

    <div class="affix-container1">
      <lt-affix target=".affix-container1" :offset="80">
        <lt-button type="primary">Target container</lt-button>
      </lt-affix>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "AffixTest",
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.affix-test {
  height: 2000px;

  .affix-container {
    text-align: center;
    height: 400px;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
  }

  .affix-container1 {
    text-align: center;
    height: 400px;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
  }
}
</style>
