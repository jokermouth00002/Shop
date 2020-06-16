<template lang='pug'>
  #app
    div.mask(v-if='showMask')
    div.header
      div.row
        router-link(to='/').title.col-6 Store
        div.col-2
        div.menu.col-3
          router-link(to='/') 首頁
          router-link(to='/productList') 商品
          router-link(to='/cart')
            img(:src='cartIcon')
            div.totalItemCount
              div {{ $store.getters.totalItemCount }}
        div.col-1
    div.mobileHeader
      div.row
        div.mobileButton.col-2(v-if='mobileMenuButton',@click='mobileMenuButton=false') 三
        div.mobileButton.col-2(v-if='!mobileMenuButton',@click='mobileMenuButton=true') X
        router-link(to='/').col-8.title Store
        router-link.col-2(to='/cart')
          img(:src='cartIcon')
          div.totalItemCount
            div {{ $store.getters.totalItemCount }}
    transition(name='mobileMenu')
      div.mobileMenuContainer(v-if='!mobileMenuButton')
        div(@click='mobileMenuButton=true')
          router-link(to='/') 首頁
        div(@click='mobileMenuButton=true')
          router-link(to='/productList') 商品
    router-view
    div.footer
      router-link.fas.fa-home(to='/')
      div Calling 0123456789
      div ChrisTsao@gmail.com
      div 台北市一區二路三巷四號
      div 2020 Created by ChrisTsao
      div 僅個人練習,無商業用途
</template>
<script>
export default {
  data() {
    return {
      cartIcon: '',
      mobileMenuButton: true,
      showMask: false
    }
  },
  created() {
    window.app = this
    this.$api.get('posts1').then(res => {
      this.cartIcon = res.data[0].content
    })
    this.$bus.$on('openMask', () => {
      this.showMask = true
    })
    this.$bus.$on('closeDetailMask', () => {
      this.showMask = false
    })
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.mask {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #505050;
  z-index: 1;
  opacity: 0.7;
}
body {
  margin: 0;
  .header {
    width: 100%;
    height: 20vh;
    background-color: black;
    color: white;
    a {
      color: white;
      font-size: 30px;
      text-decoration: none;
    }
    .row {
      margin: 0;
      height: 100%;
      display: flex;
      align-items: center;
      .title {
        font-size: 50px;
      }
      .menu {
        display: flex;
        justify-content: space-around;
        .totalItemCount {
          position: absolute;
          display: inline-flex;
          width: 30px;
          height: 30px;
          border-radius: 999rem;
          background-color: white;
          color: black;
          div {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            margin-top: -5px;
          }
        }
      }
    }
  }
  .mobileHeader {
    width: 100%;
    height: 15vh;
    background-color: black;
    color: white;
    .row {
      margin: 0;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 30px;
      a {
        text-decoration: none;
        color: white;
      }
      .mobileButton {
        font-size: 30px;
      }
      .title {
        font-size: 30px;
      }
      .totalItemCount {
        position: absolute;
        top: 0;
        left: 45px;
        width: 20px;
        height: 20px;
        border-radius: 999rem;
        background-color: white;
        color: black;
        div {
          width: 30px;
          height: 30px;
          margin-left: -5px;
        }
      }
    }
  }
  .mobileMenuContainer {
    background-color: wheat;
    padding-left: 45px;
    position: absolute;
    width: 100%;
    z-index: 2;
    div {
      display: flex;
      padding-top: 10px;
      a {
        color: black;
        text-decoration: none;
      }
    }
  }
  .footer {
    padding: 5%;
    background-color: black;
    color: white;
    padding-bottom: 20px;
    a {
      text-decoration: none;
    }
    .fa-home {
      font-size: 30px;
      color: white;
    }
  }
  .mobileMenu-enter-active {
    animation: mobileMenuOn 0.6s;
  }
  .mobileMenu-leave-active {
    animation: mobileMenuOff 0.6s;
  }
  @keyframes mobileMenuOn {
    0% {
      left: -100%;
    }
    100% {
      left: 0%;
    }
  }
  @keyframes mobileMenuOff {
    0% {
      left: 0%;
    }
    100% {
      left: -100%;
    }
  }

  @media (max-width: 767px) {
    .header {
      display: none;
    }
  }
  @media (min-width: 768px) {
    .mobileHeader {
      display: none;
    }
  }
}
</style>
