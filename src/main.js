import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import storage from '@/utils/storage'

axios.defaults.baseURL = 'http://127.0.0.1:8082/api'; // 设置全局基础路径
axios.defaults.timeout = 50000; // 设置全局超时时间

Vue.prototype.$axios = axios; // 将 Axios 挂载到 Vue 原型链上
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$storage = storage;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
