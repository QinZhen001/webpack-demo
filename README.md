# webpack-demo
:bowtie: webpack练习的相关demo


## webpack-loader

[https://webpack.docschina.org/contribute/writing-a-loader](https://webpack.docschina.org/contribute/writing-a-loader)

### 什么是 webpack loader


webpack loader 是 webpack 为了处理各种类型文件的一个中间层，webpack 本质上就是一个 node 模块，它不能处理 js 以外的文件，那么 loader 就帮助 webpack 做了一层转换，将所有文件都转成字符串，你可以对字符串进行任意操作/修改，然后返回给 webpack 一个包含这个字符串的对象，让 webpack 进行后面的处理。如果把 webpack 当成一个垃圾工厂的话，那么 loader 就是这个工厂的垃圾分类！



### 简单用法

当一个 loader 在资源中使用，这个 loader 只能传入一个参数 - 这个参数是一个包含包含资源文件内容的字符串


同步 loader 可以简单的返回一个代表模块转化后的值。在更复杂的情况下，loader 也可以通过使用 this.callback(err, values...) 函数，返回任意数量的值。错误要么传递给这个 this.callback 函数，要么扔进同步 loader 中。

loader 会返回一个或者两个值。第一个值的类型是 JavaScript 代码的字符串或者 buffer。第二个参数值是 SourceMap，它是个 JavaScript 对象。


### 复杂用法 


当链式调用多个 loader 的时候，请记住它们会以相反的顺序执行。取决于数组写法格式，从右向左或者从下向上执行。

* 最后的 loader 最早调用，将会传入原始资源内容。
* 第一个 loader 最后调用，期望值是传出 JavaScript 和 source map（可选）。
* 中间的 loader 执行时，会传入前一个 loader 传出的结果。







