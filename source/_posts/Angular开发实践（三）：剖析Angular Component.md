---
title: Angular开发实践（三）：剖析Angular Component
date: 2018-03-22 16:30:30
tags:
- Angular
- JavaScript
categories: Angular
---

# Web Component

在介绍Angular Component之前，我们先简单了解下[W3C Web Components](https://github.com/w3c/webcomponents)

## 定义

- W3C为统一组件化标准方式，提出Web Component的标准。
- 每个组件包含自己的html、css、js代码。
- Web Component标准包括以下四个重要的概念：
    - Custom Elements（自定义标签）：可以创建自定义 HTML 标记和元素；
    - HTML Templates（HTML模版）：使用 <template> 标签去预定义一些内容，但并不加载至页面，而是使用 JS 代码去初始化它；
    - Shadow DOM（虚拟DOM）：可以创建完全独立与其他元素的DOM子树；
    - HTML Imports（HTML导入）：一种在 HTML 文档中引入其他 HTML 文档的方法，<link rel=“import” href=“example.html” />。

概括来说就是，可以创建自定义标签来引入组件是前端组件化的基础，在页面引用 HTML 文件和 HTML 模板是用于支撑编写组件视图和组件资源管理，而 Shadow DOM 则是隔离组件间代码的冲突和影响。

## 示例

定义hello-component

```html
<template id="hello-template">
    <style>
        h1 {
            color: red;
        }
    </style>
    <h1>Hello Web Component!</h1>
</template>

<script>

    // 指向导入文档，即本例的index.html
    var indexDoc = document;

    // 指向被导入文档，即当前文档hello.html
    var helloDoc = (indexDoc._currentScript || indexDoc.currentScript).ownerDocument;

    // 获得上面的模板
    var tmpl = helloDoc.querySelector('#hello-template');

    // 创建一个新元素的原型，继承自HTMLElement
    var HelloProto = Object.create(HTMLElement.prototype);

    // 设置 Shadow DOM 并将模板的内容克隆进去
    HelloProto.createdCallback = function() {
        var root = this.createShadowRoot();
        root.appendChild(indexDoc.importNode(tmpl.content, true));
    };

    // 注册新元素
    var hello = indexDoc.registerElement('hello-component', {
        prototype: HelloProto
    });
</script>
```

使用hello-component

```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="赖祥燃, laixiangran@163.com, http://www.laixiangran.cn"/>
    <title>Web Component</title>
    <!--导入自定义组件-->
    <link rel="import" href="hello.html">
</head>
<body>
    <!--自定义标签-->
    <hello-component></hello-component>
</body>
</html>
```
从以上代码可看到，hello.html 为按标准定义的组件（名称为 hello-component ），在这个组件中有自己的结构、样式及逻辑，然后在 index.html 中引入该组件文件，即可像普通标签一样使用。

# Angular Component

Angular Component属于指令的一种，可以理解为拥有模板的指令。其它两种是[属性型指令](https://angular.cn/guide/attribute-directives)和[结构型指令](https://angular.cn/guide/structural-directives)。

## 基本组成

```typescript
@Component({
    selector: 'demo-component',
    template: 'Demo Component'
})
export class DemoComponent {}
```

- 组件装饰器：每个组件类必须用`@component`进行装饰才能成为Angular组件。
- 组件元数据：组件元数据：`selector`、`template`等，下文将着重讲解每个元数据的含义。
- 组件类：组件实际上也是一个普通的类，组件的逻辑都在组件类里定义并实现。
- 组件模板：每个组件都会关联一个模板，这个模板最终会渲染到页面上，页面上这个`DOM`元素就是此组件实例的宿主元素。

## 组件元数据

### 自身元数据属性

名称 | 类型 | 作用
---|---|---
animations | AnimationEntryMetadata[] | 设置组件的动画
changeDetection | ChangeDetectionStrategy | 设置组件的变化监测策略
encapsulation | ViewEncapsulation | 设置组件的视图包装选项
entryComponents | any[] | 设置将被动态插入到该组件视图中的组件列表
interpolation | [string, string] | 自定义组件的插值标记，默认是双大括号{{}}
moduleId | string | 设置该组件在 ES/CommonJS 规范下的模块id，它被用于解析模板样式的相对路径
styleUrls | string[] | 设置组件引用的外部样式文件
styles | string[] | 设置组件使用的内联样式
template | string | 设置组件的内联模板
templateUrl | string | 设置组件模板所在路径
viewProviders | Provider[] | 设置组件及其所有子组件（不含ContentChildren）可用的服务

### 从 core/Directive 继承

名称 | 类型 | 作用
---|---|---
exportAs | string | 设置组件实例在模板中的别名，使得可以在模板中调用
host | {[key: string]: string} | 设置组件的事件、动作和属性等
inputs | string[] | 设置组件的输入属性
outputs | string[] | 设置组件的输出属性
providers | Provider[] | 设置组件及其所有子组件（含ContentChildren）可用的服务（依赖注入）
queries | {[key: string]: any} | 设置需要被注入到组件的查询
selector | string | 设置用于在模板中识别该组件的css选择器（组件的自定义标签）

### 几种元数据详解

> 以下几种元数据的等价写法会比元数据设置更简洁易懂，所以一般推荐的是等价写法。

#### inputs

```typescript
@Component({
    selector: 'demo-component',
    inputs: ['param']
})
export class DemoComponent {
    param: any;
}
```

等价于：

```typescript
@Component({
    selector: 'demo-component'
})
export class DemoComponent {
    @Input() param: any;
}
```

#### outputs

```typescript
@Component({
    selector: 'demo-component',
    outputs: ['ready']
})
export class DemoComponent {
    ready = new eventEmitter<false>();
}
```

等价于：

```typescript
@Component({
    selector: 'demo-component'
})
export class DemoComponent {
    @Output() ready = new eventEmitter<false>();
}
```

#### host

```typescript
@Component({
    selector: 'demo-component',
    host: {
        '(click)': 'onClick($event.target)', // 事件
        'role': 'nav', // 属性
        '[class.pressed]': 'isPressed', // 类
    }
})
export class DemoComponent {
    isPressed: boolean = true;

    onClick(elem: HTMLElement) {
        console.log(elem);
    }
}
```

等价于：

```typescript
@Component({
    selector: 'demo-component'
})
export class DemoComponent {
    @HostBinding('attr.role') role = 'nav';
    @HostBinding('class.pressed') isPressed: boolean = true;

    @HostListener('click', ['$event.target'])
    onClick(elem: HTMLElement) {
        console.log(elem);
    }
}
```

#### queries - 视图查询

```typescript
@Component({
    selector: 'demo-component',
    template: `
        <input #theInput type='text' />
        <div>Demo Component</div>
    `,
    queries: {
        theInput: new ViewChild('theInput')
    }
})
export class DemoComponent {
    theInput: ElementRef;
}
```

等价于：

```typescript
@Component({
    selector: 'demo-component',
    template: `
        <input #theInput type='text' />
        <div>Demo Component</div>
    `
})
export class DemoComponent {
    @ViewChild('theInput') theInput: ElementRef;
}
```

#### queries - 内容查询

```html
<my-list>
    <li *ngFor="let item of items;">{{item}}</li>
</my-list>
```

```typescript
@Directive({
    selector: 'li'
})
export class ListItem {}
```

```typescript
@Component({
    selector: 'my-list',
    template: `
        <ul>
            <ng-content></ng-content>
        </ul>
    `,
    queries: {
        items: new ContentChild(ListItem)
    }
})
export class MyListComponent {
    items: QueryList<ListItem>;
}
```

等价于：

```typescript
@Component({
    selector: 'my-list',
    template: `
        <ul>
            <ng-content></ng-content>
        </ul>
    `
})
export class MyListComponent {
    @ContentChild(ListItem) items: QueryList<ListItem>;
}
```

#### styleUrls、styles

- styleUrls和styles允许同时指定。

- 优先级：模板内联样式 > styleUrls > styles。

- 建议：使用styleUrls引用外部样式表文件，这样代码结构相比styles更清晰、更易于管理。同理，模板推荐使用templateUrl引用模板文件。

#### changeDetection

- ChangeDetectionStrategy.Default：组件的每次变化监测都会检查其内部的所有数据（引用对象也会深度遍历），以此得到前后的数据变化。

- ChangeDetectionStrategy.OnPush：组件的变化监测只检查输入属性（即@Input修饰的变量）的值是否发生变化，当这个值为引用类型（Object，Array等）时，则只对比该值的引用。

- 显然，OnPush策略相比Default降低了变化监测的复杂度，很好地提升了变化监测的性能。如果组件的更新只依赖输入属性的值，那么在该组件上使用OnPush策略是一个很好的选择。

#### encapsulation

- ViewEncapsulation.None：无 Shadow DOM，并且也无样式包装。

- ViewEncapsulation.Emulated：无 Shadow DOM，但是通过Angular提供的样式包装机制来模拟组件的独立性，使得组件的样式不受外部影响，这是Angular的默认设置。

- ViewEncapsulation.Native：使用原生的 Shadow DOM 特性。

## 生命周期

当Angular使用构造函数新建组件后，就会按下面的顺序在特定时刻调用这些生命周期钩子方法：

生命周期钩子 | 调用时机
---|---
ngOnChanges | 在ngOnInit之前调用，或者当组件输入数据（通过@Input装饰器显式指定的那些变量）变化时调用。
ngOnInit | 第一次ngOnChanges之后调用。**建议此时获取数据，不要在构造函数中获取**。
ngDoCheck | 每次变化监测发生时被调用。
ngAfterContentInit | 使用<ng-content>将外部内容嵌入到组件视图后被调用，第一次ngDoCheck之后调用且只执行一次（只适用组件）。
ngAfterContentChecked | ngAfterContentInit后被调用，或者每次变化监测发生时被调用（只适用组件）。
ngAfterViewInit | 创建了组件的视图及其子视图之后被调用（只适用组件）。
ngAfterViewChecked | ngAfterViewInit，或者每次子组件变化监测时被调用（只适用组件）。
ngOnDestroy | 销毁指令/组件之前触发。此时应将不会被垃圾回收器自动回收的资源（**比如已订阅的观察者事件、绑定过的DOM事件、通过setTimeout或setInterval设置过的计时器等等**）手动销毁掉。
