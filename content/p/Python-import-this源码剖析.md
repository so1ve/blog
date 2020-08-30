---
title: "Python Import This源码剖析"
date: 2020-07-29T20:00:07+08:00
draft: false
keywords: ['Python', 'Python彩蛋', '彩蛋']
categories: ['Python']
tags: ['Python', '彩蛋']
slug: "python-import-this"
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

众所周知，Python有一个`import this`的彩蛋：

<!--more-->

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200729200602.png)

但是，这个彩蛋的源代码在哪里呢🤔

我们来康康：

```python
>>> this
<module 'this' from 'C:\\Users\\[User Name]\\AppData\\Local\\Programs\\Python\\Python38\\lib\\this.py'>
```

`this.py`：

```python
s = """Gur Mra bs Clguba, ol Gvz Crgref

Ornhgvshy vf orggre guna htyl.
Rkcyvpvg vf orggre guna vzcyvpvg.
Fvzcyr vf orggre guna pbzcyrk.
Pbzcyrk vf orggre guna pbzcyvpngrq.
Syng vf orggre guna arfgrq.
Fcnefr vf orggre guna qrafr.
Ernqnovyvgl pbhagf.
Fcrpvny pnfrf nera'g fcrpvny rabhtu gb oernx gur ehyrf.
Nygubhtu cenpgvpnyvgl orngf chevgl.
Reebef fubhyq arire cnff fvyragyl.
Hayrff rkcyvpvgyl fvyraprq.
Va gur snpr bs nzovthvgl, ershfr gur grzcgngvba gb thrff.
Gurer fubhyq or bar-- naq cersrenoyl bayl bar --boivbhf jnl gb qb vg.
Nygubhtu gung jnl znl abg or boivbhf ng svefg hayrff lbh'er Qhgpu.
Abj vf orggre guna arire.
Nygubhtu arire vf bsgra orggre guna *evtug* abj.
Vs gur vzcyrzragngvba vf uneq gb rkcynva, vg'f n onq vqrn.
Vs gur vzcyrzragngvba vf rnfl gb rkcynva, vg znl or n tbbq vqrn.
Anzrfcnprf ner bar ubaxvat terng vqrn -- yrg'f qb zber bs gubfr!"""

d = {}
for c in (65, 97):
    for i in range(26):
        d[chr(i+c)] = chr((i+13) % 26 + c)

print("".join([d.get(c, c) for c in s]))
```

原来，这个彩蛋竟然用到了凯撒密码（Caesar cipher）：

> 在密码学中，恺撒密码（英语：Caesar cipher），或称恺撒加密、恺撒变换、变换加密，是一种最简单且最广为人知的加密技术。它是一种替换加密的技术，明文中的所有字母都在字母表上向后（或向前）按照一个固定数目进行偏移后被替换成密文。例如，当偏移量是3的时候，所有的字母A将被替换成D，B变成E，以此类推。这个加密方法是以罗马共和时期恺撒的名字命名的，当年恺撒曾用此方法与其将军们进行联系。

这样的话，从源码来看，偏移量应该是13:

```python
d[chr(i+c)] = chr((i+13) % 26 + c)
```

好家伙，我们来看看源码，并做一些注释：

```python
# 加密过的文字
s = """Gur Mra bs Clguba, ol Gvz Crgref

Ornhgvshy vf orggre guna htyl.
Rkcyvpvg vf orggre guna vzcyvpvg.
Fvzcyr vf orggre guna pbzcyrk.
Pbzcyrk vf orggre guna pbzcyvpngrq.
Syng vf orggre guna arfgrq.
Fcnefr vf orggre guna qrafr.
Ernqnovyvgl pbhagf.
Fcrpvny pnfrf nera'g fcrpvny rabhtu gb oernx gur ehyrf.
Nygubhtu cenpgvpnyvgl orngf chevgl.
Reebef fubhyq arire cnff fvyragyl.
Hayrff rkcyvpvgyl fvyraprq.
Va gur snpr bs nzovthvgl, ershfr gur grzcgngvba gb thrff.
Gurer fubhyq or bar-- naq cersrenoyl bayl bar --boivbhf jnl gb qb vg.
Nygubhtu gung jnl znl abg or boivbhf ng svefg hayrff lbh'er Qhgpu.
Abj vf orggre guna arire.
Nygubhtu arire vf bsgra orggre guna *evtug* abj.
Vs gur vzcyrzragngvba vf uneq gb rkcynva, vg'f n onq vqrn.
Vs gur vzcyrzragngvba vf rnfl gb rkcynva, vg znl or n tbbq vqrn.
Anzrfcnprf ner bar ubaxvat terng vqrn -- yrg'f qb zber bs gubfr!"""

d = {} # 一个凯撒密码对应表，如下
"""
{'A': 'N', 'B': 'O', 'C': 'P', 'D': 'Q', 'E': 'R', 'F': 'S', 'G': 'T', 'H': 'U', 'I': 'V', 'J': 'W', 'K': 'X', 'L': 'Y', 'M': 'Z', 'N': 'A', 'O': 'B', 'P': 'C', 'Q': 'D', 'R': 'E', 'S': 'F', 'T': 'G', 'U': 'H', 'V': 'I', 'W': 'J', 'X': 'K', 'Y': 'L', 'Z': 'M', 'a': 'n', 'b': 'o', 'c': 'p', 'd': 'q', 'e': 'r', 'f': 's', 'g': 't', 'h': 'u', 'i': 'v', 'j': 'w', 'k': 'x', 'l': 'y', 'm': 'z', 'n': 'a', 'o': 'b', 'p': 'c', 'q': 'd', 'r': 'e', 's': 'f', 't': 'g', 'u': 'h', 'v': 'i', 'w': 'j', 'x': 'k', 'y': 'l', 'z': 'm'}
"""
for c in (65, 97): # ASCII码，65代表A，97代表a
    for i in range(26): # 26个字母
        d[chr(i+c)] = chr((i+13) % 26 + c) 
"""
chr函数：把ASCII码转换成字符
chr(i+c)：把每个字符转换为对应的字符，如chr(0+65)=A
chr((i+13) % 26 + c)：
  i+13：13位偏移
  %26：保证在26个字母内
"""

print("".join([d.get(c, c) for c in s]))
"""
(Dictionary).get(key, default=None)：如果key存在于字典的键中，则返回相对应的值，否则返回default
"""
```

这玩意儿我又可以吹一年，

> 震惊！Python彩蛋竟使用字典、长字符串、chr函数与凯撒密码！