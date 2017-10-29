---
title: Angular开发实践（一）：环境准备及框架搭建
date: 2017-10-22 21:45:30
tags:
- Angular
- JavaScript
categories: Angular
---

# 引言

在工作中引入Angular框架将近一年了，在这一年中不断的踩坑和填坑，当然也学习和积累了很多的知识，包括MVVM框架、前后端分离、前端工程化、SPA优化等等。因此想通过Angular开发实践这系列的文章分享下自己的所学，达到交流和分享的目的。

介绍之前，我假定你了解或者熟悉：

- [NodeJs](https://nodejs.org/en/)

- [Npm](https://docs.npmjs.com/)

- [Git](https://git-scm.com/)

- [Sass](http://sass-lang.com/)

- [TypeScript](http://www.typescriptlang.org/)

- [angular-cli](https://github.com/angular/angular-cli/wiki)

# 环境准备

- 全局安装NodeJs（>6.9.x），包含npm（>3.x.x）

- 全局安装angular-cli

```shell
npm install -g @angular/cli
```

- IDE推荐使用[WebStorm](https://www.jetbrains.com/webstorm/)

# 框架搭建

[angular-start](https://github.com/laixiangran/angular-start)是我在GitHub上维护的一个起步项目，你可以直接下载作为基础开发框架来使用。

你可以通过以下几步快速启动并进行开发：

```shell
git clone https://github.com/laixiangran/angular-start.git
cd angular-start
npm install（等待依赖包安装完成，再进行下一步）
npm start
```

**为了启动方便，在`package.json`的`scripts`配置了`"start": "ng serve --hmr -o --proxy-config proxy.config.json"`，可以看到这条命令分别配置了--hmr（启动模块热更新）、-o（自动打开浏览器）、--proxy-config（代理配置）**

控制台信息：
![控制台信息](http://www.laixiangran.cn/images/angular/1.png)

浏览器界面：
![浏览器界面](http://www.laixiangran.cn/images/angular/2.png)





