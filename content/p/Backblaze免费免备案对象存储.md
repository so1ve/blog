---
title: "Backblaze免费免备案对象存储"
date: 2020-03-19T08:08:54+08:00
description: "白嫖Backblaze免费免备案对象存储"
categories: ["对象存储","网站"]
tags: ["Backblaze","对象存储","白嫖","福利"]
slug: "backblaze-free-object-storage"
draft: false
---

### backblaze B2对象存储传送门：<https://secure.backblaze.com/b2_buckets.htm>
注册个账号，登录！

Backblaze前10 GB的存储空间是免费的，每天能下载1G以内文件免费，上传免费，并与cloudflare合作，只要套个cloudflareCDN即可无限免费下载。

因此我们得到如下产品：

> 10G存储空间免费
>
> 上行免费
>
> 下行免费
>
> 全球最可靠的云存储服务之一
>
> 全球最强的CDN云分发服务之一

新建一个桶，随便取个名。注意要选`Public（公众）`！~~这LAG机器翻译~~

![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200319081732.png)

创建完之后，随便上传一个文件。

![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200319082134.png)

俺们就发现它给我们分配了一个`https://f000.backblazeb2.com`的域名。

我们自己在`Cloudflare`挂一个域名，一定要开启CDN：

![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200319082633.png)

如果你觉得域名太长，可以设置一个`Page Rule`：

![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200319082751.png)

不过只能`http`跳`https`，可惜了。

我目前仍然使用`Gayhub`图床，放大文件使用`B2`。

---

2020/04/04更新：

建议参考[万能的CLOUDFLARE WORKERS+JSProxy代理？！](/p/cf-worker-proxy/)

参考资料：

- [免费对象云存储Backblaze | 沧水博客](https://cangshui.net/4221.html)

