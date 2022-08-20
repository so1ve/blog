---
title: "详解JWT"
date: 2022-08-20T18:47:07+08:00
draft: false
keywords: ["JWT", "前端"]
categories: ["前端"]
tags: ["JWT", "前端"]
slug: "know-jwt"
categoryLink: ""
toc: true
comments: true
buy: false
buyLink: ""
buyName: ""
buyInfo: ""
buyImage: ""
buyButtonText: ""
---

<style>
heimu {
  color: black;
  background: black;
  display: inline-flex;
  transition: 0.3s ease;
}

heimu:hover {
  color: white;
}
</style>

> 这可能是旧博客的最后一篇文章了，之后会使用新博客系统。
>
> [七户创客社](https://7hmakers.com)征文。

> 阅读这篇文章前，我们假定你对HTTP稍有一些了解。

# JWT……和为什么要用JWT

JWT，即JSON Web Tokens。顾名思义，其为用于Web授权认证的一种令牌。它最为显著的特征为安全和“无状态”。

我们先来看看过去的几种认证方式。

## HTTP Basic Auth
在Web授权认证这一方面，我们最先使用的是`HTTP Basic Auth`。这种方式优缺点都很明显，优点是简单易用，基本上所有流行的网页浏览器都支持，开发者只需要在服务器的响应中加上一行形如`WWW-Authenticate: Basic realm="Secure Area"`的响应头即可。但这种认证方式只对用户密码进行了近乎裸奔的Base64编码，且易被获取造成信息泄露，甚至可以发起中间人攻击，因此极少在生产环境中使用。

## Cookie/Session

`Cookie/Session`认证机制是一种较为安全的Web授权认证机制，其分为两大组成部分，即存储在客户端的Cookie和服务端的Session。它的运行方式也十分简单，客户端发出一个登录请求，服务端记录下用户信息(即Session)，并在响应中要求客户端记录下Cookie。在用户发起请求时，Cookie会一同发出，服务端便可基于此进行用户认证。

这种方式看似是一种完美的解决方式，但其实仍有不足之处。

首先，Session存储于服务端，这就必然导致服务器资源的占用。倘若有大量用户或攻击者同一时间大量发起登录请求，服务器便要大量存储Session，容易导致内存不足，甚至崩溃。同时，如果在Session中置入了较大的对象，也会产生较大的性能负担。Session的服务端开发对于程序员来说也不是一件美事，过度使用Session会导致代码不可读而且不好维护。

## JWT来啦

既然Basic不安全，Session又会给服务器造成大量负担，那该怎么办呢？

首先我们需要一个安全的认证方式，这个好办。我们只需要一个只存在于服务器的密钥对敏感信息进行加密就可以了。

其次是不能给服务器造成性能负担，那我们势必将登录信息存储于客户端。

由此，JWT就诞生了。

# JWT的组成

> 部分内容来自<https://javaguide.cn/system-design/security/jwt-intro.html>

我们可以在[jwt.io](https://jwt.io/)上直观感受JWT。JWT是一种形如`xxxxx.yyyyy.zzzzz`的由服务器返回的字符串，其中`xxxxx`为Header(描述JWT的元数据，定义了生成签名的算法以及 Token 的类型)、`yyyyy`为Payload(用来存放实际需要传递的数据)，`zzzzz`为Signature(签名)(服务器通过Payload、Header和一个密钥(Secret)使用Header里面指定的签名算法(默认是HMAC SHA256)生成)。

可以看出，JWT本质上就是一组字符串，通过`.`切分成三个经过Base64编码的部分。

例如：

```
eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic28xdmUiLCJwYXNzd29yZCI6bnVsbH0.zPEzTi2VzXpMTndG0k04QVddxaQ2Ermgw21skfyl1XWqdF5mdPoT6goQsk8XsAh40Twux-IHFl1RSYUeLuyCGQ
```

你可以在[这里](https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic28xdmUiLCJwYXNzd29yZCI6bnVsbH0.zPEzTi2VzXpMTndG0k04QVddxaQ2Ermgw21skfyl1XWqdF5mdPoT6goQsk8XsAh40Twux-IHFl1RSYUeLuyCGQ)对它进行解码，可以得出其中包含的Header、Payload和Signature。

## Header

Header 通常由两部分组成：

- `typ` (type): 令牌类型，也就是JWT。
- `alg` (algorithm): 签名算法，比如HS512。

示例：

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

JSON形式的Header被转换成Base64编码，成为JWT的第一部分。

## Payload

随后是Payload。Payload也是JSON格式数据，包含了Claims(声明，包含JWT的相关信息)。在这里可以包含一些用户相关的信息，但请注意，默认情况下该部分并未进行加密，请不要存储隐私信息。

例如：

```json
{
  "name": "so1ve",
  "password": null
}
```

这是一个很简单的例子，除了这些自定义的内容，我们还可以放置如下数据：

- `iss` (issuer)：JWT 签发方。
- `iat` (issued at time)：JWT 签发时间。
- `sub` (subject)：JWT 主题。
- `aud` (audience)：JWT 接收方。
- `exp` (expiration time)：JWT 的过期时间。
- `nbf` (not before time)：JWT 生效时间，早于该定义的时间的 JWT 不能被接受处理。
- `jti` (JWT ID)：JWT 唯一标识。

JSON形式的Payload被转换成Base64编码，成为JWT的第二部分。

## Signature
Signature 部分是对前两部分的签名，作用是防止JWT(主要是payload)被篡改。

这个签名的生成需要用到：

- Header + Payload。
- 存放在服务端的密钥(一定不要泄露出去)。
- 签名算法。

签名的计算公式如下：

HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)

算出签名以后，把Header、Payload、Signature三个部分拼成一个字符串，每个部分之间用`.`分隔，这个字符串就是`JWT`。

# 如何认证

使用JWT进行认证，大致可以简化为如下步骤：

1. 客户端向服务器发起登录请求(用户名、密码，或许还有验证码？)，服务器后返回一个包含用户信息(Payload中)的JWT令牌。
2. 客户端将这个JWT存放在自己的localStorage(本地存储)中，并且在每次需要用户信息的请求中在请求头中携带上该令牌。`Authorization: Bearer <JWT>`
3. 服务器接收到JWT，并进行解密，利用自己的密钥检验Signature，对用户权限进行判断。如果用户拥有访问该页面的权限，则返回相应内容。
4. 客户端接收到响应内容。

可以看出，全程服务器乐的清闲，不需要本地存储用户信息，而是将工作交给浏览器。

# 关于安全性

前面我们提到，JWT的弊病之一是Payload只经过Base64加密(≈裸奔了)，因此不能存储隐私信息。在一般情况下，客户端无需用户的隐私信息，如果必要，我们可以采用对JWT进行对称加密，用时再解密的方式来增加安全性。

另外，由于JWT被JavaScript存储在localStorage中，由于JavaScript的同源策略，网站下所有的JavaScript代码都可以访问同一个localStorage，从而获取到JWT，这就会带来注入的风险。

最后，网站一定要使用HTTPS。如果只使用HTTP，Token在网络中明文传输还是存在泄露的风险。

# 总结

此外，Web授权认证还有OAuth等方式，在此不再多说。总而言之，JWT是目前最流行也最优秀的Web授权认证方案。

# 题外话

开学就上高中了，之后更新的频率可能会降低不少<heimu title="被你发现啦">（你个狗贼还敢说）</heimu>，请见谅。