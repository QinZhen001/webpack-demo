# 学习

[https://juejin.im/post/5de06aa851882572d672c1ad](https://juejin.im/post/5de06aa851882572d672c1ad)

### 解析 bundle 如何加载模块


* bundle 是一个立即执行函数，可以认为它是把所有模块捆绑在一起的一个巨型模块。
* webpack 将所有模块打包成了 bundle 的依赖，通过一个对象注入
* 0 模块 就是入口
* webpack 通过 __webpack_require__ 引入模块
* __webpack_require__ 就是我们使用的 require，被 webpack 封装了一层



### 动态 import 加载原理

如果我们把 index.js 的 require 改成 import 会发生什么？


**我们知道 import 跟 require 的区别是，import 是动态加载只有在用到的时候才会去加载，而 require 只要声明了就会加载，webpack 遇到了 require 就会把它当成一个模块加载到 bundle 的依赖里**


那么问题来了，如果我们使用了 import 去引用一个模块，它是如何加载的呢？



-----

动态加载打包结果

除了正常的 bundle 之外，我们还可以看见一个 0.boundle.js

0.boundle.js 就是我们的动态加载的 index.css 模块



---

动态模块

这个文件就是把我们 import 的模块放进了一个单独的 js 文件中


```javascript
(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [0],
  {
    './node_modules/css-loader/dist/runtime/api.js': function(
      module,
      exports,
      __webpack_require__
    ) {
      'use strict';
      eval(`
        ...
      `);
    },

    './src/style/index.css': function(module, exports, __webpack_require__) {
      eval(`
        exports = module.exports = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(false));
        exports.push([module.i, \`body {
          width: 100%;
          height: 100vh;
          background-color: orange;
        },"\`]
      `);
    }
  }
]);
```



**原理很简单，就是利用的 jsonp 的实现原理加载模块，只是在这里并不是从 server 拿数据而是从其他模块中**


* 调用模块时会在 window 上注册一个 webpackJsonp 数组，window['webpackJsonp'] = window['webpackJsonp'] || []
* 当我们 import时，webpack 会调用 __webpack_require__.e(0) 方法，也就是 requireEnsure
* webpack 会动态创建一个 script 标签去加载这个模块，加载成功后会将该模块注入到 webpackJsonp 中
* webpackJsonp.push 会调用 webpackJsonpCallback 拿到模块
* 模块加载完（then）再使用 __webpack_require__ 获取模块


#### requireEnsure

```javascript
  __webpack_require__.e = function requireEnsure(chunkId) {
    var promises = [];
    // ...
    var script = document.createElement('script');
    var onScriptComplete;
    script.charset = 'utf-8';
    script.timeout = 120;
    script.src = jsonpScriptSrc(chunkId);

    onScriptComplete = function(event) {
      // 处理异常，消除副作用
      // ...
    };
    var timeout = setTimeout(function() {
      onScriptComplete({ type: 'timeout', target: script });
    }, 120000);
    script.onerror = script.onload = onScriptComplete;
    document.head.appendChild(script);
    // ...
    // 动态加载模块
    return Promise.all(promises);
  };

```














