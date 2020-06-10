<template lang='pug'>
 div
    div.carousel.slide(data-ride='carousel',id='carousel')
        ol.carousel-indicators
            li.active(data-target='#carousel',data-slide-to='0')
            li(data-target='#carousel',data-slide-to='1')
            li(data-target='#carousel',data-slide-to='2')
        div.carousel-inner
            div.carousel-item.active
                img.d-block.w-100(:src='sliders[0]')
            div.carousel-item
                img.d-block.w-100(:src='sliders[1]')
            div.carousel-item
                img.d-block.w-100(:src='sliders[2]')
    p(v-for='slider in sliders') {{ slider }}
</template>
<script>
export default {
  data() {
    return {
      sliders: []
    }
  },
  created() {
    window.home = this

    this.$api
      .get('/posts1')
      .then(res => {
        const carouselArray = res.data.filter(
          element => element.title === 'carouselImg'
        )
        carouselArray.forEach(element => {
          this.sliders.push(element.content)
        })
        console.log(this.sliders)
      })
      .catch(this.$apiErrorHandler)
  }
}
</script>
