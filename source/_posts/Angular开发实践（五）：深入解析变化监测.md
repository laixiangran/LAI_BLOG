---
title: Angular开发实践（五）：深入解析变化监测
date: 2018-03-26 21:10:30
tags:
- Angular
- JavaScript
categories: Angular
---

## 什么是变化监测

在使用 Angular 进行开发中，我们常用到 Angular 中的绑定——模型到视图的输入绑定、视图到模型的输出绑定以及视图与模型的双向绑定。而这些绑定的值之所以能在视图与模型之间保持同步，正是得益于Angular中的变化检测。

简单来说，变化检测就是 Angular 用来检测视图与模型之间绑定的值是否发生了改变，当检测到模型中绑定的值发生改变时，则同步到视图上，反之，当检测到视图上绑定的值发生改变时，则回调对应的绑定函数。

## 变化监测的源头

变化监测的关键在于如何最小粒度地监测到绑定的值是否发生了改变，那么在什么情况下会导致这些绑定的值发生变化呢？我们可以看一下我们常用的几种场景：

#### Events: click/hover/...

```javascript
@Component({
  selector: 'demo-component',
  template: `
    <h1>{{name}}</h1>
    <button (click)="changeName()">change name</button>
  `
})
export class DemoComponent {
    name: string = 'Tom';

    changeName() {
        this.name = 'Jerry';
    }
}
```

我们在模板中通过插值表达式绑定了 name 属性。当点击`change name按钮`时，改变了 name 属性的值，这时模板视图显示内容也发生了改变。

#### XHR/webSocket

```javascript
@Component({
  selector: 'demo-component',
  template: `
    <h1>{{name}}</h1>
  `
})
export class DemoComponent implements OnInit {
    name: string = 'Tom';

    constructor(public http: HttpClient) {}

    ngOnInit() {
        // 假设有这个./getNewName请求，返回一个新值'Jerry'
        this.http.get('./getNewName').subscribe((data: string) => {
            this.name = data;
        });
    }
}
```

我们在这个组件的 ngOnInit 函数里向服务器端发送了一个 Ajax 请求，当这个请求返回结果时，同样会改变当前模板视图上绑定的 name 属性的值。

#### Times: setTimeout/requestAnimationFrame

```javascript
@Component({
  selector: 'demo-component',
  template: `
    <h1>{{name}}</h1>
  `
})
export class DemoComponent implements OnInit {
    name: string = 'Tom';

    constructor() {}

    ngOnInit() {
        // 假设有这个./getNewName请求，返回一个新值'Jerry'
        setTimeout(() => {
            this.name = 'Jerry';
        }, 1000);
    }
}
```

我们在这个组件的ngOnInit函数里通过设定一个定时任务，当定时任务执行时，同样会改变当前视图上绑定的name属性的值。

#### 总结

- 其实，我们不难发现上述三种情况都有一个共同点，即这些导致绑定值发生改变的事件都是异步发生的。

- Angular并不是捕捉对象的变动，它采用的是在适当的时机去检验对象的值是否被改动，这个时机就是这些异步事件的发生。

- 这个时机是由 NgZone 这个服务去掌控的，它获取到了整个应用的执行上下文，能够对相关的异步事件发生、完成或者异常等进行捕获，然后驱动 Angular 的变化监测机制执行。

## 变化监测的处理机制

通过上面的介绍，我们大致明白了变化检测是如何被触发的，那么 Angular 中的变化监测是如何执行的呢？

首先我们需要知道的是，对于每一个组件，都有一个对应的变化监测器；即每一个 Component 都对应有一个`changeDetector`，我们可以在 Component 中通过依赖注入来获取到`changeDetector`。

而我们的多个 Component 是一个树状结构的组织，由于一个 Component 对应一个`changeDetector`，那么`changeDetector`之间同样是一个树状结构的组织。

最后我们需要记住的一点是，每次变化监测都是从 Component 树根开始的。

#### 举个例子

子组件：

```javascript
@Component({
  selector: 'demo-child',
  template: `
    <h1>{{title}}</h1>
    <p>{{paramOne}}</p>
    <p>{{paramTwo}}</p>
  `
})
export class DemoChildComponent {
    title: string = '子组件标题';
    @Input() paramOne: any; // 输入属性1
    @Input() paramTwo: any; // 输入属性2
}
```

父组件：

```javascript
@Component({
  selector: 'demo-parent',
  template: `
    <h1>{{title}}</h1>
    <demo-child [paramOne]='paramOneVal' [paramTwo]='paramTwoVal'></demo-child>
    <button (click)="changeVal()">change name</button>
  `
})
export class DemoParentComponent {
    title: string = '父组件标题';
    paramOneVal: any = '传递给paramOne的数据';
    paramTwoVal: any = '传递给paramTwo的数据';

    changeVal() {
        this.paramOneVal = '改变之后的传递给paramOne的数据';
    }
}
```

上面的代码中，DemoParentComponent 通过 <demo-child></demo-child> 标签嵌入了 DemoChildComponent，从树状结构上来说，DemoParentComponent 是 DemoChildComponent 的根节点，而 DemoChildComponent 是 DemoParentComponent 的叶子节点。

**当我们点击 DemoParentComponent 的 button 时，会回调到 changeVal 方法，然后会触发变化监测的执行，变化监测流程如下：**

首先变化检测从 DemoParentComponent 开始：

- 检测 title 值是否发生了变化：没有发生变化

- 检测 paramOneVal 值是否发生了变化：发生了变化（点击按钮调用changeVal()方法改变的）

- 检测 paramTwoVal 值是否发生了变化：没有发生变化

然后变化检测进入到叶子节点 DemoChildComponent：

- 检测 title 值是否发生了改变：没有发生变化

- 检测 paramOne 是否发生了变化：发生了改变（由于父组件的属性paramOneVal发生了改变）

- 检测 paramTwo 是否发生了改变：没有发生变化

最后，因为 DemoChildComponent 再也没有了叶子节点，所以变化监测将更新DOM，同步视图与模型之间的变化。

## 变化监测策略

学习了变化监测的处理机制之后，你可能会想，这机制未免也有点太简单粗暴了吧，假如我的应用中有成百上千个 Component，随便一个 Component  触发了监测，那么都需要从根节点到叶子节点重新检测一遍。

别着急，Angular 的开发团队已经考虑到了这个问题，上述的检测机制只是一种默认的检测机制，Angular 还提供一种 OnPush 的检测机制（设置元数据属性 changeDetection: ChangeDetectionStrategy.OnPush）。

OnPush 与 Default 之间的差别：**当检测到与子组件输入绑定的值没有发生改变时，变化检测就不会深入到子组件中去**。

## 变化监测类 - ChangeDetectorRef

上面说到我们可以修改组件元数据属性 changeDetection 来修改组件的变化监测策略（ChangeDetectionStrategy.Default 或 ChangeDetectionStrategy.OnPush），除了这个，我们还可以使用 ChangeDetectorRef 来更加灵活的控制组件的变化监测。

Angular 在整个运行期间都会为每一个组件创建 ChangeDetectorRef 的实例，该实例提供了相关方法来手动管理变化监测。有了这个类，我们自己就可以自定义组件的变化监测策略了，如停止/启用变化监测或者按指定路径变化监测等等。

相关方法如下：

- markForCheck()：把根组件到该组件之间的这条路径标记起来，通知Angular在下次触发变化监测时必须检查这条路径上的组件。

- detach()：从变化监测树中分离变化监测器，该组件的变化监测器将不再执行变化监测，除非再次手动执行reattach()方法。

- reattach()：把分离的变化监测器重新安装上，使得该组件及其子组件都能执行变化监测。

- detectChanges()：手动触发执行该组件到各个子组件的一次变化监测。

使用方法也很简单，直接在组件中注入即可：

```javascript
@Component({
  selector: 'demo-parent',
  template: `
    <h1>{{title}}</h1>
  `
})
export class DemoParentComponent implements OnInit {
    title: string = '组件标题';

    constructor(public cdRef: ChangeDetectorRef) {}

    ngOnInit() {
        this.cdRef.detach(); // 停止组件的变化监测，看需求使用不同的方法
    }
}
```
