---
title: "Hugo与Hexo的工作机制"
date: 2020-06-07T14:14:35+08:00
draft: false
keywords: ["Hugo", "Hexo", "工作机制"]
categories: ["博客"]
tags: ["Hugo", "Hexo", "博客"]
slug: "how-hugo-and-hexo-works"
categoryLink: "/"
toc: true
comments: true
buy: false
buyLink: ""
buyName: ""
buyInfo: ""
buyImage: ""
buyButtonText: ""
---

> **写作不易，资瓷一下呗！本文首发于个人博客：<https://raycoder.me>**
>

最近在群里看到一些小伙伴在问问题！主要是不知道怎么添加下载链接！这件事情本来就是一个简单的`markdown`超链接+`downloads`目录的事，但是咋在他们口里就这么难咧:banana:

<img src="https://gitee.com/RACD/cdn/raw/master/imgs/20200607141946.jpg" style="zoom:25%;" />

嗯，我先来给大家分析一下`hexo`和`hugo`的工作机制。上图~~，淦它就完了~~



![](https://gitee.com/RACD/cdn/raw/master/imgs/20200607142035.svg)

就是这样。

`hexo`可以在`/source`文件夹下新建一个`downloads`目录，`hugo`就在`/static`文件夹下新建。

`hexo`需要在站点配置文件里修改：

```yaml
skip_render:
  - downloads/**
```

然后....

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200607142409.jpg)

完事了

（又氵了一篇文章）