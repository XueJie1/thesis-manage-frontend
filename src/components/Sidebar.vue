<template>
  <el-menu
    :default-openeds="['1']"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
  >
    <el-menu-item index="1" route="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="2" route="/about">
      <i class="el-icon-menu"></i>
      <span slot="title">信息管理</span>
    </el-menu-item>
    <el-menu-item index="3" route="/thesis">
      <i class="el-icon-setting"></i>
      <span slot="title">论文</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>人员管理</span>
      </template>
      <el-menu-item-group>
        <template slot="title">人员管理</template>
        <el-menu-item index="1-1" route="/student">学生管理</el-menu-item>
        <el-menu-item index="1-2" route="/teacher">教师管理</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="4" route="/announcement">
      <i class="el-icon-menu"></i>
      <span slot="title">公告管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleOpen(index, path) {
      console.log(index, path);
    },
    handleClose(index, path) {
      console.log(index, path);
    },
  },
};
</script>
