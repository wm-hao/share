// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/store"
import ElementUI from 'element-ui'
import http from "./http";
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/my.css'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(ElementUI)
Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
