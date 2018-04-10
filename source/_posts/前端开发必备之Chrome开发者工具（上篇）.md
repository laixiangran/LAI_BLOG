---
title: 前端开发必备之Chrome开发者工具（上篇）
date: 20180-04-10 20:33:02
tags:
- 开发工具
- Chrome DevTools
categories: 开发工具
---

> 本文介绍的 Chrome 开发者工具基于 Chrome 65版本，如果你的 Chrome 开发者工具没有下文提到的那些内容，请检查下 Chrome 的版本

## 简介

Chrome 开发者工具是一套内置于 Google Chrome 中的Web开发和调试工具，可用来对网站进行迭代、调试和分析

打开 Chrome 开发者工具的方式有：

- 在Chrome菜单中选择 更多工具 > 开发者工具

- 在页面元素上右键点击，选择 “检查”

- 使用 快捷键 Ctrl+Shift+I (Windows) 或 Cmd+Opt+I (Mac)。[更多快捷键https://developers.google.com/web/tools/chrome-devtools/shortcuts](https://developers.google.com/web/tools/chrome-devtools/shortcuts)

Chrome 开发者工具主要包含以下10个部分：

![](https://note.youdao.com/yws/api/personal/file/A3507E8156AE42F3B0326A495B226B5A?method=download&shareKey=fb1e25c0af925091ccb34fff8a97b683)

1. 设备模式（device toolbar）
2. 元素面板（Elements）
3. 控制台面板（Console）
4. 源代码面板（Sources）
5. 网络面板（Network）
6. 性能面板（Performance）
7. 内存面板（Memory）
8. 应用面板（Application）
9. 安全面板（Security）
10. 主菜单（Customize and control DevTools）

## 设备模式（device toolbar）

使用 Chrome DevTools 的 Device Mode 打造移动设备优先的完全自适应式网站

**该模式不可替代真实设备测试**

切换 Device Mode 按钮可以打开或关闭 Device Mode

![](https://note.youdao.com/yws/api/personal/file/EDF0931D6DB7423D866BF122F117A639?method=download&shareKey=7688496ec45127c6c8b99fd1f68624c3)

### 选择设备

![](https://note.youdao.com/yws/api/personal/file/FB2A0A3B05BA452DB7EB1C95808F1D45?method=download&shareKey=92c69864753b36347c982806a3b6a67e)

通过该视图控件，你可以设定下面两种模式：

1. **自适应。** 使视口可以通过任意一侧的大手柄随意调整大小
2. **特定设备。** 将视口锁定为特定设备确切的视口大小，并模拟特定设备特性

### 媒体查询

媒体查询是自适应网页设计的基本部分。要查看媒体查询检查器，请在三圆点菜单中点击 Show Media queries。DevTools会在样式表中检测媒体查询，并在顶端标尺中将它们显示为彩色条形

![](https://note.youdao.com/yws/api/personal/file/716BF54BAECF40E1BC4DEF2C56F7B978?method=download&shareKey=c7afb145cdb82602ff3bac62a1f6e3fc)

用彩色标记的媒体查询示例如下：

![](https://note.youdao.com/yws/api/personal/file/94824373E3544D3FA75FF9135FA8BE49?method=download&shareKey=eb20502260c81c624a3ae0dca96c332f)

#### 快速预览媒体查询

点击媒体查询条形，调整视口大小和预览适合目标屏幕大小的样式

#### 查看关联的 CSS

右键点击某个条形，查看媒体查询在 CSS 中何处定义并跳到源代码中的定义

## 元素面板（Elements）

使用元素面板可以自由的操作DOM和CSS来迭代布局和设计页面

### 编辑样式

使用 `Styles` 窗格可以修改与元素关联的 CSS 样式

![](https://note.youdao.com/yws/api/personal/file/53E83C3674354D5494A90A386B6D70AF?method=download&shareKey=07dff0cd2fb67a1c0ed9c7b5ac01c648)

#### 添加、启用和停用 CSS 类

点击 .cls 按钮可以查看与当前选定元素关联的所有 CSS 类。 从这里，您可以执行以下操作：

- 启用或停用当前与元素关联的类
- 向元素添加新类

![](https://note.youdao.com/yws/api/personal/file/D1B7F21966AE4A1883A3F0BC1DF38B9A?method=download&shareKey=17db9dccd10720dce30cafd97a7384e8)

#### 添加或移除动态样式（伪类）

您可以在元素上手动设置动态伪类选择器（例如 :active、:focus、:hover 和 :visited）

可以通过两种方式在元素上设置动态状态：

- 在 Elements 面板内右键点击某个元素，然后从菜单中选择目标伪类，将其启用或停用

![](https://note.youdao.com/yws/api/personal/file/E190B24D4A214F79818056B35EC9CAB2?method=download&shareKey=6678a03492902606d711f925ca93a1d1)

- 在 Elements 面板中选择元素，然后在 Styles 窗格中点击 :hov 按钮，使用复选框启用或停用当前选定元素的选择器

![](https://note.youdao.com/yws/api/personal/file/08E4B3CC1CA84D2AA49402B552B3EF37?method=download&shareKey=ff0fbdc635e9006458f207d3d7f257a1)

#### 快速向样式规则添加背景色或颜色

Styles 窗格提供了一个用于向样式规则快速添加 text-shadow、box-shadow、color 和 background-color 声明的快捷方式

样式规则的右下角有一个由三个点组成的图标。您需要将鼠标悬停到样式规则上才能看到这个图标

![](https://note.youdao.com/yws/api/personal/file/5BA97054797141AA978CB520E010A9D0?method=download&shareKey=3f13bdd3f365f29bce3f2419b6a53aa2)

将鼠标悬停到此图标上可以调出添加 text-shadow、box-shadow、color 和 background-color 声明的快捷方式。

#### 使用 Color Picker 修改颜色

要打开 Color Picker，请在 Styles 窗格中查找一个定义颜色的 CSS 声明（例如 color: blue）。 声明值的左侧有一个带颜色的小正方形。 正方形的颜色与声明值匹配。 点击小正方形可以打开 Color Picker

![](https://note.youdao.com/yws/api/personal/file/A8C2DF5F0B7F485C853A2B9FB9BDDF4D?method=download&shareKey=a59bf457885410291ba06d7ff3a20ffb)

您可以通过多种方式与 Color Picker 交互：

![](https://note.youdao.com/yws/api/personal/file/523DAD97F8B24483973A4FB76521D4FC?method=download&shareKey=f079b4ab7bafb670fa75808fcbcdec75)

1. **取色器。** 通过鼠标悬停到某种颜色上去获取颜色值。
2. **当前颜色。** 当前值的可视表示。
3. **当前值。** 当前颜色的十六进制、RGBA 或 HSL 表示。
4. **调色板。**  当前生成的几组颜色。
5. **着色和阴影选择器。**
6. **色调选择器。**
7. **不透明度选择器。**
8. **颜色值选择器。** 点击可以在 RGBA、HSL 和十六进制之间切换。
9. **调色板选择器。** 点击可以选择不同的模板。

### 编辑 DOM

Elements 面板中的 DOM 树视图可以显示当前网页的 DOM 结构。通过 DOM 更新实时修改页面的内容和结构

#### 隐藏 DOM

两种方式：

- 右键选择某个元素，然后选择 Hide element
- 选中某个元素，然后使用快捷键 H

#### 设置 DOM 断点

设置 DOM 断点以调试复杂的 JavaScript 应用。例如，如果您的 JavaScript 正在更改 DOM 元素的样式，请将 DOM 断点设置为在元素属性修改时触发。在发生以下一种 DOM 更改时触发断点：子树更改、属性更改、节点移除

##### 子树修改

**设置子树修改断点：右键选择某个元素，然后选择 Break on --> subtree modifications**

添加、移除或移动子元素时将触发子树修改断点。例如，如果您在 main-content 元素上设置子树修改，以下代码将触发断点：

```javascript
var element = document.getElementById('main-content');
//modify the element's subtree.
var mySpan = document.createElement('span');
element.appendChild( mySpan );
```

##### 属性修改

**设置属性修改断点：右键选择某个元素，然后选择 Break on --> attribute modifications**

动态更改元素的属性 (class, id, name) 时将发生属性修改：

```javascript
var element = document.getElementById('main-content');
// class attribute of element has been modified.
element.className = 'active';
```

##### 节点移除

**设置节点移除断点：右键选择某个元素，然后选择 Break on --> node removal**

从 DOM 中移除有问题的节点时将触发节点移除修改：

```javascript
document.getElementById('main-content').remove();
```

#### 查看元素事件侦听器

在 Event Listeners 窗格中查看与 DOM 节点关联的 JavaScript 事件侦听器

![](https://note.youdao.com/yws/api/personal/file/9784C48E065A411A85041341BEF879A7?method=download&shareKey=11efaf78e720f0e52304e542af1e621b)

启用 Ancestors 复选框时查看祖先实体事件侦听器，即除了当前选定节点的事件侦听器外，还会显示其祖先实体的事件侦听器

启用 Framework listeners 复选框时查看框架侦听器，DevTools 会自动解析事件代码的框架或内容库封装部分，然后告诉您实际将事件绑定到代码中的位置

## 控制台面板（Console）

在开发期间，可以使用控制台面板记录诊断信息，或者使用它作为 shell 在页面上与 JavaScript 交互

### 消息堆叠

如果一条消息连续重复，而不是在新行上输出每一个消息实例，控制台将“堆叠”消息并在左侧外边距显示一个数字。此数字表示该消息已重复的次数

![](https://note.youdao.com/yws/api/personal/file/514ACB057C6F448E8CF94380FDCEF313?method=download&shareKey=45cb5734bfa539ac34133ef1f453687c)

如果您倾向于为每一个日志使用一个独特的行条目，请在 DevTools 设置中启用 Show timestamps

![](https://note.youdao.com/yws/api/personal/file/AD03280DE3894ABD94DE845804A1E077?method=download&shareKey=70fd7c89a2a987df82e0fadaa47e052f)

由于每一条消息的时间戳均不同，因此，每一条消息都将显示在各自的行上

![](https://note.youdao.com/yws/api/personal/file/333619DF4A2F45EE81532AEFE1797A64?method=download&shareKey=baa501a6dd8f113f613243dd83e2d4b7)

### 选择执行环境

以下屏幕截图中以蓝色突出显示的下拉菜单称为 Execution Context Selector

![](https://note.youdao.com/yws/api/personal/file/7B55FBE6167742ADB8E0E9FA5C336AE8?method=download&shareKey=6e91c61f6de8e96c94f2c938655a209c)

通常，您会看到此环境设置为 top（页面的顶部框架）。

其他框架和扩展程序在其自身的环境中运行。要使用这些其他环境，您需要从下拉菜单中选中它们。 例如，如果您要查看 `<iframe>` 元素的日志输出，并修改该环境中存在的某个变量，您需要从 Execution Context Selector 下拉菜单中选中该元素。

控制台默认设置为 top 环境，除非您通过检查其他环境中的某个元素来访问 DevTools。 例如，如果您检查 `<iframe>` 中的一个 `<p>` 元素，那么，DevTools 将 Execution Context Selector 设置为该 `<iframe>` 的环境。

当您在 top 以外的环境中操作时，DevTools 将 Execution Context Selector 突出显示为红色，如下面的屏幕截图中所示。 这是因为开发者很少需要在 top 以外的任意环境中操作。 输入一个变量，期待返回一个值，只是为了查看该变量是否为 undefined（因为该变量是在不同环境中定义的），这会非常令人困惑

![](https://note.youdao.com/yws/api/personal/file/00A3FA97CED8417EA908D072B7A2A515?method=download&shareKey=752b3aa7d95f84b6ab13b98611d4255e)

## 源代码面板（Sources）

在源代码面板中设置断点来调试 JavaScript ，或者通过Workspaces（工作区）连接本地文件来使用开发者工具的实时编辑器

### 格式化混淆代码

在某些情况下，我们需要对混淆的代码做一定的调试，但这是我们看到的代码是乱成一团，毫无格式可言：

![](https://note.youdao.com/yws/api/personal/file/D64ADB0B9ED940FFA6D7908F7C31F184?method=download&shareKey=491d520e0575f8fcf3d03dee7d867762)

那我们可以点击下方的格式化按钮对代码进行格式化：

![](https://note.youdao.com/yws/api/personal/file/103EFD936A314671B320CB857D2CC91F?method=download&shareKey=5eb272cff672ff0cf9a8119172050019)

### 断点调试

#### 代码行断点

当我们知道需要调试的代码的确切位置的时候，使用代码行断点

DevTools 设置代码行断点：

1. 点击 Sources 选项卡。
2. 打开包含您想要调试的代码行的文件。
3. 找到该代码行。
4. 点击左边的行号，这样一个蓝色图标就显示在行号上，表明该代码行设置好断点了。

![](https://note.youdao.com/yws/api/personal/file/B9691018FD19469EAD6817AF2CD66AA3?method=download&shareKey=a73502c3d57fd2196b5444e90fecdf68)

当然你也可以在代码中使用 debugger 来设置代码行断点，效果和在 DevTools 中设置是一样的：

```javascript
console.log('a');
console.log('b');
debugger;
console.log('c');
```

#### 条件代码行断点

当我们知道需要调试的代码的确切位置且在满足条件下才调试的时候，使用条件代码行断点

设置条件的代码行断点：

1. 点击 Sources 选项卡。
2. 打开包含您想要调试的代码行的文件。
3. 找到该代码行。
4. 右键点击左边的行号。
5. 选择添加条件断点。代码行下面会显示一个对话框。
6. 在对话框中输入你的条件。
7. 按Enter激活断点。行号上出现橙色图标。

![](https://note.youdao.com/yws/api/personal/file/CE50541F35F2435485C192B28CE9CD13?method=download&shareKey=e02a38e00d3970514be5b22eb071f012)

#### DOM更改断点

当您想要更改DOM节点或其子节点的代码时，使用DOM更改断点

设置DOM更改断点：

1. 切换到 Elements 面板。
2. 找到您想设置断点的元素并右键单击该元素。
3. 将鼠标悬停在 Break on 上，然后选择 subtree modifications，attribute modifications或node removal。

![](https://note.youdao.com/yws/api/personal/file/E38D5ADD6B244D5F87E7D1025D34D315?method=download&shareKey=eb47ffc051b5863913638e440471c46b)

#### XHR断点

当XHR的请求URL包含指定字符串时，如果要中断，使用XHR断点

设置XHR断点：

1. 点击 Sources 选项卡。
2. 展开 XHR Breakpoints 窗格。
3. 点击添加断点。
4. 输入你想要打断的字符串。当此字符串出现在XHR的请求URL中的任何位置时，DevTools会暂停。
5. 按Enter确认。

![](https://note.youdao.com/yws/api/personal/file/E4E9CA6609B44D559BF670BAF2E44B89?method=download&shareKey=83c6528bbabfc0abd57d3aff4d65eccf)

#### 事件监听器断点

当想要暂停事件侦听器代码时，使用事件侦听器断点

设置事件监听器断点：

1. 点击 Sources 选项卡。
2. 展开 “Event Listener Breakpoints” 窗格。DevTools显示事件类别的列表，例如动画。
3. 选中这些类别中的一个可以暂停该类别的任何事件，或者展开类别并检查特定事件。

![](https://note.youdao.com/yws/api/personal/file/505ADA0D26674FD5BE5C762F63CA0DC0?method=download&shareKey=748383eaf1e4c8b3e9a3066b9aeca7c0)

#### 异常断点

当您想暂停引发捕获或未捕获异常的代码行时，使用异常断点

设置异常断点：

1. 点击 Sources 选项卡。
2. 点击暂停![](https://note.youdao.com/yws/api/personal/file/DE496F99F3F744D385E57DC113013007?method=download&shareKey=9d7a5c51b49dc4a0cb239991b70a6787)，启用后变成蓝色。
3. （可选）如果除了未捕获的异常外，还想暂停捕获的异常，请选中 “Pause on caught exceptions” 复选框。

![](https://note.youdao.com/yws/api/personal/file/FAE89F85B4F64E558D014D77CEB878AF?method=download&shareKey=2bd08698f74d1844d5e0b03a112be259)

#### 功能断点

调用 debug(functionName) 来给函数 functionName 进行断点调试

```javascript
function sum(a, b) {
  let result = a + b; // DevTools pauses on this line.
  return result;
}
debug(sum); // Pass the function object, not a string.
sum();
```

## 未完待续...

## 参考资料

[https://developers.google.com/web/tools/chrome-devtools/](https://developers.google.com/web/tools/chrome-devtools/)
