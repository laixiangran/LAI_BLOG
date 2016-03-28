---
title: MEAN-全栈javascript开发框架
date: 2016-03-27 00:05:05
tags:
- MongoDB
- Express
- AngularJS
- NodeJS
- JavaScript
categories: JavaScript
---

## 引言

使用JavaScript能够完整迅速做出Web应用程序，目前一套工具包括MongoDB、ExpressJS，AngularJS和Node.js越来越受到欢迎，其开发的灵活性和易用性加快开发效率，简化开发者的工作。

在今天你有很多架构可以选择建立一个Web应用，你需要的是快速开发，提高效率和注重健壮性，你需要的是更加精细更加敏捷的技术。

## 什么是MEAN？

![](http://images2015.cnblogs.com/blog/435795/201603/435795-20160319180028381-1900340914.png)

MEAN是一个Javascript平台的现代Web开发框架总称，它是MongoDB + Express +AngularJS + NodeJS 四个框架的第一个字母组合。它与传统LAMP一样是一种全套开发工具的简称。

* MongoDB是一个使用JSON风格存储的数据库，非常适合javascript。(JSON是JS数据格式)
* ExpressJS是一个Web应用框架，提供有帮助的组件和模块帮助建立一个网站应用。
* AngularJS是一个前端MVC框架。
* Node.js是一个并发 异步 事件驱动的Javascript服务器后端开发平台。
　
在mongoDB中我们可以直接存储JSON格式的数据，然后在ExpressJS和的NodeJS服务器编写一个基于JSON的查询，并无缝地(无需像其他语言需要在JSON和语言数据模型之间转换)传递JSON到AngularJS前端。

同时，数据库调试和管理也变得轻松了许多，存储在数据库中的对象基本上等同于你在客户端看到的对象。更妙的是，前端工作人员也能够轻松了解后端代码和数据库查询，使用的是相同的语法和对象，你不必考虑多套语言的最佳实践，降低了入门门槛。

MEAN的架构原理如下图：

![](http://images2015.cnblogs.com/blog/435795/201603/435795-20160319180041021-1985369719.png)

## 相关工具

* NPM – NodeJS包管理器，类似Java的Maven。
* Grunt – 一个Javascript任务运行器。

## 安装方式

> 1. 通过mean.io网站下载或通过git下载：git clone https://github.com/linnovate/mean.git

> 2. 使用Yeoman
首先安装:npm install -g generator-meanstack
创建app: yo meanstack


## 示例

* GitHub上自己搭建的一个例子： [https://github.com/laixiangran/mean-beginner](https://github.com/laixiangran/mean-beginner)

* 搭建教程：[http://www.ibm.com/developerworks/cn/web/wa-nodejs-polling-app/](http://www.ibm.com/developerworks/cn/web/wa-nodejs-polling-app/)

* 参考文章：[http://www.jdon.com/idea/js/mean.html](http://www.jdon.com/idea/js/mean.html)