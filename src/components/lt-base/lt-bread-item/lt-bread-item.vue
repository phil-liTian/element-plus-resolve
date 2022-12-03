<template>
  <span class="lt-bread__item">
    <span
      ref="link"
      role="link"
      :class="['lt-bread__inner', to ? 'is-link' : '']"
    >
      <slot></slot>
    </span>
    <i
      v-if="separatorClass"
      :class="['lt-bread__separator', separatorClass]"
    ></i>
    <span v-else class="lt-bread__separator">{{ separator }}</span>
  </span>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  ref,
} from "@vue/runtime-core";
import type { IBreadType } from "../lt-bread/bread.type";
import type { PropType } from "vue";
export default defineComponent({
  name: "LtBreadItem",
  props: {
    to: {
      type: [String, Object] as PropType<string | Record<string, unknown>>,
      default: "",
    },
    replace: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const parent = inject<IBreadType>("breadcrumb");
    const link = ref(null);
    const instance = getCurrentInstance();
    const router = instance.appContext.config.globalProperties.$router;

    onMounted(() => {
      link.value.addEventListener("click", () => {
        if (!props.to || !props.replace) return;
        props.replace ? router.replace(props.to) : router.push(props.to);
      });
    });

    return {
      link,
      separator: parent.separator,
      separatorClass: parent.separatorClass,
    };
  },
});
</script>

<style lang="scss"></style>
