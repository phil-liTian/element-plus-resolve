<template>
  <section class="lt-container" :class="{ 'is-vertical': isVertical }">
    <slot></slot>
  </section>
</template>
  
<script lang="ts">
import type { VNode, Component } from 'vue'
import { defineComponent } from '@vue/runtime-core';
import { computed } from 'vue'
  
export default defineComponent({
  name: 'LtContainer',
  props: {
    direction: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    const isVertical = computed(() => {
      if( props.direction ) {
        return props.direction === 'vertical'
      }

      // 如果里面的插槽有header、footer, 则使用垂直排列
      if( slots?.default ) {
        const vNodes: VNode[] = slots.default()

        return vNodes.some(vNode => {
          const tag = (vNode.type as Component).name

          return tag === 'LtHeader' || tag === 'LtFooter'
        })
      } else {
        return false
      }
    })

    return {
      isVertical
    }
  }
  
})
</script>
  
<style lang="scss">
  @import './lt-container.scss';
</style>