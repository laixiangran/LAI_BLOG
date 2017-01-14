---
title: 前端开发必备 - Emmet
date: 2016-04-20 20:52:02
tags:
- Emmet
- HTML
categories: HTML
---

# 介绍

![Emmet](http://www.laixiangran.cn/images/Emmet.jpg)

Emmet (前身为 Zen Coding) 是一个能大幅度提高前端开发效率的一个工具。

基本上，大多数的文本编辑器都会允许你存储和重用一些代码块，我们称之为“片段”。虽然片段能很好地推动你得生产力，但大多数的实现都有这样一个缺点：你必须先定义你得代码片段，并且不能再运行时进行拓展。

Emmet把片段这个概念提高到了一个新的层次：你可以设置CSS形式的能够动态被解析的表达式，然后根据你所输入的缩写来得到相应的内容。Emmet是很成熟的并且非常适用于编写HTML/XML 和 CSS 代码的前端开发人员，但也可以用于编程语言。

# 示例

在编辑器中输入缩写代码`ul>li*5`，然后按下拓展键（默认为`tab`），即可得到代码片段：

```html
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

# 下载和安装

## 编辑器插件

以下都是Emmet为编辑器提供的安装插件。

 [Sublime Text](https://github.com/sergeche/emmet-sublime#readme)
 
 [Eclipse/Aptana](https://github.com/emmetio/emmet-eclipse#readme)
 
 [TextMate](https://github.com/emmetio/Emmet.tmplugin#readme)
 
 [Coda](https://github.com/emmetio/Emmet.codaplugin#readme)
 
 [Espresso](https://github.com/emmetio/Emmet.sugar#readmee)
 
 [Chocolat](https://github.com/sergeche/emmet.chocmixin#readme)
 
 [Komodo Edit](http://community.activestate.com/xpi/zen-coding)
 
 [Notepad++](https://github.com/emmetio/npp#readme)
 
 [PSPad](https://github.com/emmetio/pspad)
 
 [textarea](https://github.com/emmetio/textarea)
 
 [CodeMirror](https://github.com/emmetio/codemirror#readme)
 
 [Brackets](https://github.com/emmetio/brackets-emmet#readme)
 
 [NetBeans](https://github.com/emmetio/netbeans#readme)
 
 [Adobe Dreamweaver](https://github.com/emmetio/dreamweaver#readme)

## 在线编辑器的支持：

 [JSFiddle](http://jsfiddle.net/)
 
 [JS Bin](http://jsbin.com/)
 
 [CodePen](http://codepen.io/)
 
 [ICEcoder](http://icecoder.net/)
 
 [Divshot](http://www.divshot.com/)
 
 [Codio](http://codio.com/)
 
## 第三方插件的支持

下面这些编辑器的插件都是由第三方开发者所提供的，所以可能并不支持所有Emmet的功能和特性。

 [SynWrite](http://www.uvviewsoft.com/synwrite/)
 
 [WebStorm](http://www.jetbrains.com/webstorm/)
 
 [PhpStorm](http://www.jetbrains.com/phpstorm/)
 
 [Vim](https://github.com/mattn/emmet-vim)
 
 [HTML-Kit](http://www.htmlkit.com/)
 
 [HippoEDIT](http://wiki.hippoedit.com/plugins/emmet)
 
 [CodeLobster PHP Edition](http://www.codelobster.com/)
 
 [TinyMCE](https://github.com/e-sites/tinymce-emmet-plugin#readme)

# 语法

## 后代：`>`

`nav>ul>li`

```html
<nav>
    <ul>
        <li></li>
    </ul>
</nav>
```

## 兄弟：`+`

`div+p+bq`

```html
<div></div>
<p></p>
<blockquote></blockquote>
```

## 上级：`^`

`div+div>p>span+em^bq`

```html
<div></div>
<div>
    <p><span></span><em></em></p>
    <blockquote></blockquote>
</div>
```

`div+div>p>span+em^^bq`

```html
<div></div>
<div>
    <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
```

## 分组：`()`

`div>(header>ul>li*2>a)+footer>p`

```html
<div>
    <header>
        <ul>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </header>
    <footer>
        <p></p>
    </footer>
</div>
```

`(div>dl>(dt+dd)*3)+footer>p`

```html
<div>
    <dl>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
    </dl>
</div>
<footer>
    <p></p>
</footer>
```

## 乘法：`*`

`ul>li*5`

```html
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

##自增符号：`$`

`ul>li.item$*5`

```html
<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
</ul>
```

`h$[title=item$]{Header $}*3`

```html
<h1 title="item1">Header 1</h1>
<h2 title="item2">Header 2</h2>
<h3 title="item3">Header 3</h3>
```

`ul>li.item$$$*5`

```html
<ul>
    <li class="item001"></li>
    <li class="item002"></li>
    <li class="item003"></li>
    <li class="item004"></li>
    <li class="item005"></li>
</ul>
```

`ul>li.item$@-*5`

```html
<ul>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
    <li class="item2"></li>
    <li class="item1"></li>
</ul>
```

`ul>li.item$@3*5`

```html
<ul>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
    <li class="item6"></li>
    <li class="item7"></li>
</ul>
```

## ID和类属性

`#header`

```html
<div id="header"></div>
```

`.title`

```html
<div class="title"></div>
```

`form#search.wide`

```html
<form id="search" class="wide"></form>
```

`p.class1.class2.class3`

```html
<p class="class1 class2 class3"></p>
```

## 自定义属性

`p[title="Hello world"]`

```html
<p title="Hello world"></p>
```

`td[rowspan=2 colspan=3 title]`

```html
<td rowspan="2" colspan="3" title=""></td>
```

`[a='value1' b="value2"]`

```html
<div a="value1" b="value2"></div>
```

## 文本：`{}`

`a{Click me}`

```html
<a href="">Click me</a>
```

`p>{Click }+a{here}+{ to continue}`

```html
<p>Click <a href="">here</a> to continue</p>
```

## 隐式标签

`.class`

```html
<div class="class"></div>
```

`em>.class`

```html
<em><span class="class"></span></em>
```

`ul>.class`

```html
<ul>
    <li class="class"></li>
</ul>
```

`table>.row>.col`

```html
<table>
    <tr class="row">
        <td class="col"></td>
    </tr>
</table>
```

## HTML

所有未知的缩写都会转换成标签，例如，foo → <foo></foo>

`!`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
</body>
</html>
```

`a`

```html
<a href=""></a>
```

`a:link`

```html
<a href="http://"></a>
```

`a:mail`

```html
<a href="mailto:"></a>
```

`abbr`

```html
<abbr title=""></abbr>
```

`acronym`

```html
<acronym title=""></acronym>
```

`base`

```html
<base href="" />
```

`basefont`

```html
<basefont />
```

`br`

```html
<br />
```

`frame`

```html
<frame />
```

`hr`

```html
<hr />
```

`bdo`

```html
<bdo dir=""></bdo>
```

`bdo:r`

```html
<bdo dir="rtl"></bdo>
```

`bdo:l`

```html
<bdo dir="ltr"></bdo>
```

`col`

```html
<col />
```

`link`

```html
<link rel="stylesheet" href="" />
```

`link:css`

```html
<link rel="stylesheet" href="style.css" />
```

`link:print`

```html
<link rel="stylesheet" href="print.css" media="print" />
```

`link:favicon`

```html
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
```

`link:touch`

```html
<link rel="apple-touch-icon" href="favicon.png" />
```

`link:rss`

```html
<link rel="alternate" type="application/rss+xml" title="RSS" href="rss.xml" />
```

`link:atom`

```html
<link rel="alternate" type="application/atom+xml" title="Atom" href="atom.xml" />
```

`meta`

```html
<meta />
```

`meta:utf`

```html
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
```

`meta:win`

```html
<meta http-equiv="Content-Type" content="text/html;charset=windows-1251" />
```

`meta:vp`

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
```

`meta:compat`

```html
<meta http-equiv="X-UA-Compatible" content="IE=7" />
```

`style`

```html
<style></style>
```

`script`

```html
<script></script>
```

`script:src`

```html
<script src=""></script>
```

`img`

```html
<img src="" alt="" />
```

`iframe`

```html
<iframe src="" frameborder="0"></iframe>
```

`embed`

```html
<embed src="" type="" />
```

`object`

```html
<object data="" type=""></object>
```

`param`

```html
<param name="" value="" />
```

`map`

```html
<map name=""></map>
```

`area`

```html
<area shape="" coords="" href="" alt="" />
```

`area:d`

```html
<area shape="default" href="" alt="" />
```

`area:c`

```html
<area shape="circle" coords="" href="" alt="" />
```

`area:r`

```html
<area shape="rect" coords="" href="" alt="" />
```

`area:p`

```html
<area shape="poly" coords="" href="" alt="" />
```

`form`

```html
<form action=""></form>
```

`form:get`

```html
<form action="" method="get"></form>
```

`form:post`

```html
<form action="" method="post"></form>
```

`label`

```html
<label for=""></label>
```

`input`

```html
<input type="text" />
```

`input:text` `input:t` `inp`

```html
<input type="text" name="" id="" />
```

`input:hidden` `input:h` `input[type=hidden name]`

```html
<input type="hidden" name="" />
```

`input:search` `inp[type=search]`

```html
<input type="search" name="" id="" />
```

`input:email` `inp[type=email]`

```html
<input type="email" name="" id="" />
```

`input:url` `inp[type=url]`

```html
<input type="url" name="" id="" />
```

`input:password` `input:p` `inp[type=password]`

```html
<input type="password" name="" id="" />
```

`input:datetime` `inp[type=datetime]`

```html
<input type="datetime" name="" id="" />
```

`input:date` `inp[type=date]`

```html
<input type="date" name="" id="" />
```

`input:datetime-local` `inp[type=datetime-local]`

```html
<input type="datetime-local" name="" id="" />
```

`input:month` `inp[type=month]`

```html
<input type="month" name="" id="" />
```

`input:week` `inp[type=week]`

```html
<input type="week" name="" id="" />
```

`input:time` `inp[type=time]`

```html
<input type="time" name="" id="" />
```

`input:number` `inp[type=number]`

```html
<input type="number" name="" id="" />
```

`input:color` `inp[type=color]`

```html
<input type="color" name="" id="" />
```

`input:checkbox` `input:c` `inp[type=checkbox]`

```html
<input type="checkbox" name="" id="" />
```

`input:radio` `input:r` `inp[type=radio]`

```html
<input type="radio" name="" id="" />
```

`input:range` `inp[type=range]`

```html
<input type="range" name="" id="" />
```

`input:file` `input:f` `inp[type=file]`

```html
<input type="file" name="" id="" />
```

`input:submit` `input:s`

```html
<input type="submit" value="" />
```

`input:image` `input:i`

```html
<input type="image" src="" alt="" />
```

`input:button` `input:b`

```html
<input type="button" value="" />
```

`input:reset` `input:button[type=reset]`

```html
<input type="reset" value="" />
```

`select`

```html
<select name="" id=""></select>
```

`option`

```html
<option value=""></option>
```

`textarea`

```html
<textarea name="" id="" cols="30" rows="10"></textarea>
```

`menu:context` `menu:c` `menu[type=context]`

```html
<menu type="context"></menu>
```

`menu:toolbar` `menu:t` `menu[type=toolbar]`

```html
<menu type="toolbar"></menu>
```

`video`

```html
<video src=""></video>
```

`audio`

```html
<audio src=""></audio>
```

`html:xml`

```html
<html xmlns="http://www.w3.org/1999/xhtml"></html>
```

`keygen`

```html
<keygen />
```

`command`

```html
<command />
```

`bq` `blockquote`

```html
<blockquote></blockquote>
```

`acr` `acronym`

```html
<acronym title=""></acronym>
```

`fig` `figure`

```html
<figure></figure>
```

`figc` `figcaption`

```html
<figcaption></figcaption>
```

`ifr` `iframe`

```html
<iframe src="" frameborder="0"></iframe>
```

`emb` `embed`

```html
<embed src="" type="" />
```

`obj` `object`

```html
<object data="" type=""></object>
```

`src` `source`

```html
<source></source>
```

`cap` `caption`

```html
<caption></caption>
```

`colg` `colgroup`

```html
<colgroup></colgroup>
```

`fst` `fset` `fieldset`

```html
<fieldset></fieldset>
```

`btn` `button`

```html
<button></button>
```

`btn:b` `button[type=button]`

```html
<button type="button"></button>
```

`btn:r` `button[type=reset]`

```html
<button type="reset"></button>
```

`btn:s` `button[type=submit]`

```html
<button type="submit"></button>
```

# 最后

关于更多的HTML以及CSS的缩写请查看：[官网文档](http://docs.emmet.io/cheat-sheet/)