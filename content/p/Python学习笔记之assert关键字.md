---
title: "Python学习笔记之assert关键字简析"
date: 2020-03-18T08:22:33+08:00
description: ""
categories: ["Python","Python关键字","Python学习笔记"]
tags: ["Python", "关键字", "Python学习笔记"]
slug: "python-assert"
draft: false
---

什么是`assert`？它的中文名叫做`断言`。我们先来看一个简单的例子：

```python
age = int(input())
if age>=18:
    print('You can watch it!')
else:
    print('You are too young!')
```

这个例子进行了一下<yellow><del>18G</del></yellow>操作，没有达到18岁的人会被~~拒之门外~~友善的提示。

不过，我们可以通过`assert`关键字来实现同等的操作。

```python
>>> age = int(input())
17
>>> assert age >= 18
Traceback (most recent call last):
  File "<pyshell#3>", line 1, in <module>
    assert age >= 18
AssertionError
```

```python
age = int(input())
try:
    assert age >= 18
    print('You can watch it!')
except AssertionError:
    print('You are too young!')
```

这只是一个简单的例子，`assert`还可以进行更复杂的操作。

引用一段[菜鸟教程](https://www.runoob.com/python3/python3-assert.html)。

`assert`的语法格式如下：

```python
assert expression
```

等价于：

```python
if not expression:
    raise AssertionError
```

`assert`后面也可以紧跟参数:

```python
assert expression [, arguments]
```

等价于：

```python
if not expression:
    raise AssertionError(arguments)
```

如：

```python
>>> assert True     # 条件为 true 正常执行
>>> assert False    # 条件为 false 触发异常
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AssertionError
>>> assert 1==1    # 条件为 true 正常执行
>>> assert 1==2    # 条件为 false 触发异常
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AssertionError

>>> assert 1==2, '1 不等于 2'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AssertionError: 1 不等于 2
>>>
```

以下实例判断当前系统是否为 Linux，如果不满足条件则直接触发异常，不必执行接下来的代码：

```python
import sys
assert ('linux' in sys.platform), "该代码只能在 Linux 下执行"

# 接下来要执行的代码
```

可以大大优化我们的代码，也可以减少`if`、`elif`、`else`的使用。

这个关键字也可以作校验用，比如我们从网页上下载了一个代码，可以用`assert`来断言本地代码与网页代码相同，否则报错。