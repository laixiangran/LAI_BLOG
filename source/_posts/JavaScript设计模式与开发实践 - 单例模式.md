---
title: JavaScript设计模式与开发实践 - 单例模式
date: 2016-05-23 23:03:02
tags:
- 设计模式
- JavaScript
categories: JavaScript
---

# 引言

> 本文摘自《JavaScript设计模式与开发实践》

在传统开发工程师眼里，单例就是保证一个类只有一个实例，实现的方法一般是先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。

在JavaScript里，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象。

单例模式是一种常用的模式，有一些对象我们往往只需要一个，比如线程池、全局缓存、浏览器中的window对象等。

# 模式定义

保证一个类仅有一个实例，并提供一个访问它的全局访问点。

# 模式实现

## 接近传统面向对象语言的实现

下面的实现是接近传统面向对象语言中的实现，单例对象从“类”中创建而来。在以类为中心的语言中，这是很自然的做法。比如在Java中，如果需要某个对象，就必须先定义一个类，对象总是从类中创建而来的。

```javascript
// 创建div类：CreateDiv
var CreateDiv = function(html) {
    this.html = html;
    this.init();
};

CreateDiv.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
};

// 代理类：proxySingletonCreateDiv，这里引进代理类，是为了将创建div与单例的实现分离开来，方便扩展
var ProxySingletonCreateDiv = (function() {
    var instance;
    return function(html) {
        if (!instance) {
            instance = new CreateDiv(html);
        }
        return instance;
    }
})();

var a = new ProxySingletonCreateDiv('sven1');
var b = new ProxySingletonCreateDiv('sven2');

console.log(a === b); // ture
```

## 运用JavaScript特性的实现

JavaScript其实是一门无类（class-free）语言，也正因为如此，生搬单例模式的概念并无意义。在JavaScript中创建对象的方法非常简单，既然我们只需要一个“唯一”的对象，为什么要为它先创建一个“类”呢？这无异于穿棉衣洗澡，传统的单例模式实现在JavaScript中并不适用。

单例模式的核心是确保只有一个实例，并提供全局访问。因此在JavaScript里把全局变量当成单例来使用，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象。

在JavaScript里，实现单例的方式有很多种，其中最简单的一个方式是使用对象字面量的方法，其字面量里可以包含大量的属性和方法：

```javascript
var mySingleton = {
    property1: "something",
    property2: "something else",
    method1: function() {
        console.log('hello world');
    }
};
```

如果以后要扩展该对象，你可以添加自己的私有成员和方法，然后使用闭包在其内部封装这些变量和函数声明。只暴露你想暴露的public成员和方法，样例代码如下：

```javascript
var mySingleton = function() {
    /// 这里声明私有变量和方法
    var privateVariable = 'something private';
    
    function showPrivate() {
        console.log(privateVariable);
    }

    // 公有变量和方法（可以访问私有变量和方法）
    return {
        publicMethod: function() {
            showPrivate();
        },
        publicVar: 'the public can see this!'
    };
};

var single = mySingleton();
single.publicMethod();  // 输出 'something private'
console.log(single.publicVar); // 输出 'the public can see this!'
```

当然，为了节约资源的目的，我们可以只在使用的时候才初始化该单例，实现的方式就是在另一个方法中进行初始化：

```javascript
var Singleton = (function() {
    var instantiated;
    
    function init() {
        // 这里定义单例代码
        return {
            publicMethod: function() {
                console.log('hello world');
            },
            publicProperty: 'test'
        };
    }

    return {
        getInstance: function() {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        }
    };
})();

// 调用公有的方法来获取实例
Singleton.getInstance().publicMethod();
```

## 其它实现

### 方法1
```javascript
function Universe() {

    // 判断是否存在实例
    if (typeof Universe.instance === 'object') {
        return Universe.instance;
    }

    // 其它内容
    this.start_time = 0;
    this.bang = "Big";

    // 缓存
    Universe.instance = this;

    // 隐式返回this
}

// 测试
var uni = new Universe();
var uni2 = new Universe();
console.log(uni === uni2); // true
```

### 方法2
```javascript
function Universe() {

    // 缓存的实例
    var instance = this;

    // 其它内容
    this.start_time = 0;
    this.bang = "Big";

    // 重写构造函数
    Universe = function() {
        return instance;
    };
}

// 测试
var uni = new Universe();
var uni2 = new Universe();
uni.bang = "123";
console.log(uni === uni2); // true
console.log(uni2.bang); // 123
```

### 方法3
```javascript
function Universe() {

    // 缓存实例
    var instance;

    // 重新构造函数
    Universe = function Universe() {
        return instance;
    };

    // 后期处理原型属性
    Universe.prototype = this;

    // 实例
    instance = new Universe();

    // 重设构造函数指针
    instance.constructor = Universe;

    // 其它功能
    instance.start_time = 0;
    instance.bang = "Big";

    return instance;
}


// 测试
var uni = new Universe();
var uni2 = new Universe();
console.log(uni === uni2); // true

// 添加原型属性
Universe.prototype.nothing = true;

var uni = new Universe();

Universe.prototype.everything = true;

var uni2 = new Universe();

console.log(uni.nothing); // true
console.log(uni2.nothing); // true
console.log(uni.everything); // true
console.log(uni2.everything); // true
console.log(uni.constructor === Universe); // true
```

### 方式4
```javascript
var Universe;

(function () {

    var instance;

    Universe = function Universe() {
        if (instance) {
            return instance;
        }
        instance = this;

        // 其它内容
        this.start_time = 0;
        this.bang = "Big";
    };
}());

//测试代码
var a = new Universe();
var b = new Universe();
alert(a === b); // true
a.bang = "123";
alert(b.bang); // 123
```
