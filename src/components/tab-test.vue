<template>
  <div class="tab-test">
    <el-tabs
      type="card"
      closable
      tab-position="top"
      v-model="activeName"
      :before-leave="beforeLeave"
      class="demo-tabs"
      @input="handleInput"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.label"
        :label="item.label"
        :name="item.name"
        :lazy="item.lazy"
        >{{ item.label }}</el-tab-pane
      >
    </el-tabs>
    <hr />
    <lt-tabs
      addable
      closable
      type="card"
      tab-position="top"
      v-model="activeName"
      :before-leave="beforeLeave"
      @tab-add="onTabAdd"
    >
      <lt-tab-pane
        v-for="item in tabList"
        :key="item.label"
        :label="item.label"
        :name="item.name"
        :lazy="item.lazy"
        >{{ item.label }}</lt-tab-pane
      >
      <!-- <lt-tab-pane label="User" name="first">User</lt-tab-pane> -->
      <!-- <lt-tab-pane label="Config" name="second" :lazy="true"
        >Config</lt-tab-pane
      >
      <lt-tab-pane label="Role" name="third">Role</lt-tab-pane>
      <lt-tab-pane label="Task" name="fourth">Task</lt-tab-pane> -->
    </lt-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "@vue/runtime-core";

export default defineComponent({
  name: "TabTest",
  setup() {
    const activeName = ref("first");
    const state = reactive({
      tabList: [
        { label: "User", name: "first", lazy: true },
        { label: "Config", name: "second", lazy: true },
        { label: "Role", name: "third", lazy: true },
        { label: "Task", name: "fourth", lazy: true },
      ],
    });
    const beforeLeave = () => {
      // return false;
      // console.log("beforeLeave中可以执行的逻辑");

      return Promise.resolve();
    };
    const handleInput = (value) => {
      console.log("vale", value);
    };
    const onTabAdd = () => {
      let item = { label: "Task", name: "fourth", lazy: true };
      const len = state.tabList.length;
      state.tabList.push({
        ...item,
        label: `label ${len}`,
        name: `name ${len}`,
      });
    };
    return {
      ...toRefs(state),
      activeName,
      beforeLeave,
      handleInput,
      onTabAdd,
    };
  },
});
</script>

<style lang="scss"></style>
