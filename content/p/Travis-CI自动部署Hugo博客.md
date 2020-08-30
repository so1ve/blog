---
title: "Travis CI自动部署Hugo博客"
date: 2020-04-09T13:16:30+08:00
description: "Travis CI自动部署Hugo博客至GitHub"
keywords: ["Travis CI","Hugo","GitHub","博客"]
categories: ["CI"]
tags: ["Travis CI","Hugo","GitHub","博客"]
slug: "travis-ci-automatically-deploys-hugo-blog"
comments: true
draft: false
---

> **写作不易，资瓷一下呗！本文首发于个人博客：<https://raycoder.me>**
>

近日发现GitHub Pages国内访问速度变快，准备换回去。奈何我又想保留GitHub上的源码，Hugo又没有`hexo d`这样的一键部署操作，只能使用Travis CI（`Continuous Integration`，持续集成）来实现。

---

### 什么是CI？

 CI，`Continuous Integration`，持续集成。CI就像是一个监视器，在你赋予它权限后，它就会一直盯着你仓库的动态。当你的仓库触发指定操作时，它就把相应的指令执行完。

---

### 部署Hugo

（请先在你的仓库创建一个新分支，如`hugo`，再设置其为主分支）

我们得先获取一个[`Personal access token`](https://github.com/settings/tokens)，用于给Travis CI访问仓库的权限。

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200409132636.png)

点击之后，只需要勾选`repo:status`、` repo_deployment`和`public_repo`三项即可，这样即使令牌被盗，也可以最大的减少损失。Note处是可选的，不需要填写，只是起分辨作用。

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200409133232.png)



生成完之后一定要保存令牌，这个令牌只会出现一次。

随后让我们打开[Travis CI官网](https://travis-ci.com)，使用GitHub登录。

选择你的博客仓库。

点击`Settings`，在`Environment Variables`中添加刚刚的令牌，`NAME`为`ACCESS_TOKEN`，`VALUE`为你的令牌。`Branch`选`All branches`。

---

### Travis钩子

Travis 有不同的阶段,他提供了7个钩子。

- before_install：install 阶段之前执行
- before_script：script 阶段之前执行
- after_failure：script 阶段失败时执行
- after_success：script 阶段成功时执行
- before_deploy：deploy 步骤之前执行
- after_deploy：deploy 步骤之后执行
- after_script：script 阶段之后执行

### 生命周期

1. before_install
2. install
3. before_script
4. script
5. aftersuccess or afterfailure
6. [OPTIONAL] before_deploy
7. [OPTIONAL] deploy
8. [OPTIONAL] after_deploy
9. after_script

在博客根目录下新建`.travis.yml`，内容如下。

```yaml
language: node_js #语言是NodeJS
node_js: 13.12.0 #Node版本，我是用了一些npm模块
install:
    - wget https://github.com/gohugoio/hugo/releases/download/v0.68.3/hugo_extended_0.68.3_Linux-64bit.deb #wgetHugo的安装包，可以修改
    - sudo dpkg -i hugo*.deb
    - hugo version
    - rm -rf public
    - npm install #安装依赖，要package.json，没需求的可以省略
    
script:
    - npm run build #我这里在package.json配置了一系列生成操作，可以自己替换

after_success:
    - git config --global user.name "FFRaycoder" #用户名
    - git config --global user.email "ray@raycoder.me" #用户邮箱
    - git clone https://${ACCESS_TOKEN}@github.com/FFRaycoder/ffraycoder.github.io.git container #换成你的仓库
    - rm -rf container/*
    - cp -r public/* container 
    - cd container
    - git add .
    - git commit -m 'Travis update blog'
    - git push -u origin master -f
```

`package.json`:

```json
{
  "name": "blog",
  "version": "1.0.0",
  "description": "Ray's Blog",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "git config --global core.quotePath false && hugo --gc --minify --cleanDestinationDir && ./node_modules/gulp/bin/gulp.js build",
    "index": "hugo-lunr",
    "algolia": "atomic-algolia"
  },
  "engines": {
    "node": "12.x"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/FFRaycoder/blog.git"
  },
  "keywords": [
    "blog",
    "hugo",
    "hugo-theme-meme"
  ],
  "author": "reuixiy",
  "license": "CC-BY-NC-SA-4.0",
  "bugs": {
    "url": "https://github.com/FFRaycoder/blog/issues"
  },
  "homepage": "https://github.com/FFRaycoder/blog",
  "devDependencies": {
    "gulp": "^4.0.2",
    "gulp-uglify": "^3.0.2",
    "hugo-search-index": "^0.5.0",
    "readable-stream": "^3.6.0",
    "uglify-es": "^3.3.9",
    "workbox-build": "^5.0.0"
  }
}
```

至此，我们的配置就结束了。每次把博客源码推送到仓库的`hugo`分支，Travis就会自动帮你部署好网页。

