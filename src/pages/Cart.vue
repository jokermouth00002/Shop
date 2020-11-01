<template lang='pug'>
  div.cartPage
    div.shoppingStep
      div(:class="[step===1 ? 'styleOn':'styleOff']")
        div 訂單資料
      div(:class="[step===2 ? 'styleOn':'styleOff']")
        div 確認付款
      div(:class="[step===3 ? 'styleOn':'styleOff']")
        div 完成訂單
    div.cartList(v-if='step===1')
      div.title 購物清單
      hr
      div(v-if='cartItems.length<1') 購物車內無商品
      div.cartItem(v-for='cartItem in cartItems')
        img(:src='cartItem.product.content')
        div.productInfo
          div.productTitle {{cartItem.product.title}}
            div.cursor.fas.fa-times(@click='deleteProduct(cartItem)')
          div {{cartItem.product.price}}NT
          div.quantity
            div.plusMinus(@click='decrease(cartItem)') -
            div {{cartItem.quantity}}
            div.plusMinus(@click='addProduct(cartItem)') +
      hr
      div.totalPay(v-if='cartItems.length>0') 共{{$store.getters.totalItemCount}}件商品,金額為{{$store.getters.totalPrice}}
    div.userInfo(v-if='step===1')
      div.userInfoTitle 訂單資訊
      div.userInfoRow.row
        div.info.name.col-6
          div.title
            div 姓名
            div.errorMsg(v-if='form[0].errorMsg') 必填,請輸入正確
          input(type='text',v-model='form[0].value')
        div.info.phone.col-6
          div.title
            div 電話
            div.errorMsg(v-if='form[1].errorMsg') 必填,請輸入正確
          input(type='text',v-model='form[1].value')
      div.userInfoRow.row
        div.info.email.col-6
          div.title
            div 信箱
            div.errorMsg(v-if='form[2].errorMsg') 必填,請輸入正確
          input(type='text',v-model='form[2].value')
      div.userInfoRow.row
        div.info.addres.col-6
          div.title
            div 地址
            div.errorMsg(v-if='form[3].errorMsg') 必填,請輸入正確收件地址
          input(type='text',v-model='form[3].value')
        div.col-1
        div.col-3.button.noselect(@click='checkList()') 送出訂單
        div.col-2
    GoShopping(v-if='plzGoShopping')
    div.payContainer(v-if='step===2')
      div.infoRow
        div.col-8 品名
        div.col-2 數量
        div.col-2 小計
      hr
      div.cartItem(v-for='cartItem in cartItems')
        div.col-8 {{cartItem.product.title}}
        div.col-2 {{cartItem.quantity}}
        div.col-2 {{cartItem.product.price}}

      div.totalPay 共計{{$store.getters.totalPrice}}
      div.userInfoRow(v-for='title in form')
        div.info
          div.title.col-4 {{title.info}}
          div.value.col-8 {{title.value}}
        hr
      div.pay
        div.button(@click='pay()') 確定付款
    div.completedShopping(v-if='step===3') 訂購完成商品會盡快送到府!!

</template>
<script>
import GoShopping from '@/components/GoShopping'
export default {
  components: {
    GoShopping
  },
  data() {
    return {
      step: 1,
      cartItems: [],
      plzGoShopping: false,
      form: [
        {
          info: '姓名',
          value: '',
          rule: /^[A-Za-z]+$/,
          errorMsg: false
        },
        { info: '電話', value: '', rule: /^09[0-9]{8}$/, errorMsg: false },
        {
          info: '信箱',
          value: '',
          rule: /^[a-zA-Z0-9._]*@[a-zA-z0-9]*\.[a-zA-Z]*$/,
          errorMsg: false
        },
        {
          info: '地址',
          value: '',
          rule: /^[a-zA-Z0-9-.]+/,
          errorMsg: false
        }
      ]
    }
  },
  created() {
    window.cart = this
    this.cartItems = this.$store.state.cartItems
  },
  methods: {
    deleteProduct(cartItem) {
      const index = this.$store.state.cartItems.findIndex(
        e => e.product.id === cartItem.product.id
      )
      if (index === -1) {
        return
      }
      this.$store.state.cartItems.splice(index, 1)
    },
    addProduct(cartItem) {
      cartItem.quantity++
    },
    decrease(cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity--
      }
    },
    checkList() {
      if (this.cartItems.length === 0) {
        this.plzGoShopping = true
        this.openMask()
        return
      }

      let correctValues = 0
      this.form.filter(e => {
        if (!e.rule.test(e.value)) {
          e.errorMsg = true
        } else {
          e.errorMsg = false
          correctValues++
        }
      })

      if (correctValues === 4) {
        this.step = 2
      }
    },
    openMask() {
      this.$bus.$emit('openMask')
    },
    pay() {
      this.step = 3
      this.$store.state.cartItems = []
    }
  }
}
</script>
<style scoped lang='scss'>
.cartPage {
  padding: 10%;
  .shoppingStep {
    display: flex;
    justify-content: space-around;
    div {
      cursor: pointer;
    }
    .styleOn {
      width: 30%;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 20px;
      background-color: black;
      color: white;
    }

    .styleOff {
      width: 30%;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 20px;
      border-style: solid;
      border-width: 1px;
    }
  }
  .cartList {
    min-height: 300px;
    margin: 5%;
    padding: 5%;
    border-width: 1px;
    border-style: solid;
    .title {
      width: 100%;
      display: flex;
      font-size: 30px;
    }

    .cartItem {
      display: flex;
      padding-left: 5%;
      padding: 20px;
      padding-bottom: 0px;

      img {
        width: 100px;
        height: 100px;
      }
      .productInfo {
        width: 100%;
        padding-left: 2%;
        div {
          display: flex;
          padding-bottom: 10px;
        }
        .productTitle {
          font-size: 15px;
          justify-content: space-between;
          font-size: 20px;
          .cursor {
            cursor: pointer;
          }
        }
        .quantity {
          flex-direction: row-reverse;
          div {
            font-size: 25px;
            width: 30px;
            justify-content: center;
          }
          .plusMinus:hover {
            background-color: black;
            color: white;
            border-radius: 10px;
            cursor: pointer;
          }
        }
      }
    }
    .totalPay {
      display: flex;
      flex-direction: row-reverse;
      font-size: 20px;
    }
  }
  .userInfo {
    min-height: 300px;
    margin: 5%;
    padding: 5%;
    border-width: 1px;
    border-style: solid;
    .userInfoTitle {
      width: 100%;
      display: flex;
      font-size: 30px;
    }
    .userInfoRow {
      display: flex;
      .info {
        width: 50%;
        display: flex;
        flex-direction: column;
        .title {
          display: flex;
          .errorMsg {
            font-size: 15px;
            padding-left: 10px;
            color: red;
          }
        }
      }
      .name {
        input {
          width: 80%;
        }
      }
      .phone {
        input {
          width: 80%;
        }
      }
      .button {
        cursor: pointer;
        border-style: solid;
        border-width: 1px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .button:hover {
        background-color: black;
        color: white;
      }
    }
  }
  .payContainer {
    min-height: 300px;
    margin: 5%;
    padding: 5%;
    border-width: 1px;
    border-style: solid;
    .infoRow {
      display: flex;
      div {
        display: flex;
        font-size: 20px;
      }
    }
    .cartItem {
      display: flex;
      div {
        display: flex;
      }
    }
    .totalPay {
      display: flex;
      flex-direction: row-reverse;
      font-size: 25px;
      padding-bottom: 20px;
    }
    .userInfoRow {
      display: flex;
      flex-direction: column;
      .info {
        display: flex;
        div {
          display: flex;
        }
      }
      hr {
        width: 100%;
      }
    }
    .pay {
      display: flex;
      flex-direction: row-reverse;
      .button {
        display: flex;
        align-items: center;
        justify-content: center;
        border-style: solid;
        border-width: 1px;
        border-radius: 20px;
        width: 50%;
        height: 50px;
        cursor: pointer;
      }
      .button:hover {
        background-color: black;
        color: white;
      }
    }
  }
  .completedShopping {
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }
  @media (max-width: 767px) {
    .cartList {
      margin: 0;
      margin-top: 5%;
    }
    .userInfo {
      margin: 0;
      margin-top: 5%;
    }
    .payContainer {
      margin: 0;
      margin-top: 5%;
    }
  }
}
</style>
