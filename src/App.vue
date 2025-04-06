<script>
import Header from "@/components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
export default {
  components: {
    Header,
    Sidebar,
  },
};
</script>
<template>
  <div id="app">
    <router-view />
    <!-- <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="250px">
          <Sidebar />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container> -->
  </div>
</template>
<!-- <style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  /* text-align: center; */
  line-height: 60px;
}
.el-aside {
  background-color: #545c64;
  overflow: hidden;
  min-height: 100vh;
}
</style> -->
