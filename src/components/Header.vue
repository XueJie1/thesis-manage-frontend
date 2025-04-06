<template>
  <div class="header">
    <el-header>
      <img
        src="@/assets/logo.png"
        style="width: 40px; height: 40px; position: relative; top: 10px"
      />
      <span style="font-size: 20px; margin-left: 15px">高校论文管理系统</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logOut()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    logOut() {
      console.log("点击了退出登录");
      localStorage.removeItem("user");
      localStorage.removeItem("JwtToken");
      // 路由跳转
      this.$router.push({
        path: `/login`,
        query: { refresh: true },
      });
    },
    setUsername() {
      const user = this.$storage.get("user");
      this.name = user?.name || "未知用户";
    },
  },
  mounted() {
    this.setUsername();
  },
};
</script>


<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  /* text-align: center; */
  line-height: 60px;
}

/* 下拉菜单右对齐 */
.el-dropdown {
  float: right;
  margin-right: 20px; /* 根据需求调整间距 */
}

/* 下拉面板右对齐 */
.el-dropdown-menu {
  right: 0;
  left: auto !important; /* 覆盖默认样式 */
}
</style>