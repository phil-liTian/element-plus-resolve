<script lang="ts">
import { createVNode, renderSlot, h } from "vue";
import { defineComponent } from "@vue/runtime-core";
import { props } from "./props";
import { PatchFlags } from "@u/vnode.ts";
export default defineComponent({
  name: "LtOverlay",
  props,
  // 需要制定emits，外面调用才能准确指向这里抛出的事件
  emits: ["click"],
  setup(props, { emit, slots }) {
    let mousedownTarget = false;
    let mouseupTarget = false;

    const onMaskClick = (e: MouseEvent) => {
      if (mousedownTarget && mouseupTarget) {
        emit("click", e);
      }
      mousedownTarget = mouseupTarget = false;
    };

    // 具体结构
    return () => {
      return props.mask
        ? createVNode(
            "div",
            {
              class: ["lt-overlay", props.overLayClass],
              style: { zIndex: props.zIndex },
              onClick: onMaskClick,
              onMousedown: (e: MouseEvent) => {
                if (props.mask) {
                  mousedownTarget = e.target === e.currentTarget;
                }
              },

              onMouseup: (e: MouseEvent) => {
                if (props.mask) {
                  mouseupTarget = e.target === e.currentTarget;
                }
              },
            },
            [renderSlot(slots, "default")],
            PatchFlags.STYLE | PatchFlags.CLASS | PatchFlags.PROPS,
            ["onClick", "onMousedown", "onMouseup"]
          )
        : h(
            "div",
            {
              class: props.overLayClass,
              style: {
                zIndex: props.zIndex,
                position: "fixed",
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px",
              },
            },
            [renderSlot(slots, "default")]
          );
    };
  },
});
</script>

<style lang="scss">
@import "./lt-overlay.scss";
</style>
