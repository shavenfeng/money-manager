const path = require('path')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.config')
const { proxyTarget } = require('./config')

const devConfig = {
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 200,
    poll: 1000
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    inline: true,
    compress: true,
    contentBase: './dist',
    port: 9001,
    host: '0.0.0.0',
    hot: true,
    hotOnly: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: proxyTarget,
        // pathRewrite: { '^/api': '' }
      },
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
}

module.exports = merge(baseConfig, devConfig)
