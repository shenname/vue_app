'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'// 设置当前环境为生产环境

const ora = require('ora')// loading 插件
const rm = require('rimraf')// 可以在 node 中执行`rm -rf`的工具
const path = require('path')// node自带的文件路径工具
const chalk = require('chalk')// 在终端输出带颜色的文字
const webpack = require('webpack')
const config = require('../config')// 配置文件
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()// 在终端显示loading效果，并输出提示
// 删除这个文件夹 （递归删除）
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
     // 构建
  webpack(webpackConfig, (err, stats) => {
    // 构建成功
    // 停止 loading动画
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    // 打印提示
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
