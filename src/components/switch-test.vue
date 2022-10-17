<template>
  <div class="switch-test">
    <el-switch active-text="激活" inactive-text="待激活" v-model="status">
    </el-switch>

    <lt-switch
      active-text="激活"
      inactive-text="待激活"
      inActiveColor="green"
      activeColor="red"
      checked
      v-model="status"
    ></lt-switch>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { reactive, toRefs } from "vue";
export default defineComponent({
  name: "SwitchTest",
  setup() {
    const state = reactive({
      status: true,
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss"></style>
