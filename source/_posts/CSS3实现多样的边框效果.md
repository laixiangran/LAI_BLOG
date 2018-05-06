---
title: CSS3实现多样的边框效果
date: 2018-05-06 21:27:30
tags: CSS
categories: CSS
---

## 半透明边框

**实现效果：**

![](https://note.youdao.com/yws/api/personal/file/5ABB2565211A4895A86A790D1BAF6E8F?method=download&shareKey=adf96734e2f24ee661986322fb29f6a0)

**实现代码：**

```html
<div>
你能看到半透明的边框吗？
</div>
```

```css
div {

	/* 关键代码 */
	border: 10px solid rgba(255,255,255,.5);
	background: white;
	background-clip: padding-box;

	/* 其它样式 */
	max-width: 20em;
	padding: 2em;
	margin: 2em auto 0;
	font: 100%/1.5 sans-serif;
}
```

**实现要点：**

- 设置边框为半透明，这是还看不到半透明边框，因为默认情况下，背景会延伸到边框所在的区域下层，也就是背景是被边框的外沿框裁切掉。
- 通过设置 `background-clip: padding-box` （初始值是 border-box） 让背景不要延伸到边框所在的区域下层，也就是让内边距的外沿来裁切背景。

## 多重边框

**实现效果：**

![](https://note.youdao.com/yws/api/personal/file/AF4ECF0A693F42D1AFEEDA7DC9F2EC03?method=download&shareKey=adf96734e2f24ee661986322fb29f6a0)

**实现代码：**

```html
<div></div>
```

```css
/* box-shadow 实现方案 */
div {

	/* 关键代码 */
	box-shadow: 0 0 0 10px #655,
            0 0 0 15px deeppink,
            0 2px 5px 15px rgba(0,0,0,.6);

	/* 其它样式 */
	width: 100px;
	height: 60px;
	margin: 25px;
	background: yellowgreen;
}

/* border/outline 实现方案 */
div {

	/* 关键代码 */
	border: 10px solid #655;
	outline: 5px solid deeppink;

	/* 其它样式 */
	width: 100px;
	height: 60px;
	margin: 25px;
	background: yellowgreen;
}
```

**实现要点：**

- `box-shadow` 实现方案使用的是 box-shadow 的第四个参数（扩张半径）。一个正值的扩张半径加上两个为零的偏移量以及为零的模糊值，得到的“投影”其实就像一道实线边框。而借助 box-shadow 支持逗号分割语法，可创建任意数量的投影，因此我们就可实现多重边框效果。
- `border/outline` 实现方案是使用 border 设置一层边框，再使用 outline 设置一层边框。这个方案可实现虚线边框，但它只能实现两层边框。

## 边框内圆角

**实现效果：**

![](https://note.youdao.com/yws/api/personal/file/893643A1DAEB481186D5BB2BDD705D52?method=download&shareKey=adf96734e2f24ee661986322fb29f6a0)

**实现代码：**

```html
<div>我有一个漂亮的内圆角</div>
```

```css
div {
	outline: .6em solid #655;
	box-shadow: 0 0 0 .4em #655; /* 关键代码 */

	max-width: 10em;
	border-radius: .8em;
	padding: 1em;
	margin: 1em;
	background: tan;
	font: 100%/1.5 sans-serif;
}
```

**实现要点：**

- outline 不会跟着元素的圆角走（因而显示出直角），但 box-shadow 确实会的，因此，将两者叠加到一起，box-shadow（其扩张值大概等于 border-radius 值的一半） 会刚好填补 outline 和容器圆角之间的空隙，因此可达到我们想要的效果。