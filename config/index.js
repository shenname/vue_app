'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // proxyTable 代理的接口（可跨域）
    proxyTable: {},
    // proxyTable: {
    //   '/api': {
    //     target: 'http://xxxxxx.com', // 接口的域名
    //     // secure: false,  // 如果是https接口，需要配置这个参数
    //     changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    // }
    // Various Dev Server settings
    host: '172.16.39.0', // 本地访问路径
    port: 8080, // // 端口号
    autoOpenBrowser: false,// 是否自动打开浏览器
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true// 默认情况下，关闭 CSS Sourcemaps，因为使用相对路径会报错。
  },

  build: {
    index: path.resolve(__dirname, '../dist/index.html'),// 构建输出的index.html文件
    assetsRoot: path.resolve(__dirname, '../dist'),// 构建输出的静态资源路径
    assetsSubDirectory: 'static',// 构建输出的二级目录
    assetsPublicPath: './',// 构建发布的根目录，可配置为资源服务器域名或 CDN 域名
    productionSourceMap: true,// 是否开启 cssSourceMap
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,// 默认关闭 gzip，因为很多流行的静态资源主机，例如 Surge、Netlify，已经为所有静态资源开启gzip
    productionGzipExtensions: ['js', 'css'],// 需要使用 gzip 压缩的文件扩展名
    // 运行“build”命令行时，加上一个参数，可以在构建完成后参看包分析报告
    // true为开启，false为关闭
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
