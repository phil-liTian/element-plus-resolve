<template>
  <div>
    <lt-button @click="open">el message</lt-button>
    <br />
    <lt-button type="success" @click="ltOpen">lt message</lt-button>

    <!-- <lt-message type="warning" message="phil message"></lt-message> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "MessageTest",
  setup() {
    const app: any = getCurrentInstance();
    const { $message, $ltMessage } = app.appContext.config.globalProperties;

    const open = () => {
      $message.info({
        message: "this is a message",
        duration: 1000,
      });
      // ElMessage({
      //   type: "success",
      //   message: "this is a message",
      // });
    };

    const ltOpen = () => {
      // $ltMessage({
      //   type: "success",
      //   message: "测试的message",
      // });

      $ltMessage.error("这是一个自定义的error");
    };
    return {
      open,
      ltOpen,
    };
  },
});
</script>

<style lang="scss"></style>
