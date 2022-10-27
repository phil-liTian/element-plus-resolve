<template>
  <div class="collapseTest">
    <lt-collapse accordion v-model="activeNames">
      <lt-collapse-item name="pl">122</lt-collapse-item>
      <lt-collapse-item name="il">344</lt-collapse-item>
    </lt-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/runtime-core";
import { ref, toRefs } from "vue";
export default defineComponent({
  name: "CollapseTest",
  setup() {
    const state = reactive({
      activeNames: ["pl"],
    });

    return {
      ...state,
    };
  },
});
</script>

<style lang="scss"></style>
