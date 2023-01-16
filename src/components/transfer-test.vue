<template>
  <div class="transfer-test">
    <el-transfer :titles="['数据源', '目标数据']" v-model="value" :data="data">
      <template #left-footer>
        <el-button>operater</el-button>
      </template>
    </el-transfer>

    <hr />

    <lt-transfer :data="data"></lt-transfer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "TransferTest",
  setup() {
    const generateData = () => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `Option ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    };

    const data = ref(generateData());
    const value = ref([]);
    return {
      data,
      value,
    };
  },
});
</script>

<style lang="scss"></style>
