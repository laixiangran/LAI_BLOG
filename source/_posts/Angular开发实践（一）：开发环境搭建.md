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
`app/app.routes.ts` | 该模块配置了应用的根路由
`app/components/*` | 这个文件夹下放置应用级通用组件
`app/models/*` | 这个文件夹下放置应用级数据模型
`app/pages/*` | 这个文件夹下放置应用中的各个页面，这里面的目录结构和`app/`一致
`app/services/*` | 这个文件夹下放置应用级通用服务
`assets/*` | 这个文件夹下你可以放字体、图片等任何静态文件，在构建应用时，它们全都会拷贝到发布包中
`environments/*` | 这个文件夹中包括为各个目标环境准备的文件，它们导出了一些应用中要用到的配置变量。这些文件会在构建应用时被替换。比如你可能在开发环境、测试环境及生产环境中使用不同的后端API地址
`favicon.ico` | 显示在书签栏中的网站图标
`hmr.ts` | [HMR（模块热更新）](https://github.com/angular/angular-cli/wiki/stories-configure-hmr)的启动器，将在`main.ts`中用来起动应用
`index.html` | 网站的主页面。大多数情况下你都不用编辑它。在构建应用时，CLI会自动把所有js和css文件添加进去，所以你不必在这里手动添加任何`<script>`或`<link>`标签
`main.ts` | 这是应用的主要入口点。使用[JIT compiler](https://angular.cn/guide/glossary#jit)或者[AOT compiler](https://angular.cn/guide/glossary#ahead-of-time-aot-compilation)编译器编译本应用，并启动应用的根模块AppModule（启用HMR时，将使用`hmr.ts`定义的启动器启动），使其运行在浏览器中
`polyfills.ts` | 不同的浏览器对Web标准的支持程度也不同。填充库（polyfill）能帮我们把这些不同点进行标准化。 你只要使用core-js 和 zone.js通常就够了，不过你也可以查看[浏览器支持指南](https://angular.cn/guide/browser-support)以了解更多信息
`styles.scss` | 这里是你的全局样式。大多数情况下，你会希望在组件中使用局部样式，以利于维护，不过那些会影响你整个应用的样式你还是需要集中存放在这里
`test.ts` | 这是单元测试的主要入口点。它有一些你不熟悉的自定义配置，不过你并不需要编辑这里的任何东西
`tsconfig.{app、spec}.json` | TypeScript编译器的配置文件。`tsconfig.app.json`是为Angular应用准备的，而`tsconfig.spec.json`是为单元测试准备的
`typings.d.ts` | 引用的第三方插件TypeScript编译器可能不识别，需要通过下载`@types/xxx`获取该库的类型定义文件，如果`@types`没有那么就需要在该文件中定义，如`declare var $: any;`

## 根目录

`src/`文件夹是项目的根文件夹之一。其它文件是用来帮助我们构建、测试、维护、文档化和发布应用的。它们放在根目录下，和`src/`平级。

![根目录](http://www.laixiangran.cn/images/angular/root.png)

文件 | 用途
---|---
`e2e/*` | 在`e2e/`下是端到端（end-to-end）测试。它们不在`src/`下，是因为端到端测试实际上和应用是相互独立的，它只适用于测试你的应用而已。这也就是为什么它会拥有自己的`tsconfig.json`
`node_modules/*` | `Node.js`创建了这个文件夹，并且把`package.json`中列举的所有第三方模块都放在其中
`.angular-cli.json` | Angular CLI的配置文件。在这个文件中，我们可以设置一系列默认值，还可以配置项目编译时要包含的那些文件。要了解更多，请参阅它的[官方文档](https://github.com/angular/angular-cli/wiki)
`.editorconfig` | 用来确保参与你项目的每个人都具有基本的编辑器配置。大多数的编辑器都支持`.editorconfig`文件，详情参见 [http://editorconfig.org](http://editorconfig.org)
`..gitignore` | Git的配置文件，用来确保某些自动生成的文件不会被提交到源码控制系统中（GitHub）
`.stylelintrc.json` | css代码规范检测的配置文件
`CHANGELOG.md` | 项目的日志文件
`karma.conf.js` | [Karma](https://karma-runner.github.io/)的单元测试配置，当运行`ng test`时会用到它
`LICENSE` | 版权文件
`package.json` | `npm`配置文件，其中列出了项目使用到的第三方依赖包。你还可以在这里添加自己的[自定义脚本](https://docs.npmjs.com/misc/scripts)
`protractor.conf.js` | [Protractor](http://www.protractortest.org/)的端到端测试配置文件，当运行`ng e2e`的时候会用到它
`proxy.config.json` | `ng serve`的[代理配置文件](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md)，主要用在开发时前后端分离出现的跨域问题
`README.md` | 项目的基础说明文档，包括项目基本信息、如何启动、构建项目等等信息
`tsconfig.json` | TypeScript编译器的配置，你的IDE会借助它来给你提供更好的帮助
`tslint.json` | [TSLint](https://palantir.github.io/tslint/)和[Codelyzer](http://codelyzer.com/)的配置信息，当运行`ng lint`时会用到。Lint功能可以帮你保持代码风格的统一









