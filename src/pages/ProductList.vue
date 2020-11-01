<template lang="pug">
div.productListContainer
  div.productClass
    div.title.cursor.noselect(@click='selectedCategoryID=null') 所有商品
    div.title 家具
      hr
      div.cursor.noselect(@click='selectedCategoryID="chair"') 椅子
      div.cursor.noselect(@click='selectedCategoryID="vase"') 花瓶
      div.cursor.noselect(@click='selectedCategoryID="clock"')  時鐘
    div.title 燈具
      hr
      div.cursor.noselect(@click='selectedCategoryID="light"')  燈泡
  div.blank
  div.productContainer
    div.position {{position}}
    hr
    div(v-if='loading')
      p Loading...
    div.productRow.row(v-else)
      div.product.col-6.col-xl-3.noselect.py-4(v-for='product in filteredProducts',@click.prevent ='openDetail(product)')
        img(:src='product.content')
        div.pt-4 {{product.title}}
        div.pt-2 {{product.price}} NT
    transition(name='moveProductDetail')
      ProductDetail(v-if='show', :product='selectedProduct')

</template>
<script>
import ProductDetail from '@/components/ProductDetail'
export default {
  components: {
    ProductDetail
  },
  data() {
    return {
      loading: false,
      selectedProduct: null,
      selectedCategoryID: null,
      show: false,
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
  created() {
    this.$bus.$on('closeDetailMask', () => {
      this.show = false
    })
    window.productList = this

    this.loading = true
    this.$api
      .get('/posts2')
      .then(res => {
        this.products = res.data
      })
      .catch(this.$apiErrorHandler)
      .then(() => {
        this.loading = false
      })
  },
  methods: {
    openDetail(product) {
      this.selectedProduct = product
      this.show = true
      this.$bus.$emit('openMask')
    }
  },
  computed: {
    filteredProducts() {
      return this.selectedCategoryID
        ? this.products.filter(p => p.category === this.selectedCategoryID)
        : this.products
    },
    position() {
      if (this.selectedCategoryID === null) {
        return '所有商品'
      } else {
        const [selectedCategory] = this.categories.filter(
          p => p.id === this.selectedCategoryID
        )
        return selectedCategory.title
      }
    }
  }
}
</script>
<style scoped lang='scss'>
.productListContainer {
  display: flex;
  padding-top: 50px;
  padding-left: 10%;
  padding-right: 10%;
  min-height: 60vh;
  .productClass {
    width: 30%;
    padding-right: 10px;

    .title {
      font-size: 30px;
      padding-top: 10px;
      div {
        font-size: 20px;
      }
      hr {
        margin-top: 0;
        width: 50%;
      }
    }
    .cursor {
      cursor: pointer;
    }
  }
  .productContainer {
    width: 70%;
    .position {
      display: flex;
      font-size: 20px;
    }

    .productRow {
      padding-top: 20px;
      .product {
        cursor: pointer;
        img {
          width: 200px;
          height: 200px;
        }
      }
    }
  }
  .moveProductDetail-enter-active {
    animation: productDetailOn 0.6s;
  }
  .moveProductDetail-leave-active {
    animation: productDetailOff 0.6s;
  }
  @keyframes productDetailOn {
    0% {
      top: -50%;
    }
    100% {
      top: 35%;
    }
  }
  @keyframes productDetailOff {
    0% {
      top: 35%;
    }
    100% {
      top: -50%;
    }
  }
  @keyframes productDetailOnMobile {
    0% {
      top: -100%;
    }
    100% {
      top: 5%;
    }
  }
  @keyframes productDetailOffMobile {
    0% {
      top: 5%;
    }
    100% {
      top: -100%;
    }
  }
  @media (max-width: 767px) {
    .productClass {
      .title {
        font-size: 15px;
        .cursor {
          font-size: 15px;
        }
      }
    }
    .productContainer {
      .productRow {
        .product {
          img {
            width: 100px;
            height: 100px;
          }
        }
      }
    }
    .moveProductDetail-enter-active {
      animation: productDetailOnMobile 0.6s;
    }
    .moveProductDetail-leave-active {
      animation: productDetailOffMobile 0.6s;
    }
  }
}
</style>
