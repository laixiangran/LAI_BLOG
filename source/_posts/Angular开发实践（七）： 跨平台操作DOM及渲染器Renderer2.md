---
title: Angular开发实践（七）： 跨平台操作DOM及渲染器Renderer2
date: 2018-04-02 12:22:30
tags:
- Angular
- JavaScript
categories: Angular
---

在[《Angular开发实践（六）：服务端渲染》](http://www.laixiangran.cn/2018/03/29/Angular%E5%BC%80%E5%8F%91%E5%AE%9E%E8%B7%B5%EF%BC%88%E5%85%AD%EF%BC%89%EF%BC%9A%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/)这篇文章的最后，我们也提到了在`服务端渲染`中需要牢记的几件事件，其中就包括不要使用`window`、 `document`、 `navigator`等浏览器特有的类型以及直接操作DOM元素。

这样就引出了 Angular 主要特性之一：横跨所有平台。通过合适的方法，使用 Angular 构建的应用，可复用在多种不同平台的应用上 —— Web、移动 Web、移动应用、原生应用和桌面原生应用。

为了能够支持跨平台，Angular 通过抽象层封装了不同平台的差异。比如定义了抽象类 Renderer2 、抽象类 RootRenderer 等。此外还定义了以下引用类型：ElementRef、TemplateRef、ViewRef 、ComponentRef 和 ViewContainerRef 等。通过 `模板变量`、`@ViewChild` 等方法获取DOM元素。

为了演示，先定义一个组件DemoComponent：

```javascript
import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
	template: `
	    <div id="demoDiv" #demoDiv>this is DIV!</div>
	    DIV的id：{{demoDiv.id}} <!-- DIV的id：demoDiv -->
	`
})
export class DemoComponent implements AfterViewInit {
	@ViewChild('demoDiv') demoDiv: ElementRef; // @ViewChild通过模板变量名获取

	constructor(private renderer: Renderer2) {
	}

	ngAfterViewInit() {
	    console.log('DIV的id：' + this.demoDiv.nativeElement.id); // DIV的id：demoDiv
		this.renderer.setStyle(this.demoDiv.nativeElement, 'background-color', 'red'); // 通过Renderer2设置div的css样式background-color
	}
}
```

## 获取组件中的div

在Angular应用中不应该通过原生 API 或者 jQuery 来直接获取DOM元素：

```javascript
let element1 = document.getElementById("demoDiv"); // jQuery获取: $('#demoDiv')
```

而是应该通过Angular提供的方法来获取DOM元素：

### 模板变量

```html
<div id="demoDiv" #demoDiv>this is DIV!</div>
DIV的id：{{demoDiv.id}} <!-- DIV的id：demoDiv -->
```
在组件模板中，我们在 div 上定义了 #demoDiv 的模板变量，那么 demoDiv 就等于该 div 的 DOM 对象，因此我们可以通过 `demoDiv.id` 直接获取 div 的 id。

### @ViewChild

```javascript
@ViewChild('demoDiv') demoDiv: ElementRef; // @ViewChild通过模板变量名获取

ngAfterViewInit() {
    console.log('DIV的id：' + this.demoDiv.nativeElement.id); // DIV的id：demoDiv
}
```
在组件类中，我们通过 @ViewChild 获取到包装有 div 的 DOM 对象的 ElementRef 对象，ElementRef 定义如下：

```javascript
class ElementRef<T> {
  constructor(nativeElement: T)
  nativeElement: T
}
```

因此我们可以在 ngAfterViewInit 中通过 this.demoDiv.nativeElement 获取到该 div 的 DOM 对象，然后获取元素的id。

## 操作组件中的div

在上面通过几种方式获取到 div 的 DOM 对象，那么我们要如果对它进行操作呢（设置样式、属性、插入子元素等）？通过原始API 或者 jQuery 肯定是不允许的了。

这样我们就引出Angular抽象类 `Renderer2` 来对元素进行设置样式、属性、插入子元素等操作。

Renderer2 的定义如下：

```javascript
class Renderer2 {
    get data: {...}
    destroyNode: ((node: any) => void) | null
    destroy(): void
    createElement(name: string, namespace?: string | null): any // 创建元素
    createComment(value: string): any // 创建注释元素
    createText(value: string): any // 创建文本元素
    appendChild(parent: any, newChild: any): void // 添加子元素（在最后）
    insertBefore(parent: any, newChild: any, refChild: any): void // 添加子元素（在最前）
    removeChild(parent: any, oldChild: any): void // 移除子元素
    selectRootElement(selectorOrNode: string | any): any // 获取根元素
    parentNode(node: any): any // 获取父元素
    nextSibling(node: any): any // 获取下一个兄弟元素
    setAttribute(el: any, name: string, value: string, namespace?: string | null): void // 设置属性
    removeAttribute(el: any, name: string, namespace?: string | null): void // 移除属性
    addClass(el: any, name: string): void // 添加样式类
    removeClass(el: any, name: string): void // 移除样式类
    setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void // 设置样式
    removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void // 移除样式
    setProperty(el: any, name: string, value: any): void // 设置DOM对象属性，不同于元素属性
    setValue(node: any, value: string): void // 设置元素值
    listen(target: 'window' | 'document' | 'body' | any, eventName: string, callback: (event: any) => boolean | void): () => void // 注册事件
}
```

因此，我们想改变 div 的背景色，就可以这样做：

```javascript
ngAfterViewInit() {
	this.renderer.setStyle(this.demoDiv.nativeElement, 'background-color', 'red'); // 通过Renderer2设置div的css样式background-color
}
```
