---
title: CSS实现元素居中原理解析
date: 2018-04-30 12:51:30
tags: CSS
categories: CSS
---

在 CSS 中要设置元素水平垂直居中是一个非常常见的需求了。但就是这样一个从理论上来看似乎实现起来极其简单的，在实践中，它往往难住了很多人。

让元素水平居中相对比较简单：如果它是一个行内元素，就对它的父元素应用 `text-align: center`；如果它是一个块级元素，就对它自身应用 `margin: auto`。

然而如果要对一个元素进行垂直居中，那就没有那么容易了，有时候光是想想就令人头皮发麻了。

本文分别从行内元素和块级元素进行说明，将目前比较流行的实现方式进行汇集并解析实现原理，方便大家查阅。这里要说明一点，每一种方式都不是十全十美的，关键要看自己的需求，从而分析出哪种实现方式是最合适的。

## 行内元素

首先我们先把基础代码写出来：

```html
<div class="main">
    <span class="content">我是要居中的行内元素span</span>
</div>
```

```css
.main {
    width: 300px;
    height: 300px;
    background-color: #50ba8b;
}

.content {
    background-color: #5b4d4e;
    color: #FFFFFF;
}
```

class 为 `.main` 的 div 包裹这一个 class 为 `.content` 的行内元素 span，我们的目的就是要让 `.content` 元素 在 `.main` 元素中居中。

### 水平居中

#### text-align

行内元素的水平居中比较简单，我们直接在 `.main` 中添加 `text-align: center;` 即可，此时 `.main` 变为：


```css
.main {
    width: 300px;
    height: 300px;
    background-color: #50ba8b;

    text-align: center;  /* 水平居中 */
}
```

**实现原理：** 设置 `text-align` 的值为  `center` ，因为该属性规定元素中的文本的水平对齐方式，那么设置为 `center` 则文本就水平居中了。

### 垂直居中

#### line-height

行内元素的垂直居中我们分为 `一行` 和 `多行或者图片等替换元素` 来说明。

如果是 `一行`，那么我们可以使用 `line-height` 来实现，此时 `.main` 元素 css 代码变为：

```css
.main {
    width: 300px;
    height: 300px; /* 可以不设置 */
    background-color: #50ba8b;

    line-height: 300px; /* 垂直居中 */
}
```

其实设置了 `line-height` 就可以让文本垂直居中，并不需要同时设置 `height`，这里也是一直存在的一个误区。

**实现原理：** 这种方式实现垂直居中运用的是 CSS 中“行距的上下等分机制”，这也说明了为什么该方式只适用于 `一行` 的文本。

还有一点需要说明是，这种方式实现的垂直居中是“近似”的，并不是完美的垂直居中，因为文字字形的垂直中线位置普遍要比真正的“行框盒子”的垂直中线位置低，而由于我们平时使用的 font-size 比较小，使得这点偏差不容易察觉出来，那么感官上也就看成是垂直居中了。

#### line-height 及 vertical-align

下面再来说说 `多行或者图片等替换元素` 的垂直居中效果实现，这里我们需要同时借助 `line-height` 和 `vertical-align` 来实现。

先让文本换行：

```html
<div class="main">
    <span class="content">
        我是要居中的行内元素span <br>
        我是要居中的行内元素span
    </span>
</div>
```

再看修改之后的 css 代码：

```css
.main {
    width: 300px;
    background-color: #50ba8b;

    line-height: 300px;
}

.content {
    display: inline-block;
    background-color: #5b4d4e;
    color: #FFFFFF;
    line-height: 20px;
    margin: 0 20px;
    vertical-align: middle;
}
```

**实现原理：**

1. 设置 `.content` 元素的 display 为 inline-block。作用在于既能重置外部的 line-height 为正常大小，又能保持行内元素特性，从而可以设置 vertical-align 属性，以及产生一个非常关键的“行框盒子”。我们需要的其实并不是这个“行框盒子”，而是每个“行框盒子”都会附带的一个产物 —— “幽灵空白节点”，即一个宽度为 0，表现如同普通字符的看不见的“节点”。有了这个“幽灵空白节点”，我们的 `line-height: 300px;` 就有了作用的对象，从而相当于在 `.content` 元素前面撑起了一个高度为 300px 的宽度为 0 的行内元素。
2. 因为行内元素默认都是基线对齐的，所以我们通过对 `.content` 元素设置 `vertical-align: middle;` 来调整多行文本的垂直位置，从而实现我们想要的“垂直居中”效果。这种方式也适用于 `图片等替换元素` 的垂直居中效果。当然这里的“垂直居中”也是近似的，这是由于 vertical-align 导致的，具体为什么可以深入了解 `vertical-align: middle;`。

## 块级元素

依然先把基础代码写出来：

```html
<div class="main">
    <div class="content">我是要居中的块级元素div</div>
</div>
```

```css
.main {
    width: 300px;
    height: 300px;
    background-color: #50ba8b;
}

.content {
    width: 150px;
    height: 150px;
    background-color: #5b4d4e;
}
```

class 为 `.main` 的 div 包裹这一个 class 为 `.content` 的 块级元素 div，我们的目的就是要让 `.content` 元素 在 `.main` 元素中居中。

### position + margin: auto

实现代码如下：

```css
.main {
    width: 300px;
    height: 300px;
    background-color: #50ba8b;

    /*关键代码*/
    position: relative;
}

.content {
    width: 150px;
    height: 150px;
    background-color: #5b4d4e;

    /*关键代码*/
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
```

**实现原理：**

1. 设置 `.main` 元素为相对定位 `position: relative;`，这样其子元素设置绝对定位时就相对它了。
2. 然后设置 `.content` 元素为绝对定位 `position: absolute;` 并设置它的 `top`、`left`、`bottom`、`right` 都为0，这样该元素的元素的尺寸表现为“格式化宽度和格式化高度”，和 `<div>` 的“正常流宽度”一样，同属于外部尺寸，也就是尺寸自动填充父级元素的可用尺寸，但由于此时我们设置了 `.content` 元素的宽高，就限制了元素自动填充，这样就多出来150px的空间了。
3. 最后我们设置 `.content` 元素为 `margin: auto;` ，此时根据 auto 的计算规则，将上下左右剩余空间全部等分了，自然就居中了。

### position + margin-left/top

实现代码如下：

```css
.main {
    width: 300px;
    height: 300px;
    background-color: #50ba8b;

    /*关键代码*/
    position: relative;
}

.content {
    width: 150px;
    height: 150px;
    background-color: #5b4d4e;

    /*关键代码*/
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -75px;
    margin-top: -75px;
}
```

**实现原理：**

1. 设置 `.main` 元素为相对定位 `position: relative;`，这样其子元素设置绝对定位时就相对它了。
2. 然后设置 `.content` 元素为绝对定位 `position: absolute;` 并设置 `top: 50%;`、`left: 50%;`，这样`.content` 元素的左上角就位于 `.main` 元素的中心了。
3. 最后设置 `.content` 元素 `margin-left: -75px;`、`margin-top: -75px;` 将自身左移及上移宽高的一半，这样 `.content` 元素的中心处于 `.main` 元素的中心处，自然就实现了居中效果。
4. 这种方法的缺点就是需要固定 `.content` 元素的宽高。

### position + translate

实现代码如下：

```css
.main {
    width: 300px;
    height: 300px;
    background-color: #50ba8b;

    /*关键代码*/
    position: relative;
}

.content {
    width: 150px;
    height: 150px;
    background-color: #5b4d4e;

    /*关键代码*/
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

**实现原理：**

1. 设置 `.main` 元素为相对定位 `position: relative;`，这样其子元素设置绝对定位时就相对它了。
2. 然后设置 `.content` 元素为绝对定位 `position: absolute;` 并设置 `top: 50%;`、`left: 50%;`，这样`.content` 元素的左上角就位于 `.main` 元素的中心了。
3. 最后设置 `.content` 元素 `transform: translate(-50%, -50%);` 将自身左移及上移宽高的一半，这样 `.content` 元素的中心处于 `.main` 元素的中心处，自然就实现了居中效果。
4. 这种方法的好处就是不需要固定 `.content` 元素的宽高。

### Flexbox

实现代码如下：

```css
.main {
    width: 300px;
    height: 300px;
    background-color: #50ba8b;

    /*关键代码*/
    display: flex;
}

.content {
    width: 150px;
    height: 150px;
    background-color: #5b4d4e;

    /*关键代码*/
    margin: auto;
}
```

**实现原理：**

1. 设置 `.main` 元素 `display: flex;`。
2. 然后设置 `.content` 元素为 `margin: auto;` 即可实现居中。
3. 这是毋庸置疑的最佳解决方案，我们不需要设置 `.content` 元素为绝对定位，`margin: auto` 自然就可以作用于宽高，而且我们也不需要设置 `.content` 元素的宽高， 因为Flexbox(伸缩盒)是专门针对这类需求所设计的。
4. 缺点就是目前浏览器支持程度相对其它方式会低些。

Flexbox 的另一个好处在于，它还可以将匿名容器(即没有被标签包裹的文本节点)垂直居中。比如我们不设置 `.main` 元素为 `display: flex;`，而是设置 `.content` 元素为 `display: flex;`，并借助 Flexbox 规范所引入的 align-items 和 justify-content 属性，我们可以让它内部的文本也实现居中（我们可以对`.main` 元素使用相同的属性来使 `.content` 元素元素居中，但比 `margin: auto` 方法要更加优雅一些，并且同时起到了回退的作用）。

```css
.content {
    width: 150px;
    height: 150px;
    background-color: #5b4d4e;

    /*关键代码*/
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
}
```