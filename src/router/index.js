import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/',
    name: 'ProductList',
    component: () => import('../pages/ProductList.vue')
  },
  {
    path: '/',
    name: 'Cart',
    component: () => import('../pages/Cart.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
