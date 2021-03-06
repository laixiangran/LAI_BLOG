---
title: 为什么是link-visited-hover-active
date: 2018-04-06 20:30:30
tags: CSS
categories: CSS
---

## 前言

通常我们在设置链接的一些伪类（`link`，`visited`，`hover`，`active`）样式时，要让不同的状态显示正确的样式，我们需要按一定的顺序设置这些伪类的样式。这里我就按CSS2规范中推荐的顺序进行介绍，即 *link-visited-hover-active*，可记为 `LoVe-HAte` 。

要想弄明白为什么是这个顺序，首先我们需要知道，CSS在确定应当向一个元素应用哪些样式时，这通常不仅需要考虑 *继承*，还要考虑声明的 *特殊性*，另外需要考虑声明本身的来源，这个过程就成为 *层叠*。下面我们分别来看看 `特殊性`、`继承` 和 `层叠` 这3种机制之间的关联。

## 特殊性

在实际的应用中，我们都知道一个元素可以通过多种选择器来进行选择，如ID选择器、类选择器等等，具体可看[CSS选择器详解](http://www.cnblogs.com/laixiangran/p/4966767.html)。由不同选择器组成的选择元素的方式暂且称之为 *规则* 吧。考虑以下3对规则，当然每对规则都选择同样的元素：

    /* 规则1 */
    h1 {
        color: red;
    }
    body h1 {
        color: purple;
    }

    /* 规则2 */
    h2.grape {
        color: purple;
    }
    h2 {
        color: silver;
    }

    /* 规则3 */
    html > body table tr[id="totals"] td ul > li {
        color: maroon;
    }
    li#answer {
        color: navy;
    }

显然，每一对规则中只有一个胜出，因为所匹配的元素只能是某一种颜色。那么怎么知道哪一个规则更强呢？

答案就在于每个选择器的特殊性。通过计算选择器的特殊性值，特殊性最高的规则将会胜出并被利用。 *这里先预留一个问题，如果特殊性相等的两个规则将如何确定应用？后面的`层叠`再介绍。*

### 特殊性值

特殊性值表述为4个部分，如：0,0,0,0。一个选择器的具体特殊性如下确定：

1. 对于选择器中给定的各个ID属性值，加0,1,0,0。
2. 对于选择器中给定的各个类属性值、属性选择或者伪类，加0,0,1,0。
3. 对于选择器中给定的各个元素和伪元素，加0,0,0,1。
4. 结合符和通配选择器 `*` 对特殊性没有任何贡献，加0,0,0,0。
5. 内联样式特殊性为1,0,0,0，因此内联声明的特殊性最高。
6. 标志为 `!important` 的声明并没有特殊的特殊性值，此时该声明为重要声明，超过所有非重要声明。

通过以上的介绍，我们就可以计算出本节刚开始介绍的3组规则的特殊性值及被应用的规则：

    /* 规则1 */
    h1 { /* 0,0,0,1 */
        color: red;
    }
    body h1 { /* 0,0,0,2 （元素应用该规则） */
        color: purple;
    }

    /* 规则2 */
    h2.grape { /* 0,0,1,1 （元素应用该规则） */
        color: purple;
    }
    h2 { /* 0,0,0,1 */
        color: silver;
    }

    /* 规则3 */
    html > body table tr[id="totals"] td ul > li { /* 0,0,1,7 */
        color: maroon;
    }
    li#answer { /* 0,1,0,1 （元素应用该规则） */
        color: navy;
    }

## 继承

基于继承机制，样式不仅应用到指定的元素，还会应用到它的后代元素。下面的例子帮你了解继承是如何工作的：

    // CSS
    ul {
        color: red;
    }

    // html
    <div>
       <ul>
           <li>ul下的第一个li</li>
           <li>ul下的第二个li</li>
           <li>ul下的第三个li</li>
       </ul>
       <ol>
           <li>ol下的第一个li</li>
           <li>ol下的第二个li</li>
           <li>ol下的第三个li</li>
       </ol>
    </div>

**效果：**

<div>
   <ul style="color: red">
       <li>ul下的第一个li</li>
       <li>ul下的第二个li</li>
       <li>ul下的第三个li</li>
   </ul>
   <ol>
       <li>ol下的第一个li</li>
       <li>ol下的第二个li</li>
       <li>ol下的第三个li</li>
   </ol>
</div>

原理就是将声明 `color: red;` 应用到 `ul` 元素时，这个元素会采用该声明。然后将这个值再沿着文档树向下传播到后代元素，并一直继承，直到再没有更多的后代元素继承这个值为止。值绝对不会向上传播，也就是说，元素不会把值向上传递到其祖先。

**重要：继承值是完全没有特殊性的，因此特殊性值为0,0,0,0的特殊性也比其高，说明继承值很容易被其他方式中的声明取代。**

## 层叠

在 `特殊性` 一节中我们预留了一个问题：如果特殊性相等的两个规则将如何确定应用？假设有以下规则：

    h1 {
        color: red;
    }
    h1 {
        color: blue;
    }

哪一个会占上风？这两个规则的特殊性都是0,0,0,1，所以它们的权重相等，都应当应用到元素，但这是不可能的，因为一个元素不可能既是红色又是蓝色（实际是蓝色）。因此这里 `层叠` 就出场了，先看看层叠规则：

![](https://note.youdao.com/yws/api/personal/file/E0F8C6FF24544C41A28766614D421CA6?method=download&shareKey=3bad257a2c909b2b4f495c37bc0c8206)

下面分别介绍规则中后三条规则。

### 按权重和来源排序

根据第二条规则，如果两个样式规则应用到同一个元素，而且其中一个规则有 `!important` 标志，这个重要规则将胜出。

    p {
        color: gray !important;
    }

    <p style="color: black;">Well, <em>hello<em> there!</p>

**效果：**

<p style="color: gray;">Well, hello there!</p>


另外，还要考虑规则的来源。来源权重由大到小的顺序依次为：

1. 读者的重要声明（有 `!important`）
2. 创作人员的重要声明（有 `!important`）
3. 创作人员的正常声明
4. 读者的正常声明
5. 用户代理声明

### 按特殊性排序

根据第三条规则，如果向一个元素应用多个彼此冲突的声明，而且它们的权重相同，则按特殊性排序，最特殊的声明最优先。

    p#bright {
        color: silver;
    }
    p {
        color: black;
    }

    <p id="bright">Well, hello there!</p>

**效果：**

<p style="color: silver;">Well, hello there!</p>

### 按顺序排序

最后，根据第四条规则，如果两个规则的权重、来源和特殊性完全相同，那么在样式表中后出现的一个会胜出。

    h1 {
        color: red;
    }
    h1 {
        color: blue;
    }

    <h1>我是蓝色的标题1</h1>

**效果：**

<h1 style="color: blue">我是蓝色的标题1</h1>

## 链接样式顺序

好了，通过前面的介绍，我想大家应该基本了解CSS是如何确定应当向一个元素应用哪些值的。回到前言说到的链接样式顺序，为了正确的表现所设置的样式，我们必须按一定的顺序进行样式设置。根据CSS2规范中的推荐顺序，即 *link-visited-hover-active*，声明样式如下：

    :link {
        color: blue;
    }
    :visited {
     color: purple;
    }
    :hover {
        color: red;
    }
    :active {
        color: orange;
    }

根据之前的介绍，以上这些选择器的特殊性都是一样的：0,0,1,0。因此他们有相同的权重、来源和特殊性，因此与元素匹配的最后一个选择器才会胜出。

正在 *“点击”* 的 *未访问* 链接可以与其中3个规则匹配 —— `:link`、`:hover`、`:active`，所以按照上面的声明顺序，`:active`将胜出，这可能就是我们所期望的。

假设我们忽略这种常用的顺序，而是按字母顺序排列链接样式，声明样式如下:

        :active {
            color: orange;
        }
        :hover {
            color: red;
        }
        :link {
            color: blue;
        }
        :visited {
         color: purple;
        }

按照这种顺序，任何链接都不会显示 `:hover` 或者 `:active`，因为 `:link` 和 `:visited` 规则后出现。所有链接都必须要么是已访问（`:visited`），要么是未访问（`:link`），所以 `:link` 和 `:visited` 样式总是会覆盖 `:hover` 或者 `:active`。

当然链接样式也可以根据自己的实际需要设定某一种顺序，比如 *link-hover-visited-active* 这样的一个顺序，起到的效果是 **只有未访问的链接会有悬停样式，已访问的链接没有悬停样式**。

 最后，由于可以把伪类链接起来，所以可以不必担心这些问题。以下规则可以任何顺序列出，而不必担心有什么负面影响：

    :link {
        color: blue;
    }
    :visited {
     color: purple;
    }
    :link:hover {
        color: red;
    }
    :visited:hover {
        color: gray;
    }
    :link:active {
        color: orange;
    }
    :visited:active {
        color: silver;
    }

## 结语

通过对链接样式顺序为什么是 *link-visited-hover-active* 的解答，我希望帮助大家能加深了解CSS在确定应当向一个元素应用哪些样式时的一些基本原理。