---
title: CSS技巧和经验
date: 2016-03-25 18:29:30
tags: CSS
categories: CSS
---

> CSS技巧和经验

<!-- more -->

## 如何清除图片下方出现几像素的空白间隙

### 方法1

```css
img {
    display: block;
}
```

### 方法2

> 除了top值，还可以设置为text-top | middle | bottom | text-bottom，甚至特定的<length>和<percentage>值都可以

```css
img {
    vertical-align: top;
}
```

### 方法3

```css
/*  #test为img的父元素  */
#test {
   font-size: 0;
   line-height: 0;
}
```

## 如何让文本垂直对齐文本输入框

```css
input {
    vertical-align: middle;
}
```

## 如何让单行文本在容器内垂直居中

> 只需设置文本的行高line-height等于容器的高度height即可

```css
#test {
    height: 25px;
    line-height: 25px;
}
```

## 如何让超链接访问后和访问前的颜色不同且访问后仍保留hover和active效果

> [为什么是link-visited-hover-active](http://www.cnblogs.com/laixiangran/p/5245353.html)
 
> 按L-V-H-A的顺序设置超链接样式即可，可速记为LoVe（喜欢）HAte（讨厌）

```css
a:link {
    color: #03c;
}
a:visited {
    color: #666;
}
a:hover {
    color: #f30;
}
a:active {
    color: #c30;
}
```

## 如何使文本溢出边界不换行强制在一行内显示

> [white-space详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space)

> 设置容器的宽度和white-space为nowrap即可

```css
#test {
    width: 150px;
    white-space: nowrap;
}
```

## 如何使文本溢出边界显示为省略号

> [text-overflow详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-overflow)

> 首先需设置将文本强制在一行内显示，然后将溢出的文本通过overflow: hidden截断，并以text-overflow: ellipsis方式将截断的文本显示为省略号

```css
#test {
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

## 如何使连续的长字符串自动换行 

> [word-wrap详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-wrap)

> word-wrap的break-word值允许单词内换行

```css
#test {
    width: 150px;
    word-wrap: break-word;
}
```

## 如何清除浮动

### 方法1

```css
#test {
    clear: both;
}
/* #test为浮动元素的下一个兄弟元素 */
```

### 方法2

```css
#test {
    display: block;
    zoom: 1;
    overflow: hidden;
}
/* #test为浮动元素的父元素。zoom:1也可以替换为固定的width或height */
```

### 方法3

```css
#test {
    zoom: 1;
}
#test:after {
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
    content: '';
}
/* #test为浮动元素的父元素 */
```

## 如何定义鼠标指针的光标形状为手型 

> [cursor详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor)

```css
#test {
    cursor: pointer;
}
/* 简单设置cursor为pointer */
```

## 如何让已知宽高的容器在页面中水平垂直居中

### 方法1

> [position详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)

> 首先容器为相对定位，设置top: 50%;margin-top: -50px;使其垂直居中，再设置margin:0 auto使其水平居中

```css
#test {
    width: 200px;
    height: 100px;
    position: relative;
    top: 50%;
    margin: 0 auto
    margin-top: -50px; /* height的一半 */
}
```
 
### 方法2

> [transform详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)

> 首先容器为相对定位，设置top: 50%;transform: translateY(-50%);使其垂直居中，再设置margin:0 auto使其水平居中

```css
#test {
    width: 200px;
    height: 100px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
}
```

## 如何让未知尺寸的图片在已知宽高的容器内水平垂直居中

> [vertical-align详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align)

```css
#test {
    display: table-cell; /* vertical-align只支持内联（inline）元素或表格单元格（table-cell）元素 */
    width: 200px;
    height: 200px;
    text-align: center;
    vertical-align: middle;
}
#test p {
    margin: 0;
}
#test p img {
    vertical-align: middle;
}
/* #test是img的祖父节点，p是img的父节点 */
```
    
## 如何设置span的宽度和高度（即如何设置内联元素的宽高）

> 要使内联元素可以设置宽高，只需将其定义为块级或者内联块级元素即可。所以方法非常多样，既可以设置display属性，也可以设置float属性，或者position属性等等

```css
span {
    display: block;
    width: 200px;
    height: 100px;
}
```

## 如何让某个元素充满整个页面

```css
html, body {
    height: 100%;
    margin: 0;
}
#test {
    height: 100%;
}
```

## 如何让某个元素距离窗口上右下左4边各10像素

```css
html, body {
    height: 100%;
    margin: 0;
}
#test {
    position: absolute;
    top: 10px;
    right: 10px;
    bottom: 10px;
    left: 10px;
}
```

## 如何容器透明，内容不透明

### 方法1

> 原理是容器层与内容层并级，容器层设置透明度，内容层通过负margin或者position绝对定位等方式覆盖到容器层上

```css
.outer {
    width: 200px;
    height: 200px;
    background: #000;
    opacity: 0.2;
}
.inner {
    width: 200px;
    height: 200px;
    margin-top: -200px;
}
```
```html
<div class="outer"><!--我是透明的容器--></div>
<div class="inner">我是不透明的内容</div>
```

### 方法2

> 直接使用background-color的rgba颜色值实现（高级浏览器）

```css
.outer {
    width: 200px;
    height: 200px;
    background-color: rgba(0,0,0,0.2);
}
```
```html
<div class="outer">
    <span>我是不透明的内容</span>
</div>
```

## 如何让已知宽度的容器水平居中

```css
#test {
    width: 960px;
    margin: 0 auto;
}
```

## 为什么容器的背景色没显示出来？为什么容器无法自适应内容高度？

> 清除浮动，方法请参考第8条
通常出现这样的情况都是由于没有清除浮动而引起的，所以Debug时应第一时间想到是否有未清除浮动的地方

## 如何做1像素细边框的table

### 方法1 

> [border-collapse详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-collapse)

```css
#test {
    border-collapse: collapse;
    border: 1px solid #ddd;
}
#test th, #test td {
    border: 1px solid #ddd;
}
```
```html
<table id="test">
    <tr>
        <th>姓名</th>
        <td>Joy Du</td>
    </tr>
    <tr>
        <th>年龄</th>
        <td>26</td>
    </tr>
</table>
```

### 方法2 

> [border-spacing详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-spacing)

```css
#test {
    border-spacing: 1px;
    background: #ddd;
}
#test tr {
    background: #fff;
}
```
```html
<table id="test">
    <tr>
        <th>姓名</th>
        <td>Joy Du</td>
    </tr>
    <tr>
        <th>年龄</th>
        <td>26</td>
    </tr>
</table>
```

## 如何使页面文本行距始终保持为n倍字体大小的基调

```css
body {
    line-height: n;
}
```
> 注意，不要给n加单位

## 以图换字的几种方法及优劣分析

### 思路1 使用text-indent的负值，将内容移出容器

> [text-indent详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-indent)

> 该方法优点在于结构简洁，不理想的地方：
1.由于使用场景不同，负缩进的值可能会不一样，不易抽象成公用样式；
2.当该元素为链接时，在非IE下虚线框将变得不完整；
3.如果该元素被定义为内联级或者内联块级，不同浏览器下会有较多的差异

```css
#test {
    width: 200px;
    height: 50px;
    text-indent: -9999px;
    background:#eee url(*.png) no-repeat;
}
```
```html
<div class="test">以图换字之内容负缩进法</div>
```

### 思路2 使用display:none或visibility:hidden将内容隐藏

> 该方法优点在于兼容性强并且容易抽象成公用样式，缺点在于结构较复杂

```css
#test {
    width: 200px;
    height: 50px;
    background: #eee url(*.png) no-repeat;
}
#test span {
    visibility: hidden; /* 或者display:none */
}
```
```html
<div class="test">
    <span>以图换字之内容隐藏法</span>
</div>
```

### 思路3 使用padding或者line-height将内容挤出容器之外

> 该方法优点在于结构简洁，缺点在于：
1. 由于使用场景不同，padding或line-height的值可能会不一样，不易抽象成公用样式；
2. 要兼容IE5.5及更早浏览器还得hack

```css
#test {
    overflow: hidden;
    width: 200px;
    height: 0;
    padding-top: 50px;
    background: #eee url(*.png) no-repeat;
}
.test {
    overflow: hidden;
    width: 200px;
    height: 50px;
    line-height: 50;
    background: #eee url(*.jpg) no-repeat;
}
```
```html
<div class="test">以图换字之内容排挤法</div>
```

### 思路4 使用超小字体和文本全透明法

> 该方法结构简单易用，推荐使用

```css
.test {
    overflow: hidden;
    width: 200px;
    height: 50px;
    font-size: 0;
    line-height: 0;
    color: rgba(0,0,0,0);
    background: #eee url(*.png) no-repeat;
}
```
```html
<div class="test">以图换字之超小字体+文本全透明法</div>
```

## 为什么2个相邻div的margin只有1个生效

> 本例中box1的底部margin为10px，box2的顶部margin为20px，但表现在页面上2者之间的间隔为20px，而不是预想中的10+20px=30px，结果是选择2者之间最大的那个margin，我们把这种机制称之为“外边距合并”；外边距合并不仅仅出现在相邻的元素间，父子间同样会出现
简单列举几点外边距合并的注意事项: 
a. 外边距合并只出现在块级元素上； 
b. 浮动元素不会和相邻的元素产生外边距合并； 
c. 绝对定位元素不会和相邻的元素产生外边距合并； 
d. 内联块级元素间不会产生外边距合并； 
e. 根元素间不会产生外边距合并（如html与body间）； 
f. 设置了属性overflow且值不为visible的块级元素不会与它的子元素发生外边距合并；

```css
.box1 {
    margin: 10px 0;
}
.box2 {
    margin: 20px 0;
}
```
```html
<div class="box1">box1</div>
<div class="box2">box2</div>
```

## 如何在文本框中禁用中文输入法

> ime-mode为非标准属性，写该文档时只有IE能正确禁用中文输入法，Firefox虽然支持但不能禁用

```css
input, textarea {
    ime-mode: disabled;
}
```
    
## 打印分页符
 
> [page-break-before详解](https://developer.mozilla.org/en-US/docs/Web/CSS/page-break-before)

> 虽然大多数的互联网用户更愿意在网上阅读的内容，但一些用户可能想打印文章。使用CSS，你可以控制内容的分页符，把这个类加入到任何你想打印的标签

```css
#test { 
    page-break-before: always;
}
```
    
## 段落首字下沉
 
> [::first-letter详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-letter)

> 你可以创建一个下沉效果，如在报纸或杂志的使用

```css
p::first-letter {
    margin: 5px 0 0 5px;
    float: left;
    color: #FF3366;
    font-size: 3.0em;
}
```
    
## 单词首字大写

> [text-transform详解](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform)

```css
#test {
    text-transform: uppercase; /* lowercase 小写 */
}
```
    
## 文字模糊化处理 

> [text-shadow详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow)

```css
#test {
    color: transparent;
    text-shadow: #111 0 0 5px;
}
```
    
## CSS重置 

> [normalize.css下载](http://necolas.github.io/normalize.css/)
    
> 建议使用normalize.css
    
## CSS中的简单运算

> [calc详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc)
      
> 通过CSS中的calc方法可以进行一些简单的运算，从而达到动态指定元素样式的目的。

```css
#test {
  background-position: calc(100% - 50px) calc(100% - 20px);
}
``` 

## 参考

1. [https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)
2. [http://www.css88.com/book/css/experience/skill.htm](http://www.css88.com/book/css/experience/skill.htm)
3. [http://www.cnblogs.com/58top/archive/2012/10/27/25-incredibly-useful-css-tricks-you.html](http://www.cnblogs.com/58top/archive/2012/10/27/25-incredibly-useful-css-tricks-you.html)

