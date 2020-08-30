---
title: "HTML入门(一)：结构"
date: 2020-04-07T08:51:02+08:00
description: "HTML入门(一)"
keywords: ["HTML", "HTML结构"]
categories: ["HTML", "HTML入门"]
tags: ["HTML", "HTML入门", "HTML结构"]
slug: "html-1"
weight: 0
comments: true
draft: false
---

> **写作不易，资瓷一下呗！个人博客：<https://raycoder.me>**
>
> **本文首发于[Ray's Blog](https://raycoder.me/p/html-1/)**

### Word文档的结构

任何文档中标题和子标题都反映出信息的层次性。标题后面可能跟着文档简介或是文档中最重要的信息。下面是一个Word文档示例。

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200407085907.png)

从这里我们理解到了Word文档中结构的运用对理解文档的帮助，编写网页的时候，道理是一样的。

### HTML文档的结构

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200407090301.png)

#### HTML使用元素描述结构

```html
<html><!--HTML代码的开始-->
    <body><!--与结束标签中的内容显示在浏览器主窗口中-->
		<h1>一级标题</h1><!--主标题-->
		<p>普通文本</p><!--成段的文字-->
        <h2>二级标题</h2>
		<p>另一段普通文本</p>
		<h2>又一个二级标题</h2>
		<p>又一段普通文本</p>
	</body>
</html>
```

#### 进一步分析标签

HTML代码由包含在尖括号里的字符构成，这些代码称为`HTML元素`。元素通常由两个标签组成：一个其实标签和一个结束标签。

HTML标签的结构如下：

```html
     起始标签              结束标签
<      p       >      < /    p     >
左尖   用途     右尖     斜杠  字符
括号 这里是段落  括号
```

#### 标签的特性

```html
<p lang   =  "zh-cn">一个中文段落</p>
   特性名称    特性值
```

#### <body\>、<head\>和<title\>

```html
<html>
	<head>
		<title>页面的标题</title>
	</head>
	<body>
		<h1>这是页面的正文</h1>
		<p>网页正文中的所有内容都会显示在主浏览器窗口中。</p>
	</body>
</html>
```

##### <body\>

在我们的第一个示例页面中，我们就看到了`<body`>元素。这个元素中的所有内容都会显示在浏览器的主窗口中。

##### <head\>

在`<body>`元素的前面，我们经常会看到`<head>`标签——它包含了有关这个页面的一些信息。我们经常会在这里看到`<title>`元素。

##### <title\>

`<title>`元素设置这个页面的标题。

