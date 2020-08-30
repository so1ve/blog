---
title: "一些关于GitHub图像无法正常显示和访问速度慢的解决方案"
date: 2020-02-18T08:08:42+08:00
categories: ["Hosts", "Github"]
tags: [GitHub,Hosts,加速]
slug: "github-hosts"
draft: false
---

**今天我在访问GayHub的Issue时发现访问速度奇慢无比，加载好后也无法正常显示图片，raw.githubusercontent.com也无法进入。上网查找相关资料后终于有了相关的解决方法。**


网上一般流传的Hosts已经不好使了，如下：

```
# GitHub Start
192.30.253.112 github.com
192.30.253.118 gist.github.com
151.101.112.133 assets-cdn.github.com
151.101.184.133 raw.githubusercontent.com
151.101.112.133 gist.githubusercontent.com
151.101.184.133 cloud.githubusercontent.com
151.101.112.133 camo.githubusercontent.com
151.101.112.133 avatars0.githubusercontent.com
151.101.112.133 avatars1.githubusercontent.com
151.101.184.133 avatars2.githubusercontent.com
151.101.12.133 avatars3.githubusercontent.com
151.101.12.133 avatars4.githubusercontent.com
151.101.184.133 avatars5.githubusercontent.com
151.101.184.133 avatars6.githubusercontent.com
151.101.184.133 avatars7.githubusercontent.com
151.101.12.133 avatars8.githubusercontent.com
# GitHub End
```

`ipconfig /flushdns`后无效。

后来又去[这里](https://github.com/chenxuhua/issues-blog/issues/3)翻了翻，又发现了一个好用的东西：

```bash
140.82.113.4 github.com
140.82.113.19 assets-cdn.github.com
151.101.185.194 github.global.ssl.fastly.net
185.199.108.153 assets-cdn.github.com
185.199.108.153 github.github.io
151.101.184.133 githubusercontent.com
192.30.253.118 gist.github.com
```

发现这个竟然是有用的！所以只需要使用这个Hosts即可！

`ipconfig /flushdns`走起~

不过这些IP每人都`各不相同`，假如你还不能正常访问，那请去<https://www.ipaddress.com>

查询相对应GayHub ip地址，把之前hosts中的`替换`掉，就应该可以正常访问了。

