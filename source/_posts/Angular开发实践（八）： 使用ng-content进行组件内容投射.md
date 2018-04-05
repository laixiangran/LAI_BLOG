---
title: Angular开发实践（八）： 使用ng-content进行组件内容投射
date: 2018-04-05 16:22:30
tags:
- Angular
- JavaScript
categories: Angular
---

在Angular中，组件属于特殊的指令，它的特殊之处在于它有自己的模板（html）和样式（css）。因此使用组件可以使我们的代码具有强解耦、可复用、易扩展等特性。通常的组件定义如下：

demo.component.ts：

```javascript
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'demo-component',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}
}
```

demo.component.html：

```html
<div class="demo">
	<h2>
		demo-component - 我是一个简单的组件
	</h2>
</div>
```

demo.component.scss：

```css
.demo {
	padding: 10px;
	border: 2px solid red;

	h2 {
		margin: 0;
		color: #262626;
	}
}
```

此时我们引用该组件，就会呈现该组件解析之后的内容：

```html
<demo-component></demo-component>
```

![](https://note.youdao.com/yws/api/personal/file/6308E4AE99A340DCBD5C035F8C154447?method=download&shareKey=3510d54d1483461cb413b0c89d34d9c0)

假设现在有这样的需求，这个组件能够接受外部投射进来的内容，也就是说组件最终呈现的内容不仅仅是本身定义的那些，那该怎么做呢？这时就要请出本文的主角 `ng-content`。

## 简单投射

我们先从最简单开始，在 demo.component.html 中添加 <ng-content></ng-content>，修改后的 demo.component.html 和 demo.component.scss 如下：

demo.component.html：

```html
<div class="demo">
	<h2>
		demo-component - 可嵌入外部内容的组件
	</h2>
	<div class="content">
		<ng-content></ng-content>
	</div>
</div>
```

demo.component.scss：

```css
.demo {
	padding: 10px;
	border: 2px solid red;

	h2 {
		margin: 0;
		color: #262626;
	}

	.content {
		padding: 10px;
		margin-top: 10px;
		line-height: 20px;
		color: #FFFFFF;
		background-color: #de7d28;
	}
}
```

为了效果展示特意将 <ng-content></ng-content> 所在的容器背景色定义为橙色。

这时我们在引用该组件时可以从外部投射内容，外部内容将在橙色区域显示：

```html
<demo-component>
	我是外部嵌入的内容
</demo-component>
```

![](https://note.youdao.com/yws/api/personal/file/08C14FD7AFD549D99A2088EAC6C64096?method=download&shareKey=59de843cadfdc1263028cd8a87473022)

## 针对性投射

如果同时存在几个 <ng-content></ng-content>，那外部内容将如何进行投射呢？

我们先看个示例，为了区别，我再新增一个蓝色区域的 <ng-content></ng-content>，修改后的 demo.component.html 和 demo.component.scss 如下：

demo.component.html：

```html
<div class="demo">
	<h2>
		demo-component - 可嵌入外部内容的组件
	</h2>
	<div class="content">
		<ng-content></ng-content>
	</div>
	<div class="content blue">
		<ng-content></ng-content>
	</div>
</div>
```

demo.component.scss：

```css
.demo {
	padding: 10px;
	border: 2px solid red;

	h2 {
		margin: 0;
		color: #262626;
	}

	.content {
		padding: 10px;
		margin-top: 10px;
		line-height: 20px;
		color: #FFFFFF;
		background-color: #de7d28;

		&.blue {
			background-color: blue;
		}
	}
}
```

引用该组件：

```html
<demo-component>
	我是外部嵌入的内容
</demo-component>
```

此时，我们将看到外部内容投射到了蓝色区域：

![](https://note.youdao.com/yws/api/personal/file/6D64AA1D21EA4A4EBC89DC6FCEC765F0?method=download&shareKey=129aaac822431f0d99abefcbef393f59)

当然，如果你将橙色区域代码放在蓝色区域代码的后面，那么外部内容就会投射到橙色区域：

![](https://note.youdao.com/yws/api/personal/file/81C71B4EDEEF45E59F3DFA564AF8AC86?method=download&shareKey=349e49d6c0a2d87e1ad31f7c323fb08a)

所以从上面的示例我们可以看出，如果同时存在简单的 <ng-content></ng-content> ，那么外部内容将投射在组件模板最后的那个 <ng-content></ng-content> 中。

那么知道这个问题，我们可能会想，能不能将外部内容有针对性的投射相应的 <ng-content></ng-content> 中呢？答案显然是可以的。

为了处理这个问题，<ng-content> 支持一个 `select` 属性，可以让你在特定的地方投射具体的内容。该属性支持 CSS 选择器（标签选择器、类选择器、属性选择器、...）来匹配你想要的内容。如果 ng-content 上没有设置 `select` 属性，它将接收全部内容，或接收不匹配任何其他 ng-content 元素的内容。

直接看例子，修改后的 demo.component.html 和 demo.component.scss 如下：

demo.component.html：

```html
<div class="demo">
	<h2>
		demo-component - 可嵌入外部内容的组件
	</h2>
	<div class="content">
		<ng-content></ng-content>
	</div>
	<div class="content blue">
		<ng-content select="header"></ng-content>
	</div>
	<div class="content red">
		<ng-content select=".demo2"></ng-content>
	</div>
	<div class="content green">
		<ng-content select="[name=demo3]"></ng-content>
	</div>
</div>
```

demo.component.scss：

```css
.demo {
	padding: 10px;
	border: 2px solid red;

	h2 {
		margin: 0;
		color: #262626;
	}

	.content {
		padding: 10px;
		margin-top: 10px;
		line-height: 20px;
		color: #FFFFFF;
		background-color: #de7d28;

		&.blue {
			background-color: blue;
		}

		&.red {
			background-color: red;
		}

		&.green {
			background-color: green;
		}
	}
}
```

从上面代码可以看到，蓝色区域将接收 `标签 header ` 那部分内容，红色区域将接收 `class为"demo2"的div` 的那部分内容，绿色区域将接收 `属性name为"demo3"的div ` 的那部分内容，橙色区域将接收其余的外部内容（`开始，我是外部嵌入的内容，结束`）。

引用该组件：

```html
<demo-component>
	开始，我是外部嵌入的内容，
	<header>
		我是外部嵌入的内容，我在header中
	</header>
	<div class="demo2">
		我是外部嵌入的内容，我所在div的class为"demo2"
	</div>
	<div name="demo3">
		我是外部嵌入的内容demo，我所在div的属性name为"demo3"
	</div>
	结束
</demo-component>
```

![](https://note.youdao.com/yws/api/personal/file/D8AA2353165B46518E03A6E167C03E11?method=download&shareKey=03b5352c408edfdff0fa457d5e409c96)

此时，我们将看到外部内容投射到了指定的 <ng-content></ng-content> 中。

## 扩展知识

### ngProjectAs

现在我们知道通过 ng-content 的 `select` 属性可以指定外部内容投射到指定的 <ng-content></ng-content> 中。

而要能正确的根据 `select` 属性投射内容，**有个限制就是** - 不管是 `标签 header`、`class为"demo2"的div`还是 `属性name为"demo3"的div`，这几个标签都是作为 组件标签 <demo-component></demo-component> 的`直接子节点`。

那如果不是作为直接子节点，会是什么情况呢？我们简单修改下引用 demo-component 组件的代码，将 `标签header` 放在一个div中，修改如下：

```html
<demo-component>
	开始，我是外部嵌入的内容，
	<div>
		<header>
			我是外部嵌入的内容，我在header中
		</header>
	</div>
	<div class="demo2">
		我是外部嵌入的内容，我所在div的class为"demo2"
	</div>
	<div name="demo3">
		我是外部嵌入的内容demo，我所在div的属性name为"demo3"
	</div>
	结束
</demo-component>
```

![](https://note.youdao.com/yws/api/personal/file/5D5F25A6B4E74A7FAB9BDE305F1B481C?method=download&shareKey=55edf66c2c9ea4d88f57866b90f848d7)

此时，我们看到 `标签 header` 那部分内容不再投射到蓝色区域中了，而是投射到橙色区域中了。原因就是 `<ng-content select="header"></ng-content>` 无法匹配到之前的 `标签 header`，故而将这部分内容投射到了橙色区域的 `<ng-content></ng-content>` 中了。

为了解决这个问题，我们必须使用 `ngProjectAs` 属性，它可以应用于任何元素上。具体如下：

```html
<demo-component>
	开始，我是外部嵌入的内容，
	<div ngProjectAs="header">
		<header>
			我是外部嵌入的内容，我在header中
		</header>
	</div>
	<div class="demo2">
		我是外部嵌入的内容，我所在div的class为"demo2"
	</div>
	<div name="demo3">
		我是外部嵌入的内容demo，我所在div的属性name为"demo3"
	</div>
	结束
</demo-component>
```

通过设置 `ngProjectAs` 属性，让 `标签header` 所在的 div 指向了 `select="header"`，此时 `标签 header` 那部分内容有投射到蓝色区域了：

![](https://note.youdao.com/yws/api/personal/file/653EFC5051FB4FBB98D24D8893D9347C?method=download&shareKey=0676a9e4a7dcbc59d86b1206ece9cdf1)

### <ng-content> 不“产生”内容

#### 做个试验

做个试验，先定义一个 demo-child-component 组件：

```javascript
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'demo-child-component',
	template: '<h3>我是demo-child-component组件</h3>'
})
export class DemoChildComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	    console.log('demo-child-component初始化完成！');
	}
}
```

demo-component 组件修改为：

```javascript
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'demo-component',
	template: `
    	<button (click)="show = !show">
            {{ show ? 'Hide' : 'Show' }}
        </button>
        <div class="content" *ngIf="show">
            <ng-content></ng-content>
        </div>
	`
})
export class DemoComponent implements OnInit {
    show = true;

	constructor() {
	}

	ngOnInit() {
	}
}
```

然后在 demo-component 中 投射 demo-child-component：

```html
<demo-component>
	<demo-child-component></demo-child-component>
</demo-component>
```

此时，在控制台我们看到打印出 `demo-child-component初始化完成！` 这些文字。但是当我们点击按钮进行切换操作时，`demo-child-component初始化完成！` 就不再打印了，这意味着我们的 demo-child-component 组件只被实例化了一次 - 从未被销毁和重新创建。

为什么会出现这样的情况呢？

#### 出现原因

`<ng-content>` 不会 "产生" 内容，它只是投影现有的内容。你可以认为它等价于 `node.appendChild(el)` 或 jQuery 中的 `$(node).append(el)` 方法：使用这些方法，节点不被克隆，它被简单地移动到它的新位置。因此，投影内容的生命周期将被绑定到它被声明的地方，而不是显示在地方。

这也从原理解释了前面那个问题：**如果同时存在几个 <ng-content></ng-content>，那外部内容将如何进行投射呢？**

这种行为有两个原因：期望一致性和性能。什么 "期望的一致性" 意味着作为开发人员，可以基于应用程序的代码，猜测其行为。假设我写了以下代码：

```html
<demo-component>
	<demo-child-component></demo-child-component>
</demo-component>
```

很显然 demo-child-component 组件将被实例化一次，但现在假如我们使用第三方库的组件：

```html
<third-party-wrapper>
    <demo-child-component></demo-child-component>
</third-party-wrapper>
```

如果第三方库能够控制 demo-child-component 组件的生命周期，我将无法知道它被实例化了多少次。其中唯一方法就是查看第三方库的代码，了解它们的内部处理逻辑。将组件的生命周期被绑定到我们的应用程序组件而不是包装器的意义是，开发者可以掌控计数器只被实例化一次，而不用了解第三方库的内部代码。

**性能的原因** 更为重要。因为 ng-content 只是移动元素，所以可以在编译时完成，而不是在运行时，这大大减少了实际应用程序的工作量。

#### 解决方法

为了让组件能够控制投射进来的子组件的实例化，我们可以通过两种方式完成：在我们的内容周围使用 `<ng-template>` 元素及 [ngTemplateOutlet](https://angular.cn/api/common/NgTemplateOutlet)，或者使用带有 "*" 语法的结构指令。为简单起见，我们将在示例中使用 `<ng-template>` 语法。

demo-component 组件修改为：

```javascript
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'demo-component',
	template: `
    	<button (click)="show = !show">
            {{ show ? 'Hide' : 'Show' }}
        </button>
        <div class="content" *ngIf="show">
            <ng-container [ngTemplateOutlet]="template"></ng-container>
        </div>
	`
})
export class DemoComponent implements OnInit {
    @ContentChild(TemplateRef) template: TemplateRef;
    show = true;

	constructor() {
	}

	ngOnInit() {
	}
}
```

然后我们将 demo-child-component 包含在 `ng-template` 中：

```html
<demo-component>
    <ng-template>
        <demo-child-component></demo-child-component>
    </ng-template>
</demo-component>
```

此时，我们在点击按钮进行切换操作时，控制台都会打印出 `demo-child-component初始化完成！` 这些文字。

## 参考资源

[ng-content: The hidden docs](https://medium.com/claritydesignsystem/ng-content-the-hidden-docs-96a29d70d11b)

