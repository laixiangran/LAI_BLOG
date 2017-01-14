---
title: JavaScript设计模式与开发实践 - 观察者模式
date: 2016-06-26 19:04:00
tags:
- 设计模式
- JavaScript
categories: JavaScript
---

# 概述

观察者模式又叫发布 - 订阅模式（Publish/Subscribe），它定义了一种一对多的关系，让多个观察者对象同时监听某一个目标对象（为了方便理解，以下将观察者对象叫做订阅者，将目标对象叫做发布者）。发布者的状态发生变化时就会通知所有的订阅者，使得它们能够自动更新自己。

观察者模式的使用场合就是：当一个对象的改变需要同时改变其它对象，并且它不知道具体有多少对象需要改变的时候，就应该考虑使用观察者模式。

观察者模式的中心思想就是促进松散耦合，一为时间上的解耦，二为对象之间的解耦。让耦合的双方都依赖于抽象，而不是依赖于具体，从而使得各自的变化都不会影响到另一边的变化。

# 实现

```javascript
(function (window, undefined) {
    var _subscribe = null,
        _publish = null,
        _unsubscribe = null,
        _shift = Array.prototype.shift, // 删除数组的第一个 元素，并返回这个元素
        _unshift = Array.prototype.unshift, // 在数组的开头添加一个或者多个元素，并返回数组新的length值
        namespaceCache = {},
        _create = null,
        each = function (ary, fn) {
            var ret = null;
            for (var i = 0, len = ary.length; i < len; i++) {
                var n = ary[i];
                ret = fn.call(n, i, n);
            }
            return ret;
        };

    // 订阅消息
    _subscribe = function (key, fn, cache) {
        if (!cache[key]) {
            cache[key] = [];
        }
        cache[key].push(fn);
    };

    // 取消订阅（取消全部或者指定消息）
    _unsubscribe = function (key, cache, fn) {
        if (cache[key]) {
            if (fn) {
                for (var i = cache[key].length; i >= 0; i--) {
                    if (cache[key][i] === fn) {
                        cache[key].splice(i, 1);
                    }
                }
            } else {
                cache[key] = [];
            }
        }
    };

    // 发布消息
    _publish = function () {
        var cache = _shift.call(arguments),
            key = _shift.call(arguments),
            args = arguments,
            _self = this,
            ret = null,
            stack = cache[key];

        if (!stack || !stack.length) {
            return;
        }

        return each(stack, function () {
            return this.apply(_self, args);
        });
    };

    // 创建命名空间
    _create = function (namespace) {
        var namespace = namespace || "default";
        var cache = {},
            offlineStack = {},    // 离线事件，用于先发布后订阅，只执行一次
            ret = {
                subscribe: function (key, fn, last) {
                    _subscribe(key, fn, cache);
                    if (!offlineStack[key]) {
                        offlineStack[key] = null;
                        return;
                    }
                    if (last === "last") { // 指定执行离线队列的最后一个函数，执行完成之后删除
                        offlineStack[key].length && offlineStack[key].pop()();  // [].pop => 删除一个数组中的最后的一个元素，并且返回这个元素
                    } else {
                        each(offlineStack[key], function () {
                            this();
                        });
                    }
                    offlineStack[key] = null;
                },
                one: function (key, fn, last) {
                    _unsubscribe(key, cache);
                    this.subscribe(key, fn, last);
                },
                unsubscribe: function (key, fn) {
                    _unsubscribe(key, cache, fn);
                },
                publish: function () {
                    var fn = null,
                        args = null,
                        key = _shift.call(arguments),
                        _self = this;

                    _unshift.call(arguments, cache, key);
                    args = arguments;
                    fn = function () {
                        return _publish.apply(_self, args);
                    };

                    if (offlineStack && offlineStack[key] === undefined) {
                        offlineStack[key] = [];
                        return offlineStack[key].push(fn);
                    }
                    return fn();
                }
            };

        return namespace ? (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret) : ret;
    };

    window.pubsub = {
        create: _create, // 创建命名空间
        one: function (key, fn, last) { // 订阅消息，只能单一对象订阅
            var pubsub = this.create();
            pubsub.one(key, fn, last);
        },
        subscribe: function (key, fn, last) { // 订阅消息，可多对象同时订阅
            var pubsub = this.create();
            pubsub.subscribe(key, fn, last);
        },
        unsubscribe: function (key, fn) { // 取消订阅，（取消全部或指定消息）
            var pubsub = this.create();
            pubsub.unsubscribe(key, fn);
        },
        publish: function () { // 发布消息
            var pubsub = this.create();
            pubsub.publish.apply(this, arguments);
        }
    };
})(window, undefined);
```
# 应用

假如我们正在开发一个商城网站，网站里有header头部、nav导航、消息列表、购物车等模块。这几个模块的渲染有一个共同的前提条件，就是必须先用ajax异步请求获取用户的登录信息。

至于ajax请求什么时候能成功返回用户信息，这点我们没有办法确定。更重要的一点是，我们不知道除了header头部、nav导航、消息列表、购物车之外，将来还有哪些模块需要使用这些用户信息。如果它们和用户信息模块产生了强耦合，比如下面这样的形式：

```javascript
login.succ(function (data) {
    header.setAvatar(data.avatar); // 设置header模块的头像
    nav.setAvatar(data.avatar); // 设置导航模块的头像
    message.refresh(); // 刷新消息列表
    cart.refresh(); // 刷新购物车列表
});
```

现在登录模块是由你负责编写的，但我们还必须了解header模块里设置头像的方法叫setAvatar、购物车模块里刷新的方法叫refresh，这种耦合性会使程序变得僵硬，header模块不能随意再改变setAvatar的方法名。**这是针对具体实现编程的典型例子，针对具体实现编程是不被赞同的。**

等到有一天，项目中又新增了一个收货地址管理的模块，这个模块是由另一个同事所写的，此时他就必须找到你，让你登录之后刷新一下收货地址列表。于是你又翻开你3个月前写的登录模块，在最后部分加上这行代码：

```javascript
login.succ(function (data) {
    header.setAvatar(data.avatar);
    nav.setAvatar(data.avatar);
    message.refresh();
    cart.refresh();
    address.refresh(); // 增加这行代码
});
```

我们就会越来越疲于应付这些突如其来的业务要求，不停地重构这些代码。

用观察者模式重写之后，对用户信息感兴趣的业务模块将自行订阅登录成功的消息事件。当登录成功时，登录模块只需要发布登录成功的消息，而业务方接受到消息之后，就会开始进行各自的业务处理，登录模块并不关心业务方究竟要做什么，也不想去了解它们的内部细节。改善后的代码如下：

```javascript
$.ajax('http:// xxx.com?login', function(data) { // 登录成功
    pubsub.publish('loginSucc', data); // 发布登录成功的消息
});

// 各模块监听登录成功的消息：

var header = (function () { // header模块
    pubsub.subscribe('loginSucc', function(data) {
        header.setAvatar(data.avatar);
    });
    return {
        setAvatar: function(data){
            console.log('设置header模块的头像');
        }
    };
})();

var nav = (function () { // nav模块
    pubsub.subscribe('loginSucc', function(data) {
        nav.setAvatar(data.avatar);
    });
    return {
        setAvatar: function(avatar) {
            console.log('设置nav模块的头像');
        }
    };
})();
```

如上所述，我们随时可以把setAvatar的方法名改成setTouxiang。如果有一天在登录完成之后，又增加一个刷新收货地址列表的行为，那么只要在收货地址模块里加上监听消息的方法即可，而这可以让开发该模块的同事自己完成，你作为登录模块的开发者，永远不用再关心这些行为了。代码如下：

```javascript
var address = (function () { // 地址模块
    pubsub.subscribe('loginSucc', function(obj) {
        address.refresh(obj);
    });
    return {
        refresh: function(avatar) {
            console.log('刷新收货地址列表');
        }
    };
})();
```

# 优缺点

## 优点

1. 支持简单的广播通信，自动通知所有已经订阅过的对象；
2. 页面载入后发布者很容易与订阅者存在一种动态关联，增加了灵活性；
3. 发布者与订阅者之间的抽象耦合关系能够单独扩展以及重用。

## 缺点

1. 创建订阅者本身要消耗一定的时间和内存，而且当你订阅一个消息后，也许此消息最后都未发生，但这个订阅者会始终存在于内存中；
2. 虽然可以弱化对象之间的联系，但如果过度使用的话，对象和对象之间的必要联系也将被深埋在背后，会导致程序难以跟踪维护和理解。

# 参考
- 《JavaScript设计模式与开发实践》 第 8 章 发布—订阅模式
- 《JavaScript设计模式》 第 9 章 第 5 节 Observer（观察者）模式
- [http://www.cnblogs.com/TomXu/archive/2012/03/02/2355128.html](http://www.cnblogs.com/TomXu/archive/2012/03/02/2355128.html)
