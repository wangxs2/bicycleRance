const webpack = require('webpack')
// const path = require('path')

// function resolve(dir) {
//   return path.join(__dirname, '..'1, dir)
// }

module.exports = {
  lintOnSave: false,
  outputDir: 'dist', // 打包名称
  publicPath: './', // 部署项目路径
  devServer: {
    port: 8088, // 端口号
    open: false, //配置自动启动浏览器
    proxy: {
      '/cycling/*': {
        // target: 'http://10.1.4.175:8001/traffic-investment',
        // target: 'http://10.1.30.202:50000/cycling',
        target: 'http://101.231.47.116:50000/cycling',
        // target: 'http://192.168.1.106:8080/cycling',
        // target: 'http://192.168.1.111:50000/cycling',
        changeOrigin: true,
        pathRewrite: {
          '/cycling': '/'
       } 
      }
    }
  },

  configureWebpack: {
    // webpack 配置项
    // resolve: {
    //   alias: {
    //     vue$: 'vue/dist/vue.esm.js'
    //     // '@': resolve('src'),
    //     // 'views': resolve('src/views')
    //   }
    // },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        // data: `@import "@/assets/css/global.scss";`
      },
    },
    extract: false
  }
}
