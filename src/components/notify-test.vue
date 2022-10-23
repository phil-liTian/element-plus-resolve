<template>
  <div>
    <lt-button @click="elOpen">el notify</lt-button>
    <hr />
    <!-- <lt-button>phil notify</lt-button> -->
    <lt-notify title="提示" message="这是一条message信息"></lt-notify>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "@vue/runtime-core";

export default defineComponent({
  name: "NotifyTest",
  setup() {
    const app = getCurrentInstance();
    const { $notify } = app.appContext.config.globalProperties;
    const elOpen = () => {
      $notify.success("notify");
    };
    return {
      elOpen,
    };
  },
});
</script>

<style lang="scss"></style>
