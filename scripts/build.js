/**
 * Copyright (c) 2009-present sizhao-pandolajs, All rights reserved.
 * @fileoverview 构建
 * @author sizhao | 870301137@qq.com
 * @version 1.0 | 2018-01-18 | sizhao
 */

import webpack from 'webpack'
import config from '../webpack.config'

webpack(config).run((error, stats) => {
  if(error){
    console.error(error)
  }
  console.log('Build successfully!')
})
