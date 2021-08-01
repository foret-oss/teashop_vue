import Vue from 'vue'
import Router from 'vue-router'
import BScroll from "better-scroll"
import login from '../components/login.vue'
import Home from '../components/home.vue'
import User from '../components/user.vue'
import initPage from '../components/initPage.vue'
import Order from '../components/order.vue'
import Foods from '../components/foods.vue'
import OrderForm from '../components/orderForm'
import Register from '../components/register.vue'
import Wallet from '../components/wallet.vue'


Vue.use(Router)


const router = new Router({
    routes: [
      { path: '/', redirect: '/login'},
      { path: '/login', component: login },
      { path: '/register', component: Register},
      { 
        path: '/home', 
        component: Home,
        children: [
          { path: '/user', component: User},
          { path: '/initPage', component: initPage},
          { path: '/order', component: Order},
          { path: '/foods', component: Foods},
          { path: '/orderForm', component: OrderForm},
          { path: '/wallet', component: Wallet},
        ]
    }
    ]
  })

  router.beforeEach( (to, from, next) => {
    //to 将要访问的路径
    //from 代表从那个路径跳转而来
    //next 一个表示放行的函数
    //next() 放行  next('路径') 强制跳转
    if(to.path === '/login' || to.path === '/register') return next();
    //获取token
    const tokenStr = window.sessionStorage.getItem('token');
    if(!tokenStr) return next('/login');
    next();
  })

  export default router