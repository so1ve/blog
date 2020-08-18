---
title: "Python学习笔记之exec()函数简析"
date: 2020-03-06T0:44:34+08:00
categories: ["Python","Python关键字","Python学习笔记"]
tags: [内置函数,Python,Python进阶,Python学习笔记]
slug: "python-exec"
draft: false
---

`exec()`函数的作用：动态执行python代码。也就是说`exec()`可以执行复杂的python代码，而不像`eval()`函数那样只能计算一个表达式的值。
【转】<https://www.jianshu.com/p/3cf0a649e7bc>
举一个简单的小例子，代码如下：

```python
>>> i = 12
>>> j = 13
>>> exec("answer=i*j")
>>> print("Answer is %s"%answer)
Answer is 156
```

这表明第三句的exec()函数能够正确地执行Python代码，并且能将计算结果赋予answer变量，就像真正的Python代码一样。
那么，我们能不能让exec()函数执行一个复杂的Python代码呢？Why not?请看一下例子：

```python
>>> func = "def fact(n):\n\treturn 1 if n==1 else n*fact(n-1)"
>>> exec(func)
>>> a = fact(5)
>>> print(a)
120
```

可能有些读者纳了闷了，这些代码不是直接能够在Python中执行吗，为何还要多此一举地把它写成字符串，并用exec()执行呢？笔者的答案是，刚才的例子只是为了演示exec()函数的基本用法，它的强大之处远不止于此。
在实际项目中，我们有些时候会将Python代码写入一些文件中，举个例子，如以下的eg.txt,它储存了我们想要的Python代码，如下：

```python
>>> def fact(n):
        if n==1:
            return 1
        else:
            return n*fact(n-1)
    ...
>>> t = fact(6)
>>> print(t)
```

请再次注意，这是一个txt格式的Python代码。那么，我们如何调用它呢？答案就是exec()函数，代码如下：

```python
>>> with open('E://eg.txt', 'r') as f:
        s = f.read()
    ...
>>> exec(s)
720
```

在上述代码中，我们先读取eg.txt文件的内容，再转交exec()函数执行。

是不是有点棒呢？除了能执行string和code object外，还可以在exec()函数中加入参数,参数的传递可以写成字典(dict)形式。具体的使用方法可以参考下面的例子：

```python
>>> x = 10
>>> expr = """
        z = 30
        sum = x + y + z
        print(sum)
    """
    ...
>>> def func():
        y = 20
        exec(expr)
        exec(expr, {'x': 1, 'y': 2})
        exec(expr, {'x': 1, 'y': 2}, {'y': 3, 'z': 4})
    ...
>>> func()
60
33
34
```

在expr语句中，有三个变量x,y,z,其中z值已给定，我们可以在exec()函数外指定x,y的值，也可以在exec()函数中以字典的形式指定x,y的值。在最后的语句中，我们给出了x,y,z的值，并且y值重复，exec()函数接收后面一个y值，且z值传递不起作用，因此输出结果为34。

`exec()`函数的标准格式如下：

```python
exec(object[, globals[, locals]])
```

>这个函数支持动态执行 Python 代码。object 必须是字符串或者代码对象。如果是字符串，那么该字符串将被解析为一系列 Python 语句并执行（除非发生语法错误）。1 如果是代码对象，它将被直接执行。在任何情况下，被执行的代码都需要和文件输入一样是有效的（见参考手册中关于文件输入的章节）。请注意即使在传递给 exec() 函数的代码的上下文中，return 和 yield 语句也不能在函数定义之外使用。该函数返回值是 None 。

exec和eval都可以执行single mode的代码；exec只是计算表达式，本身返回为None，因此使用exec计算表达式虽然可以计算出结果，但是返回值为None。而eval只能执行单个的表达式，返回表达式的结果。

