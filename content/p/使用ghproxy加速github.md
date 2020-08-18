---
title: "使用GHProxy加速GitHub"
date: 2020-04-23T08:14:51+08:00
description: "使用GHProxy加速GitHub"
keywords: ["加速GitHub","GitHub"]
categories: ["代理"]
tags: ["Workers","GitHub","代理"]
slug: "ghproxy-usage"
weight: 0
comments: true
draft: false
related: true
displayCopyright: true
badge: true
gitinfo: true
---

> **写作不易，资瓷一下呗！本文首发于个人博客：<https://raycoder.me>**
>

### 先氵一点

GitHub由于仓库部署在国外，天朝的强大阻断了数据传输<heimu>二</heimu>，GitHub上面的项目Clone速度是真的惨不忍睹

![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200423084605.png)

当然也有人说，Gitee复制一下仓库，Clone下来再改配置不就行了吗？

emmm是可以，但是Gitee也无法复制项目的Releases。

<heimu>艾玛真烦</heimu>

最近康到一篇文章，感觉还不错，分享给大家<https://hunsh.net/archives/23>，好像是基于JSProxy的一个GH代理，JSProxy之前已经搭过了，决定再氵一篇`GHProxy`的文章:smirk:

---

### 正文开始

#### 基础配置

这个就不多说了，自己看[万能的CLOUDFLARE WORKERS+JSProxy代理？！](/p/cf-worker-proxy/)，注册一个账号，修改域名NS。

#### 开淦

这个比JSProxy的配置还要简单，新建一个worker，把代码复制到workers的代码里。

```js
'use strict'

/**
 * static files (404.html, sw.js, conf.js)
 */
const ASSET_URL = 'https://hunshcn.github.io/gh-proxy'
// 前缀，如果自定义路由为example.com/gh/*，将PREFIX改为 '/gh/'，注意，少一个杠都会错！
const PREFIX = '/'
// git使用cnpmjs镜像、分支文件使用jsDelivr镜像的开关，0为关闭，默认开启
const Config = {
    jsdelivr: 1,
    cnpmjs: 1
}

/** @type {RequestInit} */
const PREFLIGHT_INIT = {
    status: 204,
    headers: new Headers({
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
        'access-control-max-age': '1728000',
    }),
}

/**
 * @param {any} body
 * @param {number} status
 * @param {Object<string, string>} headers
 */
function makeRes(body, status = 200, headers = {}) {
    headers['access-control-allow-origin'] = '*'
    return new Response(body, {status, headers})
}


/**
 * @param {string} urlStr
 */
function newUrl(urlStr) {
    try {
        return new URL(urlStr)
    } catch (err) {
        return null
    }
}


addEventListener('fetch', e => {
    const ret = fetchHandler(e)
        .catch(err => makeRes('cfworker error:\n' + err.stack, 502))
    e.respondWith(ret)
})


/**
 * @param {FetchEvent} e
 */
async function fetchHandler(e) {
    const req = e.request
    const urlStr = req.url
    const urlObj = new URL(urlStr)
    let path = urlObj.searchParams.get('q')
    if (path) {
        return Response.redirect('https://' + urlObj.host + PREFIX + path, 301)
    }
    // cfworker 会把路径中的 `//` 合并成 `/`
    path = urlObj.href.substr(urlObj.origin.length + PREFIX.length).replace(/^https?:\/+/, 'https://')
    const exp1 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:releases|archive)\/.*$/i
    const exp2 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:blob)\/.*$/i
    const exp3 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:info|git-upload-pack).*$/i
    const exp4 = /^(?:https?:\/\/)?raw\.githubusercontent\.com\/.+?\/.+?\/.+?\/.+$/i
    if (path.search(exp1) === 0 || !Config.jsdelivr && path.search(exp2) === 0 || !Config.cnpmjs && (path.search(exp3) === 0 || path.search(exp4))) {
        return httpHandler(req, path)
    } else if (path.search(exp2) === 0) {
        const newUrl = path.replace('/blob/', '@').replace(/^(?:https?:\/\/)?github\.com/, 'https://cdn.jsdelivr.net/gh')
        return Response.redirect(newUrl, 302)
    } else if (path.search(exp3) === 0) {
        const newUrl = path.replace(/^(?:https?:\/\/)?github\.com/, 'https://github.com.cnpmjs.org')
        return Response.redirect(newUrl, 302)
    } else if (path.search(exp4) === 0) {
        const newUrl = path.replace(/(?<=com\/.+?\/.+?)\/(.+?\/)/, '@$1').replace(/^(?:https?:\/\/)?raw\.githubusercontent\.com/, 'https://cdn.jsdelivr.net/gh')
        return Response.redirect(newUrl, 302)
    } else {
        return fetch(ASSET_URL + path)
    }
}


/**
 * @param {Request} req
 * @param {string} pathname
 */
function httpHandler(req, pathname) {
    const reqHdrRaw = req.headers

    // preflight
    if (req.method === 'OPTIONS' &&
        reqHdrRaw.has('access-control-request-headers')
    ) {
        return new Response(null, PREFLIGHT_INIT)
    }

    let rawLen = ''

    const reqHdrNew = new Headers(reqHdrRaw)

    let urlStr = pathname
    if (urlStr.startsWith('github')) {
        urlStr = 'https://' + urlStr
    }
    const urlObj = newUrl(urlStr)

    /** @type {RequestInit} */
    const reqInit = {
        method: req.method,
        headers: reqHdrNew,
        redirect: 'follow',
        body: req.body
    }
    return proxy(urlObj, reqInit, rawLen, 0)
}


/**
 *
 * @param {URL} urlObj
 * @param {RequestInit} reqInit
 */
async function proxy(urlObj, reqInit, rawLen) {
    const res = await fetch(urlObj.href, reqInit)
    const resHdrOld = res.headers
    const resHdrNew = new Headers(resHdrOld)

    // verify
    if (rawLen) {
        const newLen = resHdrOld.get('content-length') || ''
        const badLen = (rawLen !== newLen)

        if (badLen) {
            return makeRes(res.body, 400, {
                '--error': `bad len: ${newLen}, except: ${rawLen}`,
                'access-control-expose-headers': '--error',
            })
        }
    }
    const status = res.status
    resHdrNew.set('access-control-expose-headers', '*')
    resHdrNew.set('access-control-allow-origin', '*')

    resHdrNew.delete('content-security-policy')
    resHdrNew.delete('content-security-policy-report-only')
    resHdrNew.delete('clear-site-data')

    return new Response(res.body, {
        status,
        headers: resHdrNew,
    })
}

```

`index.js`默认配置下clone走`github.com.cnpmjs.org`，项目文件会走`jsDeliver`，如需走worker，修改`Config`变量即可

`ASSET_URL`是静态资源的url（实际上就是现在显示出来的那个输入框单页面）

`PREFIX`是前缀，默认（根路径情况为`"/"`），如果自定义路由为`example.com/gh/*`，请将PREFIX改为 `'/gh/'`，注意，少一个杠都会错！

好的，就这么没了 :dog:（真的GHProxy的配置贼简单），想自定义域名的请看[万能的CLOUDFLARE WORKERS+JSProxy代理？！](/p/cf-worker-proxy/)。

