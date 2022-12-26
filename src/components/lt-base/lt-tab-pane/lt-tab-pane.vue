<template>
  <div
    v-show="acitve"
    v-if="shouldBeRender"
    class="lt-tab-pane"
    role="tabpanel"
    :id="`pane-${paneName}`"
  >
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

    // lazy
    lazy: Boolean,
  },

  setup(props) {
    const instance = getCurrentInstance();
    const index = ref();
    const rootTabs = inject<RootTabs>("rootTabs");
    let loaded = ref(false);
    const updatePaneState = inject<UpdatePaneStateCallback>("updatePaneState");

    // 是否可关闭
    const isClosable = computed(() => {
      return props.closable || rootTabs.props.closable;
    });

    // 当前被激活的pane
    const acitve = computed(() => {
      const active = rootTabs.currentName.value === (props.name || index.value);
      if (acitve.value) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        loaded.value = true;
      }
      return active;
    });

    // 当前pane的名字，首选name，其次是index
    const paneName = computed(() => {
      return props.name || index.value;
    });

    // 控制懒加载
    const shouldBeRender = computed(() => {
      return !props.lazy || loaded.value || acitve.value;
    });

    updatePaneState({
      uid: instance.uid,
      paneName,
      props,
      acitve,
      isClosable,
      index,
    });

    return {
      index,
      acitve,
      paneName,
      isClosable,
      shouldBeRender,
    };
  },
});
</script>

<style lang="scss"></style>
