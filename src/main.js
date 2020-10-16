import Vue from 'vue'  //加载vue
import App from './App' //加载入口文件
import router from './router/index.js' //加载路由配置文件
import Vant from 'vant';	//加载Vant文件
import Public from './utils/public.js' //加载公用js方法文件
import 'vant/lib/index.css';	//加载Vant样式文件
import './assets/index.less';	//	加载less文件
Vue.use(Vant);

// axios 请求
import { jsonHttp, baseUrl } from "@/utils/api";
Vue.prototype.$json = jsonHttp;
Vue.prototype.$api = baseUrl;

Vue.prototype.$public = Public;
Vue.config.productionTip = false

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    const role = localStorage.getItem('username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
    localStorage.setItem('routers',from.path)
});

// router.beforeEach((to, from, next) => {
//    localStorage.setItem('routers',to)
// });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})