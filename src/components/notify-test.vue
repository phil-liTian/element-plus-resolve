<template>
  <div>
    <lt-button @click="elOpen">el notify</lt-button>
    <hr />
    <lt-button @click="ltOpen">phil notify</lt-button>
    <!-- <lt-notify title="提示" message="这是一条notify信息"></lt-notify> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "@vue/runtime-core";

export default defineComponent({
  name: "NotifyTest",
  setup() {
    const app: any = getCurrentInstance();
    const { $notify, $ltNotify } = app?.appContext.config.globalProperties;
    const elOpen = () => {
      $notify.success("notify");
    };

    const ltOpen = () => {
      $ltNotify.info({
        title: "提示",
        message: "自定义的notify",
        duration: 0,
      });
    };
    return {
      elOpen,
      ltOpen,
    };
  },
});
</script>

<style lang="scss"></style>
