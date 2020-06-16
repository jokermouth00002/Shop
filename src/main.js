import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import jquery from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
const api = axios.create({
  baseURL: 'https://web-demo-api.herokuapp.com',
  timeout: 10000
})

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.prototype.$api = api
Vue.prototype.$apiErrorHandler = (err) => {
  console.error(err)
}

window.$ = jquery
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
