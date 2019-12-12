import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from "vue-lazyload";
import Toast from "./alert/toast.js";

Vue.config.productionTip = false

Vue.use(Toast);//注册插件

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('@/img/timg.gif'),
  // attempt: 1
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
