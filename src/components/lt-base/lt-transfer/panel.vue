<template>
  <div class="lt-transfer-panel">
    <p class="lt-transfer-panel__header">
      <lt-checkbox> List<span>0/0</span> </lt-checkbox>
    </p>

    <div class="lt-transfer-panel__body">
      <!-- 筛选 -->
      <lt-input class="lt-transfer-panel__filter" v-if="filterable">
        <template #prefix>
          <i class="el-icon-search"></i>
        </template>
      </lt-input>

      <!-- 内容 -->
      <lt-checkbox-group
        v-if="data.length"
        class="lt-transfer-panel__list"
        v-model="checked"
      >
        <lt-checkbox
          class="lt-transfer-panel__item"
          v-for="item in filteredData"
          :key="item.key"
          :label="item[labelProp]"
        ></lt-checkbox>
      </lt-checkbox-group>

      <!-- 暂无数据 -->
      <p v-show="!data.length" class="lt-transfer-panel__empty">noData</p>

      <!-- 底部内容 -->
      <p class="lt-transfer-panel__footer">
        <slot></slot>
      </p>
    </div>

    <p class="lt-transfer-panel__footer"></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";
import { panelProps } from "./transfer";
import { useCheck } from "./useCheck";

export default defineComponent({
  name: "Panel",
  props: panelProps,
  setup(props) {
    const state = reactive({
      checked: [],
    });

    const { keyProp, labelProp, filteredData } = useCheck(props);

    return {
      ...toRefs(state),
      labelProp,
      keyProp,
      filteredData,
    };
  },
});
</script>
