---
title: CSS3实现多种背景效果
date: 2018-05-27 19:30:00
tags: CSS
categories: CSS
---

## 灵活的背景定位

**实现效果：**

将背景图定位到距离容器底边 10px 且距离右边 20px 的位置。

![](https://note.youdao.com/yws/api/personal/file/D01C512036A544BA9AD9189C91D629AB?method=download&shareKey=ee6c10554b504b741bd6a783a92cc9ba)

**background-position 方案**

**实现代码：**

```html
<div>海盗密码</div>
```

```css
div {
    /* 关键样式 */
	background: url(http://csssecrets.io/images/code-pirate.svg)
	            no-repeat bottom right #58a;
	background-position: right 20px bottom 10px;

	/* 其它样式 */
	max-width: 10em;
	min-height: 5em;
	padding: 10px;
	color: white;
	font: 100%/1 sans-serif;
}
```

**实现要点：**

- `background-position` 允许我们指定背景图片距离任意角的偏移量，只要我们在偏移量前面指定关键字。本例就是设置背景图片离右边缘 20px，离底边 10px。
- 为了兼容不支持 `background-position` 这种语法的浏览器，提供一个合适的回退方案，那就是使用 `background` 的 `bottom right` 来定位，虽然不能设置具体的偏移量。

**background-origin 方案**

**实现代码：**

```html
<div>海盗密码</div>
```

```css
div {
    /* 关键样式 */
	background: url(http://csssecrets.io/images/code-pirate.svg)
	            no-repeat bottom right #58a;
	background-origin: content-box;
	padding: 10px 20px;

	/* 其它样式 */
	max-width: 10em;
	min-height: 5em;
	color: white;
	font: 100%/1 sans-serif;
}
```

**实现要点：**

- `background-origin` 默认值是 `padding-box`，也就说我们设置 `background` 为 `top left` 时左上角是 padding box（内边距的外沿框）的左上角。
- 在本例中设置 `background-origin` 为 `content-box`，那么就相对于 content box（内容区的外沿框）的左上角，那么也就是背景图离容器的右边和底边的偏移量是跟着容器的 padding 值走了，那设置 `padding: 10px 20px;` 自然就可以实现本例的效果了。

**calc() 方案**

**实现代码：**

```html
<div>海盗密码</div>
```

```css
div {
    /* 关键样式 */
	background: url(http://csssecrets.io/images/code-pirate.svg)
	            no-repeat bottom right #58a;
	background-position: calc(100% - 20px) calc(100% - 10px);

	/* 其它样式 */
	max-width: 10em;
	min-height: 5em;
	padding: 10px;
	color: white;
	font: 100%/1 sans-serif;
}
```

**实现要点：**

- 使用 `calc` 来动态计算使得背景图的左上角水平偏移 `100% - 20px`，垂直偏移 `100% - 10px`。

## 条纹背景

**水平条纹**

**实现效果：**

![](https://note.youdao.com/yws/api/personal/file/D2319CE7251746F682F7ABDBD50A137A?method=download&shareKey=ee6c10554b504b741bd6a783a92cc9ba)

**实现代码：**

```html
<div></div>
```

```css
div {
    /* 关键样式 */
	background: linear-gradient(#fb3 50%, #58a 0);
    background-size: 100% 30px;

	/* 其它样式 */
	width: 300px;
	height: 200px;
}
```

**实现要点：**

- 通过 `linear-gradient(#fb3 50%, #58a 0)` 生成一个背景图，该背景图分为上下不同实色的两部分，占满容器大小。
- 然后通过 `background-size：100% 30px;` 设置该背景图的宽高（宽为容器宽度，高为30px），由于默认情况下背景是重复平铺的，这样整个容器就铺满高为 30px 的双色水平条纹。

**垂直条纹**

**实现效果：**

![](https://note.youdao.com/yws/api/personal/file/43A0BCBCABCF4B299254512D09A69A84?method=download&shareKey=ee6c10554b504b741bd6a783a92cc9ba)

**实现代码：**

```html
<div></div>
```

```css
div {
    /* 关键样式 */
	background: linear-gradient(to right, #fb3 50%, #58a 0);
    background-size: 30px 100%;

	/* 其它样式 */
	width: 300px;
	height: 200px;
}
```

**实现要点：**

- 通过 `linear-gradient(to right, #fb3 50%, #58a 0)` 生成一个背景图，该背景图分为左右不同实色的两部分（`to right` 改变渐变的方向，从上下该为左右），占满容器大小。
- 然后通过 `background-size：30px 100%;` 设置该背景图的宽高（宽为 30px，高为容器高度），由于默认情况下背景是重复平铺的，这样整个容器就铺满宽为 30px 的双色水平垂直条纹。

**斜向条纹**

**实现效果：**

![](https://note.youdao.com/yws/api/personal/file/7AA3A4ADC3BE4A769AED2266D60225C2?method=download&shareKey=ee6c10554b504b741bd6a783a92cc9ba)

**实现代码：**

```html
<div></div>
```

```css
div {
    /* 关键样式 */
	background: linear-gradient(45deg,
              #fb3 25%, #58a 0, #58a 50%,
              #fb3 0, #fb3 75%, #58a 0);
    background-size: 42.4px 42.4px;

	/* 其它样式 */
	width: 300px;
	height: 200px;
}
```

**实现要点：**

- 通过 `linear-gradient(45deg, #fb3 25%, #58a 0, #58a 50%,#fb3 0, #fb3 75%, #58a 0)` 生成一个如下图的可重复铺设的背景图（重点是修改渐变方向为 45 度，四条条纹）。

![](https://note.youdao.com/yws/api/personal/file/4894B8253C4E4C8B9A88361F051400DA?method=download&shareKey=ee6c10554b504b741bd6a783a92cc9ba)

- 然后通过 `background-size: 42.4px 42.4px;` 设置背景尺寸。`42.4px` 是通过勾股定理求得（在我们的斜向条纹中，背景尺寸指定的是直角三角形的斜边长度，但条纹的宽度实际上是直角三角形的高，所以要让条纹宽度为 15px，就必须近似设置背景尺寸为 42.4px）。

**可灵活设置角度的斜向条纹**

**实现效果：**

![](https://note.youdao.com/yws/api/personal/file/7AA3A4ADC3BE4A769AED2266D60225C2?method=download&shareKey=ee6c10554b504b741bd6a783a92cc9ba)

**实现代码：**

```html
<div></div>
```

```css
div {
    /* 关键样式 */
	background: repeating-linear-gradient(60deg,
              #fb3, #fb3 15px,
              #58a 0, #58a 30px);

	/* 其它样式 */
	width: 300px;
	height: 200px;
}
```

**实现要点：**

- `repeating-linear-gradient` 生成色标是无限循环重复的，直到填满整个背景。不需要通过 `background-size` 设置背景尺寸，而且也不用考虑斜边的问题，因为在渐变轴设置的长度就是条纹的宽度。最重要的一点是可以灵活设置任意角度的条纹，只要修改一处角度就可以。

## 复杂的背景图案

**网格**

**实现效果：**

![](https://note.youdao.com/yws/api/personal/file/8004C57452B0447FBE5889FF4826C25C?method=download&shareKey=ee6c10554b504b741bd6a783a92cc9ba)

**实现代码：**

```html
<div></div>
```

```css
div {
    /* 关键样式 */
    background: #58a;
    background-image: linear-gradient(white 2px, transparent 0),
                    linear-gradient(90deg, white 2px, transparent 0),
                    linear-gradient(hsla(0,0%,100%,.3) 1px, transparent 0),
                    linear-gradient(90deg, hsla(0,0%,100%,.3) 1px, transparent 0);
    background-size: 50px 50px, 50px 50px,
                    10px 10px, 10px 10px;

	/* 其它样式 */
	width: 300px;
	height: 200px;
}
```

**实现要点：**

- 没有特殊的，看代码吧。

**波点**

**实现效果：**

![](https://note.youdao.com/yws/api/personal/file/00F9FF37C3634BC0881F8E43B6453113?method=download&shareKey=ee6c10554b504b741bd6a783a92cc9ba)

**实现代码：**

```html
<div></div>
```

```css
div {
    /* 关键样式 */
    background: #655;
    background-image: radial-gradient(tan 20%, transparent 0),
                      radial-gradient(tan 20%, transparent 0);
    background-size: 30px 30px;
    background-position: 0 0, 15px 15px;

	/* 其它样式 */
	width: 300px;
	height: 200px;
}
```

**实现要点：**

- 使用径向渐变 `radial-gradient` 来创建圆形、椭圆，或者它们的一部分。本例使用它实现圆点的阵列。
- 然后生成两层错开的圆点阵列错开叠加到一起，这样就实现波点图案效果了。

**棋盘**

**实现效果：**

![](https://note.youdao.com/yws/api/personal/file/E74A470B70054080AF4965716B84FDA8?method=download&shareKey=ee6c10554b504b741bd6a783a92cc9ba)

**实现代码：**

```html
<div></div>
```

```css
div {
    /* 关键样式 */
    background: #eee;
    background-image:
    	linear-gradient(45deg, rgba(0,0,0,.25) 25%, transparent 0, transparent 75%, rgba(0,0,0,.25) 0),
    	linear-gradient(45deg, rgba(0,0,0,.25) 25%, transparent 0, transparent 75%, rgba(0,0,0,.25) 0);
    background-position: 0 0, 15px 15px;
    background-size: 30px 30px;

	/* 其它样式 */
	width: 300px;
	height: 200px;
}
```

## 伪随机背景

**实现效果：**

重复平铺的几何图案很美观，但看起来可能有一些呆板。其实自然界中的事物都不是以无限平铺的方式存在的。即使重复，也往往伴随着多样性和随机性。因此为了更自然一些，我们可能需要实现的背景随机一些，这样就显得自然一点。

![](https://note.youdao.com/yws/api/personal/file/2C1034E6878043ABA73447A6EDCE6DC1?method=download&shareKey=ee6c10554b504b741bd6a783a92cc9ba)

**实现代码：**

```html
<div></div>
```

```css
div {
    /* 关键样式 */
    background: hsl(20, 40%, 90%);
    background-image:
    	linear-gradient(90deg, #fb3 11px, transparent 0),
    	linear-gradient(90deg, #ab4 23px, transparent 0),
    	linear-gradient(90deg, #655 23px, transparent 0);
    background-size: 83px 100%, 61px 100%, 41px 100%;

	/* 其它样式 */
	width: 300px;
	height: 200px;
}
```
**实现要点：**

- 为了使得背景的重复性小一些，每组的条纹宽度都是质数。

> 摘自：《CSS揭秘》 第 2 章 背景与边框