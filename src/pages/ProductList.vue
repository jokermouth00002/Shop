<template lang="pug">
div
    div
        a(href='#', @click='selectedCategoryID=null') 全部商品

    div(v-for='category in categories', @click='selectedCategoryID=category.id')
        a(href='#') {{ category.title }}

    div(v-for='product in filteredProducts')
        a(href='#', @click='selectedProduct = product') {{ product }}

    ProductDetail(v-if='selectedProduct', :product='selectedProduct')
</template>
<script>
import ProductDetail from '@/components/ProductDetail'
export default {
  components: {
    ProductDetail
  },
  data() {
    return {
      selectedProduct: null,
      selectedCategoryID: null,
      products: [],
      categories: [
        {
          id: 'chair',
          title: '椅子'
        },
        {
          id: 'vase',
          title: '花瓶'
        },
        {
          id: 'clock',
          title: '時鐘'
        },
        {
          id: 'light',
          title: '燈具'
        }
      ]
    }
  },
  computed: {
    filteredProducts() {
      return this.selectedCategoryID
        ? this.products.filter(p => p.category === this.selectedCategoryID)
        : this.products
    }
  },
  created() {
    window.productList = this
    this.$api
      .get('/posts2')
      .then(res => {
        this.products = res.data
      })
      .catch(this.$apiErrorHandler)
    this.$bus.$on('didAddToCart', () => {
      console.log('didAddToCart')
      this.selectedProduct = null
    })
  }
}
</script>
