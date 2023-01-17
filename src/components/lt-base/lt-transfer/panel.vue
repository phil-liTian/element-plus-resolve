<template>
  <div class="lt-transfer-panel">
    <p class="lt-transfer-panel__header">
      <lt-checkbox v-model="allChecked" @change="handleAllCheckChange">
        List<span>0/0</span>
      </lt-checkbox>
    </p>

    <div class="lt-transfer-panel__body">
      <!-- 筛选 -->
      <lt-input
        v-model="query"
        class="lt-transfer-panel__filter"
        :placeholder="placeholder"
        v-if="filterable"
        @mouseenter="inputHover = true"
        @mouseleave="inputHover = false"
      >
        <template #prefix>
          <i
            :class="['el-input__icon', `el-icon-${inputIcon}`]"
            @click="clearQuery"
          >
          </i>
        </template>
      </lt-input>

      <!-- 内容 -->
      <lt-checkbox-group
        v-show="data.length && !hasNoMatch"
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
      <p v-show="!data.length || hasNoMatch" class="lt-transfer-panel__empty">
        {{ hasNoMatch ? "no Matched Data" : "no Data" }}
      </p>

      <!-- 底部内容 -->
      <p v-if="hasFooter" class="lt-transfer-panel__footer">
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "@vue/runtime-core";
import { panelProps } from "./transfer";
import { useCheck, CHECKED_CHANGE_EVENT } from "./useCheck";

export default defineComponent({
  name: "Panel",
  props: panelProps,
  emits: [CHECKED_CHANGE_EVENT],
  setup(props, { emit, slots }) {
    const panelState = reactive({
      checked: [], // 选中的数据中key的集合
      query: "", // 查询关键字
      allChecked: false, // 标识全部选中
      checkChangeByUser: true, //用于标识是否是人为改变状态
      inputHover: false, // 悬浮到input上
    });

    const { keyProp, labelProp, filteredData, handleAllCheckChange } = useCheck(
      props,
      panelState,
      emit
    );

    const inputIcon = computed(() => {
      return panelState.query.length && panelState.inputHover
        ? "circle-close"
        : "search";
    });

    // 无匹配内容
    const hasNoMatch = computed(() => {
      return panelState.query.length && !filteredData.value.length;
    });

    // 底部内容
    const hasFooter = computed(() => !!slots.default()[0].children.length);

    // 清空筛选内容
    const clearQuery = () => {
      if (inputIcon.value === "circle-close") {
        panelState.query = "";
      }
    };

    return {
      ...toRefs(panelState),
      labelProp,
      keyProp,
      filteredData,
      inputIcon,
      handleAllCheckChange,
      clearQuery,
      hasNoMatch,
      hasFooter,
    };
  },
});
</script>
