<template lang='pug'>
 div
  div.loading(v-if='loading')
    div loading...
  div.carousel.slide(v-else,data-ride='carousel',data-interval='3000',id='carousel1')
    ol.carousel-indicators
      li.active(data-target='#carousel1',data-slide-to='0')
      li(data-target='#carousel1',data-slide-to='1')
      li(data-target='#carousel1',data-slide-to='2')
    div.carousel-inner
      div.carousel-item.active
        img.d-block.w-100(:src='sliders[0]')
      div.carousel-item
        img.d-block.w-100(:src='sliders[1]')
      div.carousel-item
        img.d-block.w-100(:src='sliders[2]')
  div.sloganContainer
    div.blank
    img(:src='sloganImg')
    div.slogan
      div.one 面對疫情
      div.two 在家購物救經濟
    div.blank
  div.productPreview
    div(v-for='product in productArray')
      img(:src='product.content')
      p.pt-6 {{product.title}}
  div.buttonContainer.noselect
    router-link.button(to='/productList') more
</template>
<script>
export default {
  data() {
    return {
      sliders: [],
      sloganImg: [],
      productArray: [],
      loading: true
    }
  },
  created() {
    window.home = this
    this.loading = true
    this.$api
      .get('/posts1')
      .then(res => {
        const carouselArray = res.data.filter(
          element => element.title === 'carouselImg'
        )
        carouselArray.forEach(element => {
          this.sliders.push(element.content)
        })
        this.sloganImg = res.data[res.data.length - 1].content
      })
      .catch(this.$apiErrorHandler)

    this.$api
      .get('/posts2')
      .then(res => {
        this.productArray = res.data.splice(0, 3)
      })
      .catch(this.$apiErrorHandler)
      .then(() => {
        this.loading = false
      })
  },
  mounted() {
    window.$('.carousel').carousel()
  }
}
</script>
<style scoped lang='scss'>
.sloganContainer {
  display: flex;
  justify-content: space-around;
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
  .slogan {
    writing-mode: vertical-rl;
    font-size: 40px;
    display: flex;
    flex-direction: column-reverse;
    padding-top: 10%;
    .one {
      display: flex;
    }
  }
  img {
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .blank {
    width: 15%;
  }
}
.productPreview {
  background-color: #707070;
  display: flex;
  justify-content: space-evenly;
  padding-top: 3rem;
  div {
    width: 300px;
    height: 300px;
    img {
      padding-top: 25px;
      width: 90%;
      height: 90%;
    }
    p {
      color: white;
    }
  }
}
.buttonContainer {
  background-color: #707070;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 20px;
  a {
    text-decoration: none;
  }
  .button {
    width: 100px;
    height: 50px;
    background-color: lightseagreen;
    color: white;
    border-radius: 10rem;
    padding-top: 15px;
    cursor: pointer;
  }
}
@media (max-width: 767px) {
  .sloganContainer {
    img {
      width: 60%;
    }
    .slogan {
      font-size: 30px;
      padding-top: 30%;
    }
  }
  .productPreview {
    display: flex;
    flex-direction: column;
    div {
      width: 100%;
      height: 100%;
      img {
        width: 200px;
        height: 200px;
      }
    }
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .sloganContainer {
    .slogan {
      padding-top: 20%;
    }
  }
}
</style>
