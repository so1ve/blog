---
title: "Python学习笔记之内存分配与id函数、is关键字"
date: 2020-04-17T08:04:33+08:00
description: "Python学习笔记之内存分配与id函数"
keywords: ["Python","Python学习笔记","内存分配","id函数"]
categories: ["Python","Python学习笔记","Python内建函数"]
tags: ["Python","Python学习笔记","Python内建函数","Python关键字"]
slug: "python-memory-footprint-and-id-is"
weight: 0
comments: true
draft: false
---

> **写作不易，资瓷一下呗！本文首发于个人博客：<https://raycoder.me>**
>

### 内存分配

在Python学习中，我们经常会写这样的代码。

```python
>>> foo = [1, 2, 3]
>>> bar = foo
```

这里，我们把`foo`的值赋给了`bar`——但是，这真的是一种赋值而不是..别名..吗？

<!--more-->

我们看看我们修改`foo`的值后，`bar`的值是否会变动。

```python
>>> foo.append(4) #[1, 2, 3, 4]
>>> bar
[1, 2, 3, 4]
```

哎呀！`bar`的值也修改了！

那么，如果我们真的只是想把`bar`创建为`foo`的一个副本呢？

```python
>>> foo = [1, 2, 3]
>>> bar = foo[:]
>>> foo.append(4) #[1, 2, 3, 4]
>>> bar
[1, 2, 3]
```

我们这里使用分片（`[:]`）从`foo`创建了一个副本.

这个现象就牵扯到了Python中的..内存分配..。

在了解内存分配前，我们先要理解Python中变量工作的机制。

---

### `id()`函数

很多小白很小白的认为，Python是以变量名来分辨变量的。

怎么可能呢<heimu>Python那么牛逼</heimu>

每一个编程语言都是用变量所在的内存分辨每个变量的。

我们回到开头：

```python
>>> foo = [1, 2, 3]
>>> bar = foo
>>> id(foo)
2415003666112
>>> id(bar)
2415003666112
```

他们的ID是相同的，就说明他们使用了相同的内存地址，是同一个变量。

```python
>>> foo = [1, 2, 3]
>>> bar = foo
>>> foo = [1, 2, 3, 4]
>>> id(foo)
2415003666112
>>> id(bar)
2415003507456
>>> foo
[1, 2, 3, 4]
>>> bar
[1, 2, 3]
>>> a = object()
>>> a
<object object at 0x0000022F37707AE0> #十六进制转换
>>> id(a)
2401816836832
```

这里我们会看到，给变量重新赋值后，ID不一样了。

所以，我们可以认为，变量其实是被赋予了一个内存地址。

---

### `is`关键字

小白可能认为，两个变量的值相同，它们就是同一个变量。

怎么可能呢<heimu>Python那么帅气</heimu>

```python
>>> foo = [1, 2, 3]
>>> bar = [1, 2, 3]
>>> id(foo)
2415003665024
>>> id(bar)
2415003665600
>>> foo == bar
True
>>> foo is bar
False
```

`==`操作符用于检测值的相等，`is`关键字用于检测`id`的相等。

---

### 内存重用[^1]

为了提高内存利用效率对于一些简单的对象，如一些数值较小的int对象，字符串对象等，python采取重用对象内存的办法.

#### 小内存变量

如指向a=2，b=2时，由于2作为简单的int类型且数值小，Python不会两次为其分配内存，而是只分配一次，然后将a与b同时指向已分配的对象。

```python
>>> a = 2
>>> b = 2
>>> print(id(a), id(b), id(2))
140705517236528 140705517236528 140705517236528
>>> print('a == b:', a == b)
a == b: True
>>> print('a is b:', a is b)
a is b: True
```

#### 大内存变量

如对于数值较大的int对象，Python会为ho和mo分别申请一块内存，来存储114514。

```python
>>> ho = 114514
>>> mo = 114514
>>> print(id(ho), id(mo), id(114514))
2401819762384 2401819762352 2401820368464
>>> print('ho == mo:', ho == mo)
ho == mo: True
>>> print('ho is mo:', ho is mo)
ho is mo: False
```

---

[^1]:[Python编程学习5：python id()函数和内存分配理解](https://blog.csdn.net/zhuzuwei/article/details/80554776)