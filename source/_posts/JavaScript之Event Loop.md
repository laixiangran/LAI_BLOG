---
title: JavaScript之Event Loop
date: 2018-04-16 19:30:32
tags:
- Event Loop
- JavaScript
categories: JavaScript
---

先看段代码：

```javascript
console.log(1);

setTimeout(function () {
	console.log(2);

	new Promise(function (resolve, reject) {
		console.log(3);
		resolve();
		console.log(4);
	}).then(function () {
		console.log(5);
	});
});

function fn() {
	console.log(6);
	setTimeout(function () {
		console.log(7);
	}, 50);
}

new Promise(function (resolve, reject) {
	console.log(8);
	resolve();
	console.log(9);
}).then(function () {
	console.log(10);
});

fn();

console.log(11);

// 以下代码需要在 node 环境中执行
process.nextTick(function () {
	console.log(12);
});

setImmediate(function () {
	console.log(13);
});
```

思考一下,能给出准确的输出顺序吗？

下面我们一个一个的来了解 Event Loop 相关的知识点，最后再一步一步分析出本段代码最后的输出顺序。

## JavaScript是单线程

首先我们先了解下进程和线程的概念和关系：

- **进程：** 运行的程序就是一个进程，比如你正在运行的浏览器，它会有一个进程。
- **线程：** 程序中独立运行的代码段。**一个进程** 由单个或多个 **线程** 组成，线程是负责执行代码的。

我们都知道 JavaScript 是单线程的，那么既然有单线程就有多线程，首先看看单线程与多线程的区别：

- **单线程：** 从头执行到尾，一行一行执行，如果其中一行代码报错，那么剩下代码将不再执行。同时容易代码阻塞。
- **多线程：** 代码运行的环境不同，各线程独立，互不影响，避免阻塞。

那为什么JavaScript是单线程的呢？

JavaScript 的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准呢？

所以，为了避免复杂性，从一诞生，JavaScript 就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。

## 执行栈、任务队列

![](https://note.youdao.com/yws/api/personal/file/72E65D1A6A094F2E9D25CC484D17B9DE?method=download&shareKey=2798504f4db3ffd2d4d0734036aa1d33)

上图中，主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码调用各种外部API，它们在"任务队列"中加入各种事件（DOM Event，ajax，setTimeout...）。只要栈中的代码执行完毕，主线程就会去读取任务队列，依次执行那些事件所对应的回调函数。

**堆（heap）：**

对象被分配在一个堆中，即用以表示一个大部分非结构化的内存区域。

**执行栈（stack）：**

运行同步代码。执行栈中的代码（同步任务），总是在读取"任务队列"（异步任务）之前执行。

**任务队列（callback queue）：**

"任务队列"是一个事件的队列（也可以理解成消息的队列），IO设备完成一项任务，就在"任务队列"中添加一个事件，表示相关的异步任务可以进入"执行栈"了。主线程读取"任务队列"，就是读取里面有哪些事件。

"任务队列"中的事件，除了IO设备的事件以外，还包括一些用户产生的事件（比如鼠标点击、页面滚动等等）。只要指定过回调函数，这些事件发生时就会进入"任务队列"，等待主线程读取。

所谓"回调函数"（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。

"任务队列"是一个先进先出的数据结构，排在前面的事件，优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，"任务队列"上第一位的事件就自动进入主线程。但是，由于存在后文提到的"定时器"功能，主线程首先要检查一下执行时间，某些事件只有到了规定的时间，才能返回主线程。

## 同步任务、异步任务、宏任务、微任务

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

如果排队是因为计算量大，CPU忙不过来，倒也算了，但是很多时候CPU是闲着的，因为IO设备（输入输出设备）很慢（比如Ajax操作从网络读取数据），不得不等着结果出来，再往下执行。

JavaScript语言的设计者意识到，这时主线程完全可以不管IO设备，挂起处于等待中的任务，先运行排在后面的任务。等到IO设备返回了结果，再回过头，把挂起的任务继续执行下去。

于是，广义上将 JavaScript 所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

具体来说，异步执行的运行机制如下（同步执行也是如此，因为它可以被视为没有异步任务的异步执行）：

    （1）所有同步任务都在主线程上执行，形成一个"执行栈"（execution context stack）；

    （2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件；

    （3）一旦"执行栈"中的所有同步任务执行完毕，系统就会取出"任务队列"中事件所对应的回调函数进入"执行栈"，开始执行；

    （4）主线程不断重复上面的第三步。

![](https://note.youdao.com/yws/api/personal/file/1D9F8ABC1B6445D1BE7998234772C08D?method=download&shareKey=9f1016588481854db1c55b2161c188ec)

除了广义上的定义，我们可以将任务进行更精细的定义，分为宏任务与微任务：

- **宏任务（macro-task）：** 包括整体代码script，setTimeout，setInterval，ajax，dom操作
- **微任务（micro-task）：** Promise

具体来说，宏任务与微任务执行的运行机制如下：

    （1）首先，将"执行栈"最开始的所有同步代码(宏任务)执行完成；

    （2）检查是否有微任务，如有则执行所有的微任务；

    （3）取出"任务队列"中事件所对应的回调函数(宏任务)进入"执行栈"并执行完成；

    （4）再检查是否有微任务，如有则执行所有的微任务；

    （5）主线程不断重复上面的（3）（4）步。

![](https://note.youdao.com/yws/api/personal/file/79F907B422B14F0BAC24440AC2BF6710?method=download&shareKey=88ca585a2f4eda3020e5e40aa0479098)

以上两种运行机制，主线程都从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为 **Event Loop（事件循环）**。

## setTimeout()、setInterval()

setTimeout() 和 setInterval() 这两个函数，它们的内部运行机制完全一样，区别在于前者指定的代码是一次性执行，后者则为反复执行。

setTimeout() 和 setInterval() 产生的任务是 **异步任务**，也属于 **宏任务**。

setTimeout() 接受两个参数，第一个是回调函数，第二个是推迟执行的毫秒数。setInterval() 接受两个参数，第一个是回调函数，第二个是反复执行的毫秒数。

如果将第二个参数设置为0或者不设置，意思 **并不是立即执行，而是指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行。它在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完，才会得到执行。**

所以说，setTimeout() 和 setInterval() 第二个参数设置的时间并不是绝对的，它需要根据当前代码最终执行的时间来确定的，简单来说，如果当前代码执行的时间（如执行200ms）超出了推迟执行（setTimeout(fn, 100)）或反复执行的时间（setInterval(fn, 100)），那么setTimeout(fn, 100) 和 setTimeout(fn, 0) 也就没有区别了，setInterval(fn, 100) 和 setInterval(fn, 0) 也就没有区别了。

## Promise

Promise 相对来说就比较特殊了，在 new Promise() 中传入的回调函数是会 **立即执行** 的，但是它的 **then()** 方法是在 **执行栈之后，任务队列之前** 执行的，它属于 **微任务**。

## process.nextTick

process.nextTick 是 Node.js 提供的一个与"任务队列"有关的方法，它产生的任务是放在 **执行栈的尾部**，并不属于 **宏任务** 和 **微任务**，因此它的任务 **总是发生在所有异步任务之前。**

## setImmediate

setImmediate 是 Node.js 提供的另一个与"任务队列"有关的方法，它产生的任务追加到"任务队列"的尾部，它和 **setTimeout(fn, 0)** 很像，但优先级都是 setTimeout 优先于 setImmediate。

有时候，setTimeout 的执行顺序会在 setImmediate 的前面，有时候会在 setImmediate 的后面，这并不是 node.js 的 bug，这是因为虽然 setTimeout 第二个参数设置为0或者不设置，但是 setTimeout 源码中，会指定一个具体的毫秒数（node为1ms，浏览器为4ms），而由于当前代码执行时间受到执行环境的影响，执行时间有所起伏，如果当前执行的代码小于这个指定的值时，setTimeout 还没到推迟执行的时间，自然就先执行 setImmediate 了，如果当前执行的代码超过这个指定的值时，setTimeout 就会先于 setImmediate 执行。

## 优先级

通过上面的介绍，我们就可以得出一个代码执行的优先级：

**同步代码（宏任务） > process.nextTick > Promise（微任务）> setTimeout(fn)、setInterval(fn)（宏任务）> setImmediate（宏任务）> setTimeout(fn, time)、setInterval(fn, time)，其中time>0**

## 代码解析

回到开头给出的代码，我们来一步一步解析：

**运行"执行栈"中的代码：**

```javascript
console.log(1);

// setTimeout(function () { // 作为宏任务，暂不执行，放到任务队列中(1)
// 	console.log(2);
//
// 	new Promise(function (resolve, reject) {
// 		console.log(3);
// 		resolve();
// 		console.log(4);
// 	}).then(function () {
// 		console.log(5);
// 	});
// });

function fn() {
	console.log(6);
	//setTimeout(function () { // 作为宏任务，暂不执行，放到任务队列中(3)
	//	console.log(7);
	//}, 50);
}

new Promise(function (resolve, reject) {
	console.log(8);
	resolve();
	console.log(9);
})
// .then(function () { // 作为微任务，暂不执行
// 	console.log(10);
// });

fn();

console.log(11);

process.nextTick(function () {
	console.log(12);
});

// setImmediate(function () { // 作为宏任务，暂不执行，放到任务队列中(2)
// 	console.log(13);
// });
```

此时输出为：`1 8 9 6 11 12`

**运行微任务：**

```javascript
new Promise(function (resolve, reject) {
	// console.log(8); // 已执行
	// resolve(); // 已执行
	// console.log(9); // 已执行
})
.then(function () {
	console.log(10);
});
```

此时输出为：`10`

**读取"任务队列"的回调函数到"执行栈"**：

```javascript
setTimeout(function () {
	console.log(2);

	new Promise(function (resolve, reject) {
		console.log(3);
		resolve();
		console.log(4);
	})
	//.then(function () { // 作为微任务，暂不执行
	//	console.log(5);
	//});
});
```

此时输出为：`2 3 4`

**再运行微任务：**

```javascript
setTimeout(function () {
	// console.log(2); // 已执行

	new Promise(function (resolve, reject) {
		// console.log(3); // 已执行
		// resolve(); // 已执行
		// console.log(4); // 已执行
	})
	.then(function () {
		console.log(5);
	});
});
```

此时输出为：`5`

**再读取"任务队列"的回调函数到"执行栈"**：

```javascript
setImmediate(function () {
	console.log(13);
});
```

此时输出为：`13`

**运行微任务：**

无

**再读取"任务队列"的回调函数到"执行栈"**：

```javascript
// function fn() { // 已执行
	// console.log(6); // 已执行
	setTimeout(function () {
		console.log(7);
	}, 50);
// }
```

此时输出为：`7`

**运行微任务：**

无

综上，最终的输出顺序是：`1 8 9 6 11 12 10 2 3 4 5 13 7`

## 参考资料

- [javascript中的Event Loop详解](https://zhuanlan.zhihu.com/p/33136054)
- [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [并发模型与事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)
- [这一次，彻底弄懂 JavaScript 执行机制](http://www.fly63.com/article/detial/171)
- [Node探秘之事件循环（2）--setTimeout/setImmediate/process.nextTick的差别](https://www.jianshu.com/p/837b584e1bdd)