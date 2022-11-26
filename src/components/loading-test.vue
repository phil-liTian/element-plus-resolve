<template>
  <!-- <div
    class="loading-test"
    v-loading="loading"
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
  ></div> -->

  <div
    class="targetDom"
    lt-text="loading"
    v-myLoading="loading"
    element-loading-text="加载中..."
    lt-customClass="phil"
  >
    <div class="view"></div>
  </div>

  <lt-button @click="showElLoading">el button</lt-button>

  <lt-button @click="showLoading">按钮</lt-button>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from "@vue/runtime-core";

export default defineComponent({
  name: "LoadingTest",

  setup() {
    const app: any = getCurrentInstance();
    const { $ltLoading, $loading } = app.appContext.config.globalProperties;
    const loading = ref(true);

    const svg = `<path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>`;

    const showLoading = () => {
      const loading = $ltLoading({
        text: "loading",
        // background: "#0a0",
        spinner: "HelpFilled",
        // target: ".targetDom",
        lock: true,
      });

      // console.log("loading", loading);
      setTimeout(() => {
        loading.close();
      }, 2000);
    };

    const showElLoading = () => {
      $loading({
        // target: ".targetDom",
        fullscreen: true,
        // lock: true,
      });
    };

    return {
      svg,
      loading,
      showLoading,
      showElLoading,
    };
  },
});
</script>

<style lang="scss">
.loading-test {
  width: 400px;
  height: 400px;
  background-color: #0a0;
}

.targetDom {
  width: 500px;
  height: 500px;
  background-color: #ccc;
  // overflow-y: auto;

  .view {
    height: 2000px;
  }
}
</style>
