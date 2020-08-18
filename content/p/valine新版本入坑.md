---
title: "Valine新版本入坑"
date: 2020-04-21T16:10:23+08:00
description: "Valine新版本使用方法、配置项"
keywords: ["Valine","评论","博客","新版本"]
categories: ["博客","评论","Valine"]
tags: ["博客","评论","Valine"]
slug: "valine-new-version"
weight: 0
comments: true
draft: false
related: true
displayCopyright: true
badge: true
gitinfo: true
---

> **写作不易，资瓷一下呗！本文首发于个人博客：<https://raycoder.me>**
>

`Valine`近期进行了一批大更新，是时候把评论升级一下了。

<!--more-->

目前最新版本是在..2020/04/21..更新的[v1.4.5](https://github.com/xCss/Valine/releases/tag/v1.4.5)，在这里说一声，开源作者们，Orz，辛苦了。

- `A` 新增QQ头像的支持 [#192](https://github.com/xCss/Valine/issues/192)，
- `A` 新增自定义表情 [#261](https://github.com/xCss/Valine/issues/261) [#260](https://github.com/xCss/Valine/issues/260) [#150](https://github.com/xCss/Valine/issues/150)，
- `F` 修复marked渲染错误的Bug [#275](https://github.com/xCss/Valine/issues/275) [#269](https://github.com/xCss/Valine/issues/269)，
- `F` 修复代码高亮样式被覆盖的Bug [#270](https://github.com/xCss/Valine/issues/270)，
- `F` 修复阅读次数异常的Bug [#272](https://github.com/xCss/Valine/issues/272)，
- `U` 一些样式优化，
- `U` 代码逻辑优化。

新增的自定义表情也的确省心了不少，不用再去改代码了。

目前[官方文档](https://valine.js.org)还没有更新，我先放一个新版指南。

### 配置项

#### ...（旧的配置项请去[这里](https://valine.js.org/configuration.html)）查看

#### `emojiCDN`

`emoji`的自定义地址，..类型String..，格式类似`"//cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/emoji/"`

#### `emojiMaps`

`emoji`的自定义`map`，..类型Object..，格式如`{"吐":"吐.png","喷血":"喷血.png","狂汗":"狂汗.png","不说话":"不说话.png","汗":"汗.png","坐等":"坐等.png","献花":"献花.png","不高兴":"不高兴.png","中刀":"中刀.png","皱眉":"皱眉.png"}`

### 功能

#### 新增QQ头像的支持

### 修复Bugs

#### 修复marked渲染错误的Bug

#### 修复代码高亮样式被覆盖的Bug

#### 修复阅读次数异常的Bug

---

好的就是这样没了:smirk:（鄙人尚未发现其他更新）

---

当然不可能，提醒一下：目前`jsdelivr cdn`需要写链接`https://cdn.jsdelivr.net/npm/valine@1.4.5/dist/Valine.min.js`，`https://cdn.jsdelivr.net/npm/valine@latest/dist/Valine.min.js`还是1.4.4的版本。

---

**2020/04/22更新：**

目前官网已经更新文档，`https://cdn.jsdelivr.net/npm/valine@1.4.5/dist/Valine.min.js`也已经更新到`v1.4.5`

又更新了，v1.4.6。

- `A` 新增`必填项`设置 [#281](https://github.com/xCss/Valine/pull/281) [#59](https://github.com/xCss/Valine/issues/59)
- `A` 新增`评论框`获取`QQ头像`和`QQ昵称`启用属性`enableQQ`，需主动启用 [#277](https://github.com/xCss/Valine/issues/277)
- `F` 修复样式被覆盖的Bug [#284](https://github.com/xCss/Valine/issues/284) [#270](https://github.com/xCss/Valine/issues/270)
- `F` 修复使用了低版本的`av-min.js`造成的初始化错误
- `U` 一些样式优化
- `U` 代码逻辑优化

`https://cdn.jsdelivr.net/npm/valine@1.4.6/dist/Valine.min.js`。

woc又更新！！v1.4.7！

- `F` 修复`v1.4.6`中自定义表情时未填`emojiCDN`引起的报错

`https://cdn.jsdelivr.net/npm/valine@1.4.7/dist/Valine.min.js`

---

**2020/4/26更新：**

不得不说作者是真的肝，目前更新到了[`v1.4.11`](https://github.com/xCss/Valine/releases/tag/v1.4.11)，更新了表情判断机制。