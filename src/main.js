// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/store"
import ElementUI from 'element-ui'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import service from "./http";
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/my.css'


Vue.use(ElementUI)
Vue.use(service)

Vue.prototype.$http = service
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
