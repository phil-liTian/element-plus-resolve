<template>
  <div class="lt-transfer">
    <transfer-panel
      ref="leftPanel"
      :data="sourceData"
      :props="props"
    ></transfer-panel>
    <!-- 中间按钮 -->
    <div class="lt-transfer__buttons">
      <el-button type="primary">
        <i class="el-icon-arrow-left"></i>
      </el-button>
      <el-button type="primary">
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <transfer-panel
      ref="rightPanel"
      :data="targetData"
      :props="props"
    ></transfer-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { computed, ref } from "vue";
import TransferPanel from "./panel.vue";
import { transferProps } from "./transfer";
import { useComputedData } from "./useComputedData";

export default defineComponent({
  name: "LtTransfer",
  components: {
    TransferPanel,
  },
  props: transferProps,
  setup(props) {
    const leftPanel = ref(null);
    const rightPanel = ref(null);

    const { sourceData, targetData } = useComputedData(props);
    // console.log("sourceData", sourceData.value);

    return {
      leftPanel,
      rightPanel,
      sourceData,
      targetData,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-transfer.scss";
</style>
