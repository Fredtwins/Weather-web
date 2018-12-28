const webpack = require('webpack')

module.exports = {
  baseUrl: './',
  outputDir: 'dist',
  // baseUrl: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
  devServer: {
    port: 8080,
    host: '0.0.0.0'
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
    // chainWebpack: config => {
    //   config.resolve.alias
    //     .set('@', resolve('src'))
    //     .set('static', resolve('static'))
    //     .set('api', resolve('src/api'))
    //     .set('base', resolve('src/base'))
    //     .set('common', resolve('src.common'))
    //     .set('components', resolve('src/components'))
    // }
    // configureWebpack: {
    //   resolve: {
    //     extensions: ['.js', '.vue', '.json'],
    //     alias: {
    //       'static': 'static',
    //       'api': '@/api',
    //       'base': '@/base',
    //       'common': '@/common',
    //       'components': '@/components'
    //     }
    //   }
    // }
  }
};
