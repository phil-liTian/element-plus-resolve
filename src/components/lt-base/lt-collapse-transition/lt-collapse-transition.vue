<template>
  <transition v-on="on">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { addClass, removeClass } from "@u/dom.ts";

export default defineComponent({
  name: "LtCollapseTransition",
  setup() {
    return {
      on: {
        beforeEnter(el) {
          addClass(el, "collapse-transition");
          el.dataset.oldPaddingTop = el.style.paddingTop;
          el.dataset.oldPaddingBottom = el.style.paddingBottom;

          el.style.height = 0;
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
        },
        enter(el) {
          el.dataset.oldOverflow = el.style.overflow;
          if (el.scrollHeight) {
            el.style.height = `${el.scrollHeight}px`;
          } else {
            el.style.height = "";
          }
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
          el.style.overflow = "hidden";
        },
        afterEnter(el) {
          removeClass(el, "collapse-transition");
          el.style.height = "";
          el.style.overflow = el.dataset.oldOverflow;
        },
        beforeLeave(el) {
          el.dataset.oldPaddingTop = el.style.paddingTop;
          el.dataset.oldPaddingBottom = el.style.paddingBottom;
          el.dataset.oldOverflow = el.style.overflow;

          el.style.height = `${el.scrollHeight}px`;
          el.style.overflow = "hidden";
        },
        leave(el) {
          if (el.scrollHeight) {
            addClass(el, "collapse-transition");

            el.style.transitionProperty = "height";
            el.style.height = 0;
            el.style.paddingBottom = 0;
            el.style.paddingTop = 0;
          }
        },
        afterLeave(el) {
          removeClass(el, "collapse-transition");
          el.style.height = "";
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
          el.style.overflow = el.dataset.oldOverflow;
        },
      },
    };
  },
});
</script>

<style lang="scss"></style>
