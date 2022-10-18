<template>
  <div>
    <lt-button @click="open">el message</lt-button>
    <br />
    <lt-button type="info" @click="ltOpen">lt message</lt-button>

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
        duration: 0,
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

      $ltMessage.warning("这是一个自定义的warning");
    };
    return {
      open,
      ltOpen,
    };
  },
});
</script>

<style lang="scss"></style>
