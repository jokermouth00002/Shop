<template lang="pug">
div
    p {{ product.title }}
    p {{ product.price }}
    p {{ product.introduction }}

    a(href='#', @click='decrease') -
    span {{ quantity }}
    a(href='#', @click='quantity+=1') +

    div
        a(href='#', @click='addToCart') 加入購物車
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
      quantity: 1
    }
  },
  methods: {
    decrease() {
      if (this.quantity > 1) {
        this.quantity = this.quantity - 1
      }
    },
    addToCart() {
      this.$store.commit('addProduct', {
        product: this.product,
        quantity: this.quantity
      })
      this.$bus.$emit('didAddToCart')
    }
  }
}
</script>
