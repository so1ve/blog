---
title: "PicGo + Gitee(码云)实现markdown图床"
date: 2020-01-22T14:53:20+08:00
description: "PicGo+Gitee=markdown图床"
categories: ["Picgo","图床"]
tags: [Picgo,Gitee,工具]
slug: "picgo-and-gitee-markdown-pic"
draft: false
---

> **转载自: [LeonG7](https://www.jianshu.com/u/f81ef1ee8360)的[简书博客](https://www.jianshu.com/p/b69950a49ae2)。**
> **前言：深感在线博客的编辑器坑太多了，文档丢失、必须联网、可移植性太差，所以开始寻找可替代的方案。**

咱们写博客的时候，总是需要`插入图片`的，图片存在本地的话上传到博客网站去就没法显示了，就算一个图一个图的复制粘贴上去，想移植到其他的博客网站，图就会失效，我们就需要图床。

图床是干什么的？ 图床就是一个便于在博文中插入在线图片连接的个人图片仓库。设置图床之后，在自己博客中插入的图片链接就可以随时随地在线预览了，并且不会因为任何意外原因无法查看，除非自己亲自删除。

#### 神奇的PicGo就是为了解决这个问题诞生的，它可以将图片上传到指定的图床上，然后返回markdown链接，直接粘贴到你的文档中，就搞定啦~~~

问题又来了，网上推荐七牛云阿里云都是要租赁服务器的，太麻烦还要钱，微博现在挂链接又很厉害。大部分人选择用github，但是github虽好却是国外的网站，速度终究比不上国内网站，研究了小半天，终于发现完美的解决方案。

## 最终决定使用[`PicGo`](https://github.com/Molunerfinn/PicGo) + [`国内的github - 码云`](https://gitee.com)来实现`markdown图床`

## 1. 安装

  - PicGo
  - picgo-plugin-gitee-uploader插件

### 首先打开[PicGo官网](https://github.com/Molunerfinn/PicGo)，下载安装包

<center><img src="https://gitee.com/dogleft/blogsrc/raw/master/img/picgo1.jpg"/></center>

<del>速度还挺快</del>

### 安装之后打开主界面

<center><img src="https://gitee.com/dogleft/blogsrc/raw/master/img/picgo2.jpg"/></center>

### 选择最底下的插件设置，搜索gitee

<center><img src="https://gitee.com/dogleft/blogsrc/raw/master/img/picgo3.jpg"/></center>

### 点击gitee-uploader开始安装

> 这里注意一下，必须要先安装[`node.js`](https://nodejs.org)才能安装插件，没装的自己装一下，然后重启就行。

这个地方有两个插件，我试了一遍，两个都能用，大家看心情选择，先说一下这个`gitee-uploader`，用不了的同学就选另外那个，我都会讲一遍配置。

## 2. 建立Gitee（码云）图床库

注册码云的方法很简单，网站引导都是中文，不多说了，我们直接建立自己的图床库。

### 点击右上角的+号，新建仓库

<center><img src="https://gitee.com/dogleft/blogsrc/raw/master/img/picgo4.jpg"/></center>

新建仓库的要点如下：

    1. 输入一个仓库名称
    2. 其次将仓库设为公开
    3. 勾选使用Readme文件初始化这个仓库
       这个选项勾上，这样码云会自动给你的仓库建立master分支，这点很重要!!! 我（原作者）因为这点折腾了很久，因为使用github做图床picgo好像会自动帮你生成master分支，而picgo里的gitee插件不会帮你自动生成分支。

<center><img src="https://gitee.com/dogleft/blogsrc/raw/master/img/picgo5.jpg"/></center>

点击创建进入下一步。

## 3. 配置PicGo

安装了gitee-uploader插件之后，我们开始配置插件

配置插件的要点如下：

<center><img src="https://gitee.com/dogleft/blogsrc/raw/master/img/picgo6.jpg"/></center>

- repo：用户名/仓库名称，比如我自己的仓库leonG7/blogImage，也可以直接复制仓库的url

<center><img src="https://gitee.com/dogleft/blogsrc/raw/master/img/picgo7.jpg"/></center>

- branch：分支，这里写上master
- token：填入码云的私人令牌
- path：路径，一般写上img
- customPath：提交消息，这一项和下一项customURL都不用填。在提交到码云后，会显示提交消息，插件默认提交的是 Upload 图片名 by picGo - 时间

### 这个token怎么获取？下面登录进自己的码云

1. 点击头像，进入设置

<center><img src="https://gitee.com/dogleft/blogsrc/raw/master/img/picgo8.jpg"/></center>

2. 找到左边安全设置里面的私人令牌

<center><img src="https://gitee.com/dogleft/blogsrc/raw/master/img/picgo9.jpg"/></center>

3. 点击生成新令牌，把projects这一项勾上，其他的不用勾，然后提交

<center><img src="https://gitee.com/dogleft/blogsrc/raw/master/img/picgo10.jpg"/></center>

这里需要验证一下密码，验证密码之后会出来一串数字，这一串数字就是你的token，将这串数字复制到刚才的配置里面去。

<center><img src="https://gitee.com/dogleft/blogsrc/raw/master/img/picgo11.jpg"/></center>

> 注意：这个令牌只会明文显示一次，建议在配置插件的时候再来生成令牌，直接复制进去，搞丢了又要重新生成一个。

## 现在保存你刚才的配置，然后将它设置为默认图床，大功告成。

还有一个插件`gitee x.x.x-beta`，功能差不多，`刚才那个能用的话就不需要用这个`，配置的内容有点差别，简单说一下：

<center><img src="https://gitee.com/dogleft/blogsrc/raw/master/img/picgo12.jpg"/></center>

- url：图床网站，这里写码云的主页 https://gitee.com
- owner：所有者，写上你的码云账号名，如果你不知道你的账号名，进入你刚才的仓库，浏览器url里面有

<center><img src="https://gitee.com/dogleft/blogsrc/raw/master/img/picgo13.jpg"/></center>

- repo：仓库名称，只要写上仓库名称就行，比如我自己的仓库blogImage

- path：写上路径，一般是img，<strong>这几个项都不用加“ / “符号</strong>

- token：刚才你获取的个人令牌，两个插件是通用的，如果你用了另一个再来用这个，它会自动读取另一个插件的部分配置，不用重新申请

- message：不用填

## 4. 测试

随便选一张图片上传（picgo也支持剪贴板上传，截图工具推荐win10的Snipaste神器！），试试看

## **`超级快有木有！比github快很多，0.1秒上传，而且导入到你的markdown编辑器里面也是秒识别你的图片内容，而如果是github图床上传太慢不说可能还会出现下面这样识别不出来的问题！`**

### 上传之后默认复制链接，直接粘贴到你的markdown编辑器里，就可以愉快的进行写作了！

原文：[https://www.jianshu.com/p/b69950a49ae2](https://www.jianshu.com/p/b69950a49ae2)