module.exports = {
  devServer: {
    proxy: {
      '/posts1': {
        target: 'http://localhost:3000/shop/posts1',
        changeOrigin: true
      },
      '/posts2': {
        target: 'http://localhost:3000/shop/posts2',
        changeOrigin: true

      }
    }
  },
  configureWebpack: {

  },
  chainWebpack: config => {
    config.module
      .rule('json')
      .test(/\.json$/)
      .use('json-loader')
      .loader('json-loader')
      .end()
  }
}
