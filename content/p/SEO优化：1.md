---
title: "网站SEO优化：1"
date: 2020-04-14T11:26:48+08:00
description: "个人网站SEO优化"
keywords: ["个人网站","SEO"]
categories: ["SEO"]
tags: ["SEO","博客"]
slug: "seo-1"
weight: 0
comments: true
draft: false
---

> **写作不易，资瓷一下呗！本文首发于个人博客：<https://raycoder.me>**

### What is SEO？

SEO（Search Engine Optimization），即搜索引擎优化。

一句~~废~~话，就是为了让搜索引擎更了解你的网站，从而达到更多收录的效果。

### 域名注册时长

域名注册时长是搜索引擎很重要的指标之一。本站（<https://raycoder.me>）注册了将近3个月，目前百度收录17条。以[iMaegoo's Blog](https://imaegoo.com)为例，域名注册了两年的时长，收录量有61条。存活时间不长的域名在百度索引里不会占有太大的比重。

### 善用站长平台

百度、搜狗、Google等搜索引擎都有自己的站长平台。

- 百度：<https://ziyuan.baidu.com>
- 搜狗：<https://zhanzhang.sogou.com>
- 谷歌：<https://search.google.com/search-console/welcome?hl=zh-CN>

先验证网站主域后（建议www），提交Sitemap，插入自动提交代码，一样的套路。

### HTML结构

对于一个新站，搜索引擎不会使用过多资源来抓取。假如搜索引擎抓到了你的网页<heimu>有生之年</heimu>，也并不会去分析里面的内容。在`<head>`标签中添加一些`<meta>`标签有助于搜索引擎了解你的网站。

一些常用`<meta>`标签：

```html
<meta name="keywords" content="Ray, Git"><!--关键字，英文逗号分割-->
<meta name="description" content="Git教程……"><!--描述-->
<meta name="author" content="Ray, ray@raycoder.me"><!--作者-->
<meta name="generator" content="Hugo 0.68.3"><!--网页生成器-->
<meta name="copyright" content="Ray"><!--Copyright-->
<meta name="robots" content="index,follow"><!--Robots-->
```

### 多加网站的友链

只要对方没有设置友链`<a>`标签`nofollow`，那么搜索引擎就会从友链页面爬到你的网站去。多加一点收录多的网站友链总是没错的~

### 主题明确

明确的网站类型有助于搜索引擎把你的网站分类，从而达到`SEO`的效果。

---

OJBK，从网上抄了点东西，又氵了一篇文章:turtle:

