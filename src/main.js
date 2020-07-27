import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick';

import VueLazyLoad from 'vue-lazyload';

// import toast from './components/common/toast'; 

import { Icon } from 'vant';

// 解决移动端点击300ms延迟
FastClick.attach(document.body)

// 使用图片懒加载的插件
Vue.use(VueLazyLoad)

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

//安装toast插件
// Vue.use(toast)

//安装vant插件
Vue.use(Icon);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
