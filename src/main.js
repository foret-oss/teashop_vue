import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
import 'amfe-flexible'

import axios from 'axios'
//配置请求的根路径
/*
let protocol = window.location.protocol; //协议
   let host = window.location.host; //主机
   let reg = /^localhost+/;
   if(reg.test(host)) {
      //若本地项目调试使用
       axios.defaults.baseURL = 'http://192.168.1.1:5000';
   } else {
       //动态请求地址             协议               主机
       axios.defaults.baseURL = protocol + "//" + host  +":5000";
   }*/
axios.defaults.baseURL = "http://110.40.138.162:80"

axios.interceptors.request.use(config => {
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
