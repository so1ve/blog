---
title: "VueI18N简单使用"
date: 2020-08-18T09:18:28+08:00
draft: true
keywords: ['Vue', 'I18N']
categories: ['Vue']
tags: ['Vue', 'I18N', '前端']
slug: "vue-i18n-simple-usage"
categoryLink: "/"
toc: true
comments: true
buy: true
buyLink: "https://kazupon.github.io/vue-i18n"
buyName: "Vue-I18N官方文档"
buyInfo: "官方文档"
buyImage: "https://cn.vuejs.org/images/logo.png"
buyButtonText: "点击查看"
---

> **写作不易，资瓷一下呗！本文首发于个人博客：<https://raycoder.me>**
>

在Vue开发中我们经常有做多语言应用的需求，我们使用比较麻烦的模板插值语法（`{{ langs['Label'] }}`）。

幸好有Vue-i18n插件可以给我们使用，它相当于是对这种语法的一个封装，同时加入了许多额外的功能。

<!--more-->

假如你的Vue-cli的版本>=3.0，那么你可以直接使用官方提供的`vue-cli-plugin-i18n`插件。在命令行输入：

```bash
$ vue add i18n
```

当然，你也可以使用Vue ui。

运行完之后