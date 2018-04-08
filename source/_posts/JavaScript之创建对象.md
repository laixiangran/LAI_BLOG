---
title: JavaScript之创建对象
date: 2018-04-06 15:00:32
tags:
- Object
- JavaScript
categories: JavaScript
---

## Object构造函数

创建自定义对象最简单的方式就是创建一个 Object 的实例，然后再为它添加属性和方法：

```javascript
// 创建对象
var person = new Object();

// 定义属性
person.name = 'laixiangran';
person.age = 28;
person.job = 'Front End Software Engineer';

// 定义方法
person.sayName = function() {
    console.log(this.name);
};

person.sayName(); // 'laixiangran'
```

### 缺点

- 代码冗余，会产生大量重复代码
- 无法识别对象（无法知道对象的类型）

## 对象字面量

对象字面量相比较于 Object 构造函数，代码会比较直观一些：

```javascript
var person = {
    name: 'laixiangran',
    age: 28,
    job: 'Front End Software Engineer',
    sayName:  function() {
        console.log(this.name);
    }
};

person.sayName(); // 'laixiangran'
```

### 缺点

- 代码冗余，会产生大量重复代码
- 无法识别对象（无法知道对象的类型）

## 工厂模式

Object 构造函数或对象字面量这两种方法的缺点就是：使用同一个接口创建很多对象时，会产生大量的重复代码。为解决这个问题，我们将利用工厂模式来创建一个函数，这个函数将创建具体对象的过程进行封装：

```javascript
function creatPerson(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        console.log(this.name);
    };
    return o;
}

// 使用函数creatPerson创建对象
var person1 = creatPerson('laixiangran', 28, 'Front End Software Engineer');
person1.sayName(); // 'laixiangran'

var person2 = creatPerson('lai', 29, 'Back End Software Engineer');
person2.sayName(); // 'laixiangran'
```

通过creatPerson()能够根据参数无数次地创建不同的对象，这样就达到复用的目的，而且创建对象的细节是透明的。

工厂模式虽然解决了创建多个相似对象的问题，但是没有解决对象识别的问题（即怎样知道一个对象的类型）。

### 缺点

- 无法识别对象（无法知道对象的类型）

## 构造函数模式

```javascript
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
        console.log(this.name);
    };
}

var person1 = new Person('laixiangran', 28, 'Front End Software Engineer');
person1.sayName(); // 'laixiangran'

var person2 = new Person('lai', 29, 'Back End Software Engineer');
person2.sayName(); // 'laixiangran'
```

在这个例子中，Person() 函数取代了 creatPerson() 函数，不同之处在于：

- 没有显式地创建对象
- 直接将属性和方法赋给了 this 对象
- 没有return语句

因此，要创建 Person 的新实例，则必须使用 `new` 操作符。以这种方式调用构造函数实际上会经历以下4个步骤：

1. 创建一个新对象
2. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）
3. 执行构造函数中的代码（为这个新对象添加属性和方法）
4. 返回新对象

所以，当我们使用 `new` 操作符来调用构造函数时，实际就是隐式地完成 creatPerson() 函数要完成的那些工作。

当然，这种模式 **解决了对象识别的问题** 。在前面的例子中，person1 和 person2 分别保存着 Person 的一个不同的实例。这两个对象都有一个 constructor（构造函数）属性，该属性指向 Person，这样就达到对象识别了（能知道对象的类型）。还有，检测对象类型，我们一般使用 instanceof 操作符。最后，我们知道所有的对象都是继承自 Object 的，因此下面的代码都返回 true：

```javascript
console.log(person1.constructor === Person); // true
console.log(instanceof person1 Person); // true
console.log(instanceof person1 Object); // true

console.log(person2.constructor === Person); // true
console.log(instanceof person2 Person); // true
console.log(instanceof person2 Object); // true
```

### 缺点

- 每个方法都要在每个实例上重新创建一遍
- 如果不想重新创建一遍，函数只能先在全局作用域中定义，但是这样对于自定义对象来说就没有封装性可言了

## 原型模式

我们创建的每个函数都有一个 `prototype（原型）` 属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。如果按照字面量意思来理解，那么 `prototype` 就是通过 `调用构造函数而创建` 的那个 `对象实例` 的 `原型对象`。

**不清楚 `原型对象` 可以先自行了解下，本文不展开介绍 `原型对象`，后面会写文章单独介绍。**

使用原型对象的好处是可以让所有的对象实例共享它所包含的属性和方法。换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中：

```javascript
function Person() {
}

Person.prototype.name = 'laixiangran';
Person.prototype.age = 28;
Person.prototype.job = 'Front End Software Engineer';
Person.prototype.friends = ['xu', 'song'];
Person.prototype.sayName = function() {
    console.log(this.name);
};

var person1 = new Person();
person1.sayName(); // 'laixiangran'
person1.friends.push('chen');
console.log(person1.friends); // 'xu', 'song', 'chen'

var person2 = new Person();
person2.sayName(); // 'laixiangran'
console.log(person2.friends); // 'xu', 'song', 'chen'

console.log(person1.sayName === person2.sayName); // true
console.log(person1.friends === person2.friends); // true
```

### 缺点

- 由于是所有实例共享属性和方法，如果修改引用类型值的属性（如对象、数组），那么就会影响所有的对象实例（往往我们都希望每个实例都有自己的属性）

## 组合使用构造函数模式和原型模式

创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式。构造函数模式用于定义实例属性，而原型模式用于定义方法和共享属性。这样，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存。

```javascript
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['xu', 'song'];
}

Person.prototype.sayName = function() {
    console.log(this.name);
};

var person1 = new Person('laixiangran', 28, 'Front End Software Engineer');
var person2 = new Person('lai', 29, 'Back End Software Engineer');

person1.friends.push('chen');
console.log(person1.friends); // 'xu', 'song', 'chen'
console.log(person2.friends); // 'xu', 'song'
console.log(person1.sayName === person2.sayName); // true
console.log(person1.friends === person2.friends); // false
```

这种混成模式集构造函数模式和原型模式这两种模式之长。

### 缺点

- 构造函数和原型分别独立，代码封装型不强

## 动态原型模式

这种模式是对 `组合使用构造函数模式和原型模式` 方法的改进，它将所有信息都封装在了构造函数中，而通过在构造函数中初始化原型（可仅在必要的情况下），又保持了 `组合使用构造函数模式和原型模式` 方法的优点。

```javascript
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;

    // 检查是否存在sayName方法来决定是否初始化原型
    if (typeof this.sayName !== 'function') {
        Person.prototype.sayName = function() {
            console.log(this.name);
        };
    }
}

var person1 = new Person('laixiangran', 28, 'Front End Software Engineer');
person1.sayName(); // 'laixiangran'
```

其中，if 语句检查可以是初始化之后应该存在的任何属性和方法，不必对每个方法和属性都判断，只需要判断其中一个即可。

## 寄生构造函数模式

```javascript
function Person(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        console.log(this.name);
    };
    return o;
}

var person1 = new Person('laixiangran', 28, 'Front End Software Engineer');
person1.sayName(); // 'laixiangran'

var person2 = new Person('lai', 29, 'Back End Software Engineer');
person2.sayName(); // 'laixiangran'
```

除了使用 new 操作符并把使用的包装函数叫做构造函数之外，这种模式其实和 `工厂模式` 是一模一样的。构造函数中的 return 语句重写了通过 new 操作符调用构造函数默认返回的新对象实例。

这种模式可以在特殊情况下用来为对象创建构造函数。假设我们想创建一个具有额外方法的特殊数组，但又不能直接修改 Array 构造函数：

```javascript
function SpecialArray() {

    // 创建数组
    var values = new Array();

    // 添加值
    values.push.apply(values, arguments);

    // 添加方法
    values.toPipedString = function() {
        return this.join('|');
    };

    // 返回数组
    return values;
}

var colors = new SpecialArray('red', 'blue', 'green');
console.log(colors.toPipedString()); // 'red|blue|green'
```

### 缺点

- 由于该模式返回的对象与构造函数或者与构造函数的原型属性之间没有关系，因此，这种模式并不能通过 instanceof 操作符来确定对象类型。

## 稳妥构造函数模式

所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 this 的对象。稳妥对象最适合在一些安全环境中（这些环境中会禁止使用 this 和 new），或者在防止数据被其他应用程序（如 [Mashup 程序](https://baike.baidu.com/item/Mashup/4360460?fr=aladdin)）改动时使用。

与 **寄生构造函数模式** 有两点不同：

1. 新创建对象的实例方法不引用 this
2. 不使用 new 操作符调用构造函数

```javascript
function Person(name, age, job) {

    // 创建要返回的对象
    var o = new Object();

    // 可以在这里定义私有变量和方法

    // 添加方法
    o.sayName = function() {
        console.log(name);
    };

    // 返回对象
    return o;
}

var person1 = new Person('laixiangran', 28, 'Front End Software Engineer');
person1.sayName(); // 'laixiangran'
```

变量 person1 中保存的是一个稳妥对象，除了调用 sayName() 方法外，没有别的方式可以访问其数据成员。

### 缺点

- 与 **寄生构造函数模式** 一样，由于该模式返回的对象与构造函数或者与构造函数的原型属性之间没有关系，因此，这种模式并不能通过 instanceof 操作符来确定对象类型。

> 参考资料：《JavaScript高级程序设计（第3版）》第6.2节 创建对象
