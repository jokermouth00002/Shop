<template lang="pug">
div.productDetail
    img(:src='product.content')
    div.productInfo
      div.closeDetailContainer
        div.coloseDetailIcon.noselect.fas.fa-times(@click.prevent='closeDetailMask()')
      p.title {{ product.title }}
      p {{ product.introduction }}
      p.price NT{{ product.price }}
      div.quantity
        div.plusMinus.noselect(@click.prevent='decrease()') -
        span(style='margin-top:-2px') {{ quantity }}
        div.plusMinus.noselect(@click.prevent='quantity+=1') +
      div.addToCart.mt-6.noselect(@click='addToCart') 加入購物車
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
    closeDetailMask() {
      this.$bus.$emit('closeDetailMask')
    }
  }
}
</script>
<style scoped lang='scss'>
.productDetail {
  top: 35%;
  width: 35%;
  min-width: 500px;
  height: 35%;
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  background-color: #fcf9ea;
  position: fixed;
  z-index: 2;

  img {
    width: 250px;
    height: 250px;
    padding: 15px;
  }
  .productInfo {
    min-width: 250px;
    .closeDetailContainer {
      display: flex;
      flex-direction: row-reverse;
      padding-bottom: 10px;
      .coloseDetailIcon {
        cursor: pointer;
      }
    }
    padding: 15px;
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
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .plusMinus:hover {
        background-color: #91c4bc;
        border-radius: 20px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .addToCart {
    cursor: pointer;
    width: 100%;
    height: 35px;
    border-style: solid;
    border-width: 1px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    min-width: auto;

    top: 5%;
    left: 0;
    .productInfo {
      min-width: auto;
      .title {
        font-size: 20px;
      }
    }
    .addToCart {
      margin-bottom: 20px;
    }
  }
}
</style>
