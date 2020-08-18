---
title: "Python学习笔记之eval()函数简析"
date: 2020-03-05T20:20:53+08:00
categories: ["Python","Python关键字","Python学习笔记"]
tags: [Python,Python进阶,内置函数,Python学习笔记]
slug: "python-eval"
draft: false
---

一个最基本的`eval()`函数的格式应该如下：

```python
>>> command = 'print(\'Hello world!\')'
>>> eval(command)
Hello world!
```

没错，eval函数是一个可以让字符串转换为表达式的内置函数（注意`eval()`不支持任何形式的赋值操作，而不能是复杂的代码逻辑）。
`eval()`函数不仅可以执行代码，还可以作如下操作：

```python
>>> eval('[1, 2, 3]') #字符串转列表
[1, 2, 3]
>>> eval('(1, 2, 3)') #字符串转元组
(1, 2, 3)
>>> eval('{"one": 1, "two": 2, "three": 3}') #字符串转字典
{'one': 1, 'two': 2, 'three': 3}
>>> eval('0o187')
0o187
```

`eval()`函数的完整格式如下：

```python
eval(expression[, globals[, locals]])
```

`expression`: 表达式。
`globals`:  变量作用域，全局命名空间，如果被提供，则必须是一个字典对象。
`locals`:  变量作用域，局部命名空间，如果被提供，可以是任何映射对象。

当后两个参数都为空时，很好理解，就是一个string类型的算术表达式，计算出结果即可。等价于eval(expression)。
当locals参数为空，globals参数不为空时，先查找globals参数中是否存在变量，并计算。
当两个参数都不为空时，先查找locals参数，再查找globals参数。
~~无良~~引用一段Python官方的文档：

>eval(expression[, globals[, locals]])
>实参是一个字符串，以及可选的 globals 和 locals。globals 实参必须是一个字典。locals 可以是任何映射对象。
>expression 参数会作为一个 Python 表达式（从技术上说是一个条件列表）被解析并求值，并使用globals 和 locals 字典作为全局和局部命名空间。 如果 globals 字典存在且不包含以 `__builtins__ `为键的值，则会在解析 expression 之前插入以此为键的对内置模块 [builtins](https://docs.python.org/zh-cn/3/library/builtins.html#module-builtins) 的引用。 这意味着 expression 通常具有对标准 [builtins](https://docs.python.org/zh-cn/3/library/builtins.html#module-builtins) 模块的完全访问权限且受限的环境会被传播。 如果省略 locals 字典则其默认值为 globals 字典。 如果两个字典同时省略，则表达式执行时会使用 eval() 被调用的环境中的 globals 和 locals。 请注意，eval() 并没有对外围环境下的 (非局部)[嵌套作用域](https://docs.python.org/zh-cn/3/glossary.html#term-nested-scope) 的访问权限。
>返回值就是表达式的求值结果。 语法错误将作为异常被报告。 例如：
>&gt;&gt;&gt; x = 1
>&gt;&gt;&gt; eval('x+1')
>2
>这个函数也可以用来执行任何代码对象（如[compile()](https://docs.python.org/zh-cn/3/library/functions.html#compile)创建的）。这种情况下，参数是代码对象，而不是字符串。如果编译该对象时的 mode 实参是`'exec'` 那么 eval() 返回值为 `None `
>提示： exec() 函数支持动态执行语句。 [globals()](https://docs.python.org/zh-cn/3/library/functions.html#globals) 和 [locals()](https://docs.python.org/zh-cn/3/library/functions.html#locals) 函数各自返回当前的全局和本地字典，因此您可以将它们传递给 eval() 或 [exec()](https://docs.python.org/zh-cn/3/library/functions.html#exec) 来使用。

---

实战：

### 传递全局变量

```python
>>> print(eval("{'name':'linux','age':age}",{"age":1822}))
{'name': 'linux', 'age': 1822}
```

### 传递本地变量

```python
>>> age=18
>>> print(eval("{'name':'linux','age':age}",{"age":1822},locals()))
{'name': 'linux', 'age': 18}
```

### 传递参数其实可以如下实现（伪）

```python
>>> eval('print')('123')
123
```

### 不可进行任何形式的赋值

```python
>>> eval('a=1')
Traceback (most recent call last):
  File "<pyshell#0>", line 1, in <module>
    eval('a=1')
  File "<string>", line 1
    a=1
     ^
SyntaxError: invalid syntax
```



