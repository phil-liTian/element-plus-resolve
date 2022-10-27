<template>
  <div class="lt-result">
    <div class="lt-result__icon">
      <slot name="icon">
        <component :is="iconElement" :class="iconElement"></component>
      </slot>
    </div>

    <div v-if="$slots.title || title" class="lt-result__title">
      <slot name="title">
        <p>{{ title }}</p>
      </slot>
    </div>

    <div v-if="$slots.subtitle || subtitle" class="lt-result__subtitle">
      <slot name="subtitle">
        <p>{{ subtitle }}</p>
      </slot>
    </div>

    <div v-if="$slots.extra" class="lt-result__extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { props } from "./props";
import IconSuccess from "./icon-success.vue";
import IconWarning from "./icon-warning.vue";
import IconError from "./icon-warning.vue";
import IconInfo from "./icon-info.vue";

const IconMap: any = {
  info: "icon-info",
  warning: "icon-warning",
  error: "icon-error",
  success: "icon-success",
};

export default defineComponent({
  name: "LtResult",
  components: {
    [IconSuccess.name]: IconSuccess,
    [IconWarning.name]: IconWarning,
    [IconError.name]: IconError,
    [IconInfo.name]: IconInfo,
  },
  props,
  setup(props) {
    const iconElement = computed(() => {
      const { icon } = props;
      return icon && IconMap[icon] ? IconMap[icon] : "icon-info";
    });

    return {
      iconElement,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-result.scss";
</style>
