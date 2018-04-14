---
title: 前端开发必备之Chrome开发者工具（下篇）
date: 20180-04-14 19:18:02
tags:
- 开发工具
- Chrome DevTools
categories: 开发工具
---

> 本文介绍的 Chrome 开发者工具基于 Chrome 65版本，如果你的 Chrome 开发者工具没有下文提到的那些内容，请检查下 Chrome 的版本

本文是 [前端开发必备之Chrome开发者工具（上篇）](http://www.cnblogs.com/laixiangran/p/8777579.html) 的下篇，废话不多说，直接开始介绍。

## 网络面板（Network）

网络面板记录页面上每个网络操作的相关信息，包括详细的耗时数据、HTTP 请求与响应标头和 Cookie等等。

### 捕捉屏幕截图

**Network** 面板可以在页面加载期间捕捉屏幕截图。此功能称为幻灯片。

点击 **摄影机** 图标可以启用幻灯片。图标为灰色时，幻灯片处于停用状态 (![](https://note.youdao.com/yws/api/personal/file/E23C96D9BD2A49D5B809F5CF4F6AD813?method=download&shareKey=cb35067568c854b1179977148689e8bb))。如果图标为蓝色，则说明已启用 (![](https://note.youdao.com/yws/api/personal/file/97185036D5CF4047878E19786309B781?method=download&shareKey=cb35067568c854b1179977148689e8bb))。

重新加载页面可以捕捉屏幕截图。屏幕截图显示在概览上方。

![](https://note.youdao.com/yws/api/personal/file/01F6CF568B344CA1A863956C98492E87?method=download&shareKey=cb35067568c854b1179977148689e8bb)

将鼠标悬停在一个屏幕截图上时，**Timeline**将显示一条黄色竖线，指示帧的捕捉时间。

![](https://note.youdao.com/yws/api/personal/file/06905FB304944D08BD0AD0B0600AF970?method=download&shareKey=cb35067568c854b1179977148689e8bb)

双击屏幕截图可查看放大版本。在屏幕截图处于放大状态时，使用键盘的向左和向右箭头可以在屏幕截图之间导航。

![](https://note.youdao.com/yws/api/personal/file/218DFAEBC01B4EC5929541042F5B45A5?method=download&shareKey=cb35067568c854b1179977148689e8bb)

### 查看 DOMContentLoaded 和 load 事件信息

**Network** 面板突出显示两种事件：`DOMContentLoaded` 和 `load`。

解析页面的初始标记时会触发 `DOMContentLoaded`。 此事件将在 **Network** 面板上的两个地方显示：

1. **Overview** 窗格中的蓝色竖线表示事件。
2. 在 **Summary** 窗格中，您可以看到事件的确切时间。

![](https://note.youdao.com/yws/api/personal/file/C04EFD1D572D4D5D8D9F9B555FFC80EA?method=download&shareKey=cb35067568c854b1179977148689e8bb)

页面完全加载时将触发 `load`。此事件显示在三个地方：

1. **Overview** 窗格中的红色竖线表示事件。
2. **Requests Table** 中的红色竖线也表示事件。
3. 在 **Summary** 窗格中，您可以看到事件的确切时间。

![](https://note.youdao.com/yws/api/personal/file/7E4B6AACA7A0460EAF05ABD8999B2544?method=download&shareKey=cb35067568c854b1179977148689e8bb)

### 导航时保留网络日志

默认情况下，每当您重新加载当前页面或者加载不同的页面时，网络活动记录会被丢弃。启用 Preserve log 复选框可以在这些情况下保存网络日志。 新记录将附加到 Requests Table 的底部。

![](https://note.youdao.com/yws/api/personal/file/BA65D18BBC014D97BFCB04C69CF4FD9A?method=download&shareKey=cb35067568c854b1179977148689e8bb)

### 查看网络耗时

要查看 Network 面板中给定条目完整的耗时信息，您有三种选择。

1. 将鼠标悬停到 Timeline 列下的耗时图表上。这将呈现一个显示完整耗时数据的弹出窗口。
2. 点击任何条目并打开该条目的 Timing 标签。
3. 使用 Resource Timing API 从 JavaScript 检索原始数据。

![](https://note.youdao.com/yws/api/personal/file/D7C30C8E8BAC448D9B6DC3BC0737967A?method=download&shareKey=cb35067568c854b1179977148689e8bb)

下面的代码可以在 DevTools 的 Console 中运行。 它将使用 Network Timing API 检索所有资源。 然后，它将通过查找是否存在名称中包含“style.css”的条目对条目进行过滤。 如果找到，将返回相应条目。

```javascript
performance.getEntriesByType('resource').filter(item => item.name.includes("style.css"))
```

![](https://note.youdao.com/yws/api/personal/file/98C1C431D1444AB09C15FDE0015C34B6?method=download&shareKey=cb35067568c854b1179977148689e8bb)

#### Queuing

如果某个请求正在排队，则指示：

- 请求已被渲染引擎推迟，因为该请求的优先级被视为低于关键资源（例如脚本/样式）的优先级。 图像经常发生这种情况。
- 请求已被暂停，以等待将要释放的不可用 TCP 套接字。
- 请求已被暂停，因为在 HTTP 1 上，浏览器仅允许每个源拥有六个 TCP 连接。
- 生成磁盘缓存条目所用的时间（通常非常迅速）

#### Stalled/Blocking

请求等待发送所用的时间。 可以是等待 Queueing 中介绍的任何一个原因。 此外，此时间包含代理协商所用的任何时间。

#### Proxy Negotiation

与代理服务器连接协商所用的时间。

#### DNS Lookup

执行 DNS 查询所用的时间。 页面上的每一个新域都需要完整的往返才能执行 DNS 查询。

#### Initial Connection / Connecting

建立连接所用的时间，包括 TCP 握手/重试和协商 SSL 的时间。

#### SSL

完成 SSL 握手所用的时间。

#### Request Sent / Sending

发出网络请求所用的时间。 通常不到一毫秒。

#### Waiting (TTFB)

等待初始响应所用的时间，也称为至第一字节的时间。 此时间将捕捉到服务器往返的延迟时间，以及等待服务器传送响应所用的时间。

#### Content Download / Downloading

接收响应数据所用的时间。

### 诊断网络问题

通过 Network 面板可以发现大量可能的问题。查找这些问题需要很好地了解客户端与服务器如何通信，以及协议施加的限制。

#### 已被加入队列或已被停止的系列

最常见问题是一系列已被加入队列或已被停止的条目。这表明正在从单个网域检索太多的资源。在 HTTP 1.0/1.1 连接上，Chrome 会将每个主机强制设置为最多六个 TCP 连接。如果您一次请求十二个条目，前六个将开始，而后六个将被加入队列。最初的一半完成后，队列中的第一个条目将开始其请求流程。

![](https://note.youdao.com/yws/api/personal/file/118A50C910324DABB4C37AC6F663E7B0?method=download&shareKey=cb35067568c854b1179977148689e8bb)

要为传统的 HTTP 1 流量解决此问题，您需要实现[域分片](https://www.maxcdn.com/one/visual-glossary/domain-sharding-2/)。也就是在您的应用上设置多个子域，以便提供资源。然后，在子域之间平均分配正在提供的资源。

HTTP 1 连接的修复结果不会应用到 HTTP 2 连接上。事实上，前者的结果会影响后者。 如果您部署了 HTTP 2，请不要对您的资源进行域分片，因为它与 HTTP 2 的操作方式相反。在 HTTP 2 中，到服务器的单个 TCP 连接作为多路复用连接。这消除了 HTTP 1 中的六个连接限制，并且可以通过单个连接同时传输多个资源。

#### 至第一字节的漫长时间

又称：大片绿色

![](https://note.youdao.com/yws/api/personal/file/40BEEB7F56F54CED8340DF5A5028C03F?method=download&shareKey=cb35067568c854b1179977148689e8bb)

等待时间长表示至第一字节的时间 (TTFB) 漫长。建议将此值控制在 200 毫秒以下。长 TTFB 会揭示两个主要问题之一。

1. 客户端与服务器之间的网络条件较差
2. 服务器应用的响应慢

要解决长 TTFB，首先请尽可能缩减网络。理想的情况是将应用托管在本地，然后查看 TTFB 是否仍然很长。如果仍然很长，则需要优化应用的响应速度。可以是优化数据库查询、为特定部分的内容实现缓存，或者修改您的网络服务器配置。很多原因都可能导致后端缓慢。您需要调查您的软件并找出未满足您的性能预算的内容。

如果本地托管后 TTFB 仍然漫长，那么问题出在您的客户端与服务器之间的网络上。很多事情都可以阻止网络遍历。客户端与服务器之间有许多点，每个点都有其自己的连接限制并可能引发问题。测试时间是否缩短的最简单方法是将您的应用置于其他主机上，并查看 TTFB 是否有所改善。

#### 达到吞吐量能力

又称：大片蓝色

![](https://note.youdao.com/yws/api/personal/file/27C7CBD473BE4E658C218592328EFF75?method=download&shareKey=cb35067568c854b1179977148689e8bb)

如果您看到 Content Download 阶段花费了大量时间，则提高服务器响应或串联不会有任何帮助。首要的解决办法是减少发送的字节数。

#### 模拟网络连接

利用网络调节，您可以在不同的网络连接（包括 Edge、3G，甚至离线）下测试网站。这样可以限制出现最大的下载和上传吞吐量（数据传输速率）。延迟时间操控会强制连接往返时间 (RTT) 出现最小延迟。

可以通过 Network 面板开启网络调节。从下拉菜单中选择要应用网络节流和延迟时间操控的连接。

![](https://note.youdao.com/yws/api/personal/file/FF80CC46CE8D4908AC20CA1633334018?method=download&shareKey=cb35067568c854b1179977148689e8bb)

## 性能面板（Performance）

使用 Chrome DevTools 的 Timeline 面板可以记录和分析您的应用在运行时的所有活动。 这里是开始调查应用中可觉察性能问题的最佳位置。

### 面板概览

Timeline 面板包含以下四个窗格：

1. Controls。开始记录，停止记录和配置记录期间捕获的信息。
2. Overview。 页面性能的高级汇总。更多内容请参见下文。
3. 火焰图。 CPU 堆叠追踪的可视化。
您可以在火焰图上看到一到三条垂直的虚线。蓝线代表 DOMContentLoaded 事件。 绿线代表首次绘制的时间。 红线代表 load 事件。
4. Details。选择事件后，此窗格会显示与该事件有关的更多信息。 未选择事件时，此窗格会显示选定时间范围的相关信息。

![](https://note.youdao.com/yws/api/personal/file/E2C6A6A934144ECC86172CCB901B0407?method=download&shareKey=cb35067568c854b1179977148689e8bb)

#### Overview 窗格

Overview 窗格包含以下三个图表：

1. FPS。每秒帧数。绿色竖线越高，FPS 越高。 FPS 图表上的红色块表示长时间帧，很可能会出现卡顿。
2.CPU。 CPU 资源。此面积图指示消耗 CPU 资源的事件类型。
3. NET。每条彩色横杠表示一种资源。横杠越长，检索资源所需的时间越长。 每个横杠的浅色部分表示等待时间（从请求资源到第一个字节下载完成的时间）。

深色部分表示传输时间（下载第一个和最后一个字节之间的时间）。

横杠按照以下方式进行彩色编码：

- HTML 文件为蓝色。
- 脚本为黄色。
- 样式表为紫色。
- 媒体文件为绿色。
- 其他资源为灰色。

![](https://note.youdao.com/yws/api/personal/file/DCE031D072D2456C99E6CEB01A8037F5?method=download&shareKey=cb35067568c854b1179977148689e8bb)

## 内存面板（Memory）

该面板主要能做：

- 使用 Chrome 的任务管理器了解您的页面当前正在使用的内存量。
- 使用 Timeline 记录可视化一段时间内的内存使用。
- 使用堆快照确定已分离的 DOM 树（内存泄漏的常见原因）。
- 使用分配时间线记录了解新内存在 JS 堆中的分配时间。

## 应用面板（Application）

该面板主要能做：

- 查看和修改本地存储与会话存储。
- 检查和修改 IndexedDB 数据库。
- 对 Web SQL 数据库执行语句。
- 查看应用缓存和服务工作线程缓存。
- 点击一次按钮即可清除所有存储、数据库、缓存和服务工作线程。

## 安全面板（Security）

该面板主要能做：

- 使用 Security Overview 可以立即查看当前页面是否安全。
- 检查各个源以查看连接和证书详情（安全源）或找出具体哪些请求未受保护（非安全源）。

### 检查源

使用左侧面板可以检查各个安全或非安全源。

点击安全源查看该源的连接和证书详情。

![](https://note.youdao.com/yws/api/personal/file/422D8BB10A5349BE8392266EDD035570?method=download&shareKey=cb35067568c854b1179977148689e8bb)

如果您点击非安全源，Security 面板会提供 Network 面板过滤视图的链接。

![](https://note.youdao.com/yws/api/personal/file/236D2FCAEB3C4B15A657146FB2E4042D?method=download&shareKey=cb35067568c854b1179977148689e8bb)

点击链接可以查看具体是源的哪些请求通过 HTTP 提供。

![](https://note.youdao.com/yws/api/personal/file/9E69F164A59949068A4125DD35735752?method=download&shareKey=cb35067568c854b1179977148689e8bb)

## 主菜单（Customize and control DevTools）

### 模拟传感器：地理定位与加速度计

由于大多数桌面设备都没有 GPS 芯片和加速度计，所以测试它们比较困难。Chrome DevTools 的 Sensors 模拟窗格可以通过模拟常见的移动设备传感器来降低测试的开销。

- 模拟地理定位坐标以测试地理定位替换值。
- 模拟设备方向以测试加速度计数据。

要访问 Chrome DevTools 传感器控件，请执行以下操作：

1. 打开 DevTools 主菜单
2. 在 More Tools 菜单下，点击 Sensors

![](https://note.youdao.com/yws/api/personal/file/5AE75EDD94B746929116072BF40B4ED6?method=download&shareKey=cb35067568c854b1179977148689e8bb)

注：如果您的应用检测到使用 JavaScript（如 Modernizr）的传感器加载，请确保在启用传感器模拟器之后重新加载页面。

### 替换地理定位数据

与桌面设备不同，移动设备通常使用 GPS 硬件检测位置。在 Sensors 窗格中，您可以模拟地理定位坐标，以便与 Geolocation API 结合使用。

在模拟抽屉式导航栏的 Sensors 窗格中选中 Emulate geolocation coordinates 复选框，启用地理定位模拟。

![](https://note.youdao.com/yws/api/personal/file/DCE413E745044D04B589EB6726E97957?method=download&shareKey=cb35067568c854b1179977148689e8bb)

您可以使用此模拟器替换 navigator.geolocation 的位置值，并在地理定位数据不可用时模拟用例。

### 模拟加速度计（设备方向）

要测试来自 Orientation API 的加速度计数据，请在 Sensors 窗格中选中 Accelerometer 复选框，启用加速度计模拟器。

![](https://note.youdao.com/yws/api/personal/file/0F7A549465AE42F0B403BB83F249E1D2?method=download&shareKey=cb35067568c854b1179977148689e8bb)

您可以操作下列方向参数：

- α：围绕 Z 轴旋转。
- β：左右倾斜。
- γ：前后倾斜。

您也可以点击模型加速度计并将其拖动到所需方向。

## 总结

Chrome开发者工具是一个非常强大的工具，灵活使用将让你在前端调试中事半功倍。

这两篇文章只是整理的一些我平时常用的功能，还有很多的功能等着我们去挖掘。

## 参考资料

[https://developers.google.com/web/tools/chrome-devtools/](https://developers.google.com/web/tools/chrome-devtools/)
