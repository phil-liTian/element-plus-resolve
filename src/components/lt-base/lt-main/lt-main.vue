<template>
  <main class="lt-main">
    <slot></slot>
  </main>
</template>
  
<script lang='ts'>
import { defineComponent} from '@vue/runtime-core';
  
export default defineComponent({
  name: 'LtMain',
  setup() {
    return {
  
    }
  }
  
})
</script>

<style lang="scss">
  @import './lt-main.scss';
</style>