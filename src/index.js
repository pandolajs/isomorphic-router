/**
 * Copyright (c) 2009-present sizhao-pandolajs, All rights reserved.
 * @fileoverview 基于 universal-router 的同构路由
 * @author sizhao | 870301137@qq.com
 * @version 1.0 | 2018-01-17 | sizhao       // 初始版本
 * @version 2.0 | 2018-03-05 | sizhao       // 1. 适配 UniversalRouter 6.0, 使用新增配置 `errorHandler` 作为 404 及错误处理
 *                                          // 2. 删除 notFound 配置项，使用 catch 统一配置
 *                                          // 3. catch 回调入参为 { code, context } 格式
 */

import UniversalRouter from 'universal-router'
import isFunction from 'lodash/isFunction'
import pick from 'lodash/pick'

const DEFAULT = {
  baseUrl: '/',
  catchError: () => {}
}

/**
 * https://github.com/webpack/docs/wiki/context
 * @param requireContext {Function}         // webpack require.context 返回的函数，接收模块路径
 *   @param requireContext.keys {Function}
 *   @param requireContext.resolve {Function}
 *   @param requireContext.id {String}
 * @param options {Object}
 *   @param option.baseUrl {String}
 *   @param option.context {Object}
 *   @param option.resolveRoute {Function}
 *   @param option.exclude {RegExp}
*/
class IsomorphicRouter {
  constructor(requireContext, options){
    this.middlewares = []
    const opts = this.options = Object.assign({}, DEFAULT, options)
    this.catchError = DEFAULT.catchError
    let filteredPath = []

    const { exclude } = opts

    filteredPath = requireContext.keys().filter((mod) => {
      return exclude ? !exclude.test(mod) : true
    })

    function verifyUniversalRoute(route){
      const routeKeyStr = Object.keys(route).join(',')
      if(!/(?:path|action|children)/i.test(routeKeyStr)){
        throw new Error(`${mod} MUST export a valid universal route`)
      }
      return route
    }

    const children = filteredPath.map((mod) => {
      // route MUST be a valid Universal Route
      // {path, action, children? }
      let route = requireContext(mod).default
      return verifyUniversalRoute(route)
    })

    this.children = children
  }

  use(middleware){
    isFunction(middleware) && this.middlewares.push(middleware)
    return this
  }

  catch(callback){
    this.catchError = callback
    return this
  }

  router(){
    const { middlewares, catchError } = this
    const routes = {
      path: '',
      children: this.children,
      async action(context){
        const composed = middlewares.reduceRight((next, cur) => context => {
          try{
            return Promise.resolve(cur(context, next))
          }catch(error){
            return Promise.reject(error)
          }
        }, () => {})

        return composed(context)
      }
    }
    const router = new UniversalRouter(routes, Object.assign({}, pick(this.options, ['baseUrl', 'context', 'resolveRoute']), { errorHandler: catchError }))
    return router
  }
}

export default IsomorphicRouter
