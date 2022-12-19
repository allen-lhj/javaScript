## CommonJS

## 概述

Node应用由模块组成,采用CommonJS 模块规范.
每个文件就是一个模块,有自己的作用域.在一个文件里面定义的变量、函数、类,都是私有的,对其他文件不可见.

```javascript
// example.js
var x = 5;
var addX = function (value) {
  return value + x;
}

module.exports.x = x;
module.exports.addX = addX;

// index.js
var example = require('./example.js');
console.log(example.x); // 5
console.log(example.addX(1));//6
```
CommonJS模块的特点如下.

- 所有代码都运行在模块作用域,不会污染全局作用域.
- 模块可以多次加载,但是只会在第一次加载时运行一次,然后运行结果就被缓存了,以后再加载,就直接读取缓存结果.要想让module再次运行,必须清除缓存
- 模块加载的顺序,按照其在代码中出现的顺序.

## module对象

Node 内部提供一个Module构建函数.所有模块都是Module的实例.
``` javascript
function Module(id, parent) {
  this.id = id;
  this.exports = {};
  this.parent = parent;'
}
```
每个模块内部都有一个module对象,代表当前模块.它有以下属性

- module.id 模块的标识符,通常是带有绝对路径的模块文件名.
- module.filename 模块的文件名,带有绝对路径.
- module.loaded 返回一个布尔值,表示模块是否已经完成加载.
- module.parent 返回一个对象,表示调用到该模块的模块.
- module.children 返回一个数组,表示该模块要用到其他模块.
- module.exports 表示模块对外输出的值.

## module.exports 属性

module.exports 属性表示当前模块对外输出的接口,其他文件加载该模块,实际上就是读取module.exports属性

使用exports时要注意一个问题,即不要直接给exports赋值,否则会导致其失效.如:

```javascript
// bad
exports = {
  name: 'calculater'
}
// good
exports.name = 'calculater';
```
以上代码中,由于对exports进行了赋值操作,使其指向了新的对象,而module.exports却仍然指向原来的空对象,因此name属性并不会被导出

另一个在导出时容易犯的错误是不恰当的把module.exports 与exports混用

```javascript
exports.add = function (a, b) {
  retrun a + b;
}
module.exports = {
  name: 'calculater'
}
```
上面的代码先通过exports导出了add属性,然后将module.exports重新赋值为另外一个对象,这会导致原本拥有的add属性对象丢失,最后导出的只有name


## require命令

Node使用CommonJS规范,内置的require命令用于加载模块文件

`require`命令的基本功能是,读取并执行一个javaScript文件,然后返回该模块的exports对象.如果没有发现指定的模块会报错

```javascript
// example
module.exports = (function () {
  console.log('hello node')
})()
// index
var example = require('./example');

// node index.js ---> hello node
```

### require加载规则

require 命令用于加载文件,后缀名默认为.js

```javascript
var foo = require('foo');

// 等同于
var foo = require('foo.js');
```
根据参数不同格式. `require`命令去不同路径寻找模块文件

- 如果参数以 / 开头.则表示加载的是一个位于绝对路径下的模块文件.
- 如果参数以 ./ 开头, 则表示加载的是一个位于相对路径(跟当前执行脚本的位置相比)的模块文件
- 如果参数不以 / 或 ./ 开头,则表示加载的是一个默认提供的核心模块(位于Node的系统安装目录中),
  或者一个位于各级node_modules目录中的已安装模块
  举例来说，脚本/home/user/projects/foo.js执行了require('bar.js')命令，Node会依次搜索以下文件。
  /usr/local/lib/node/bar.js
  /home/user/projects/node_modules/bar.js
  /home/user/node_modules/bar.js
  /home/node_modules/bar.js
  /node_modules/bar.js
- 如果参数字符串不以/ 或 ./ 开头,而是一个路径,比如require('example-module/path/to/file'),则将先找到
  example-module的位置,然后再以它的参数,找到后续路径
- 如果指定的模块文件没有发现，Node会尝试为文件名添加.js、.json、.node后，再去搜索。.js件会以文本格式的JavaScript脚本文件解析，.json文件会以JSON格式的文本文件解析，.node文件会以编译后的二进制文件解析。
- 如果想得到require命令加载的确切文件名，使用require.resolve()方法。