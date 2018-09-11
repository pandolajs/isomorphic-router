module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2009-present sizhao-pandolajs, All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @fileoverview 基于 universal-router 的同构路由
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author sizhao | 870301137@qq.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @version 1.0 | 2018-01-17 | sizhao       // 初始版本
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @version 2.0 | 2018-03-05 | sizhao       // 1. 适配 UniversalRouter 6.0, 使用新增配置 `errorHandler` 作为 404 及错误处理
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *                                          // 2. 删除 notFound 配置项，使用 catch 统一配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *                                          // 3. catch 回调入参为 { code, context } 格式
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _universalRouter = __webpack_require__(1);

var _universalRouter2 = _interopRequireDefault(_universalRouter);

var _isFunction = __webpack_require__(2);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _pick = __webpack_require__(3);

var _pick2 = _interopRequireDefault(_pick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT = {
  baseUrl: '/',
  catchError: function catchError() {}

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
};
var IsomorphicRouter = function () {
  function IsomorphicRouter(requireContext, options) {
    var _this = this;

    _classCallCheck(this, IsomorphicRouter);

    this.middlewares = [function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(context, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return next();

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()];
    var opts = this.options = Object.assign({}, DEFAULT, options);
    this.catchError = DEFAULT.catchError;
    var filteredPath = [];

    var exclude = opts.exclude;


    filteredPath = requireContext.keys().filter(function (mod) {
      return exclude ? !exclude.test(mod) : true;
    });

    function verifyUniversalRoute(route) {
      var routeKeyStr = Object.keys(route).join(',');
      if (!/(?:path|action|children)/i.test(routeKeyStr)) {
        throw new Error(mod + ' MUST export a valid universal route');
      }
      return route;
    }

    var children = filteredPath.map(function (mod) {
      // route MUST be a valid Universal Route
      // {path, action, children? }
      var route = requireContext(mod).default;
      return verifyUniversalRoute(route);
    });

    this.children = children;
  }

  _createClass(IsomorphicRouter, [{
    key: 'use',
    value: function use(middleware) {
      (0, _isFunction2.default)(middleware) && this.middlewares.push(middleware);
      return this;
    }
  }, {
    key: 'catch',
    value: function _catch(callback) {
      this.catchError = callback;
      return this;
    }
  }, {
    key: 'router',
    value: function router() {
      var middlewares = this.middlewares,
          catchError = this.catchError;

      var routes = {
        path: '/',
        children: this.children,
        action: function action(context) {
          var _this2 = this;

          return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var route, next, composed;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    route = void 0;
                    next = context.next;
                    composed = middlewares.reduce(function (next, cur) {
                      return function (context) {
                        try {
                          return Promise.resolve(cur(context, next));
                        } catch (error) {
                          return Promise.reject(error);
                        }
                      };
                    }, next);
                    _context2.next = 5;
                    return composed(context);

                  case 5:
                    route = _context2.sent;
                    return _context2.abrupt('return', route);

                  case 7:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this2);
          }))();
        }
      };
      var router = new _universalRouter2.default(routes, Object.assign({}, (0, _pick2.default)(this.options, ['baseUrl', 'context', 'resolveRoute']), { errorHandler: catchError }));
      return router;
    }
  }]);

  return IsomorphicRouter;
}();

exports.default = IsomorphicRouter;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("universal-router");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("lodash/isFunction");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("lodash/pick");

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map