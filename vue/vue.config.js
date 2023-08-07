// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
// 跨域配置

// module.exports = defineConfig({
//   devServer: {
//     host: '0.0.0.0',
//     // https:true,
//     port: 9876,
//     client: {
//       webSocketURL: 'ws://0.0.0.0:9876/ws',
//     },
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//     }
//   },
//
//   transpileDependencies: true
// })

module.exports = {
  // 基本路径 baseURL已经过时
  publicPath: process.env.NODE_ENV == "production" ? "./" : "/",
  // publicPath: '../../',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  productionSourceMap: true,
  // css相关配置
  // css: {
  //   // 是否使用css分离插件 ExtractTextPlugin
  //   extract: true,
  //   // 开启 CSS source maps?
  //   sourceMap: false,
  //   // css预设器配置项
  //   loaderOptions: {},
  //   // 启用 CSS modules for all css / pre-processor files.
  //   // modules: false
  // },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  // parallel: require('os').cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // pwa: {},
  //webpack - dev - server 相关配置


  devServer: {                //记住，别写错了devServer//设置本地默认端口  选填
    port: 9876,
    proxy: {                 //设置代理，必须填
      '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
        target: 'http://120.79.190.143:9090',     //代理的目标地址
        changeOrigin: true,              //是否设置同源，输入是的
        pathRewrite: {                   //路径重写
          '^/api': ''                     //选择忽略拦截器里面的内容
        }
      }
    },
    // open: process.platform === 'darwin',
    // disableHostCheck: true,
    // host: '120.79.190.143', //填公网IP
    // https: false,
    // hotOnly: false,
    // before: app => {}
  },
  configureWebpack: {
    externals: {
      "BMap": "BMap"
    }
  }
}