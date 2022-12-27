<template>
  <div>
    <ul
      v-infinite-scroll="load"
      :infinite-scroll-immediate="false"
      class="infinite-list"
      style="overflow: auto"
    >
      <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
    </ul>

    <hr />
    <ul
      v-my-infinite-scroll="myLoad"
      class="infinite-list"
      style="overflow: auto"
    >
      <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "InfiniteScrollTest",
  setup() {
    const count = ref(0);
    const load = () => {
      count.value += 2;
    };
    const myLoad = () => {
      count.value += 2;
    };
    return {
      load,
      count,
      myLoad,
    };
  },
});
</script>

<style lang="scss">
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
