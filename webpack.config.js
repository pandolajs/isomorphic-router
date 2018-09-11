/**
 * Copyright (c) 2009-present sizhao-pandolajs, All rights reserved.
 * @fileoverview webpack 构建脚本
 * @author sizhao | 870301137@qq.com
 * @version 1.0 | 2018-01-18 | sizhao
 */

import nodeExternals from 'webpack-node-externals'
import path from 'path'

export default {
  name: '',
  entry: "./src/index.js",
  output: {
    libraryTarget: "commonjs2",
    filename: "index.js",
    path: path.resolve(__dirname, 'lib')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  externals: [
    nodeExternals()
  ],
  devtool: 'source-map'
}
