const fs = require('fs-extra')
const express = require('express')
const debug = require('debug')('app:server')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

const app = express()
const env = process.env.NODE_ENV || 'development'
if (env === 'development') {
  app.use(require('connect-history-api-fallback')())
  const compiler = webpack(webpackConfig)
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: "/",
    hot: true,
    inline: true,
    stats: {
      colors: true
    }
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    log: false,
    path: "/__webpack_hmr",
    heartbeat: 2000
  }))
  app.use(express.static('./src/static'))
  app.listen(process.env.PORT)
} else {
  var compiler = webpack(webpackConfig)
  debug("start...")
  compiler.run(function (err) {
    if (err) {
      console.log("编译失败！")
      return;
    }
    debug("代码编译完毕！")
    fs.copySync('./src/static', './dist')
    debug("copy静态资源完毕！")
  })
}

// module.exports = app
