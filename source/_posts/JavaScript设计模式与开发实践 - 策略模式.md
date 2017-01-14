---
title: JavaScript设计模式与开发实践 - 策略模式
date: 2016-05-25 21:48:23
tags:
- 设计模式
- JavaScript
categories: JavaScript
---

# 引言

> 本文摘自《JavaScript设计模式与开发实践》

在现实中，很多时候也有多种途径到达同一个目的地。比如我们要去某个地方旅游，可以根据具体的实际情况来选择出行的线路。

* 如果没有时间但是不在乎钱，可以选择坐飞机。
* 如果没有钱，可以选择坐大巴或者火车。
* 如果再穷一点，可以选择骑自行车。

在程序设计中，我们也常常遇到类似的情况，要实现某一个功能有多种方案可以选择。比如一个压缩文件的程序，既可以选择zip算法，也可以选择gzip算法。

这些算法灵活多样，而且可以随意互相替换。这种解决方案就是本文将要介绍的策略模式。

# 模式定义

定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

# 示例

## 计算年终奖

很多公司的年终奖是根据员工的工资基数和年底绩效情况来发放的。例如，绩效为S的人年终奖有4倍工资，绩效为A的人年终奖有3倍工资，而绩效为B的人年终奖是2倍工资。假设财务部要求我们提供一段代码，来方便他们计算员工的年终奖。

### 一般的实现

```javascript
var calculateBonus = function (performanceLevel, salary) {

    if (performanceLevel === 'S') {
        return salary * 4;
    }

    if (performanceLevel === 'A') {
        return salary * 3;
    }

    if (performanceLevel === 'B') {
        return salary * 2;
    }
};

// 测试
calculateBonus('B', 20000); // 输出：40000
calculateBonus('S', 6000); // 输出：24000
```

**以上的实现存在下面的缺点：**

* calculateBonus函数比较庞大，包含了很多if-else语句，这些语句需要覆盖所有的逻辑分支。
* calculateBonus函数缺乏弹性，如果增加了一种新的绩效等级C，或者想把绩效S的奖金系数改为5，那我们必须深入calculateBonus函数的内部实现，这是违反开放-封闭原则的。
* 算法的复用性差，如果在程序的其他地方需要重用这些计算奖金的算法呢？我们的选择只有复制和粘贴

### 使用组合函数重构代码

把计算年终奖的各种算法封装到一个个的小函数里面，这些小函数有着良好的命名，可以一目了然地知道它对应着哪种算法，它们也可以被复用在程序的其他地方。

```javascript
var performanceS = function (salary) {
    return salary * 4;
};

var performanceA = function (salary) {
    return salary * 3;
};

var performanceB = function (salary) {
    return salary * 2;
};

var calculateBonus = function (performanceLevel, salary) {

    if (performanceLevel === 'S') {
        return performanceS(salary);
    }

    if (performanceLevel === 'A') {
        return performanceA(salary);
    }

    if (performanceLevel === 'B') {
        return performanceB(salary);
    }

};

// 测试
calculateBonus('A', 10000);    // 输出：30000
```

重构之后的代码得到了一定的改善，但是依然没有解决最重要的问题：calculateBonus函数有可能越来越庞大，而且在系统变化的时候缺乏弹性。

### 使用策略模式重构代码

下面使用策略模式来重构代码。策略模式指的是定义一系列的算法，把它们一个个封装起来。将不变的部分和变化的部分隔开是每个设计模式的主题，策略模式也不例外，策略模式的目的就是将算法的使用与算法的实现分离开来。

在这个例子里，算法的使用方式是不变的，都是根据某个算法取得计算后的奖金数额。而算法的实现是各异和变化的，每种绩效对应着不同的计算规则。

一个基于策略模式的程序至少由两部分组成。第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。 第二个部分是环境类Context，Context接受客户的请求，随后把请求委托给某一个策略类。要做到这点，说明Context中要维持对某个策略对象的引用。

#### 接近传统面向对象语言的实现

```javascript
// 定义每种计算年终奖的策略类
var performanceS = function () {
};
performanceS.prototype.calculate = function (salary) {
    return salary * 4;
};

var performanceA = function () {
};
performanceA.prototype.calculate = function (salary) {
    return salary * 3;
};

var performanceB = function () {
};
performanceB.prototype.calculate = function (salary) {
    return salary * 2;
};

// 定义奖金类Bonus（环境类Context）
var Bonus = function () {
    this.salary = null; // 原始工资
    this.strategy = null; // 绩效等级对应的策略对象
};

Bonus.prototype.setSalary = function (salary) {
    this.salary = salary; // 设置员工的原始工资
};

Bonus.prototype.setStrategy = function (strategy) {
    this.strategy = strategy; // 设置员工绩效等级对应的策略对象
};

Bonus.prototype.getBonus = function () { // 取得奖金数额
    return this.strategy.calculate(this.salary); // 把计算奖金的操作委托给对应的策略对象
};

// 测试
var bonus = new Bonus();

bonus.setSalary(10000);

bonus.setStrategy(new performanceS());  // 设置策略对象
bonus.getBonus();    // 输出：40000

bonus.setStrategy(new performanceA());  // 设置策略对象
bonus.getBonus();    // 输出：30000
```

#### 使用JavaScript特性实现

```javascript
// 直接定义为各个不同的方法
var strategies = {
    "S": function (salary) {
        return salary * 4;
    },
    "A": function (salary) {
        return salary * 3;
    },
    "B": function (salary) {
        return salary * 2;
    }
};

// calculateBonus函数充当环境类Context
var calculateBonus = function (level, salary) {
    return strategies[level](salary);
};

// 测试
calculateBonus('S', 20000); // 输出：80000
calculateBonus('A', 10000); // 输出：3000
```

# 优缺点

## 优点

* 策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句。
* 策略模式提供了对开放—封闭原则的完美支持，将算法封装在独立的strategy中，使得它们易于切换，易于理解，易于扩展。
* 策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作。
* 在策略模式中利用组合和委托来让Context拥有执行算法的能力，这也是继承的一种更轻便的替代方案。

## 缺点

策略模式也有一些缺点，但这些缺点并不严重。

* 使用策略模式会在程序中增加许多策略类或者策略对象。
* 必须了解所有的策略类，必须了解各个策略类之间的不同点，这样才能选择一个合适的策略类。此时策略类要向客户暴露它的所有实现，这是违反最少知识原则的。
