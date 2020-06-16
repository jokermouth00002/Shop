<template lang='pug'>
  div.goShopping
    div.title 購物車沒商品去逛逛吧
      div.button(@click='coloseMask()')
        router-link(to='/productList')
          div 購物去
</template>
<script>
export default {
  methods: {
    coloseMask() {
      this.$bus.$emit('closeDetailMask')
    }
  }
}
</script>
<style scoped lang='scss'>
.goShopping {
  position: fixed;
  top: 40%;
  left: 45%;
  z-index: 2;
  background-color: white;
  .title {
    width: 200px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .button {
      margin-top: 15px;
      width: 50%;
      height: 20%;
      border-style: solid;
      border-width: 1px;
      border-radius: 10px;
      a {
        text-decoration: none;
        color: black;
      }
    }
    .button:hover {
      background-color: black;
      a {
        text-decoration: none;
        color: white;
      }
    }
  }
}
@media (max-width: 767px) {
  .goShopping {
    left: auto;
    width: 80%;
    .title {
      width: auto;
      height: 150px;
    }
  }
}
</style>
