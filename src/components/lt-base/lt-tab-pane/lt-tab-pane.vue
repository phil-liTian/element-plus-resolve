<template>
  <div v-show="acitve" class="lt-tab-pane">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject } from "@vue/runtime-core";
import { computed, ref } from "vue";
import type {
  RootTabs,
  UpdatePaneStateCallback,
  IPaneProps,
} from "../lt-tab/tabs.type";

export default defineComponent({
  name: "LtTabPane",
  props: {
    label: {
      type: String,
      default: "",
    },

    name: {
      type: String,
      default: "",
    },

    // 禁用状态
    disabled: Boolean,

    // TODO
    closable: Boolean,
  },

  setup(props) {
    const instance = getCurrentInstance();
    const index = ref();
    const rootTabs = inject<RootTabs>("rootTabs");
    const updatePaneState = inject<UpdatePaneStateCallback>("updatePaneState");

    // 是否可关闭
    const isClosable = computed(() => {
      return props.closable || rootTabs.props.closable;
    });

    const acitve = computed(() => {
      const active = rootTabs.currentName.value === (props.name || index.value);

      return active;
    });

    const paneName = computed(() => {
      return props.name || index.value;
    });

    updatePaneState({
      uid: instance.uid,
      paneName,
      props,
      acitve,
      isClosable,
    });

    return {
      acitve,
      paneName,
      isClosable,
    };
  },
});
</script>

<style lang="scss"></style>
