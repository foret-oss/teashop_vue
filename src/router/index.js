import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login.vue'
import Home from '../components/home.vue'

Vue.use(Router)

const router = new Router({
    routes: [
      { path: '/', redirect: '/login'},
      { path: '/login', component: login },
      { path: '/home', component: Home}
    ]
  })
/*
  router.beforeEach( (to, from, next) => {
    //to 将要访问的路径
    //from 代表从那个路径跳转而来
    //next 一个表示放行的函数
    //next() 放行  next('路径') 强制跳转
    if(to.path === '/login') return next();
    //获取token
    const tokenStr = window.sessionStorage.getItem('token');
    if(!tokenStr) return next('/login');
    next();
  })
*/
  export default router