---
title: JavaScript高阶函数的应用
date: 2016-05-07 16:16:02
tags: JavaScript
categories: JavaScript
---

# 定义

高阶函数是指至少满足下列条件之一的函数：

* 函数可以作为参数被传递；

* 函数可以作为返回值输出。

JavaScript语言中的函数显然满足高阶函数的条件，在实际开发中，无论是将函数当作参数传递，还是让函数的执行结果返回另外一个函数，这两种情形都有很多应用场景，以下就是一些高阶函数的应用。

# 应用

## 作为参数传递

### ajax异步请求

```javascript
// callback为待传入的回调函数
var getUserInfo = function(userId, callback) {
     $.ajax("http://xxx.com/getUserInfo?" + userId, function(data) {
        if (typeof callback === "function") {
            callback(data);
        }
    });
}

getUserInfo(13157, function(data) {
    alert (data.userName);
});
```

### Array.prototype.sort

Array.prototype.sort接受一个函数当作参数，这个函数里面封装了数组元素的排序规则。从Array.prototype.sort的使用可以看到，我们的目的是对数组进行排序，这是不变的部分；而使用什么规则去排序，则是可变的部分。把可变的部分封装在函数参数里，动态传入Array.prototype.sort，使Array.prototype.sort方法成为了一个非常灵活的方法。

```javascript
//从小到大排列
[1, 4, 3].sort(function(a, b) {
    return a - b;
});
// 输出: [1, 3, 4]

//从大到小排列
[1, 4, 3].sort(function(a, b) {
    return b - a;
});
// 输出: [4, 3, 1]
```

## 作为返回值

### 判断数据的类型

```javascript
var Type = {};

for (var i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
    (function(type) {
        Type['is' + type] = function(obj) {
            return Object.prototype.toString.call(obj) === '[object '+ type +']';
           }
       })(type)
};

Type.isArray([]);     // 输出：true
Type.isString("str");     // 输出：true
```

### 单例模式

```javascript
var getSingle = function(fn) {
    var ret;
    return function() {
        return ret || (ret = fn.apply(this, arguments));
    };
};
```

## 实现AOP

AOP（面向切面编程）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。把这些功能抽离出来之后，再通过“动态织入”的方式掺入业务逻辑模块中。这样做的好处首先是可以保持业务逻辑模块的纯净和高内聚性，其次是可以很方便地复用日志统计等功能模块。

通常，在JavaScript中实现AOP，都是指把一个函数“动态织入”到另外一个函数之中，具体的实现技术有很多，下面的例子通过扩展Function.prototype来做到这一点。

```javascript
Function.prototype.before = function(beforefn) {
    var __self = this;    // 保存原函数的引用
    return function() {    // 返回包含了原函数和新函数的"代理"函数
        beforefn.apply(this, arguments);     // 执行新函数，修正this
        return __self.apply(this, arguments);    // 执行原函数
    }
};

Function.prototype.after = function(afterfn) {
    var __self = this;
    return function() {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};

var func = function() {
    console.log(2);
};

func = func.before(function() {
    console.log(1);
}).after(function() {
    console.log(3);
});

func();

// 按顺序打印出1，2，3
```

## currying

currying（函数柯里化），又称部分求值。一个currying的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。

```javascript
// 通用currying函数，接受一个参数，即将要被currying的函数
var currying = function(fn) {
    var args = [];
    return function() {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        } else {
            [].push.apply(args, arguments);
            return arguments.callee;
        }
    }
};

// 将被currying的函数
var cost = (function() {
    var money = 0;
    return function() {
        for (var i = 0, l = arguments.length; i < l; i++) {
            money += arguments[i];
        }
        return money;
    }
})();

var cost = currying( cost );    // 转化成currying函数

cost( 100 );    // 未真正求值
cost( 200 );    // 未真正求值
cost( 300 );    // 未真正求值

console.log (cost());     // 求值并输出：600
```

## uncurrying

在JavaScript中，当我们调用对象的某个方法时，其实不用去关心该对象原本是否被设计为拥有这个方法，这是动态类型语言的特点，也是常说的鸭子类型思想。

同理，一个对象也未必只能使用它自身的方法，那么有什么办法可以让对象去借用一个原本不属于它的方法呢？答案对于我们来说很简单，call和apply都可以完成这个需求，因为用call和apply可以把任意对象当作this传入某个方法，这样一来，方法中用到this的地方就不再局限于原来规定的对象，而是加以泛化并得到更广的适用性。

而uncurrying的目的是将泛化this的过程提取出来，将fn.call或者fn.apply抽象成通用的函数。

```javascript
// uncurrying实现
Function.prototype.uncurrying = function() {
    var self = this;
    return function() {
        return Function.prototype.call.apply(self, arguments);
    }
};

// 将Array.prototype.push进行uncurrying，此时push函数的作用就跟Array.prototype.push一样了，且不仅仅局限于只能操作array对象。
var push = Array.prototype.push.uncurrying();

var obj = {
    "length": 1,
    "0": 1
};

push(obj, 2);
console.log(obj);   // 输出：{0: 1, 1: 2, length: 2}
```

## 函数节流

当一个函数被频繁调用时，如果会造成很大的性能问题的时候，这个时候可以考虑函数节流，降低函数被调用的频率。

throttle函数的原理是，将即将被执行的函数用setTimeout延迟一段时间执行。如果该次延迟执行还没有完成，则忽略接下来调用该函数的请求。throttle函数接受2个参数，第一个参数为需要被延迟执行的函数，第二个参数为延迟执行的时间。

```javascript
var throttle = function(fn, interval) {
    var __self = fn,    // 保存需要被延迟执行的函数引用
        timer,      // 定时器
        firstTime = true;    // 是否是第一次调用

    return function() {
        var args = arguments,
            __me = this;

        if (firstTime) {    // 如果是第一次调用，不需延迟执行
            __self.apply(__me, args);
            return firstTime = false;
        }

        if (timer) {    // 如果定时器还在，说明前一次延迟执行还没有完成
            return false;
        }

        timer = setTimeout(function() {  // 延迟一段时间执行
            clearTimeout(timer);
            timer = null;
            __self.apply(__me, args);
        }, interval || 500 );
    };
};

window.onresize = throttle(function() {
    console.log(1);
}, 500 );
```

## 分时函数

当一次的用户操作会严重地影响页面性能，如在短时间内往页面中大量添加DOM节点显然也会让浏览器吃不消，我们看到的结果往往就是浏览器的卡顿甚至假死。

这个问题的解决方案之一是下面的timeChunk函数，timeChunk函数让创建节点的工作分批进行，比如把1秒钟创建1000个节点，改为每隔200毫秒创建8个节点。

timeChunk函数接受3个参数，第1个参数是创建节点时需要用到的数据，第2个参数是封装了创建节点逻辑的函数，第3个参数表示每一批创建的节点数量。

```javascript
var timeChunk = function(ary, fn, count) {
    var t;

    var start = function() {
        for ( var i = 0; i < Math.min( count || 1, ary.length ); i++ ){
            var obj = ary.shift();
            fn( obj );
        }
     };

     return function() {
        t = setInterval(function() {
          if (ary.length === 0) {  // 如果全部节点都已经被创建好
              return clearInterval(t);
          }
          start();
        }, 200);    // 分批执行的时间间隔，也可以用参数的形式传入
    };
};
```

## 惰性加载函数

在Web开发中，因为浏览器之间的实现差异，一些嗅探工作总是不可避免。比如我们需要一个在各个浏览器中能够通用的事件绑定函数addEvent，常见的写法如下：

**方案一：**
```javascript
var addEvent = function(elem, type, handler) {
    if (window.addEventListener) {
       return elem.addEventListener(type, handler, false);
    }
    
    if (window.attachEvent) {
          return elem.attachEvent('on' + type, handler);
    }
};
```
缺点：当它每次被调用的时候都会执行里面的if条件分支，虽然执行这些if分支的开销不算大，但也许有一些方法可以让程序避免这些重复的执行过程。

**方案二：**
```javascript
var addEvent = (function() {
    if (window.addEventListener) {
        return function(elem, type, handler) {
            elem.addEventListener(type, handler, false);
        }
    }
    if (window.attachEvent) {
        return function(elem, type, handler) {
            elem.attachEvent('on' + type, handler);
        }
    }
})();
```
缺点：也许我们从头到尾都没有使用过addEvent函数，这样看来，一开始的浏览器嗅探就是完全多余的操作，而且这也会稍稍延长页面ready的时间。

**方案三：**
```javascript
var addEvent = function(elem, type, handler) {
        if (window.addEventListener) {
           addEvent = function(elem, type, handler) {
               elem.addEventListener(type, handler, false);
           }
        } else if (window.attachEvent) {
            addEvent = function(elem, type, handler) {
                elem.attachEvent('on' + type, handler);
            }
        }
        addEvent(elem, type, handler);
    };
```
此时addEvent依然被声明为一个普通函数，在函数里依然有一些分支判断。但是在第一次进入条件分支之后，在函数内部会重写这个函数，重写之后的函数就是我们期望的addEvent函数，在下一次进入addEvent函数的时候，addEvent函数里不再存在条件分支语句。
