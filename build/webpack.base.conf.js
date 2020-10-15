'use strict'
const path = require('path')  // node自带的文件路径工具
const utils = require('./utils')  // 工具函数集合
const config = require('../config')  // 配置文件
const vueLoaderConfig = require('./vue-loader.conf')  // 工具函数集合

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
  //eslint方法函数检查
// const createLintingRule = () => ({
//   test: /\.(js|vue)$/,
//   loader: 'eslint-loader',
//   enforce: 'pre',
//   include: [resolve('src'), resolve('test')],
//   options: {
//     formatter: require('eslint-friendly-formatter'),
//     emitWarning: !config.dev.showEslintErrorsInOverlay
//   }
// })

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,  // 编译输出的静态资源根路径
    filename: '[name].js',  // 编译输出的文件名
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },// 正式发布环境下编译输出的上线路径的根路径
  resolve: {
    extensions: ['.js', '.vue', '.json'],// 自动补全的扩展名
    // 路径别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',// 例如 import Vue from 'vue'，会自动到 'vue/dist/vue.common.js'中寻找
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      // 审查 js 和 vue 文件
      // ...(config.dev.useEslint ? [createLintingRule()] : []),
      // 处理 vue文件
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // 编译 js
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      // 处理图片文件
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      // 处理视频文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      // 处理字体文件
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
