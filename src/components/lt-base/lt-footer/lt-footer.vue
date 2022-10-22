<template>
  <footer class="lt-footer">
    <slot></slot>
  </footer>
</template>
  
<script lang="ts">
import { defineComponent} from '@vue/runtime-core';
  
export default defineComponent({
  name: 'LtFooter',
  setup() {
    return {
  
    }
  }
  
})
</script>
  
<style lang="scss">
  @import './lt-footer.scss';
</style>