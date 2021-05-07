const path = require('path')
module.exports = {

  lintOnSave: false,
  outputDir:"bicycleRace", //打包后的项目目录名称
  publicPath: "./",
  // baseUrl: process.env_NODE_ENV == 'production' ? '/vehiclerepair/' : '', // 部署项目路径
  devServer: {
    // public: '192.168.1.106',
    port: '7852', // 端口号
    // host: '10.1.',
    open: false, // 配置自动启动浏览器
    proxy: {
      '/cycling/*': {
        // target: 'http://10.1.4.175:8001/traffic-investment',
        target: 'http://10.1.30.202:50000/cycling',
        // target: 'http://101.231.47.116:50000/cycling',
        // target: 'http://192.168.1.106:8080/cycling',
        // target: 'http://192.168.1.103:8080/cycling',
        // target: 'http://10.1.30.207:50045/api2db', // 测试
        changeOrigin: true,
        pathRewrite: {
          '/cycling': '/'
        }
      },
    
    }
  },
	chainWebpack: config => {
		const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
		types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
	},
	css: {
		loaderOptions: {
			less: {
				javascriptEnabled: true
			}
		}
	}
}
function addStyleResource(rule) {
	rule.use('style-resource')
	.loader('style-resources-loader')
	.options({
		patterns: [
			// 需要全局导入的less路径，自己修改，我这里引入了两个less文件
			path.resolve(__dirname, './src/assets/css/index.less'),
		],
	})
}
