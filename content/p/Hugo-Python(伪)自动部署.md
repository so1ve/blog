---
title: "Hugo-Python(伪)自动部署"
date: 2020-03-16T09:08:23+08:00
categories: ["Python","Hugo"]
tags: [Hugo,Python,Git]
description: "Hugo自动部署"
slug: "hugo-auto-deploy"
draft: false
---

最近无聊就写了个`Hugo自动部署`的Python脚本。

<!--more-->

```python
#!/usr/bin/env python
# coding:utf-8

from os import system
from time import ctime

system('start cmd /K "cd /d D:/workspace/hugoblog&hugo&cd public&git add -A&git commit -m \"Site updated: %s\"&git push -u origin master"' % str(ctime()))
```

假的自动，其实就是一次性执行所有部署命令。

自动部署请参考[Hugo-MemE/Hexo(真)自动推送部署至Netlify](/p/deploy-your-hugo-and-hexo-blog-to-netlify)

