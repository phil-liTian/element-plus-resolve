<template>
  <div class="lt-empty">
    <div class="lt-empty__image" :style="imageStyle">
      <img :src="image" v-if="image" alt="" />
      <ImgEmpty v-else />
    </div>

    <div class="lt-empty__description">
      <slot v-if="$slots.description" name="description"></slot>
      <p v-else>{{ emptyDescription }}</p>
    </div>

    <div v-if="$slots.default" class="lt-empty__bottom">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ImgEmpty from "./img-empty.vue";
import { computed } from "vue";
export default defineComponent({
  name: "LtEmpty",
  components: {
    ImgEmpty,
  },
  props: {
    image: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "暂无数据",
    },

    imageSize: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const emptyDescription = computed(() => {
      return props.description;
    });

    const imageStyle = computed(() => {
      return {
        width: props.imageSize ? `${props.imageSize}px` : "",
      };
    });

    return {
      emptyDescription,
      imageStyle,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-empty.scss";
</style>
