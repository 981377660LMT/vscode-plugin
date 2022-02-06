// @ts-check

'use strict'

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { webviewSrc } = require('../getPath.js')

/**@type {import('webpack').Configuration}*/
const config = {
  entry: path.resolve(webviewSrc, 'index.tsx'),
  watch: true,
  watchOptions: {
    ignored: ['/node_modules'],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    alias: {
      '@': webviewSrc,
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        include: webviewSrc,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              // 关闭后打包快了1.5s
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
}
module.exports = config