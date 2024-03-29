---
title: "使用CloudFlare Workers搭建网站状态监控"
date: 2020-04-23T09:32:16+08:00
description: "使用CloudFlare Workers搭建网站状态监控"
keywords: ["Cloudflare","CF Workers","网站监控"]
categories: ["网站"]
tags: ["Cloudflare","CF Workers"]
slug: "cloudflare-workers-website-monitoring"
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

没啥好说的，请参考之前的文章，[万能的CLOUDFLARE WORKERS+JSProxy代理？！](/p/cf-worker-proxy)和[使用GHProxy加速GitHub](/p/ghproxy-usage)进行基础配置。

### 淦

#### 复制代码

把如下代码复制到一个新worker里，如下：

```js
/*
* @Author: yumu
* @Date:   2020-02-05
* @Email:   yumusb@foxmail.com
* @Last Modified by:   yumusb
* @Last Modified time: 2020-02-05
*/
//配置你要监控的域名
const zone = "";
//组合域名到API接口访问地址
const url = "https://api.cloudflare.com/client/v4/zones/" + zone + "/analytics/dashboard?since=-1440&continuous=true";
//你的API验证token
const token = ""
//页面显示的地址
const echourl="https://RayCoder.ME";
async function handleRequest(request) {
    let requestURL = new URL(request.url)
    let path = requestURL.pathname.split('/')[1]
    //如果URL以API开头，我们就去API调取数据并返回
    if (path.startsWith("api")) {
        let referer = request.headers.get('Referer');
        //简单的防盗链和禁止直接访问
        if (!referer || new URL(referer).hostname !== new URL(request.url).hostname) {
            return Response.redirect("https://raycoder.me", 302)
        } else {
            let new_request_headers = new Headers(request.headers);
            new_request_headers.set('Authorization', 'Bearer '+token);
            new_request_headers.set('Content-Type', "application/json");
            let original_response = await fetch(url, {
                headers: new_request_headers
            })
            let response_headers = original_response.headers;
            let new_response_headers = new Headers(response_headers);
            let status = original_response.status;
            new_response_headers.set('access-control-allow-origin', '*');
            response = new Response(original_response.body, {
                status,
                headers: new_response_headers
            })
        }
        return response;
    }
    //如果没以API开头，那就返回静态页面
    const init = {
        headers: {
            'content-type': 'text/html;charset=UTF-8',
            'Powered': "https://raycoder.me",
        },
    }
    //返回html
    const someHTML = `<!doctype html><html lang="zh-cn"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/4.0.0/css/bootstrap.min.css"><title>网站流量状态</title><style>.breadcrumb{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:.75rem 1rem;margin-top:1em;margin-bottom:1rem;list-style:none;background-color:#e9ecef;border-radius:.25rem}</style></head><body><nav class="navbar navbar-expand-lg navbar-dark bg-dark"><a class="navbar-brand" href="#">网站流量状态</a></nav><div class="jumbotron jumbotron-fluid"><div class="container"><h1 class="display-4">欢迎访问</h1><p class="lead">页面将显示 <span class="badge badge-success">`+echourl+`</span> 最近24小时的访问状态</p><p id="upd">数据将在 30 秒 后更新</p></div></div><div class="container"><div class="row"><div class="col-lg-12"><div class="row"><div class="col"><div class="card"><div class="card-header">总流量</div><div class="card-body"><blockquote class="blockquote mb-0"><p id="tbu">0 B</p><footer class="blockquote-footer">Total Data Served</footer></blockquote></div></div></div><div class="col"><div class="card"><div class="card-header">请求数</div><div class="card-body"><blockquote class="blockquote mb-0"><p id="trs">0</p><footer class="blockquote-footer">Total Requests</footer></blockquote></div></div></div><div class="col"><div class="card"><div class="card-header">访客数</div><div class="card-body"><blockquote class="blockquote mb-0"><p id="chr">0</p><footer class="blockquote-footer">Unique Visitors</footer></blockquote></div></div></div></div><nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item active" aria-current="page">各地区总流量</li></ol></nav><div class="table-responsive"><table class="table table-hover"><thead><tr><th scope="col">#</th><th scope="col">地区</th><th scope="col">流量</th></tr></thead><tbody id="statb"></tbody></table></div></div></div></div><script src="https://cdn.staticfile.org/jquery/3.4.1/jquery.min.js"></script><script src="https://cdn.staticfile.org/twitter-bootstrap/4.0.0/js/bootstrap.min.js"></script><script>function bytesToSize(t){if(0===t)return"0 B";var a=Math.floor(Math.log(t)/Math.log(1e3));return(t/Math.pow(1e3,a)).toPrecision(3)+" "+["B","KB","MB","GB","TB","PB","EB","ZB","YB"][a]}function updataData(){$.ajax({url:"/api",type:"GET",data:{RnD:Math.random()},dataType:"json",success:function(t){$("#tbu").html(bytesToSize(t.result.totals.bandwidth.all)),$("#trs").html(t.result.totals.requests.all),$("#chr").html(t.result.totals.uniques.all),$("#statb").html(""),traffic=t.result.totals.bandwidth.country,str1="",i=0,Object.keys(traffic).forEach(function(t){i++,str1="<tr><td>"+i+"</td><td>"+t+"</td><td>"+bytesToSize(traffic[t])+"</td></tr>",$("#statb").append(str1)})},error:function(){alert("获取失败!")}})}updataData();var count=30;setInterval(function(){count--,$("#upd").html("数据将在 "+count+" 秒 后更新"),0===count&&(count=30,updataData())},1e3)</script></body></html>`
    return new Response(someHTML, init)
}
addEventListener('fetch', async event => {
    event.respondWith(handleRequest(event.request))
})
```

#### 配置项



- `zone`

  就是`ZoneID`，打开某域名页面，然后下滑看右下角。

  ![](https://gitee.com/RACD/cdn/raw/master/imgs/20200423094847.png)

- `token`

  去API页面（点击右上角头像选择my profile，再选择api tokens，最后点击create token）新建一个token

  ![](https://gitee.com/RACD/cdn/raw/master/imgs/20200423094942.png)

  我们仅需要给指定zone的analytics的Read权限，就足够了。

  然后点击Continue,会返回创建的token，是一串含有字符的不规则字符串。

- 页面显示地址

  这个就是对应显示的..页面将显示xxxx最近24小时的访问状态..

之后访问即可。