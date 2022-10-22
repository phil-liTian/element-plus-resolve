<template>
  <header class="lt-header">
    <slot></slot>
  </header>
</template>
  
<script lang="ts">
import { defineComponent} from '@vue/runtime-core';
  
export default defineComponent({
  name: 'LtHeader',
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup() {
    return {
      
    }
  }
  
})
</script>
  
<style lang="scss">
  @import './lt-header.scss';
</style>