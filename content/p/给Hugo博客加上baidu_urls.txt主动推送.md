---
title: "给Hugo博客加上baiduurls.txt"
date: 2020-05-24T13:40:52+08:00
draft: false
keywords: ["Hugo","Baidu"]
categories: ["SEO"]
tags: ["百度","SEO"]
slug: "hugo-baidu-urls"
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

百度的推送是真香啊嘿（迫真）

<!--more-->

emmm 不废话如何自动推送？

新建`blog/layouts/_default/list.baiduurls.txt`，内容如下

```go
{{/* 生成baidu_urls.txt搜索curl文件 */}}
{{- range .Site.Pages -}}
  {{- if not .Draft -}}
    {{- .Permalink -}}
    {{- "\n" -}}
  {{- end -}}
{{- end -}}
```

然后在Config.toml里添加

```diff
# Hugo 的输出控制
[outputs]
    page = ["HTML"]
-   home = ["HTML", "SectionsRSS", "SectionsAtom"]
+   home = ["HTML", "SectionsRSS", "SectionsAtom", "BaiduURLs"]
    section = ["HTML"]
    # 类别
    taxonomyTerm = ["HTML"]
    # 类别项
    taxonomy = ["HTML"]
    # 说明：https://github.com/gohugoio/hugo/issues/4528#issuecomment-508488859

+[outputFormats.BaiduURLs]
+    baseName = "baiduurls"
+    isPlainText = true
+    mediaType = "text/plain"
+    notAlternative = true
```

搞定辽