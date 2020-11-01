import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartItems: []
  },
  mutations: {
    addProduct (state, { product, quantity }) {
      const [cartItem] = state.cartItems.filter(cartItem => cartItem.product.id === product.id)
      if (cartItem) {
        cartItem.quantity += quantity
      } else {
        state.cartItems.push({
          quantity,
          product: JSON.parse(JSON.stringify(product))
        })
      }
    }
  },
  getters: {
    totalItemCount: state => {
      return state.cartItems.reduce((sum, item) => {
        return sum + item.quantity
      }, 0)
    },
    totalPrice: state => {
      return state.cartItems.reduce((sum, item) => {
        return sum + (item.quantity * item.product.price)
      }, 0)
    }
  },
  actions: {
  },
  modules: {
  }
})
