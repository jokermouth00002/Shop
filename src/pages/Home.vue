<template lang="pug">
div
    router-link(to='/productList') 商品列表
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
    this.$api
      .get('/posts1')
      .then(res => {
        this.sliders = res.data
      })
      .catch(this.$apiErrorHandler)
  }
}
</script>
