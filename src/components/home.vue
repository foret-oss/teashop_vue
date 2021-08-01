<template>
  <div>
    <!--路由占位符-->
    <router-view></router-view>
    <el-container class="home_container">
      <!--头部区域-->
      <el-header>
        <div class="top-icon">
          <i class="el-icon-arrow-left" @click="previousPage"></i>
          <i class="el-icon-sunny"></i>
          <i class="el-icon-edit"></i>
          <i class="el-icon-share"></i>
        </div>
        <div class="btnForm">
        <el-button type="info" @click="loginOut" class="btn">退出</el-button>
        <el-button v-show="this.status !== '200'"  type="primary" :plain="true" @click="login" class="loginBtn">尚未登录</el-button>
        </div>
      </el-header>
      <!--主题区域-->
      <!--尾部区域-->
      <el-footer>
        <!--尾部导航栏-->
        <el-menu
          mode="horizontal"
          router
          active-text-color="black"
          :default-active="activePath"
        >
          <el-menu-item index="/initPage" id="a" @click="MyClick('/initPage')"
            >首页</el-menu-item
          >
          <el-menu-item index="/order" id="b" @click="MyClick('/order')"
            >点单</el-menu-item
          >
          <el-menu-item index="/foods" id="c" @click="MyClick('/foods')"
            >百货</el-menu-item
          >
          <el-menu-item index="/orderForm" id="d" @click="MyClick('/orderForm')"
            >订单</el-menu-item
          >
          <el-menu-item index="/user" id="e" @click="MyClick('/user')"
            >我的</el-menu-item
          >
        </el-menu>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    //this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },


  data() {
    return {
      //底部导航栏数据
      //menuList: [],

      //被激活的链接（通过Aplication下的session查看ActivePath
      activePath: "",
      status: window.sessionStorage.getItem('status')
    };
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },

    
    //获取导航栏菜单(配置axios)
    /*
    async getMenuList() {
      const { data: res } = await this.$axios.get(
        //API中关于菜单权限的请求地址
        "menu"
      );
      if (res.meta.status !== 200)
        return this.$message.console.error(res.meta.msg);
      this.menuList = res.data; //如果获取成功，则将返回的数组赋值给menuList;
      console.log("菜单权限请求成功",res);
    },
    */

    MyClick(activePath) {
      //保存导航链接的状态
      window.sessionStorage.setItem("activePath", activePath);
      console.log("session导航栏链接状态",activePath);
      this.activePath = activePath;
    },


    login() {
        this.$router.push("/login");
    },
    homeClick() {
      //this.$router.push('/initPage');
    },
    orderClick() {
      //this.$router.push('/order');
    },
    teaClick() {
      //this.$router.push('/teashop');
    },
    orderFormClick() {
      //this.$router.push('/oderForm');
    },
    previousPage(){
      var activep = window.sessionStorage.getItem('activePath');
      window.sessionStorage.setItem("activePath", activep);
      console.log("session导航栏链接状态",activep);
      this.activePath = activep;
      this.$router.go(-1);
    }
  },
};
</script>

<style lang="less" scoped>
.btnForm{
  display: flex;
  position: absolute;
  top: 10px;
  left: 5px;
  width: 30px;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
}
.btn {
  position: absolute;
  width: 2rem;
  left: 8.8rem;
  top: 30%;
  transform: translate(-50%, -50%)
}
.loginBtn{
  position: absolute;
  width: 2rem;
  margin: 10px;
  left: 8.5rem;
  top: 80%;
  transform: translate(-50%, -30%)
}
.el-button--primary.is-plain {
    color: white; 
    background: #9a9aa3; 
    width: 2rem;
    padding: 10px;
}
.el-header {
  position: fixed;
  top: 5px;
  width: 100%;
  line-height: 5px;
  color: #333;
  display: flex;
  text-align: left;
}

.el-footer {
  position: fixed;
  width: 100%;
  top: 92%;
  background-color: rgb(238, 235, 235);
  color: #333;
  text-align: center;
  line-height: 80px;
  .el-menu {
    width: 100%;
    background: rgb(238, 235, 235);
  }
}
#a {
  background: url(../assets/home-1.png) no-repeat;
  background-size: 30px;
  background-position: 21px 3px;
  line-height: 90px;
}
#a:hover {
  background: url(../assets/home-2.png) no-repeat;
  background-size: 30px;
  background-position: 20px 3px;
}
#b {
  background: url(../assets/tea.png) no-repeat;
  background-size: 30px;
  background-position: 20px 3px;
  line-height: 90px;
}
#b:hover {
  background: url(../assets/tea_on.png) no-repeat;
  background-size: 30px;
  background-position: 20px 3px;
  color: #0c0b0b;
}
#c {
  background: url(../assets/cake-1.png) no-repeat;
  background-size: 30px;
  background-position: 20px 3px;
  line-height: 90px;
}
#c:hover {
  background: url(../assets/cake-2.png) no-repeat;
  background-size: 30px;
  background-position: 20px 3px;
  color: #0c0b0b;
}
#d {
  background: url(../assets/order.png) no-repeat;
  background-size: 30px;
  background-position: 20px 3px;
  line-height: 90px;
}
#d:hover {
  background: url(../assets/order_on.png) no-repeat;
  background-size: 30px;
  background-position: 20px 3px;
  color: #0c0b0b;
}
#e {
  background: url(../assets/my-1.png) no-repeat;
  background-size: 30px;
  background-position: 20px 3px;
  line-height: 90px;
}
#e:hover {
  background: url(../assets/my-2.png) no-repeat;
  background-size: 30px;
  background-position: 20px 3px;
  color: #0c0b0b;
}
.home_container {
  height: 100%;
  margin-bottom: 40px;
}
.top-icon {
  flex-direction: row;
  flex: 50%;
  flex-basis: 1em;
  font-size: 20px;
}
</style>

