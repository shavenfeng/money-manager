const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const pathResolve = (parmas) => path.resolve(__dirname, parmas)

module.exports = {
  entry: {
    index: pathResolve('../src/index.tsx'),
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: pathResolve('../dist'),
    publicPath: '/'
  },
  cache: true,
  profile: true,
  resolve: {
    modules: [pathResolve('../node_modules')],
    alias: {
      '@': pathResolve('../src/'),
      '@components': pathResolve('../src/components'),
      '@constant': pathResolve('../src/constant'),
      '@layoyt': pathResolve('../src/layout'),
      '@service': pathResolve('../src/service'),
      '@static': pathResolve('../src/static'),
      '@store': pathResolve('../src/store'),
      '@utlis': pathResolve('../src/utils')
    },
    extensions: ['json', '.ts', '.tsx', '.js', 'jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
            },
          },
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: pathResolve('../src/style.scss')
            }
          }
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: 'file-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]:[hash:8].[ext]',
              outputPath: './images',
              limit: 1024 * 30,
              fallback: 'file-loader'
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'life tool app',
      template: path.resolve('./public/index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
}
