---
title: "旁门左道之使用Leancloud搭建网站！"
date: 2020-03-31T13:10:36+08:00
description: "旁门左道之使用Leancloud搭建网站"
categories: ["免费空间"]
tags: ["免费空间","网站"]
slug: "build-website-with-leancloud"
draft: false
---

> **写作不易，资瓷一下呗！个人博客：<https://raycoder.me>**
>
> **本文首发于[Ray's Blog](https://raycoder.me/p/build-website-with-leancloud/)**

Leancloud也可以搭建网站？

<!--more-->

是的！[Leancloud](https://leancloud.app)，就是那个我们熟知的`Valine`数据存储，可以搭建网站！有使用`Valine Admin`的同学可能也会发现，部署的Admin实际上也是一个{{< udpoint "使用JS生成的页面" >}}。那么很多人可能就会想要使用Leancloud去搭建网站——怎么实现呢？（我刚刚放的链接是国际版的Leancloud，国内版的[戳这](https://leancloud.cn)，需要实名认证。推荐国际版。）

事实上，你只需要推送一个网页到一个Git仓库（GitHub、Gitee、Coding等皆可），然后使用`Leancloud云引擎`功能部署网页。<red>注意！我没有说是静态网页！Leancloud支持`PHP`！</red>也就是说，你可以把Leancloud当作一个免费的空间来搭建你的博客——当然，稳定性不敢保证，Leancloud开发版每天会强制休眠6小时。

首先先创建一个应用，选择开发版~自己整罢！

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200331135141.png)

然后选择`<你创建的应用>-->云引擎-->设置`，在`源码部署-->代码库`里填写你的Git仓库。

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200331134820.png)

当然，不要忘记填写Web主机域名——这个是我们之后预览网页用的！

然后选择`部署`，再点击`Git源码部署`！（假如你有能力，也可以选择命令行部署，使用Webhook自动部署）

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200331135315.png)

然后，打开你填写的Web主机域名，享用吧！