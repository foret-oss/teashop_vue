<template>
  <div class="login_container">
    欢迎来到喜茶登录页面~
    <div class="login_box">
      <!--登录表单-->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginformRules"
        label-width="80px"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            placeholder="手机号码或邮箱或昵称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            show-password
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" :plain="true" @click="login"
            >登录</el-button
          >
          <el-button type="primary" :plain="true" @click="register"
            >注册</el-button
          >
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//import { component } from 'vuepes/umd';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginFormRef.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      //这是登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
      },

      //表单验证规则
      loginformRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        password: [
          {
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(
          (valid) => {
          if (!valid) return;
          //this.$message.success("登录成功！");

          this.$axios
            .post("/login", this.loginForm)
            .then((res) => {
              console.log("请求登录成功，返回数据", res);
              if (res.status !== 200) return this.$message.erro("登录失败！");
              this.$message.success("登录成功！");
              window.sessionStorage.setItem("token", res.data.token);
              window.sessionStorage.setItem('status',res.status);
              window.sessionStorage.setItem('password', this.loginForm.password);
              window.sessionStorage.setItem("userName", this.loginForm.username);
              window.sessionStorage.setItem("walletNow", '100');
              window.sessionStorage.setItem('shopCartNumAll',0);
              window.sessionStorage.setItem('priceNow',0);
              window.sessionStorage.setItem('phonenumber','13398822784');
              this.$router.push("/user");
            })
            .catch(function (err) {
              console.log("请求登录失败", err);
            });

          console.log(
            console.log("setSession", window.sessionStorage.getItem("userName"))
          );
        }
      );
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-image: url(../assets/background.png);
  background-size: cover;
  opacity: 1;
  color: rgb(75, 65, 52);
  font-size: 30px;
  text-align: center;
  height: 100%;
  padding: 0 10px;
}
.login_box {
  width: 330px;
  height: 200px;
  background-color: rgb(65, 104, 148);
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login_form {
  position: absolute;
  opacity: 1;
  top: 20px;
  right: 30px;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.btns {
  opacity: 1;
  display: flex;
  width: 100%;
  justify-content: flex-start;
}
</style>
