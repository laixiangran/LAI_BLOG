---
title: JavaScript之Promise对象
date: 2018-04-19 20:00:00
tags:
- Promise
- JavaScript
categories: JavaScript
---

## 含义

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了 Promise 对象。

Promise 对象是一个代理对象（代理一个值），被代理的值在 Promise 对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的 Promise 对象。

Promise 对象有以下两个特点：

1. 对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：`pending（进行中）`、`fulfilled（已成功）` 和 `rejected（已失败）`。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：`从 pending 变为 fulfilled` 和 `从 pending 变为 rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为  `resolved（已定型）`。如果改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

## 基本用法

```javascript
new Promise( function(resolve, reject) {...} /* executor */  );
```

Promise 对象的初始化接收一个执行函数 executor，executor 是带有 resolve 和 reject 两个参数的函数 。

**Promise 构造函数执行时会立即调用 executor 函数**， resolve 和 reject 两个函数作为参数传递给 executor（executor 函数在 Promise 构造函数返回新建对象前被调用）。

resolve 和 reject 函数被调用时，分别将 promise 的状态改为 `fulfilled（完成）` 或 `rejected（失败）`。executor 内部通常会执行一些异步操作，一旦完成，可以调用 resolve 函数来将 promise 状态改成 `fulfilled`，或者在发生错误时将它的状态改为 `rejected`。

如果在 executor 函数中抛出一个错误，那么该 promise 状态为 `rejected`。executor函数的返回值被忽略。

先看个示例：（**注：后文的示例均使用 setTimeout 模拟异步操作**）

```javascript
// 从 pending 变为 fulfilled
var p = new Promise(function(resolve, reject) {
    setTimeout(function() {
        console.log('Hi,');
        resolve('promise fulfilled！');
    }, 500);
}).then(function(data) {
    console.log(data);
});
// Hi,
// promise fulfilled！

// 从 pending 变为 rejected
var p = new Promise(function(resolve, reject) {
    setTimeout(function() {
        console.log('Hi,');
        reject('promise rejected！');
    }, 500);
}).then(null, function(error) {
    console.log(error);
});
// Hi,
// promise rejected！
```

解释一下 `从 pending 变为 fulfilled` 这段代码，当执行 new Promise() 时，传入的执行函数就立即执行了，此时其内部有一个异步操作（过 500ms 之后执行），等过了 500ms 之后先执行 `console.log('Hi,');` 输出 `Hi,`，此时 promise 的状态为 `pending（进行中）`，而执行 `resolve('Promise！');` 则修改 promise 的状态为 `fulfilled（完成）`，然后我们调用 `then()` 接收 promise 在 `fulfilled` 状态下传递的值，此时输出 `'Promise！'`。

同理，`从 pending 变为 rejected` 这段代码基本差不多，不同的是异步操作调用了 `reject` 方法，`then` 方法使用第二个参数接收 `rejected` 状态下传递的值。

## Promise.prototype.then()

then 的作用是为 Promise 实例添加状态改变时的回调函数。

then 方法的第一个参数是 resolved 状态的回调函数，第二个参数（可选）是 rejected 状态的回调函数。

```javascript
var p = new Promise(function(resolve, reject) {
    setTimeout(function() {
        console.log('Hi,');

        // 模拟请求，请求状态为200代表成功，不是200代表失败
        if (status === 200) {
            resolve('promise fulfilled！');
        } else {
            reject('promise rejected！');
        }
    }, 500);
}).then(function(data) {
    console.log(data);
}, function(error) {
    console.log(error);
});
// 如果调用 resolve 方法，输出如下：
// Hi,
// promise fulfilled！

// 如果调用 reject 方法，输出如下：
// Hi,
// promise rejected！
```

then 方法返回的是一个新的 Promise 实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即 then 方法后面再调用另一个 then 方法。采用链式的 then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个 Promise 对象（即有异步操作），这时后一个回调函数，就会等待该 Promise 对象的状态发生变化，才会被调用。

```javascript
var p = new Promise(function(resolve, reject) {
    setTimeout(function() {
        console.log('Hi,');
        resolve();
    }, 500);
}).then(function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            // 模拟请求，请求状态为200代表成功，不是200代表失败
            if (status === 200) {
                resolve('promise fulfilled！');
            } else {
                reject('promise rejected！');
            }
        });
    })
}).then(function(data) {
    console.log(data);
}, function(error) {
    console.log(error);
});
// 如果第一个 then 调用 resolve 方法，第二个 then 调用第一个回调函数，最终输出如下：
// Hi,
// promise fulfilled！

// 如果第一个 then 调用 reject 方法，第二个 then 调用第一个回调函数，最终输出如下：
// Hi,
// promise rejected！
```

## Promise.prototype.catch()

catch 方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。

所以下面代码：

```javascript
var p = new Promise(function(resolve, reject) {
    setTimeout(function() {
        console.log('Hi,');

        // 模拟请求，请求状态为200代表成功，不是200代表失败
        if (status === 200) {
            resolve('promise fulfilled！');
        } else {
            reject('promise rejected！');
        }
    }, 500);
}).then(function(data) {
    console.log(data);
}, function(error) {
    console.log(error);
});
```

等价于：

```javascript
var p = new Promise(function(resolve, reject) {
    setTimeout(function() {
        console.log('Hi,');

        // 模拟请求，请求状态为200代表成功，不是200代表失败
        if (status === 200) {
            resolve('promise fulfilled！');
        } else {
            reject('promise rejected！');
        }
    }, 500);
}).then(function(data) {
    console.log(data);
}).catch(function(error) {
    console.log(error);
});
```

如果没有使用 catch 方法或者 then 第二个参数指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应，这跟传统的 try/catch 代码块是不同。

catch 方法返回的还是一个 Promise 对象，因此后面还可以接着调用 then 方法。

catch 方法与 .then(null, rejection) 的不同：

- 如果异步操作抛出错误，状态就会变为 rejected，就会调用 catch 方法指定的回调函数，处理这个错误。
- then 方法指定的回调函数，如果运行中抛出错误，也会被 catch 方法捕获。
- catch 方法的写法更接近同步的写法（try/catch）。

因此，建议总是使用 catch 方法，而不使用 then 方法的第二个参数。

## Promise.prototype.finally()

finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

```javascript
var p = new Promise(function(resolve, reject) {
    setTimeout(function() {
        console.log('Hi,');

        // 模拟请求，请求状态为200代表成功，不是200代表失败
        if (status === 200) {
            resolve('promise fulfilled！');
        } else {
            reject('promise rejected！');
        }
    }, 500);
}).then(function(data) {
    console.log(data);
}).catch(function(error) {
    console.log(error);
}).finally(function() {
    console.log('I am finally！');
});
```

上面代码中，不管 promise 最后的状态，在执行完 then 或 catch 指定的回调函数以后，都会执行 finally 方法指定的回调函数。

## Promise.all()

Promise.all 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
var p = Promise.all([p1, p2]);
```

上面代码中，Promise.all 方法接受一个数组作为参数，p1、p2 都是 Promise 实例，如果不是，就会先调用下面讲到的 Promise.resolve 方法，将参数转为 Promise 实例，再进一步处理。（Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）

 p的状态由p1、p2决定，分成两种情况。

（1）只有 p1、p2 的状态都变成 fulfilled，p 的状态才会变成 fulfilled，此时 p1、p2 的返回值组成一个数组，传递给 p 的回调函数。

（2）只要 p1、p2 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数。

示例：

试想一个页面聊天系统，我们需要从两个不同的 URL 分别获得用户的个人信息和好友列表，这两个任务是可以并行执行的，用Promise.all()实现。

```javascript
// 并行执行异步任务
var p1 = new Promise(function (resolve, reject) {
    setTimeout(function() {
        // 模拟请求，请求状态为200代表成功，不是200代表失败
        if (status === 200) {
            resolve('P1');
        } else {
            reject('error');
        }
    }, 500);
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
// 同时执行p1和p2，并在它们都完成后执行then:
Promise.all([p1, p2]).then(function (results) {
    console.log(results); // 输出：['P1', 'P2']
}).catch(function(error) {
    console.log(error); // 如果p1执行失败，则输出：error
});
```

**注意，如果作为参数的 Promise 实例，自己定义了 catch 方法，那么它一旦被 rejected，并不会触发 Promise.all() 的 catch 方法。**

## Promise.race()

Promise.race 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
var p = Promise.race([p1, p2]);
```

上面代码中，只要 p1、p2 之中有一个实例率先改变状态，p 的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给 p 的回调函数。

Promise.race 方法的参数与 Promise.all 方法一样，如果不是 Promise 实例，就会先调用下面讲到的 Promise.resolve 方法，将参数转为 Promise 实例，再进一步处理。

示例：

有些时候，多个异步任务是为了容错。比如，同时向两个 URL 读取用户的个人信息，只需要获得先返回的结果即可。这种情况下，用Promise.race()实现。

```javascript
// 多任务容错
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 400, 'P2');
});
Promise.race([p1, p2]).then(function (result) {
    console.log(result); // 'P2'
});
```

## Promise.resolve()

有时需要将现有对象转为 Promise 对象，Promise.resolve 方法就起到这个作用。

Promise.resolve方法的参数分成四种情况：

### （1）参数是一个 Promise 实例

如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

### （2）参数是一个 thenable 对象

thenable 对象指的是具有 then 方法的对象，比如下面这个对象。

```javascript
var thenable = {
    then: function (resolve, reject) {
        resolve(42);
    }
};
```

Promise.resolve 方法会将这个对象转为 Promise 对象，然后就立即执行 thenable 对象的 then 方法。

```javascript
var thenable = {
    then: function (resolve, reject) {
        resolve(42);
    }
};

var p1 = Promise.resolve(thenable);
p1.then(function (value) {
    console.log(value);  // 42
});
```

上面代码中，thenable 对象的 then 方法执行后，对象 p1 的状态就变为 resolved，从而立即执行最后那个 then 方法指定的回调函数，输出 42。

### （3）参数不是具有 then 方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有 then 方法的对象，则 Promise.resolve 方法返回一个新的 Promise 对象，状态为 resolved。

```javascript
var p = Promise.resolve('Hello');

p.then(function (s) {
    console.log(s)
});
// 'Hello'

var p1 = Promise.resolve(true);

p1.then(function (b) {
    console.log(b)
});
// true

var p2 = Promise.resolve(1);

p1.then(function (n) {
    console.log(n)
});
// 1
```

### （4）不带有任何参数

Promise.resolve 方法允许调用时不带参数，直接返回一个 resolved 状态的 Promise 对象。

所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用 Promise.resolve 方法。

## Promise.reject()

Promise.reject 方法也会返回一个新的 Promise 实例，该实例的状态为 rejected。

注意，Promise.reject 方法的参数，会原封不动地作为 reject 的参数，变成后续方法的参数。这一点与 Promise.resolve 方法不一致。

```javascript
var thenable = {
    then(resolve, reject) {
        reject('出错了');
    }
};

Promise.reject(thenable)
    .catch(e = > {
    console.log(e === thenable)
})
// true
```

上面代码中，Promise.reject 方法的参数是一个 thenable 对象，执行以后，后面 catch 方法的参数不是 reject 抛出的 `出错了` 这个字符串，而是 thenable 对象。

## 应用

### 加载图片

我们可以将图片的加载写成一个 Promise，一旦加载完成，Promise 的状态就发生变化。

```javascript
function (path) {
    return new Promise(function (resolve, reject) {
        const image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = path;
    });
};
```

### 封装ajax

我们可以将 ajax 请求写成一个 Promise，根据请求的不同状态改变 Promise 的状态。

```javascript
function ajax(method, url, data) {
    var request = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.responseText);
                } else {
                    reject(request.status);
                }
            }
        };
        request.open(method, url);
        request.send(data);
    });
}
```

## 总结

**优点：**
- 可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数（`回调地狱`）。
- 在异步执行的流程中，可以把执行代码和处理结果的代码清晰地分离开来。

**缺点：**
- 无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
- 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
- 当处于 `pending` 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 参考资料

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[http://es6.ruanyifeng.com/#docs/promise](http://es6.ruanyifeng.com/#docs/promise)

[https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014345008539155e93fc16046d4bb7854943814c4f9dc2000](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014345008539155e93fc16046d4bb7854943814c4f9dc2000)