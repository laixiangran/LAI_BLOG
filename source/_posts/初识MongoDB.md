---
title: 初识MongoDB
date: 2016-03-26 23:21:02
tags: MongoDB
categories: 数据库
---

## 什么是MongoDB

![](http://images2015.cnblogs.com/blog/435795/201603/435795-20160317235436771-2025413430.jpg)

MongoDB 是由C++语言编写的，是一个基于分布式文件存储的开源数据库系统。
在高负载的情况下，添加更多的节点，可以保证服务器性能。
MongoDB 旨在为WEB应用提供可扩展的高性能数据存储解决方案。
MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

![](http://images2015.cnblogs.com/blog/435795/201603/435795-20160317232712599-356440953.png)

### 主要特点

* MongoDB的提供了一个面向文档存储，操作起来比较简单和容易。
* 你可以在MongoDB记录中设置任何属性的索引 (如：FirstName="Sameer",Address="8 Gandhi Road")来实现更快的排序。
* 你可以通过本地或者网络创建数据镜像，这使得MongoDB有更强的扩展性。
* 如果负载的增加（需要更多的存储空间和更强的处理能力） ，它可以分布在计算机网络中的其他节点上这就是所谓的分片。
* Mongo支持丰富的查询表达式。查询指令使用JSON形式的标记，可轻易查询文档中内嵌的对象及数组。
* MongoDb 使用update()命令可以实现替换完成的文档（数据）或者一些指定的数据字段 。
* Mongodb中的Map/reduce主要是用来对数据进行批量处理和聚合操作。
* Map和Reduce。Map函数调用emit(key,value)遍历集合中所有的记录，将key与value传给Reduce函数进行处理。
* Map函数和Reduce函数是使用Javascript编写的，并可以通过db.runCommand或mapreduce命令来执行MapReduce操作。
* GridFS是MongoDB中的一个内置功能，可以用于存放大量小文件。
* MongoDB允许在服务端执行脚本，可以用Javascript编写某个函数，直接在服务端执行，也可以把函数的定义存储在服务端，下次直接调用即可。
* MongoDB支持各种编程语言:RUBY，PYTHON，JAVA，C++，PHP，C#等多种语言。
* MongoDB安装简单。

## MongoDB后台管理 Shell

如果你需要进入 MongoDB 后台管理，你需要先打开 mongodb 装目录的下的 bin 目录，然后执行 mongo.exe 文件，MongoDB Shell是 MongoDB 自带的交互式 `Javascript shell` ,用来对 MongoDB 进行操作和管理的交互式环境。
当你进入mongoDB后台后，它默认会链接到 test 文档（数据库）：

```javascript
> mongo
MongoDB shell version: 3.0.6
connecting to: test
……
```
    
由于它是一个JavaScript shell，您可以运行一些简单的算术运算:

```javascript
> 2 + 2
4
>
```

`db` 命令用于查看当前操作的文档（数据库）：

```javascript
> db
test
>
```

插入一些简单的记录并查找它：

```javascript
> db.runoob.insert({x:10})
WriteResult({ "nInserted" : 1 })
> db.runoob.find()
{ "_id" : ObjectId("5604ff74a274a611b0c990aa"), "x" : 10 }
>
```
> 第一个命令将数字 10 插入到 runoob 集合的 x 字段中。

## MongoDB概念解析

![](http://images2015.cnblogs.com/blog/435795/201603/435795-20160317232823756-797151648.png)

### 数据库

一个 mongodb 中可以建立多个数据库。
MongoDB 的默认数据库为"db"，该数据库存储在data目录中。
MongoDB 的单个实例可以容纳多个独立的数据库，每一个都有自己的集合和权限，不同的数据库也放置在不同的文件中。
数据库也通过名字来标识。数据库名可以是满足以下条件的任意UTF-8字符串。

* 不能是空字符串（"")。
* 不得含有' '（空格)、.、$、/、\和\0 (空字符)。
* 应全部小写。
* 最多64字节。

有一些数据库名是保留的，可以直接访问这些有特殊作用的数据库。

* **admin**：从权限的角度来看，这是"root"数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器。
* **local**：这个数据永远不会被复制，可以用来存储限于本地单台服务器的任意集合。
* **config**：当 Mongo 用于分片设置时，config数据库在内部使用，用于保存分片的相关信息。

### 文档

文档是一个键值( key-value )对(即 BSON )。MongoDB 的文档不需要设置相同的字段，并且相同的字段不需要相同的数据类型，这与关系型数据库有很大的区别，也是 MongoDB 非常突出的特点。

一个简单的文档例子如下：

```javascript
{"site":"www.runoob.com", "name":"菜鸟教程"}
```
    
下表列出了 RDBMS 与 MongoDB 对应的术语：

![](http://images2015.cnblogs.com/blog/435795/201603/435795-20160317232850381-669630917.png)

需要注意的是：

1. 文档中的键/值对是有序的。
2. 文档中的值不仅可以是在双引号里面的字符串，还可以是其他几种数据类型（甚至可以是整个嵌入的文档)。
3. MongoDB 区分类型和大小写。
4. MongoDB 的文档不能有重复的键。
5. 文档的键是字符串。除了少数例外情况，键可以使用任意UTF-8字符。

文档键命名规范：

* 键不能含有 `\0 (空字符)`。这个字符用来表示键的结尾。
* `.` 和 `$` 有特别的意义，只有在特定环境下才能使用。
* 以下划线 `_` 开头的键是保留的(不是严格要求的)。

### 集合

集合就是 MongoDB 文档组，类似于 RDBMS （关系数据库管理系统：Relational Database Management System)中的表格。
集合存在于数据库中，集合没有固定的结构，这意味着你在对集合可以插入不同格式和类型的数据，但通常情况下我们插入集合的数据都会有一定的关联性。
比如，我们可以将以下不同数据结构的文档插入到集合中：

```javascript
{"site":"www.baidu.com"}
{"site":"www.google.com","name":"Google"}
{"site":"www.runoob.com","name":"菜鸟教程","num":5}
```

当第一个文档插入时，集合就会被创建。

#### 合法的集合名

* 集合名不能是空字符串""。
* 集合名不能含有\0字符（空字符)，这个字符表示集合名的结尾。
* 集合名不能以"system."开头，这是为系统集合保留的前缀。
* 用户创建的集合名字不能含有保留字符。有些驱动程序的确支持在集合名里面包含，这是因为某些系统生成的集合中包含该字符。除非你要访问这种系统创建的集合，否则千万不要在名字里出现$。　

如下实例：

```javascript
db.col.findOne()
```

#### capped collections

Capped collections 就是固定大小的collection。
它有很高的性能以及队列过期的特性(过期按照插入的顺序). 有点和 "RRD" 概念类似。
Capped collections是高性能自动的维护对象的插入顺序。它非常适合类似记录日志的功能 和标准的collection不同，你必须要显式的创建一个capped collection， 指定一个collection的大小，单位是字节。collection的数据存储空间值提前分配的。
要注意的是指定的存储大小包含了数据库的头信息。

```javascript
db.createCollection("mycoll", {capped:true, size:100000})
```

* 在capped collection中，你能添加新的对象。
* 能进行更新，然而，对象不会增加存储空间。如果增加，更新就会失败 。
* 数据库不允许进行删除。使用drop()方法删除collection所有的行。
* 注意: 删除之后，你必须显式的重新创建这个collection。
* 在32bit机器中，capped collection最大存储为1e9( 1X109)个字节。

### 元数据

数据库的信息是存储在集合中。它们使用了系统的命名空间：

```javascript
dbname.system.*
```
    
在 MongoDB 数据库中名字空间 `<dbname>.system.*` 是包含多种系统信息的特殊集合(Collection)，如下:

![](http://images2015.cnblogs.com/blog/435795/201603/435795-20160317232928912-1285015139.png)

对于修改系统集合中的对象有如下限制。
在 `{{system.indexes}}` 插入数据，可以创建索引。但除此之外该表信息是不可变的(特殊的drop index命令将自动更新相关信息)。
`{{system.users}}` 是可修改的。 `{{system.profile}}` 是可删除的。

### MongoDB 数据类型

下表为MongoDB中常用的几种数据类型。

![](http://images2015.cnblogs.com/blog/435795/201603/435795-20160317233002537-1222118628.png)

## 参考
[MongoDB中文文档](http://docs.mongoing.com/manual-zh/)
[菜鸟教程](http://www.runoob.com/mongodb/mongodb-tutorial.html)
