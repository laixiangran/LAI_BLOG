---
title: Windows下Ionic 开发环境搭建
date: 2018-07-08 11:35:00
tags:
- Ionic
- JavaScript
categories: Ionic
---

## Ionic 介绍

首先，Ionic 是什么。

Ionic 是一款基于 Cordova 及 Angular 开发 Hybrid/Web APP 的前端框架，类似的其他框架有：Intel XDK等。

简单来说就是可以将你的 Web 应用打包发布成 IOS/Android APP，并且提供了 Cordova 之外很多强大的服务和新的特性。

听起来还是很诱人的，事实上这也是目前最火的一种 Hybrid APP 开发方式。

接下来介绍如何在 Windows 下搭建 Ionic 开发环境。

在开始之前我假设你已经了解了如下概念：

- Java JDK
- Apache Ant
- Android SDK
- NodeJS

**以上名词这里就不赘述，如果有不清楚的可以自行查阅**

## 安装步骤

Ionic 官方教程：[http://learn.ionicframework.com/videos/windows-android/](http://learn.ionicframework.com/videos/windows-android/)

以下内容参考官方教程得出：

### 下载 JDK 并配置好 Java 运行环境

下载地址：[http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)（请注意选择您电脑的对应版本）

Java 环境变量的配置：参看：[http://zhidao.baidu.com/question/1366931535221381339.html](http://zhidao.baidu.com/question/1366931535221381339.html)

### 下载 Apache Ant 并将其 bin 目录路径添加进 Path 路径

下载地址：[http://mirror.tcpdiag.net/apache//ant/binaries/apache-ant-1.9.4-bin.zip](http://mirror.tcpdiag.net/apache//ant/binaries/apache-ant-1.9.4-bin.zip)

下载完成后解压该文件至某个安全的目录下，然后将改文件夹内的bin文件夹路径添加至系统 Path 环境变量中，如存放在 C 盘 Program Files 目录下则 Path 中添加如下值 `C:\Program Files\apache-ant-1.9.4\bin;`（添加方法和 java 配置 path 变量是一样的，注意以;隔开每个环境变量的值）

### 下载 Android SDK 并配置好 SDK 运行环境

下载地址：[http://developer.android.com/sdk/index.html](http://developer.android.com/sdk/index.html)

这里可以只下载 Android SDK 不需要一并下载 Android Studio。

下载完成并安装然后向系统Path环境变量中添加两个值。分别是 Android SDK 中 tools 目录的路径和 platform-tools 的路径。例如：

- C:\Program Files (x86)\Android\android-sdk\tools;
- C:\Program Files (x86)\Android\android-sdk\platform-tools;

在这里我发现 Android SDK 安装目录中并没有`platform-tools`这个文件夹，运行 tools 目录下的 android.bat 文件，然后在出现的界面中勾选 Android SDK Platform-tools 然后安装。

注意：这里我下载的纯净版 SDK 之前并没有任何 Android 系统在内，所以同 `Platform-tools` 一样需要在这里勾选需要的版本然后安装。这里至少需要有一个系统，否则无法创建虚拟机。当然，用真机调试的话可以不依赖。

### 配置 Gradle

下载地址：[http://services.gradle.org/distributions/](http://services.gradle.org/distributions/)

下载相应版本的 gradle（对应 cordova-android），然后解压放置在某个目录下，然后向系统 Path 环境变量中添加：

- D:\Program Files\gradle\gradle-3.3\bin

### 下载 Nodejs for Windows 并安装

下载地址：[https://nodejs.org/download/](https://nodejs.org/download/)

Windows 下安装 Nodejs 环境很简单，在 Nodejs 官网下载正确版本后安装即可。

### nmp 安装 Ionic 和 Cordova

完成以上几步需要配置的环境就搭建完成了，接下来就只需要在控制台输入简单的几行命令就可以安装 Ionic 和 Cordova 啦。

进入 cmd 窗口，输入如下指令：

`npm install -g cordova ionic`

**完成以上所有步骤，就可以开始利用 Ionic 快速开发 Android APP 啦**

## 创建并运行 ionic app

### 创建 APP

进入 cmd 窗口，输入如下指令：

`ionic start myapp`

这里的 myapp 是你的 APP 的名字

### 进入创建的 APP 目录

`cd myapp`

### 选择配置 Android 环境

`ionic platform add android`

### 打包生成 APP

`ionic build android`

### 运行 APP

需要先新建虚拟机或者连接手机。

- 新建虚拟机：打开 Android SDK 安装目录下的 AVD Manager.exe 选择新建
- 连接手机：直接通过数据线连接真实设备

`ionic run android`

到这一步系统就会打开虚拟机或者在真实设备运行简单的示例 APP 了。

## 其它

### --prod 的作用

在编译命令的最后加上 --prod 会让 app 的启动速度加快，但构建速度会变慢。

`ionic build android --release --prod`

无论是 debug 版本还是 release 版本都适用。

### APP 签名

#### 生成签名文件

生成签名文件需要用到 `keytool.exe` (位于 `jdk1.6.0_24\jre\bin` 目录下)，使用产生的 key 对 apk 签名用到的是 `jarsigner.exe` (位于 `jdk1.6.0_24\bin` 目录下)，把上两个软件所在的目录添加到环境变量path后，即可使用生成签名文件的命令：

```
keytool -genkey -v -keystore demo.jks -alias demo -keyalg RSA -keysize 2048 -validity 10000
```

- -genkey：产生密钥

- -keystore: 签名文件名称（这里是 `demo.jks`，`demo` 可以自定义，`jks` 是 Android studio 生成的签名文件的后缀）

- -alias：签名文件的别名（这里是 `demo`，可自定义）

- -keyalg：使用 RSA 算法对签名加密（默认 RSA ）

- -validity 有效期限（这里是 10000 天，可自定义）

以上命令在 cmd 运行如下：

![](https://note.youdao.com/yws/api/personal/file/8D6BC7DE22124F6EB93E53D42BCD6F25?method=download&shareKey=cb35067568c854b1179977148689e8bb)

#### 自动签名

在工程目录 /platforms/android 目录新建名为 release-signing.properties 的文件，文件内容如下：

```json
storeFile=demo.jks
keyAlias=demo
storePassword=输入的密钥库口令
keyPassword=输入的密钥口令
```

这样，使用 `ionic build android --release `编译即可，在 /platforms/android/build/outputs/apk 下就会生成已签名的安装包 android-release.apk

在 windows 下 storeFile 文件路径应使用 Unix 下的目录分隔符 / 。

了解更多可进入 Ionic 官网： [http://ionicframework.com/](http://ionicframework.com/) 进行拓展阅读。
