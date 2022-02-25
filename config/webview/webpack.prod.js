// @ts-check

'use strict'

const { merge } = require('webpack-merge')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
// @ts-ignore
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const commonConfig = require('./webpack.common.js')
const { webviewDist, webviewSrc } = require('../getPath.js')

/**@type {import('webpack').Configuration}*/
module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    path: webviewDist,
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].[contentHash:8].js',
  },
  watch: false,
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: webviewSrc,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        include: webviewSrc,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[contenthash:8].[ext]',
            outputPath: '/images/',
            limit: 10 * 1024,
          },
        },
      },
      // 处理多媒体文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: '[name]_[contenthash:8].[ext]',
          outputPath: '/video/',
          limit: 10 * 1024,
        },
      },
      {
        test: /\.(eot|woff2|woff|ttf|svg)$/,
        include: webviewSrc,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[contenthash:8].[ext]',
            outputPath: '/font/',
          },
        },
      },
    ],
  },
  plugins: [
    // 抽离 css 文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify('production'),
    }),
  ],
  externals: {},
  optimization: {
    // 压缩 css
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    // 分割代码块
    // splitChunks: {
    //   chunks: 'all',
    //   cacheGroups: {
    //     // 第三方模块
    //     vendor: {
    //       name: 'vendor',
    //       priority: 1,
    //       test: /node_modules/,
    //       minSize: 3 * 1024,
    //       minChunks: 1,
    //     },
    //     // 公共引用的模块
    //     common: {
    //       name: 'common',
    //       priority: 0,
    //       minSize: 3 * 1024,
    //       minChunks: 2,
    //     },
    //   },
    // },
  },
  devtool: false,
})
