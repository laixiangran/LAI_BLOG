---
title: 不同场景下使用CSS隐藏元素
date: 2018-05-09 21:00:00
tags: CSS
categories: CSS
---

使用 CSS 让元素不可见的方法很多，剪裁、定位到屏幕外、明度变化等都是可以的。虽然它们都是肉眼不可见，但背后却在多个维度上都有差别。

##### 元素不可见，同时不占据空间、辅助设备无法访问、不渲染

使用 script 标签隐。例如：

```html
<script type="text/html">
    <img src="1.jpg">
</script>
```

此时，图片 1.jpg 是不会有请求的。`<script>` 标签是不支持嵌套的，因此，如果希望在 `<script>` 标签中再放置其他不渲染的模板内容，可以试试使用 `<textarea>` 元素。例如：

```html
<script type="text/html">
    <img src="1.jpg">
    <textarea style="display: none;">
        <img src="2.jpg">
    </textarea>
</script>
```

同样 2.jpg 也是不会有请求的。
另外，`<script>` 标签隐藏内容获取使用 `script.innerHTML`，`<textarea>` 使用 `textarea.value`。

##### 元素不可见，同时不占据空间、辅助设备无法访问，但资源有加载，DOM 可访问

使用 `display: none` 隐藏。例如：

```css
.dn {
    display: none;
}
```

##### 元素不可见，同时不占据空间、辅助设备无法访问，但显隐的时候可以有 `transition` 淡入淡出效果

使用 `position: absolute` 和 `visibility: hidden;` 隐藏。例如：

```css
.hidden {
    position: absolute;
    visibility: hidden;
}
```

##### 元素不可见，不能点击、辅助设备无法访问，但占据空间保留

使用 `visibility: hidden;` 隐藏。例如：

```css
.hn {
    visibility: hidden;
}
```

##### 元素不可见，不能点击、不占据空间，但键盘可访问

使用 `clip` 裁剪 或者 `relative` 隐藏。例如：

```css
.clip {
    position: absolute;
    clip: rect(0, 0, 0, 0)
}

.out {
    position: relative;
    left: -999em;
}
```

##### 元素不可见，不能点击、但占据空间、键盘可访问

使用 `relative` 和 `z-index` 隐藏。例如，如果条件允许，也就是和层叠上下文之间存在设置了背景色的父元素，则也可以使用更友好的 `z-index` 负值隐藏。例如：

```css
.lower {
    position: relative;
    z-index: -1;
}
```

##### 元素不可见，可以点击、不占据空间

使用透明度隐藏。例如：

```css
.lower {
    position: relative;
    opacity: 0;
    filter: Alpha(opacity=0);
}
```

##### 元素不可见，可以点击、可以选择、占据空间

使用透明度隐藏。例如：

```css
.lower {
    opacity: 0;
    filter: Alpha(opacity=0);
}
```

**大家可以通过实际的隐藏场景选择合适的隐藏方法。**

**实际开发场景千变万化，可能还有更多的隐藏方法，也欢迎大家积极留言探讨。**

> 摘自：《CSS世界》第10章 元素的显示与隐藏