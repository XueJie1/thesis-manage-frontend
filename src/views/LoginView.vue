<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="login-title">高校论文管理系统</span>
      </div>
      <div class="login-form">
        <el-form :model="form" :rules="loginRules" ref="loginForm">
          <el-form-item prop="userName">
            <el-input
              type="text"
              v-model="form.userName"
              auto-complete="off"
              placeholder="请输入学号/工号"
            >
              <template slot="prepend"
                ><i style="font-size: 20px" class="el-icon-user"></i
              ></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input
              type="text"
              v-model="form.passWord"
              auto-complete="off"
              placeholder="请输入密码"
              show-password
              @keyup.enter.native="handleLogin"
            >
              <template slot="prepend"
                ><i style="font-size: 20px" class="el-icon-key"></i
              ></template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 100%"
              type="primary"
              @click="handleLogin"
              @click.native.prevent="handleLogin"
              :loading="loading"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { sha256 } from "js-sha256";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      form: {
        userName: "",
        passWord: "",
      },
      loginRules: {
        userName: [
          { required: true, message: "请输入学号/工号", trigger: "blur" },
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleLogin() {
      let hashedPassword = sha256(this.form.passWord);
      console.log(hashedPassword);
      this.$axios
        .post("/login", null, {
          params: {
            username: this.form.userName,
            password: hashedPassword,
          },
        })
        .then((response) => {
          const data = response.data.data;
          if (response.data.code == 0) {
            const token = data.jwtToken;
            localStorage.setItem("JwtToken", token);
            localStorage.setItem("user", JSON.stringify(data));
            console.log("登录成功: ", data.username);

            // 跳转路由
            this.$router.push({
              path: `/`,
              query: { refresh: true }, // 可选：强制详情页刷新数据
            });
          } else {
            // 弹出报错信息
            console.log(response.data.message);
            const errorMessage = response.data.message;
            this.$message.error("错误：" + errorMessage);
          }
        })
        .catch((error) => {
          console.error("未知错误：", error);
        });
    },
  },
};
</script>

<style scoped>
.login {
  background-image: linear-gradient(180deg, #2af598 0%, #009efd 100%);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.clear-fix {
  text-align: center;
}
.box-card {
  width: 375px;
}
.login-title {
  text-align: center;
}
</style>
