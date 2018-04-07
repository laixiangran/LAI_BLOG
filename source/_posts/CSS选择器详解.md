---
title: CSS选择器详解
date: 2018-04-07 21:59:30
tags: CSS
categories: CSS
---

## 元素选择器

### 通配选择器

#### * { sRules }

选定文档所有的元素

```css
/** 设置所有元素为红色 **/
* {
　　color: red;
}
```
```html
<div>我是div</div>
<p>我是p</p>
```

### 类型选择器

#### E { sRules }

选定指定的文档元素 E

```css
/** 设置元素p为红色 **/
p {
　　color: red;
}
```
```html
<p>我是p</p>
```

### 类选择器

#### E.myclass { sRules }

选定 class 属性包含 myclass 的文档元素 E

```css
/** 设置 calss="myclass" 的元素为红色 **/
.myClass {
　　color: red
}
```
```html
<div class="myclass">我是div</div>
```

### 多类选择器

#### E.myclass.myotherclass { sRules }

选定 class 属性包含 myclass 以及 myotherclass 的文档元素 E

```css
/** 设置 calss="myclass myotherclass" 的元素为红色 **/
.myClass.myotherclass {
　　color: red
}
```
```html
<div class="myclass myotherclass">我是div</div>
```

### ID选择器

#### E#myid { sRules }

选定 id 属性值为 myid 的文档元素 E

```css
/** 设置 id="myid" 的元素为红色 **/
#myid {
　　color: red;
}
```
```html
<div id="myid">我是div</div>
```

## 属性选择器

### 根据简单属性选择

#### E[attr] { sRules }

选定具有属性 attr 的文档元素 E

```css
/** 设置有属性 id 的元素为红色 **/
div[id] {
　　color: red;
}
```
```html
<div id="myid">我是div</div>
```

### 根据具体属性值选择

#### E[attr="val"] { sRules }

选定具有属性 attr 且属性值等于 val 的文档元素 E

```css
/** 设置有属性 id 且值等于 "myid" 的元素为红色 **/
div[id="myid"] {
　　color: red;
}

/** 多个属性-值 **/
input[type="text"][class="text1"] {
　　width: 20px;
}
```

```html
<div id="myid">我是div</div>
<input type="text" class="text1" />
```

### 根据部分属性值选择

#### E[attr~="val"] { sRules }

选定具有属性 attr 且属性值为用空格分隔的字词列表，其中有一个等于 val （包含只有一个值且该值等于 val 的情况）的文档元素 E

```css
/** 设置 class 属性有一个值为 div1 的元素为红色 **/
div[class~="div1"] {
　　color: red;
}
```
```html
<div calss="div1">我是div</div>
<div class="div1 header">我是div</div>
```

#### E[attr^="val"] { sRules }

选定具有属性 attr 且属性值以 val 开头的字符串的文档元素 E

```css
/** 设置 class 属性的值以 head 开头的元素为红色 **/
div[class^="head"] {
　　color: red;
}
```
```html
<div calss="headClass">我是div</div>
```

#### E[attr$="val"] { sRules }

选定具有属性 attr 且属性值以 val 结尾的字符串的文档元素 E

```css
/** 设置 class 属性的值以 Class 结尾的元素为红色 **/
div[class$="Class"] {
　　color: red;
}
```
```html
<div calss="headClass">我是div</div>
```

#### E[attr*="val"] { sRules }

选定具有属性 attr 且属性值包含 val 的字符串的文档元素 E

```css
/** 设置 class 属性的值包含 Div 的元素为红色 **/
div[class*="Div"] {
　　color: red;
}
```
```html
<div calss="headDivClass">我是div</div>
```

#### E[attr|="val"] { sRules }

选定具有属性 attr 且属性值以 val 开头并用连接符 "-" 分隔的字符串（包含属性值只有 val 的情况）的文档元素 E

```css
/** 设置 class 属性的值以 head 开头并用连接符 "-" 分隔的元素为红色 **/
div[class|="head"] {
　　color: red;
}
```
```html
<div calss="head-class">我是div</div>
```

## 关系选择器

### 后代选择器

#### E F { sRules }

选定文档元素 E 所有的后代元素 F，包含所有子孙

```css
/* 设置 div 后代所有的 p 为红色 */
div p {
　　color: red;
}
```
```html
<div>
　　<p>我是段落1</p>
　　<div>
　　　　<p>我是段落2</p>
　　</div>
</div>
```

### 子代选择器

#### E>F { sRules }

选定文档元素 E 所有的子代元素 F，不包含孙代元素

```css
/* 设置 div 子代的 p 为红色，但孙代的 p 不为红色 */
div>p {
　　color: red;
}
```
```html
<div>
　　<p>我是段落1</p>
　　<div>
　　　　<p>我是段落2</p>
　　</div>
</div>
```

### 相邻选择器

#### E+F { sRules }

选定文档元素 E 之后且同属一个父元素的相邻兄弟元素 F

```css
/* 设置 h1 相邻的 p 为红色，但第二个 p 不为红色 */
h1>p {
　　color: red;
}
```
```html
<div>
　　<h1>我是h1</h1>
　　<p>我是段落1</p>
　　<p>我是段落2</p>
</div>
```

### 兄弟选择器

#### E~F { sRules } **`CSS3`**

选定文档元素 E 之后且同属一个父元素的兄弟元素 F

```css
/* 设置 h1 之后所有的 p 为红色 */
h1>p {
　　color: red;
}
```
```html
<div>
　　<h1>我是h1</h1>
　　<p>我是段落1</p>
　　<p>我是段落2</p>
</div>
```

## 伪类选择器

### :link

#### a:link { sRules }

设置超链接 a 未被访问前的样式

```css
a:link {
　　color: blue;
}
```
```html
<a href="http://i.cnblogs.com"></a>
```
### :visited

#### a:visited { sRules }

设置超链接 a 已经被访问后的样式

```css
a:link {
　　color: red;
}
```
```html
<a href="http://i.cnblogs.com"></a>
```
### :focus

#### E:focus { sRules }

设置元素 E 在成为输入焦点（该元素的 onfocus 事件发生）时的样式

```css
a:focus {
　　color: black;
}
```
```html
<a href="http://i.cnblogs.com"></a>
```
### :hover

#### E:hover { sRules }

设置元素E在鼠标悬停时的样式

```css
a:hover {
　　color: red;
}
```
```html
<a href="http://i.cnblogs.com"></a>
```
### :active

#### E:active { sRules }

设置元素E在被用户激活（在鼠标点击与释放之间发生的事件）时的样式

```css
a:active{
　　color: green;
}
```
```html
<a href="http://i.cnblogs.com"></a>
```

> 以上五种伪类选择器同时用在a超链接时，各伪类需按特定的顺序书写才能生效，保证各浏览器具有相同的表现。正确的顺序为：**link - visited - focus - hover - active**

### :lang(lang)

#### E:lang(lang) { sRules }

选定使用特殊语言的元素E

```css
p:lang(zh-cn) {
    color: #f00;
}
p:lang(en) {
    color: #090;
}
```
```html
<p lang="zh-cn">我是中文</p>
<p lang="en">i am English</p>
```
### :not(s) **`CSS3`**

#### E:not(s) { sRules }

匹配不含有s选择符的元素E

```css
/** 除最后一个li之外，所有li加一条底边线 **/
li:not(:last-child) {
	border-bottom: 1px solid #ddd;
}
```
```html
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
```
### :root **`CSS3`**

#### :root { sRules }

匹配当前文档的根元素。在HTML中，根元素永远是HTML

```css
/** :root 相当于 html **/
:root {
    color: red;
}
```
### :first-child

#### E:first-child { sRules }

匹配父元素的第一个子元素 E。要使该属性生效，E 元素必须是某个元素的子元素，E 的父元素最高是 body，即 E 可以是 body 的子元素

**最重要的是：** E 必须是它的兄弟元素中的第一个元素，换言之，E 必须是父元素的第一个子元素。与之类似的伪类还有 E:last-child，只不过情况正好相反，需要它是最后一个子元素。

```css
/** 给第一个 li 加一条底边线 **/
li:first-child {
	border-bottom: 1px solid #ddd;
}

/** 本意是想设置第一个 p 元素为红色，但这里无效，因为 p 不是 div 的第一个子元素（第一个子元素是 h2 ） **/
p:first-child {
    color: red;
}
```
```html
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
<div>
    <h2>我是一个标题</h2>
	<p>我是一个p</p>
</div>
```
### :last-child **`CSS3`**

#### E:last-child { sRules }

匹配父元素的最后一个子元素E。要使该属性生效，E 元素必须是某个元素的子元素，E 的父元素最高是 body，即 E 可以是 body 的子元素

**最重要的是：** E 必须是它的兄弟元素中的最后一个元素，换言之，E 必须是父元素的最后一个子元素。与之类似的伪类还有 E:first-child，只不过情况正好相反，需要它是第一个子元素。

```css
/** 给最后一个 li 加一条底边线 **/
li:last-child {
	border-bottom: 1px solid #ddd;
}

/** 本意是想设置最后一个 h2 元素为红色，但这里无效，因为 h2 不是 div 的最后一个子元素（最后一个子元素是 p ） **/
p:first-child {
    color: red;
}
```
```html
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
<div>
    <h2>我是一个标题</h2>
    <p>我是一个p</p>
</div>
```
### :only-child **`CSS3`**

#### E:only-child { sRules }

匹配父元素仅有的一个子元素 E。要使该属性生效，E 元素必须是某个元素的子元素，E 的父元素最高是 body，即 E 可以是 body 的子元素

```css
/** 该规则当元素中只有一个 li 有效，即可设置 li 为红色，如果有多个 li 则无效。**/
li:only-child {
	color: red;
}
```
```html
<ul>
	<li>li:only-child对我有效，我会变红色</li>
</ul>
<ul>
	<li>li:only-child对我无效，我不会变红色</li>
	<li>li:only-child对我无效，我不会变红色</li>
	<li>li:only-child对我无效，我不会变红色</li>
</ul>
```
### :nth-child(n) **`CSS3`**

#### E:nth-child(n) { sRules }

要使该属性生效，E 元素必须是某个元素的子元素，E 的父元素最高是 body，即 E 可以是 body 的子元素

匹配父元素的第 n 个子元素 E，假设该子元素不是 E，则选择符无效，但 n 会累加

```html

<style>
    /* 第二个 p 会被设置成红色，因为它是父元素的第二个元素 */
    p:nth-child(2) {
        color: red;
    }

    /* 第三个 p 不会设置成红色，因为父元素的第三个元素不是 p，而是 span */
    p:nth-child(3) {
        color: red;
    }

    /* 第三个 p 会被设置成红色，因为它是父元素的第四个元素 */
    p:nth-child(4) {
        color: red;
    }
</style>

<div>
	<p>第1个p</p>
	<p>第2个p</p>
	<span>第1个span</span>
	<p>第3个p</p>
	<span>第2个span</span>
	<p>第4个p</p>
	<p>第5个p</p>
</div>
```

该选择符允许使用一个 乘法因子(n) 来作为换算方式，比如我们想选中所有的偶数子元素 E，那么选择符可以写成：E:nth-child(2n)，也可以使用一些关键字，比如：odd, even。E:nth-child(even) 选择偶数子元素，E:nth-child(old) 选择奇数子元素

```html
<style>
    /* 偶数 或者 E:nth-child(even) */
    li:nth-child(2n) {
        color: red;
    }

    /* 奇数 或者 ，E:nth-child(old) */
    li:nth-child(2n+1) {
        color: blue;
    }
</style>

<ul>
	<li>列表项一</li>
	<li>列表项二</li>
	<li>列表项三</li>
	<li>列表项四</li>
</ul>
```
### :nth-last-child(n) **`CSS3`**

#### E:nth-last-child(n) { sRules }

要使该属性生效，E元素必须是某个元素的子元素，E的父元素最高是body，即E可以是body的子元素

该选择符允许使用一个乘法因子(n)来作为换算方式，比如我们想选中倒数第一个子元素E，那么选择符可以写成：E:nth-last-child(1)

匹配父元素的倒数第n个子元素E，假设该子元素不是E，则选择符无效

```html
<style>
    /* 设置倒数第一个 p 为红色，因为该 p 元素是父元素的倒数第二元素 */
    p:nth-last-child(2) {
        color: red;
    }
</style>

<div>
	<p>第1个p</p>
	<p>第2个p</p>
	<span>第1个span</span>
	<p>第3个p</p>
	<span>第2个span</span>
</div>
```
### :first-of-type **`CSS3`**

#### E:first-of-type { sRules }

匹配同类型中的第一个同级兄弟元素E

要使该属性生效，E元素必须是某个元素的子元素，E的父元素最高是html，即E可以是html的子元素，也就是说E可以是body

该选择符总是能命中父元素的第1个为E的子元素，不论第1个子元素是否为E

```html
<style>
    /* 设置第一个元素类型为 p 的元素为红色，尽管该 p 元素不是父元素的第一个元素 */
    p:first-of-type {
    	color: red;
    }
</style>

<div>
	<div>我是一个div元素</div>
	<p>我是一个p元素</p>
	<p>我是一个p元素</p>
</div>
```
### :last-of-type **`CSS3`**

#### E:last-of-type { sRules }

匹配同类型中的最后一个同级兄弟元素E

要使该属性生效，E元素必须是某个元素的子元素，E的父元素最高是html，即E可以是html的子元素，也就是说E可以是body

该选择符总是能命中父元素的倒数第1个为E的子元素，不论倒是第1个子元素是否为E

```html
<style>
    /* 设置倒数一个元素类型为 p 的元素为红色，尽管该 p 元素不是父元素的倒数第一个元素 */
    p:first-of-type {
    	color: red;
    }
</style>

<div>
	<p>我是一个p元素</p>
	<p>我是一个p元素</p>
	<div>我是一个div元素</div>
</div>
```

### :only-of-type **`CSS3`**

#### E:only-of-type { sRules }

匹配同类型中的唯一的一个同级兄弟元素E

要使该属性生效，E元素必须是某个元素的子元素，E的父元素最高是html，即E可以是html的子元素，也就是说E可以是body

该选择符总是能命中父元素的唯一同类型子元素E，不论该元素的位置

```html
<style>
    /* 设置父元素中唯一的 p 元素为红色，有多个 p 元素无效 */
    p:only-of-type {
    	color: red;
    }
</style>

<div>
	<p>p:only-of-type对我有效，我会变红色</p>
</div>
<div>
	<p>p:only-of-type对我无效，我不会变红色</p>
	<p>p:only-of-type对我无效，我不会变红色</p>
</div>
```

### :nth-of-type(n) **`CSS3`**

#### E:nth-of-type(n) { sRules }

匹配同类型中的第n个同级兄弟元素E

要使该属性生效，E元素必须是某个元素的子元素，E的父元素最高是html，即E可以是html的子元素，也就是说E可以是body

该选择符总是能命中父元素的第n个为E的子元素，不论第n个子元素是否为E

```html
<style>
    /* 设置父元素第二个 p 元素为红色，虽然该 p 元素为父元素的第三个元素 */
    p:nth-of-type(2) {
    	color: red;
    }
</style>

<div class="test">
	<p>我是一个p元素</p>
	<div>我是一个div元素</div>
	<p>我是一个p元素</p>
	<p>我是一个p元素</p>
</div>
```

### :nth-last-of-type(n) **`CSS3`**

#### E:nth-last-of-type(n) { sRules }

匹配同类型中的倒数第n个同级兄弟元素E

要使该属性生效，E元素必须是某个元素的子元素，E的父元素最高是html，即E可以是html的子元素，也就是说E可以是body

该选择符总是能命中父元素的倒数第n个为E的子元素，不论倒数第n个子元素是否为E

```html
<style>
    p:nth-last-of-type(1) {
    	color: red;
    }
</style>

<div class="test">
	<p>我是一个p元素</p>
	<div>我是一个div元素</div>
	<p>我是一个p元素</p>
	<p>我是一个p元素</p>
</div>
```

### :empty **`CSS3`**

#### E:empty { sRules }

匹配没有任何子元素（包括text节点）的元素E

```html
<style>
    p:empty {
    	height: 25px;
    	border: 1px solid #ddd;
    	background: #eee;
    }
</style>

<div>
	<p>结构性伪类选择符 E:empty</p>
	<p><!--我是一个空节点p，请注意我与其它非空节点p的外观有什么不一样--></p>
	<p>结构性伪类选择符 E:empty</p>
</div>
```

### :checked **`CSS3`**

#### E:checked { sRules }

匹配用户界面上处于选中状态的元素E。(用于input type为radio与checkbox时)

```html
<style>
    input:checked + span {
    	background: red;
    }
</style>

<input type="radio" />
<span>红色</span>
```

### :enabled **`CSS3`**

#### E:enabled { sRules }

匹配用户界面上处于可用状态的元素E

```html
<style>
    input[type="text"]:enabled {
    	border: 1px solid #090;
    	background: #fff;
    	color: #000;
    }

    input[type="text"]:disabled {
    	border: 1px solid #ccc;
    	background: #eee;
    	color: #ccc;
    }
</style>

<input type="text" value="可用状态" />
<input type="text" value="禁用状态" disabled="disabled" />
```

### :disabled **`CSS3`**

#### E:disabled { sRules }

匹配用户界面上处于禁用状态的元素E

```html
<style>
    input[type="text"]:enabled {
    	border: 1px solid #090;
    	background: #fff;
    	color: #000;
    }

    input[type="text"]:disabled {
    	border: 1px solid #ccc;
    	background: #eee;
    	color: #ccc;
    }
</style>

<input type="text" value="可用状态" />
<input type="text" value="禁用状态" disabled="disabled" />
```

### :target **`CSS3`**

#### E:target { sRules }

匹配相关URL指向的E元素

**解释：** URL后面跟锚点#，指向文档内某个具体的元素。这个被链接的元素就是目标元素(target element)，:target选择器用于选取当前活动的目标元素

```html
<!-- 假设上述代码在页面 a.html 中，那么当访问 a.html#demo 时，这个div元素将会被:target命中 -->
<style>
    #demo:target {
        color: red;
    }
</style>

<div id="demo">
	<p>E:target伪类使用方法</p>
</div>
```

### @page相关选择器

#### @page :first { sRules }

设置在打印时页面容器第一页使用的样式。仅用于@page规则

该伪类选择符只允许定义margin, orphans, widows 和 page breaks相关属性

#### @page :left { sRules }

设置页面容器位于装订线左边的所有页面使用的样式。仅用于@page规则

该伪类选择符只允许定义margin, padding, border 和 background属性

#### @page :right { sRules }

设置页面容器位于装订线右边的所有页面使用的样式。仅用于@page规则

该伪类选择符只允许定义margin, padding, border 和 background属性

## 伪对象选择器

### ::first-letter **`CSS3`**

#### E::first-letter { sRules }

设置对象内的第一个字符的样式

此伪对象仅作用于块对象。内联对象要使用该伪对象，必须先将其设置为块级对象

该伪对象常被用来配合font-size属性和float属性制作首字下沉效果

```html
<style>
    p::first-letter {
        float:left;
        font-size:40px;
        font-weight:bold;
        line-height:1;
    }
</style>

<h1>杂志常用的首字下沉效果</h1>
<p>今天，阳光明媚，晴空万里，非常适合户外活动，如踏青、远足之类的。长期坐在办公室的同学们要多注意运动。</p>
```

### ::first-line **`CSS3`**

#### E::first-line { sRules }

设置对象内的第一行的样式

此伪对象仅作用于块对象。内联对象要使用该伪对象，必须先将其设置为块级对象

```html
<style>
    p::first-line {
        color:#090;
    }
</style>

<h1>第一行文字的颜色与其它不同</h1>
<p>今天，阳光明媚，晴空万里，非常适合户外活动，如踏青、远足之类的。长期坐在办公室的同学们要多注意运动。</p>
```

### ::before **`CSS3`**

#### E::before { sRules }

设置在对象前（依据对象树的逻辑结构）发生的内容。用来和content属性一起使用，并且必须定义content属性

```html
<style>
    p::before {
        position: absolute;
        left: 0;
        background: #fff;
        color: #000;
        content: "在 p 元素中 span 元素之前可看到这段文字";
        font-size:14px;
    }
</style>

<p>
    <span>我是一个span</span>
</p>
```

### ::after **`CSS3`**

#### E::after { sRules }

设置在对象前（依据对象树的逻辑结构）发生的内容。用来和content属性一起使用，并且必须定义content属性

```html
<style>
    p::after {
        position: absolute;
        left: 0;
        background: #fff;
        color: #000;
        content: "在 p 元素中 span 元素之后可看到这段文字";
        font-size:14px;
    }
</style>

<p>
    <span>我是一个span</span>
</p>
```

### ::placeholder **`CSS3`**

#### E::placeholder { sRules }

设置对象文字占位符的样式。

::placeholder 伪元素用于控制表单输入框占位符的外观，它允许开发者/设计师改变文字占位符的样式，默认的文字占位符为浅灰色。

当表单背景色为类似的颜色时它可能效果并不是很明显，那么就可以使用这个伪元素来改变文字占位符的颜色。

**需要注意的是，除了Firefox是 ::[prefix]placeholder，其他浏览器都是使用 ::[prefix]input-placeholder**

```html
<style>
    input::-webkit-input-placeholder {
    	color: green;
    }
    input:-ms-input-placeholder { // IE10+
    	color: green;
    }
    input:-moz-placeholder { // Firefox4-18
    	color: green;
    }
    input::-moz-placeholder { // Firefox19+
    	color: green;
    }
</style>

<input id="test" placeholder="Placeholder text!">
```

### ::selection **`CSS3`**

#### E::selection { sRules }

设置对象被选择时的样式。

需要注意的是，::selection只能定义被选择时的background-color，color及text-shadow

```html
<style>
    p::selection{
        background:#000;
        color:#f00;
    }
</style>

<p>当我被选中是，我会变成黑色背景红色文字</p>
```

## 参考资料

[http://www.css88.com/book/css/selectors/index.htm](http://www.css88.com/book/css/selectors/index.htm)

