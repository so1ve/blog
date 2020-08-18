---
title: "Chrome崩溃的一些解决办法"
date: 2020-03-18T09:05:37+08:00
description: ""
categories: ["Chrome"]
tags: ["Chrome"]
slug: "chrome-crashed"
draft: false
---

最近升级了电脑系统，打开Chrome崩溃了。

![喔唷，崩溃啦](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200318090837.png "喔唷，崩溃啦")

网络上的一些解决方法：在打开的快捷方式后添加` --test-type --no-sandbox`，禁用沙盒。

这样在你双击快捷方式时浏览器可以正常打开，但是如果你在开始菜单打开，还是一样会崩溃🙃。

在我自己的研究中发现，正解如下：

```
操作系统名称	: Microsoft Windows 10 家庭 Insider Preview中文版
版本			: 10.0.19582 版本 19582
Chrome版本	: 版本 83.0.4087.0（正式版本）canary （64 位）
```

没错，我们应该更新到`Canary 金丝雀`版Chrome😎！

下载地址：<https://www.google.cn/intl/zh-CN/chrome/canary/> | <https://www.google.com/intl/zh-CN/chrome/canary/>

也就是预览版，经常会更新，不过终于不会崩溃了，也可以正常访问`Ray's Blog`了🐷