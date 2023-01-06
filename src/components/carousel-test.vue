<template>
  <div class="carouselTest">
    <div class="block text-center">
      <el-carousel height="150px" type="card">
        <el-carousel-item v-for="item in 4" :key="item" :label="item">
          <h3 class="small justify-center" text="2xl">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <hr />

    <lt-carousel height="150px" type="card">
      <lt-carousel-item v-for="item in 4" :key="item" :label="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </lt-carousel-item>
    </lt-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "CarouselTest",
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item,
.lt-carousel__item {
  h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
  }

  &:nth-child(2n) {
    background-color: #99a9bf;
  }

  &:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
