const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

const prodConfig = {
  mode: 'production',
  devtool: 'hidden-source-map',
  performance: {
    hints: 'warning',
    maxAssetSize: 204800,
    maxEntrypointSize: 204800,
  },
  plugins: [
  ]
}

module.exports = merge(prodConfig, baseConfig)
