<template>
  <div>
    <el-calendar :range="[new Date('2022-02-02'), new Date('2022-03-20')]">
      <!-- <template #dateCell="{ data: { day } }">{{
        day.split("-").slice(1).join("-")
      }}</template> -->
    </el-calendar>

    <hr />
    <lt-calendar :range="[new Date('2022-02-01'), new Date('2022-03-20')]">
      <!-- <template #dateCell="{ data: { day } }">{{
        day.split("-").slice(1).join("-")
      }}</template> -->
    </lt-calendar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "CalendarTest",
  setup() {
    return {};
  },
});
</script>

<style lang="scss"></style>
