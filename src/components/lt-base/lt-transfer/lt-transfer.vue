<template>
  <div class="lt-transfer">
    <transfer-panel
      ref="leftPanel"
      :data="sourceData"
      :props="props"
      :title="leftPanelTitle"
      :filter-method="filterMethod"
      :placeholder="filterPlaceholder"
      :default-checked="leftDefaultChecked"
      @checked-change="onSourceCheckedChange"
    >
      <slot name="left-footer"></slot>
    </transfer-panel>
    <!-- 中间按钮 -->
    <div class="lt-transfer__buttons">
      <el-button type="primary" class="lt-transfer__button" @click="addToLeft" :disabled="!rightChecked.length">
        <i class="el-icon-arrow-left"></i>
        <!-- 兼容按钮文案为0、false等boolean转换之后为false的情况 -->
        <span v-if="buttonTexts[0] !== undefined">{{ buttonTexts[0] }}</span>
      </el-button>
      <el-button type="primary" @click="addToRight" :disabled="!leftChecked.length">
        <span v-if="buttonTexts[1] !== undefined">{{ buttonTexts[1] }}</span>
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <transfer-panel
      ref="rightPanel"
      :data="targetData"
      :props="props"
      :title="rightPanelTitle"
      :filter-method="filterMethod"
      :placeholder="filterPlaceholder"
      :default-checked="rightDefaultChecked"
      @checked-change="onTargetCheckedChange"
    >
      <slot name="right-footer"></slot>
    </transfer-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { computed, ref, reactive, toRefs } from "vue";
import TransferPanel from "./panel.vue";
import { transferProps } from "./transfer";
import { useComputedData } from "./useComputedData";
import { useCheckedChange, LEFT_CHECK_CHANGE_EVENT, RIGHT_CHECK_CHANGE_EVENT } from './useCheckedChange'
import { useMove } from './useMove'
import { CHANGE_EVENT } from '@u/constant.ts'

export default defineComponent({
  name: "LtTransfer",
  components: {
    TransferPanel,
  },
  props: transferProps,
  emits: [ CHANGE_EVENT, LEFT_CHECK_CHANGE_EVENT, RIGHT_CHECK_CHANGE_EVENT ],
  setup(props, { emit }) {
    const leftPanel = ref(null);
    const rightPanel = ref(null);

    const checkedStatus = reactive({
      leftChecked: [],
      rightChecked: []
    })

    // computed
    const leftPanelTitle = computed(() => props.titles[0])

    const rightPanelTitle = computed(() => props.titles[1])

    // HOOKS
    const { sourceData, targetData, propsKey } = useComputedData(props);

    const { onSourceCheckedChange, onTargetCheckedChange } = useCheckedChange(checkedStatus, emit)

    const { addToRight, addToLeft } = useMove(props, checkedStatus, propsKey, emit)

    return {
      ...toRefs(checkedStatus),
      leftPanel,
      rightPanel,
      leftPanelTitle,
      rightPanelTitle,
      sourceData,
      targetData,
      onSourceCheckedChange,
      onTargetCheckedChange,
      addToLeft,
      addToRight
    };
  },
});
</script>

<style lang="scss">
@import "./lt-transfer.scss";
</style>
