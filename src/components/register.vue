<template>
  <div class="login_container">
    欢迎来到喜茶注册页面~
    <div class="login_box">
      <!--登录表单-->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginformRules"
        label-width="80px"
        class="login_form"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="loginForm.userName"
            prefix-icon="el-icon-user"
            placeholder="昵称"
            ></el-input>
        </el-form-item>
        <el-form-item prop="phonenumber">
          <el-input
            v-model="loginForm.phonenumber"
            prefix-icon="el-icon-phone-outline"
            placeholder="请输入手机号码"
            ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            show-password
            placeholder="请输入密码"
            ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            v-model="loginForm.checkPass"
            prefix-icon="el-icon-lock"
            type="password"
            show-password
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" :plain="true" @click="login">登录</el-button>
          <el-button type="primary" :plain="true" @click="register">注册</el-button>
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //这是登录表单的数据绑定对象
      loginForm: {
        userName: "",
        password: "",
        checkPass: "",
        phonenumber: ''
      },
      //表单验证规则
      loginformRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
        ],
        phonenumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "手机号码格式不正确！", trigger: "blur" },
        ],
        password: [
          {
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
           { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    //点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    register() {
      this.$refs.loginFormRef.validate(
        async (valid) => {
          if (!valid) return;

          this.$axios
            .post("/register", {username: this.loginForm.userName,
                                password: this.loginForm.password})
            .then((res) => {
              console.log("请求注册成功，返回数据", res);
              if (res.status !== 200 || res.status==403) return this.$message.erro("用户已存在，注册失败！");
              this.$message.success("注册成功！");
              window.sessionStorage.setItem("token", res.data.token);
              window.sessionStorage.setItem('password', this.loginForm.password);
              window.sessionStorage.setItem('userName', this.loginForm.userName);
              window.sessionStorage.setItem('walletNow','0');
              window.sessionStorage.setItem('phonenumber',this.loginForm.phonenumber);
              this.$router.push("/user");
            })
            .catch(function (err) {
              console.log("用户已存在，注册失败", err);
            });

/*
          this.$message.success("注册成功！");
          
          this.$router.push({path: '/user', query: {userName: this.loginForm.userName}});
          */
        }
      );
    },
    login(){
        this.$router.push("/login");
    }
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
  width: 400px;
  height: 330px;
  background-color: rgb(70, 66, 66);
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
