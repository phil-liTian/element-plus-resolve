<template>
  <div class="avatar-test">
    <el-avatar :src="src" :size="100" alt="1222"></el-avatar>
    <el-avatar shape="square" alt="122">User</el-avatar>
    <el-avatar :icon="UserFilled"></el-avatar>
    <el-avatar :src="11" @error="errorHandler">
      <img :src="errSrc" alt="" />
    </el-avatar>

    <hr />

    <lt-avatar :src="src"></lt-avatar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import { UserFilled } from "@element-plus/icons-vue";

export default defineComponent({
  name: "AvatarTest",
  setup() {
    const src = ref(
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    );
    const errSrc = ref(
      "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
    );
    const errorHandler = () => true;
    return {
      src,
      errSrc,
      UserFilled,
      errorHandler,
    };
  },
});
</script>

<style lang="scss"></style>
