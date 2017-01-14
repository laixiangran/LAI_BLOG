---
title: ECMAScript 6入门 - let和const命令
date: 2016-05-14 14:47:02
tags:
- ECMAScript6
- JavaScript
categories: JavaScript
---

>> 详细学习链接: [http://es6.ruanyifeng.com/#docs/let](http://es6.ruanyifeng.com/#docs/let)

# let命令

## 基本用法

ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

```javascript
'use strict';
{
  let a = 10;
  var b = 1;
}

a // 报错，ReferenceError: a is not defined.
b // 1
```

## 不存在变量提升

let不像var那样会发生“变量提升”现象。所以，变量一定要在声明后使用，否则报错。

```javascript
'use strict';
console.log(foo); // 输出undefined
console.log(bar); // 报错，ReferenceError: bar is not defined.

var foo = 2;
let bar = 2;
```

## 暂时性死区

只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称TDZ）。

```javascript
'use strict';
if (true) {
    // TDZ开始
    tmp = 'abc'; // 报错，ReferenceError: tmp is not defined.
    console.log(tmp); // 报错，ReferenceError: tmp is not defined.

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}
```

## 不允许重复声明

let不允许在相同作用域内，重复声明同一个变量。

```javascript
'use strict';
// 报错，TypeError: Duplicate declaration "a".
function test() {
    let a = 10;
    var a = 1;
}

// 报错，TypeError: Duplicate declaration "a".
function test() {
    let a = 10;
    let a = 1;
}
```

因此，不能在函数内部重新声明参数。

```javascript
'use strict';
function func(arg) {
  let arg; // 报错，TypeError: Duplicate declaration "arg"
}

function func(arg) {
  {
    let arg; // 不报错
  }
}
```

# 块级作用域

## 为什么需要块级作用域？

ES5只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

第一种场景，内层变量可能会覆盖外层变量。

```javascript
'use strict';
var tmp = new Date();

function f(){
  console.log(tmp);
  if (false){
    var tmp = "hello world";
  }
}

f() // undefined
```
上面代码中，函数f执行后，输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。

第二种场景，用来计数的循环变量泄露为全局变量。

```javascript
'use strict';
var s = 'hello';

for (var i = 0; i < s.length; i++){
  console.log(s[i]);
}

console.log(i); // 5
```
上面代码中，变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

# ES6的块级作用域

let实际上为JavaScript新增了块级作用域。

```javascript
'use strict';
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```
上面的函数有两个代码块，都声明了变量n，运行后输出5。这表示外层代码块不受内层代码块的影响。如果使用var定义变量n，最后输出的值就是10。

## 允许块级作用域的任意嵌套

```javascript
'use strict';
{{{{{
    let insane = 'Hello World'
}}}}}
```
## 外层作用域无法读取内层作用域的变量

```javascript
'use strict';
{{{{
  {
    let insane = 'Hello World'
  }
  console.log(insane); // 报错，ReferenceError: insane is not defined.
}}}}
```
## 内层作用域可以定义外层作用域的同名变量

```javascript
'use strict';
{{{{
    let insane = 'outside';
    {
        let insane = 'inside';
        console.log(insane); // inside
    }
    console.log(insane); // outside
}}}}
```
## 取代立即执行匿名函数（IIFE）

```javascript
'use strict';
// IIFE写法
(function () {
    var tmp = 'hello world!';
}());
console.log(tmp); // 报错，ReferenceError: tmp is not defined.

// 块级作用域写法
{
    let tmp = 'hello world!';
}
console.log(tmp); // 报错，ReferenceError: tmp is not defined.
```
## 函数本身的作用域，在其所在的块级作用域之内

```javascript
'use strict';
function f() {
    console.log('outside');
}
(function () {
    if(false) {
        // 重复声明一次函数f
        function f() {
            console.log('inside');
        }
    }

    f();
}());
```
上面代码在ES5中运行，会得到“inside”，但是在ES6中运行，会得到“outside!”。这是因为ES5存在函数提升，不管会不会进入 if代码块，函数声明都会提升到当前作用域的顶部，得到执行；

而ES6支持块级作用域，不管会不会进入if代码块，其内部声明的函数皆不会影响到作用域的外部。

## 块级作用域外部，无法调用块级作用域内部定义的函数

```javascript
'use strict';
let f;
{
    let a = 'secret';
    let b = 'publish';
    f = function () {
        return a;
    };

    function p() {
        return b;
    }
}
f(); // "secret"
p(); // 报错，ReferenceError: p is not defined.
```

## 其它

ES5的严格模式规定，函数只能在顶层作用域和函数内声明，其他情况（比如if代码块、循环代码块）的声明都会报错。

ES6由于引入了块级作用域，这种情况可以理解成函数在块级作用域内声明，因此不报错，但是构成区块的大括号不能少，否则还是会报错。

```javascript
'use strict';
// ES5
'use strict';
if (true) {
  function f() {} // 报错
}

// ES6
// 不报错
'use strict';
if (true) {
  function f() {}
}

// 报错，SyntaxError: Unexpected token.
'use strict';
if (true)
  function f() {}
```
# const命令

## 声明只读的常量

```javascript
'use strict';
const PI = 3.1415;
PI // 3.1415
PI = 3; // 报错，TypeError: "PI" is read-only.
```

## 声明时必须立即初始化

```javascript
'use strict';
const foo; // 报错，SyntaxError: missing = in const declaration.
```

## 与let命令相同

* 只在声明所在的块级作用域内有效
* 声明不提升
* 存在暂时性死区，只能在声明的位置后面使用
* 不可重复声明

## 只保证变量名指向的地址不变，并不保证该地址的数据不变

对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心。

```javascript
'use strict';
const foo = {};
foo.prop = 123;
foo.prop // 123
foo = {} // TypeError: "foo" is read-only
```
上面代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

## 跨模块常量

const声明的常量只在当前代码块有效。如果想设置跨模块的常量，可以采用下面的写法。

```javascript
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```

## 其它

ES5只有两种声明变量的方法：var命令和function命令。ES6除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6一共有6种声明变量的方法。

# 全局对象的属性

全局对象是最顶层的对象，在浏览器环境指的是window对象，在Node.js指的是global对象。ES5之中，全局对象的属性与全局变量是等价的。

```javascript
window.a = 1;
a // 1

a = 2;
window.a // 2
```
上面代码中，全局对象的属性赋值与全局变量的赋值，是同一件事。（对于Node来说，这一条只对REPL环境适用，模块环境之中，全局变量必须显式声明成global对象的属性。）

这种规定被视为JavaScript语言的一大问题，因为很容易不知不觉就创建了全局变量。

ES6为了改变这一点，一方面规定，var命令和function命令声明的全局变量，依旧是全局对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。

```javascript
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined
```
上面代码中，全局变量a由var命令声明，所以它是全局对象的属性；全局变量b由let命令声明，所以它不是全局对象的属性，返回undefined。
