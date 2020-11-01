<template lang='pug'>
  #app
    div.mask(v-if='showMask',@click='closeDetailMask')
    div.header
      div.row
        router-link(to='/').title.col-3 Store
        div.col-5
        div.menu.col-3
          router-link.noselect(to='/') 首頁
          router-link.noselect(to='/productList') 商品
          div#customBtn.customGPlusSignIn(ref='googleBtn')
            div 登入
            span.icon
            span.buttonText
          router-link.noselect(to='/cart')
            img(:src='cartIcon')
            div.totalItemCount
              div {{ $store.getters.totalItemCount }}
        div.col-1
    div.mobileHeader
      div.row
        div.mobileButton.col-2(v-show='mobileMenuButton',@click='mobileMenuButton=false') 三
        div.mobileButton.col-2.fas.fa-times(v-show='!mobileMenuButton',@click='mobileMenuButton=true')
        router-link(to='/').col-8.title Store
        router-link.col-2.noselect(to='/cart')
          img(:src='cartIcon')
          div.totalItemCount
            div {{ $store.getters.totalItemCount }}
    transition(name='mobileMenu')
      div.mobileMenuContainer(v-show='!mobileMenuButton')
        div(@click='mobileMenuButton=true')
          div#customBtn.customGPlusSignIn(ref='googleBtnM')
            div 登入
        div(@click='mobileMenuButton=true')
          router-link.noselect(to='/') 首頁
        div(@click='mobileMenuButton=true')
          router-link.noselect(to='/productList') 商品
    router-view
    div.footer
      router-link.fas.fa-home(to='/')
      div(@click.prevnt='foo(5)') Calling 0123456789
      div ChrisTsao@gmail.com
      div 台北市一區二路三巷四號
      div 2020 Created by ChrisTsao
      div 僅個人練習,無商業用途
</template>
<script>
// let googleUser = {}
export default {
  data() {
    return {
      cartIcon: '',
      mobileMenuButton: true,
      showMask: false,
      auth2: null,
      googleUser: {}
    }
  },
  mounted() {},
  created() {
    window.app = this
    window.onGoogleSignIn = this.onGoogleSignIn

    this.$api
      .get('/posts1')
      .then(res => {
        this.cartIcon = res.data[0].content
      })
      .catch(this.$apiErrorHandler)

    this.$bus.$on('openMask', () => {
      this.showMask = true
    })
    this.$bus.$on('closeDetailMask', () => {
      this.showMask = false
    })

    this.startApp()
  },
  methods: {
    startApp() {
      window.gapi.load('auth2', () => {
        window.auth2 = window.gapi.auth2.init({
          client_id:
            '521176421258-n8pnbkeuo778lcfget842baec9b23ged.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        })
        this.attachSignin(this.$refs.googleBtn)
        this.attachSignin(this.$refs.googleBtnM)
      })
    },
    attachSignin(element) {
      window.auth2.attachClickHandler(
        element,
        {},
        function(googleUser) {
          const profile = googleUser.getBasicProfile()
          console.log('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
          console.log('Name: ' + profile.getName())
          console.log('Image URL: ' + profile.getImageUrl())
          console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
        },
        function(error) {
          alert(JSON.stringify(error, undefined, 2))
        }
      )
    },
    closeDetailMask() {
      this.$bus.$emit('closeDetailMask')
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/app.scss';
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
.loading {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #505050;
  z-index: 1;
  opacity: 0.7;
  div {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 50%;
    font-size: 50px;
    color: white;
  }
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
    padding: 3%;
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
  #customBtn {
    color: white;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 25px;
    div {
      display: flex;
      width: 4rem;
      font-size: 30px;
    }
  }
  #customBtn:hover {
    cursor: pointer;
  }
  span.label {
    // font-family: serif;
    // font-weight: normal;
  }
  span.icon {
    // background: transparent 5px 50% no-repeat;
    // display: inline-block;
    // vertical-align: middle;
    // width: 42px;
    // height: 42px;
  }
  span.buttonText {
    display: inline-block;
    vertical-align: middle;
    padding-left: 42px;
    padding-right: 42px;
    font-size: 14px;
    font-weight: bold;
    /* Use the Roboto font that is loaded in the <head> */
    font-family: 'Roboto', sans-serif;
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
    #customBtn {
      color: black;
      width: 45px;
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 25px;
      div {
        display: flex;
        width: 100%;
        font-size: 1rem;
      }
    }
  }
  @media (min-width: 768px) {
    .mobileHeader {
      display: none;
    }
  }
}
</style>
