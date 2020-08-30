---
title: "搭建史上最简单的博客——Mirror博客"
date: 2020-04-22T08:07:31+08:00
description: "搭建史上最简单的博客——Mirror博客"
keywords: ["折腾","搭建","Github","搭建博客","Mirror博客"]
categories: ["折腾"]
tags: ["折腾","博客","Mirror"]
slug: "build-the-simplest-blog-mirror-blog"
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

最近在GitHub上面发现了一个很有趣的项目，名叫[`Mirror`](https://github.com/LoeiFy/Mirror)，官方Demo在这里：<https://mirror.am0200.com/>

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200422081818.png)

哎哟我艹，貌似有那么一丢丢好康，但是这个release就有点过粪了吧？

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200422083906.png)

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200422083923.jpg)

这个绝对是我见过最简单的博客了，使用动态路由分发视图，单页面应用。

I了I了~

搭建，也很简单，从[这里](https://github.com/LoeiFy/Mirror/raw/master/release/mirror.zip)下载最新版Mirror，解压后在`index.html`里进行配置即可。

打开`index.html`，找到`window.config`开头，进行修改。

#### 获取Token

获取Token很简单，去<https://github.com/settings/tokens/new>获取即可，这个 token 只需要只读权限，只需要勾选以下：

- read: user Read all user profile data
- user: email Access user email addresses (read-only)

如果你的项目是属于一个组织的，还需要勾选一个权限：

- read: org Read org and team membership

像这样。

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200422084440.png)

添加 token 说明，然后点击 `Generate token`，就可以获得你的 token。要记得保存。

---

#### 获取Hash

据作者说，Hash加密一层是为了防止GitHub看到Token删仓库。

下面是获取 `hash` 的步骤

1. 获取 [token](https://github.com/LoeiFy/Mirror/wiki/Token-设置)（已经完成）
2. 获取你的主域名 `hostname`，例如 `https://mirror.am0200.com` 的主域名为 `mirror.am0200.com`
3. 打开 [Mirror](https://mirror.am0200.com/) 网站，并打开 `开发者工具` 界面
4. 在开发者工具的 `console` tab 页面，输入 js 代码 `window.encrypt('你的token', '你的主域名')`，注意不要写协议头，`www`是敏感的。

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200422084655.png)

得到的字符就是 `hash` 串。

接下来只需要修改`index.html`即可。

---

#### 修改`index.html`

```js
window.config = {
  organization: false, // 默认是 false，如果你的项目是属于 GitHub 组织 的，请设置为 true
  order: 'UPDATED_AT', // 文章排序，以 创建时间 或者 更新时间，可选值 'UPDATED_AT'，'CREATED_AT'
  title: 'Ray的记事小栈', // 博客标题
  user: 'FFRaycoder', // GitHub 用户名，必须
  repository: 'mirrorBlog', // GitHub 项目名，指定文章内容来源 issues，必须
  authors: 'Ray', // 博客作者，以 ',' 分割，GitHub 用户名默认包含在内
  ignores: '', // 文章忽略的 issues ID
  host: '', // 博客的主域名，不填自动获取，请注意这个值会影响 hash 的值
  hash: '', // 必须
  perpage: 5, // 分页
}
```

然后把它推送到GitHub上，即可。

接下来只需要在仓库的Issue里写作即可。