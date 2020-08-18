---
title: "Python中的with关键字使用方法？"
date: 2020-04-01T10:03:10+08:00
description: "Python中的with关键字"
categories: ["Python","Python关键字","Python学习笔记"]
tags: ["Python","Python学习笔记","多线程"]
slug: "python-with"
draft: false
---

> **写作不易，资瓷一下呗！个人博客：<https://raycoder.me>**
>
> **本文首发于[Ray's Blog](https://raycoder.me/p/python-with/)**

Python中有一种操作叫做`打开文件`，代码如下：

```python
>>> f = open('/foo/bar.txt', 'r')
>>> data = f.read()
>>> f.close()
>>> data
'Hello World!'
```

这样，你就从`/foo/bar.txt`这个文本文件中读取到了它的文本：`Hello World!`

但是，这样处理有一些问题：

1. 可能在处理完文本后忘记关闭文件？
2. 可能在读取时出现错误？

这时，`try...except...finally...`语句就派上了用场：

```python
try:
    f = open('/foo/bar.txt', 'r')
except:
    print('Fail to open /foo/bar.txt')
    exit(-1)
finally:
    f.close()
```

虽然这段代码运行良好，但是太冗长了。

这时，`with`语句（上下文管理器器，添加于Python2.5，在2.5时是试验性的，需要`from __future__ import with_statement`。在2.5之前的版本无法使用。）就可以大显身手：

```python
with open('/foo/bar.txt') as f:
    data = f.read()
```

这里没有错误处理器，没有`f = open('/foo/bar.txt', 'r')`，也没有读取完文件后的`f.close()`。这段代码与`try...except...finally...`实现了相同的功能，但是代码却相应的短了许多。

除了读取文件，许多标准模块也含有上下文管理器，这意味着它们也可以使用`with`语句（以`threading`模块为例）：

```python
#!/usr/bin/env python

from atexit import register
from random import randrange
from threading import Thread, Lock, currentThread
from time import sleep, ctime

class CleanOutputSet(set):
    def __str__(self):
        return ', '.join(x for x in self)

lock = Lock()
loops = (randrange(2, 5) for x in range(randrange(3, 7)))
remaining = CleanOutputSet()

def loop(nsec):
    myname = currentThread().name
    with lock:
    	remaining.add(myname)
    	print('[{0}] Started {1}'.format(ctime(), myname))
    sleep(nsec)
    with lock:
    	remaining.remove(myname)
    	print('[{0}] Completed {1} ({2} secs)'.format(ctime(), myname, nsec))
    	print('    (remaining: {0})'.format(remaining or 'NONE'))

def _main():
    for pause in loops:
        Thread(target=loop, args=(pause,)).start()

@register
def _atexit():
    print('all DONE at:', ctime())

if __name__ == '__main__':
    _main()
```

这个例子派生了随机个的线程，使用`with`语句实现锁的锁定与释放。

那么，上下文管理器是怎么实现的呢？它通过类里面的特殊方法——`__enter__`和`__exit__`。

```python
class MyClass():
    def __init__(self,name):
        self.name=name
    def __enter__(self):
        print("到达__enter__")
        return self
    def printName(self):
        print(self.name)
    def __exit__(self, type, value, traceback):
        print("到达__exit__")
        print(type, value)
if __name__ == '__main__':
    with MyClass('foo-bar') as test:
        test.printName()

====================== RESTART: test.py ======================
到达__enter__
The name is:  foo-bar
到达__exit__
>>> 
```

