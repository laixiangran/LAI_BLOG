---
title: Ionic构建打包apk出现的问题集合
date: 2018-07-08 11:33:30
tags:
- Ionic
- JavaScript
categories: Ionic
---

当我们写完 ionic 项目准备打包成 apk 时（比如执行 `ionic cordova platform add android` 或者 `ionic cordova build android` 等命令），经常会出现一些莫名其妙的问题，特别是对原生开发并不太熟悉的人，往往就是一脸懵逼啊。

因此，很有必要将这些经常出现的问题及对应解决方案做一个汇总，方便查阅。

## 问题1

```
BUILD FAILED

Total time: 29.304 secs
Error: cmd: Command failed with exit code 1 Error output:
ERROR: In <declare-styleable> FontFamilyFont, unable to find attribute android:font
ERROR: In <declare-styleable> FontFamilyFont, unable to find attribute android:fontStyle
ERROR: In <declare-styleable> FontFamilyFont, unable to find attribute android:fontVariationSettings
ERROR: In <declare-styleable> FontFamilyFont, unable to find attribute android:fontWeight
ERROR: In <declare-styleable> FontFamilyFont, unable to find attribute android:ttcIndex


FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':processArmv7ReleaseResources'.
> com.android.ide.common.process.ProcessException: Failed to execute aapt

```

### 产生原因

 主要原因是 `cordova-plugin-compat` 插件升级引起的，该插件已经包含在 `cordova-android 6.3.0` 中。如果你的应用使用了地理定位、文件操作或者其它依赖 `cordova-plugin-compat` 插件的插件的话，而 `cordova-plugin-compat` 这个插件已经包含在 `cordova-android 6.3.0`，如果你的 cordova-android 版本小于 6.3.0，则会出现这个问题。

### 解决方法

 - 升级 `cordova-android@6.3.0` 以上
 - 升级 `android-sdk/platforms` 到 android-26 以上
 - 删除 `cordova-plugin-compat` 插件，删除 `plugins/android.json` 和 `plugins/fetch.json` 中有关该插件的信息，并升级依赖该插件的其它所有插件

### 参考资料

[https://forum.ionicframework.com/t/android-build-broken-after-gradle-dependencies-update-execution-failed-for-task-processdebugresources-com-android-ide-common-process-processexception-failed-to-execute-aapt/109982/80](https://forum.ionicframework.com/t/android-build-broken-after-gradle-dependencies-update-execution-failed-for-task-processdebugresources-com-android-ide-common-process-processexception-failed-to-execute-aapt/109982/80)

## 问题2

```
Error: Could not find an installed version of Gradle either in Android Studio,
or on your system to install the gradle wrapper. Please include gradle
in your path, or install Android Studio
```

### 产生原因

window 开发环境下没有将 gradle 配置到环境变量 path 中。

### 解决方法

- 去 [https://services.gradle.org/distributions/](https://services.gradle.org/distributions/) 下载对应版本的 gradle，如 `gradle-3.3-bin.zip`
- 将 `gradle-3.3-bin.zip` 解压之后放置到某个目录下，如 `D:\Program Files\gradle-3.3`
- 在环境变量 path 中添加 `D:\Program Files\gradle-3.3\bin`
- 打开 cmd 输入 gradle -v，验证是否配置成功

### 参考资料

[https://blog.csdn.net/capmiachael/article/details/73289478](https://blog.csdn.net/capmiachael/article/details/73289478)

## 问题3

下载 gradle-xxx-all.zip 太慢或失败

```
BUILD SUCCESSFUL

Total time: 6.591 secs
Subproject Path: CordovaLib
Downloading https://services.gradle.org/distributions/gradle-3.3-all.zip
...
```

### 产生原因

下载 gradle 是直接在 `http://services.gradle.org/distributions/` 上下载的，由于国内网络的限制，而 gradle-x.x-all.zip 文件比较大（60M以上），因此下载的过程会比较漫长，有时候会下载失败（当然如果有梯子，这个问题应该就不存在了，但是下载应该也不会太快）。

### 解决方法

- 去 [https://services.gradle.org/distributions/](https://services.gradle.org/distributions/) 下载对应版本的 gradle，如 `gradle-3.3-all.zip`
- 无需下载，放在项目下的 `platforms/android/gradle` 目录下
- 找到项目下的 `platforms/android/cordova/lib/builders/GradleBuilder.js`，然后修改其中的 `var distributionUrl = process.env['CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL'] || 'http\\://services.gradle.org/distributions/gradle-2.14.1-all.zip';` 为 `var distributionUrl = process.env['CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL'] || '../gradle-3.3-all.zip';`

### 参考资料

[https://www.cnblogs.com/macq/p/6494798.html](https://www.cnblogs.com/macq/p/6494798.html)

## 问题4

gradle 构建时下载 maven 太慢

### 产生原因

依然是网络的原因。

### 解决方法

- 使用国内阿里云的服务，修改项目下的 `platforms\android\build.gradle` 为：

```
buildscript {
    repositories {
        maven{ url 'http://maven.aliyun.com/nexus/content/groups/public/'}
    }
}

allprojects {
    repositories {
        maven{ url 'http://maven.aliyun.com/nexus/content/groups/public/'}
    }
}
```

### 参考资料

[https://www.cnblogs.com/Ave-Maria/p/6274621.html](https://www.cnblogs.com/Ave-Maria/p/6274621.html)

## 问题5

```
Execution failed for task ':app:processDebugResources'. > Failed to execute aapt
```

### 产生原因

暂时不清楚。

### 解决方法

在 `/platforms/android` 中新建 `build-extras.gradle` 文件，并添加如下内容：

```
configurations.all {
    resolutionStrategy {
        force 'com.android.support:support-v4:27.1.0'
    }
}
```

如果是 cordova-android 7.0.0，则也要在 `/platforms/android/app` 中新建 `build-extras.gradle` 文件。

### 参考资料

[https://stackoverflow.com/questions/49162538/running-cordova-build-android-unable-to-find-attribute-androidfontvariation/49172982#49172982](https://stackoverflow.com/questions/49162538/running-cordova-build-android-unable-to-find-attribute-androidfontvariation/49172982#49172982)

## 问题6

```
Error: cmd: Command failed with exit code 1 Error output:
Exception in thread "main" java.lang.RuntimeException: Timeout of 120000 reached waiting for exclusive access to file: C:\Users\laixiangran\.gradle\wrapper\dists\gradle-3.3-all\55gk2rcmfc6p2dg9u9ohc3hw9\gradle-3.3-all.zip
        at org.gradle.wrapper.ExclusiveFileAccessManager.access(ExclusiveFileAccessManager.java:65)
        at org.gradle.wrapper.Install.createDist(Install.java:48)
        at org.gradle.wrapper.WrapperExecutor.execute(WrapperExecutor.java:107)
        at org.gradle.wrapper.GradleWrapperMain.main(GradleWrapperMain.java:61)
```

### 产生原因

主要还是网络原因，导致无法在 `C:\Users\你的用户名\.gradle\wrapper\dists\gradle-3.3-all\55gk2rcmfc6p2dg9u9ohc3hw9` 中解压 `gradle-3.3-all.zip`

### 解决方法

- 去 [https://services.gradle.org/distributions/](https://services.gradle.org/distributions/) 下载对应版本的 gradle，如 `gradle-3.3-all.zip`
- -然后在 `C:\Users\你的用户名\.gradle\wrapper\dists\gradle-3.3-all\55gk2rcmfc6p2dg9u9ohc3hw9` 中解压
