<template>
  <div class="dialogPage">
    <!-- <el-dialog
      v-model="visible"
      :show-close="false"
      :before-close="beforeClose"
    >
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
          <el-button type="danger" @click="close">
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
            Close
          </el-button>
        </div>
      </template>
      This is dialog content.
    </el-dialog> -->
    <lt-dialog :before-close="beforeClose" v-model="visible">
      body
      <template #footer>footer</template>
    </lt-dialog>

    <lt-button @click="visible = !visible">show dialog</lt-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "DialogTest",

  setup() {
    const visible = ref(false);

    const beforeClose = (done: any) => {
      done();
    };

    return {
      visible,
      beforeClose,
    };
  },
});
</script>

<style lang="scss">
.dialogPage {
  height: 1000px;
}
</style>
