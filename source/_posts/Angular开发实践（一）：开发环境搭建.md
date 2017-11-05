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

**为了启动方便，在`package.json`的`scripts`配置了`"start": "ng serve --hmr -o --proxy-config proxy.config.json"`，可以看到这条命令分别配置了[--hmr（启动模块热更新）](https://github.com/angular/angular-cli/wiki/stories-configure-hmr)、-o（自动打开浏览器）、[--proxy-config（代理配置）](https://github.com/angular/angular-cli/wiki/stories-proxy)**

控制台信息：
![控制台信息](http://www.laixiangran.cn/images/angular/1.png)

浏览器界面：
![浏览器界面](http://www.laixiangran.cn/images/angular/2.png)

项目启动成功了，你可以进行下面的开发了。可能你还想了解下该项目中的文件都是干什么用的，那么我们就来了解下。

# 项目文件概览

## src文件夹

应用代码位于`src`文件夹中。所有的Angular组件、模板、样式、图片以及应用所需的任何东西都在这里。这个文件夹之外的文件都是为构建应用提供支持用的。

![src目录](http://www.laixiangran.cn/images/angular/src.png)

文件 | 用途
---|---
`app/app.component.{ts,html,css,spec.ts}` | 使用HTML模板、CSS样式和单元测试定义`AppComponent`组件。 它是根组件，随着应用的成长它会成为一棵组件树的根节点。
`app/app.module.ts` | 定义`AppModule`，这个根模块会告诉Angular如何组装该应用
`components/*` | 这个文件夹下放置应用级通用组件

## 根目录

`src/`文件夹是项目的根文件夹之一。其它文件是用来帮助我们构建、测试、维护、文档化和发布应用的。它们放在根目录下，和`src/`平级。

![根目录](http://www.laixiangran.cn/images/angular/root.png)








