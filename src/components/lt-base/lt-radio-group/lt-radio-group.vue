<template>
  <div
    ref="radioGroup"
    class="lt-radio-group"
    role="radiogroup"
    @keydown="handleKeydown"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, toRefs } from "@vue/runtime-core";
import { computed, ref, reactive, nextTick, PropType } from "vue";
import { UPDATE_MODEL_EVENT } from "@u/constant.ts";
import { radioGroupKey } from "../lt-radio/token";
import { isValidateComponentSize } from "@u/validator.ts";
import { EVENT_CODE } from "@u/aria.ts";

type ComponentSize = "small" | "large" | "default";

export default defineComponent({
  name: "LtRadioGroup",
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: "",
    },

    size: {
      type: String as PropType<ComponentSize>,
      default: "",
      validator: isValidateComponentSize,
    },
  },
  emits: [UPDATE_MODEL_EVENT, "change"],
  setup(props, { emit }) {
    const radioGroup = ref(null);

    const changeEvent = (val: any) => {
      emit(UPDATE_MODEL_EVENT, val);

      // 在渲染完成之后向外抛出一个change事件
      nextTick(() => {
        emit("change", val);
      });
    };

    const radioGroupSize = computed(() => {
      return props.size;
    });

    // 在group组中按上下左右可实现切换
    const handleKeydown = (e) => {
      const target = e.target;
      const className =
        target.nodeName === "INPUT" ? "[type=radio]" : "[role=radio]";

      const radios = radioGroup.value.querySelectorAll(className);
      let index = Array.from(radios).indexOf(target);
      const length = radios.length;
      console.log(index);
      const roleRadios = radioGroup.value.querySelectorAll("[role=radio]");
      console.log("roleRadios", roleRadios);

      let nextIndex = null;
      switch (e.code) {
        case EVENT_CODE.left:
        case EVENT_CODE.up:
          // 向上、向左
          e.stopPropagation();
          e.preventDefault();
          nextIndex = index === 0 ? length - 1 : index - 1;
          break;
        case EVENT_CODE.down:
        case EVENT_CODE.right:
          // 向右、向下
          e.stopPropagation();
          e.preventDefault();
          nextIndex = index === length - 1 ? 0 : length - 1;
          break;
        default:
          break;
      }

      if (nextIndex === null) return;
      roleRadios[nextIndex].click();
    };

    // 提供给子组件的数据
    provide(
      radioGroupKey,
      reactive({
        name: "ltRadioGroup",
        ...toRefs(props),
        changeEvent,
        radioGroupSize,
      })
    );

    return {
      radioGroup,
      changeEvent,
      handleKeydown,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-radio-group.scss";
</style>
