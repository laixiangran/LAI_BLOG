---
title: JavaScript实现Base64
date: 2016-04-22 22:56:32
tags:
- Base64
- JavaScript
categories: JavaScript
---

# 简介

Base64是一种基于64个可打印字符来表示二进制数据的表示方法。由于2的6次方等于64，所以每6个比特为一个单元，对应某个可打印字符。三个字节有24个比特，对应于4个Base64单元，即3个字节需要用4个可打印字符来表示。它可用来作为电子邮件的传输编码。在Base64中的可打印字符包括字母A-Z、a-z、数字0-9，这样共有62个字符，此外的两个可打印符号在不同的系统中而不同，一般为+和/。

# 转换原理

Base64的直接数据源是二进制序列(Binary Sequence)。当然，你也可以将图片、文本和音视频转换成二进制序列，再然后转换为Base64编码。我们这里讨论的是如何将二进制转换为Base64编码，对于如何将图片，文本和音视频转换为二进制序列敬请期待。

在转换前，先定义一张索引表，这张表规定了如何转换：

![Base64转换表](http://www.laixiangran.cn/images/转换表.png)

转换的时候我们先将二进制序列分组，每6个比特为一组。但是如果编码的字节数不能被3整除，那么最后就会多出1个或两个字节，可以使用下面的方法进行处理：先使用0字节值在末尾补足，使其能够被3整除，然后再进行base64的编码。在编码后的base64文本后加上一个或两个’=’号，代表补足的字节数。也就是说，当最后剩余一个八位字节（一个byte）时，最后一个6位的base64字节块有四位是0值，最后附加上两个等号；如果最后剩余两个八位字节（2个byte）时，最后一个6位的base字节块有两位是0值，最后附加一个等号。 参考下表：

![Base64参考表](http://www.laixiangran.cn/images/参考表.png)

# JavaScript实现Base64

原理明白了以后，实现起来就很容易了。

```javascript
define(function(require, exports, module) {
 
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""); //索引表
 
    /**
     * @author laixiangran@163.com
     * @description 将二进制序列转换为Base64编码
     * @param  {String}
     * @return {String}
     */
    function binToBase64(bitString) {
        var result = "";
        var tail = bitString.length % 6;
        var bitStringTemp1 = bitString.substr(0, bitString.length - tail);
        var bitStringTemp2 = bitString.substr(bitString.length - tail, tail);
        for (var i = 0; i &lt; bitStringTemp1.length; i += 6) {
            var index = parseInt(bitStringTemp1.substr(i, 6), 2);
            result += code[index];
        }
        bitStringTemp2 += new Array(7 - tail).join("0");
        if (tail) {
            result += code[parseInt(bitStringTemp2, 2)];
            result += new Array((6 - tail) / 2 + 1).join("=");
        }
        return result;
    }
 
    /**
     * @author laixiangran@163.com
     * @description 将base64编码转换为二进制序列
     * @param  {String}
     * @return {String}
     */
    function base64ToBin(str) {
        var bitString = "";
        var tail = 0;
        for (var i = 0; i &lt; str.length; i++) {
            if (str[i] != "=") {
                var decode = code.indexOf(str[i]).toString(2);
                bitString += (new Array(7 - decode.length)).join("0") + decode;
            } else {
                tail++;
            }
        }
        return bitString.substr(0, bitString.length - tail * 2);
    }
 
    /**
	 * @author laixiangran@163.com
     * @description 将字符转换为二进制序列
     * @param  {String} str
     * @return {String}    
     */
    function stringToBin(str) {
        var result = "";
        for (var i = 0; i &lt; str.length; i++) {
            var charCode = str.charCodeAt(i).toString(2);
            result += (new Array(9 - charCode.length).join("0") + charCode);
        }
        return result;
    }

    /**
	 * @author laixiangran@163.com
     * @description 将二进制序列转换为字符串
     * @param {String} Bin
     */
    function BinToStr(Bin) {
        var result = "";
        for (var i = 0; i &lt; Bin.length; i += 8) {
            result += String.fromCharCode(parseInt(Bin.substr(i, 8), 2));
        }
        return result;
    }
    exports.base64 = function(str) {
        return binToBase64(stringToBin(str));
    }
    exports.decodeBase64 = function(str) {
        return BinToStr(base64ToBin(str));
    }
})
```