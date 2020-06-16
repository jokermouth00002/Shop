<template lang="pug">
div.productDetail
    img(:src='product.content')
    div.productInfo
      div.closeDetailContainer
        div.coloseDetailIcon(@click.prevent='closeDetail()') X
      p.title {{ product.title }}
      p {{ product.introduction }}
      p.price NT{{ product.price }}
      div.quantity
        div.plusMinus(@click.prevent='decrease()') -
        span {{ quantity }}
        div.plusMinus(@click.prevent='quantity+=1') +
      div.addToCart(@click='addToCart') 加入購物車
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
      quantity: 1
    }
  },
  created() {
    window.product = this
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
      this.$bus.$emit('closeDetailMask')
      this.$bus.$emit('didAddToCart')
    },
    closeDetail() {
      this.$bus.$emit('closeDetailMask')
    }
  }
}
</script>
<style scoped lang='scss'>
.productDetail {
  top: 40%;
  width: 50%;
  height: 30%;
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  background-color: #fcf9ea;
  position: fixed;
  z-index: 2;

  img {
    width: 200px;
    height: 200px;
    padding: 15px;
  }
  .productInfo {
    .closeDetailContainer {
      display: flex;
      flex-direction: row-reverse;
      .coloseDetailIcon {
        cursor: pointer;
      }
    }
    padding-top: 15px;
    .title {
      font-size: 25px;
    }
    .price {
      display: flex;
      font-size: 20px;
    }
    .quantity {
      display: flex;
      flex-direction: row-reverse;
      font-size: 25px;
      .plusMinus {
        cursor: pointer;
        width: 30px;
        height: 30px;
      }
      .plusMinus:hover {
        background-color: #91c4bc;
        border-radius: 10px;
        color: white;
      }
    }
  }
  .addToCart {
    cursor: pointer;
    width: 100%;
    height: 30px;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
  }
  .addToCart:hover {
    background-color: #91c4bc;
    border-style: none;
    color: white;
  }
}
@media (max-width: 767px) {
  .productDetail {
    height: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    top: 20%;
    left: 0;
    .productInfo {
      .title {
        font-size: 20px;
      }
    }
  }
}
</style>
