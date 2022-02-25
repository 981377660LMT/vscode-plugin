// @ts-check

'use strict'

const { merge } = require('webpack-merge')
const webpack = require('webpack')
const commonConfig = require('./webpack.common.js')
const { webviewDist, webviewSrc } = require('../getPath.js')

/**@type {import('webpack').Configuration}*/
module.exports = merge(commonConfig, {
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: ['/node_modules'],
  },
  output: {
    // web项目的输出
    path: webviewDist,
    filename: 'js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: webviewSrc,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        include: webviewSrc,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              // 开启css module
              // modules:true
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        include: webviewSrc,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/images/',
            },
          },
        ],
      },
      // 处理多媒体文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/video/',
            },
          },
        ],
      },
      {
        test: /\.(eot|woff2|woff|ttf|svg)$/,
        include: webviewSrc,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '/font/',
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development'),
    }),
  ],
  /**
   * 不可使用 'eval-cheap-module-source-map'，会引起CSP错误
   * @see {@link https://github.com/sivertschou/react-typescript-chrome-extension-boilerplate/issues/1}
   */
  devtool: 'cheap-module-source-map',
})
