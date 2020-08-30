---
title: "【刻在基因里的序列号变了？】Bilibili采用新的稿件编号！AV与BV互相转化的方法！"
date: 2020-03-31T15:57:37+08:00
description: "【刻在基因里的序列号变了？】Bilibili采用新的稿件编号！AV与BV互相转化"
categories: ["算法"]
tags: ["算法","Bilibili"]
draft: false
slug: "av-and-bv"
---

> **写作不易，资瓷一下呗！个人博客：<https://raycoder.me>**
>
> **本文首发于[Ray's Blog](https://raycoder.me/p/av-and-bv/)**

最近B站把AV号改成了BV号！[^1]以后B站没有AV了！[手动狗头]

<!--more-->

更改以前的AV号简单好记，都是`AV170001`一类——根据发布顺序依次往下计数。

更改以后的BV号完全颠覆，形如`BV17x411w7KC`，区分大小写——转换成的AV号是完全随机的。

说实话，个人认为这个改变是为了防止一些恶意爬虫。

虽然B站官方也有提到，以后仍然可以使用AV号来观看视频<heimu>，不过，刻在基因里的AV号变了，老青结工了</heimu>，但是这两个序列号如何互相转化呢？

当然，AV/BV同时工作就说明：B站有一个接口！

BVID接口：`https://api.bilibili.com/x/web-interface/view?bvid=<BVID>`

AID接口：`https://api.bilibili.com/x/web-interface/view?Aid=<AID>`

知乎上[@mcfx](https://www.zhihu.com/people/-._.-)大佬已经给出了回答：[^2]

他写了一些代码，我们来分析一下。（一些修改）

```python
table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF' # base58的字符对应表——从0~57，没有大写O，数字0，小写的L和大写的i，非标准。
tr = dict(zip(table, range(58))) # 建立对应字典，形如{'f': 0, 'Z': 1...}
s = [11,10,3,8,4,6]
xor = 177451812
add = 8728348608

def bv2av(x):
	r=0
	for i in range(6):
		r+=tr[x[s[i]]]*58**i
	return (r-add)^xor

def av2bv(x):
	x=(x^xor)+add
	r=list('BV1  4 1 7  ')
	for i in range(6):
		r[s[i]]=table[x//58**i%58]
	return ''.join(r)
```

**主要修改：**

**1.使用zip()函数，优化了运行效率；**

等待补充

****

如果算法没猜错，可以保证在 av 号 $\< 2^{27}$ 时正确，同时应该在 $\< 2^{30}$ 时也是正确的。此代码以 WTFPL 开源。

UPD：之前的代码中，所有数位都被用到是乱凑的，实际上并不需要，目前只要低 6 位就足够了。（更大的 av 号需要 64 位整数存储，但是 b 站现在使用的应该还是 32 位整数，所以应该还要很久）

发现的方法：

首先从各种渠道的信息来看，应该是 base58 编码的。设 x 是一个钦定的 av 号，查询 $\ 58k+x,58^2k+x,58^3k+x,58^4k+x\left(k \in Z\right)$ 这些 av 号对应的 bv 号，发现 bv 号的第 12、11、4、9、5 位分别会变化。所以猜测这些是 58 进制下的相应位。

但是直接 base58 是不行的，所以猜测异或了一个大数，并且 base58 的字符表可能打乱了。经过实验，bv 号最低位相同的数，av 号的奇偶性相同，这一定程度上印证了之前的猜想。

接下来找了一些 av 号 x，满足 x 和 x+1 对应 bv 号的第 11 位不同。设异或的数为 X，那么 $\ \left\lfloor\frac{X\oplus x}{58}\right\rfloor\neq \left\lfloor\frac{X\oplus (x+1)}{58}\right\rfloor$ （ $\ \oplus$  表示异或）。

由于 av 号（除了最新的少量视频）最多只有 27 bits，所以可以设 $\ X=2^{27}a+b(0\le b<2^{27})$ 。然后可以发现 $\ X$ 只和 $\ 2^{27}a\bmod 58$ 和 $\ b$ 有关，那么可以枚举这两个值（一共 $\ 2^{27}\cdot 58=7784628224$ 种情况）然后使用上面的式子检查，就能得到若干可能的 $\ 2^{27}a\bmod 58$ 和 $\ b$ 。

这里我得到的可能值如下：（左边是 $\ 2^{27}a\bmod 58$ ，右边是 $\ b$ ）

```text
22 90983642
22 90983643
50 43234084
50 43234085
```

有奇有偶是因为异或 1 之后也能找到轮换表。而 $\ 90983642+43234085=2^{27}-1$ 则使得模 58 的余数刚好变成$\ 2^{27}-1$减它。

我取了 b=43234084，然后处理最低位，可以得到一个字符表，即 `fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF`。

对于更高位，实际上还需要知道 $\ 2^{27}a\bmod 58^2,2^{27}a\bmod 58^3,\dots$ ，这些值也可以 枚举 58 次得到，最后我得到的值是 $\ 2^{27}a\bmod 58^4=1749968$ 。

这时我发现，每一位的字符表是相同的（实际上只对 b=43234084 是这样的），然后再微调一下参数（上面代码中的两个 magic number 就相当于这里的 $\ a,b$ ），最后处理了一下 $\ \ge 2^{27}$ 的情况就得到了这份代码。

（转自知乎[@mcfx](https://www.zhihu.com/people/-._.-)大佬给出的回答）

根据倍步长跳的实验显示：其变动的优先级为：

后两位＞第4位（每4096一变，但是由于58×58＜4096，肯定又要借用其他位的变化）＞第9位（每131072一变，相当于第4位每变32次第9位才会变）＞第5位（每2097152一变）。

这也能解释为什么第5位排布不均匀——没排完啊！

修改版Base58表：

|  0   |  1   |  2   |  3   |  4   |  5   |  6   |  7   |  8   |  9   |  10  |  11  |  12  |  13  |  14  |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
|  f   |  Z   |  o   |  d   |  R   |  9   |  X   |  Q   |  D   |  S   |  U   |  m   |  2   |  1   |  y   |
|  15  |  16  |  17  |  18  |  19  |  20  |  21  |  22  |  23  |  24  |  25  |  26  |  27  |  28  |  29  |
|  C   |  k   |  r   |  6   |  z   |  B   |  q   |  i   |  v   |  e   |  Y   |  a   |  h   |  8   |  b   |
|  30  |  31  |  32  |  33  |  34  |  35  |  36  |  37  |  38  |  39  |  40  |  41  |  42  |  43  |  44  |
|  t   |  4   |  x   |  s   |  W   |  p   |  H   |  n   |  J   |  E   |  7   |  j   |  L   |  5   |  V   |
|  45  |  46  |  47  |  48  |  49  |  50  |  51  |  52  |  53  |  54  |  55  |  56  |  57  |      |      |
|  G   |  3   |  g   |  u   |  M   |  T   |  K   |  N   |  P   |  A   |  w   |  c   |  F   |      |      |

事实上，如果不采用后端，直接浏览器控制台输入`aid`，`bvid`也是可以的：

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200331165001.png)

附转换器：

<iframe src="/tools/bv2av/index.html" width="100%" height="400" scrolling="0" frameborder="0"><br></iframe>



顺便放上视频。

<div id="player1"></div>
<br>
<div id="player2"></div>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/FFRaycoder/cdn@latest/static/css/DPlayer.min.css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/FFRaycoder/cdn@latest/static/js/flv.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/FFRaycoder/cdn@latest/static/js/DPlayer.min.js"></script>
<script type="text/javascript">
const dp = new DPlayer({
    container: document.getElementById('player1'),
    video: {
        url: 'https://cdn.jsdelivr.net/gh/FFRaycoder/cdn@latest/video/av-bv/AV2BV.flv',
        type: 'flv'
    },
});
</script>
<script type="text/javascript">
const dp2 = new DPlayer({
    container: document.getElementById('player2'),
    video: {
        url: 'https://cdn.jsdelivr.net/gh/FFRaycoder/cdn@latest/video/av-bv/BV2AV.flv',
        type: 'flv'
    },
});
</script>

---
[^1]: [【升级公告】AV号全面升级至BV号 | Bilibili](https://www.bilibili.com/read/cv5167957)
[^2]:[如何看待 2020 年 3 月 23 日哔哩哔哩将稿件的「av 号」变更为「BV 号」？ | 知乎](https://www.zhihu.com/question/381784377/answer/1099438784)



