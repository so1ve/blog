---
title: "HTML入门(二)：文本"
date: 2020-04-08T13:19:37+08:00
description: "HTML入门学习二：文本"
keywords: ["HTML","HTML入门"]
categories: ["HTML","HTML入门"]
tags: ["HTML","HTML入门"]
slug: "html-2"
weight: 0
comments: true
draft: false
---

> **写作不易，资瓷一下呗！个人博客：<https://raycoder.me>**

## 普通文本

### 标题

HTML中的标题有六个级别：

#### <h1\>

用在主标题上。

#### <h2\>

用于二级标题上。

#### <h3\>

以此类推……

#### <h4\>

#### <h5\>

#### <h6\>

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

结果：

![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200411132736.png)

### 段落

#### <p\>

在成段的文字两端添加`<p>`起始标签和`</p>`结束标签就构成了HTML中的段落。

```html
<p>这是一个段落！</p>
<p>这是另一个段落！</p>
```

结果：

![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200411133205.png)

（默认情况下，浏览器会把段落另起一行显示并保持一定距离。）

### 粗体

#### <b\>

在`<b>`起始标签与`</b>`结束标签中的文字显示为粗体。

```html
<p>这是一个<b>段落</b>！</p>
<p>这是<b>另一个</b>段落！</p>
```

结果：

![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200411133919.png)

### 斜体

#### <i\>

在`<i>`起始标签与`</i>`结束标签中的文字显示为斜体。

```html
<p>这是一个<i>段落</i>！</p>
<p>这是<i>另一个</i>段落！</p>
```

结果：

![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200411134209.png)

### 上下标

#### 上标<sup\>

在`<sup>`起始标签与`</sup>`结束标签中的文字显示为上标，如`2<sup>2</sup>`=2<sup>2</sup>。

#### 下标<sub\>

在`<sub>`起始标签与`</sub>`结束标签中的文字显示为上标，如`H<sub>2</sub>O`=H<sub>2</sub>O。

### 换行符和水平线

#### 换行符<br /\>

```html
地球<br />每天绕着<br />太阳转。
```

结果：

![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200411134916.png)

当然，这个` /`可以略去不写，写成`<br>`也是可以的。

### 水平线<hr /\>

```html
Ray是一个<hr />大氵B
```

结果：

![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200411135247.png)

同理，这个` /`也可以略去不写，写成`<hr>`也是可以的。

## 语义化标记

和上面的文本标签不同的是，语义化标记基本上是展现给搜索引擎而不是用户的。

### <strong\>

`<strong>`标签表示其中内容很重要——一般显示为粗体。

```html
<strong>注意:</strong>不适合工作时观看!
```

结果：

![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200414115950.png)

### <em\>

`<em>`标签起强调作用——一般显示为斜体。

```html
<p>我 <em>觉得</em> 我非常氵</p>
<p>我觉得 <em>我</em> 非常氵</p>
```

效果：

![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200414120553.png)

### 引用

#### <blockquote\>

`<blockquote>`会自动缩进，但是最好使用CSS完成其他文本的缩进。`cite`特性可以表明这是从哪里引用的。

```html
<blockquote cite="http://en.wikipedia.org/wiki/Winnie-the-Pooh">
	<p>您是否曾经停下来思考，而忘记重新开始？</p>
</blockquote>
```

效果：

![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200414121204.png)

#### <q\>

`<q>`用于表明在段落中的较短引用。它一般会在引用文本两边加上引号。这些引号是无法被选中的。

```html
<p>Van曾说，<q>ASS♂WE♂CAN！</q></p>
```

效果：

![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200414121134.png)

### 内容的修改

#### <ins\>与<del\>

`<ins>`标签为插入的内容，`<del>`标签为删去的内容。

```html
<p>这真是一个 <del>最差</del> <ins>最好</ins> 的点子了！</p>
```

效果：

![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200414121349.png)

#### <s\>

`<s>`标签表示不准确但不应删去的内容。

看着像是`<del>`标签，但它们是不同的。

```html
<p>北京尻鸭：</p>
<p><s>过去￥100</s></p>
<p>现在只要￥998！</p>
```

效果：

![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200414121618.png)

---

呼，终于又肝完一篇了，氵~