---
title: "Hugo-HTML版GOTO链接中转页"
date: 2020-03-19T15:13:31+08:00
description: "Hugo-HTML版GOTO链接中转页"
categories: ["HTML"]
tags: ["HTML", "中转", "JS"]
slug: "goto-transfer-page"
draft: false
---

[原作者](http://www.aeink.com/791.html)是PHP版本，我把它移植到了HTML上。代码很丑，勿喷！（适用于Hugo）

自己在`./blog/static/`下新建`goto/index.html`，代码如下。

```html
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width">
<meta name="robots" content="noindex, nofollow" />
<noscript><meta http-equiv="refresh" content="1;url='';"></noscript>
<meta charset="UTF-8">
<!--[if IE 8]>
<style>
.ie8 .alert-circle,.ie8 .alert-footer{display:none}.ie8 .alert-box{padding-top:75px}.ie8 .alert-sec-text{top:45px}
</style>
<![endif]-->

<script>
function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
       }
       return(null);
}
</script>
<title></title>
<script>
	x = document.getElementsByTagName("title")[0];
	x.innerHTML="外链跳转 - " + getQueryVariable("url");
</script>
<style>
body{margin:0;padding:0;background:#E6EAEB;font-family:Arial,'微软雅黑','宋体',sans-serif}.main{position:absolute;left:calc(50% - 200px);top:calc(50% - 13em)}.alert-box{display:none;position:relative;margin:auto;padding:180px 85px 22px;border-radius:10px 10px 0 0;background:#FFF;box-shadow:5px 9px 17px rgba(102,102,102,.75);width:286px;color:#FFF;text-align:center}.alert-box p{margin:0}.alert-circle{position:absolute;top:-50px;left:111px}.alert-sec-circle{stroke-dashoffset:0;stroke-dasharray:735;transition:stroke-dashoffset 1s linear}.alert-sec-text{position:absolute;top:11px;left:190px;width:76px;color:#000;font-size:68px}.alert-sec-unit{font-size:34px}.alert-body{margin:35px 0}.alert-head{color:#242424;font-size:28px}.alert-concent{margin:25px 0 14px;color:#7B7B7B;font-size:18px}.alert-concent p{line-height:27px}.alert-btn{display:block;border-radius:10px;background-color:#4AB0F7;height:55px;line-height:55px;width:286px;color:#FFF;font-size:20px;text-decoration:none;letter-spacing:2px}.alert-btn:hover{background-color:#6BC2FF}.alert-footer{margin:0 auto;height:42px;width:120px}.alert-footer-icon{float:left}.alert-footer-text{float:left;border-left:2px solid #EEE;padding:3px 0 0 5px;height:40px;color:#0B85CC;font-size:12px;text-align:left}.alert-footer-text p{color:#7A7A7A;font-size:22px;line-height:18px}
</style>
</head>
<body class="ie8" style="">
<div class="main">
	<div id="js-alert-box" class="alert-box" style="display:block">
		<svg class="alert-circle" width="234" height="234"><circle cx="117" cy="117" r="108" fill="#FFF" stroke="#43AEFA" stroke-width="17"></circle><circle id="js-sec-circle" class="alert-sec-circle" cx="117" cy="117" r="108" fill="transparent" stroke="#F4F1F1" stroke-width="18" transform="rotate(-90 117 117)" style="stroke-dashoffset:-514px"></circle><text class="alert-sec-unit" x="100" y="172" fill="#BDBDBD">秒</text></svg>
		<div id="js-sec-text" class="alert-sec-text">
			3
		</div>
		<div class="alert-body">
			<div id="js-alert-head" class="alert-head">
				<script>getQueryVariable("url");</script>
			</div>
			<div class="alert-concent">
				<p>
					Loading...
				</p>
			</div>
			<a id="js-alert-btn" class="alert-btn">立即前往</a>
			<script>
				x = document.getElementById("js-alert-btn");
				x.innerHTML="<a id=\"js-alert-btn\" class=\"alert-btn\" href=\"" + getQueryVariable("url") + "\">立即前往</a>";
			</script>
		</div>
		<div class="alert-footer clearfix">
			<svg width="46px" height="42px" class="alert-footer-icon"><circle fill-rule="evenodd" clip-rule="evenodd" fill="#7B7B7B" stroke="#DEDFE0" stroke-width="2" stroke-miterlimit="10" cx="21.917" cy="21.25" r="17"></circle><path fill="#FFF" d="M22.907,27.83h-1.98l0.3-2.92c-0.37-0.22-0.61-0.63-0.61-1.1c0-0.71,0.58-1.29,1.3-1.29s1.3,0.58,1.3,1.29 c0,0.47-0.24,0.88-0.61,1.1L22.907,27.83z M18.327,17.51c0-1.98,1.61-3.59,3.59-3.59s3.59,1.61,3.59,3.59v2.59h-7.18V17.51z M27.687,20.1v-2.59c0-3.18-2.59-5.76-5.77-5.76s-5.76,2.58-5.76,5.76v2.59h-1.24v10.65h14V20.1H27.687z"></path><circle fill-rule="evenodd" clip-rule="evenodd" fill="#FEFEFE" cx="35.417" cy="10.75" r="6.5"></circle><polygon fill="#7B7B7B" stroke="#7B7B7B" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="35.417,12.16 32.797,9.03 31.917,10.07 35.417,14.25 42.917,5.29 42.037,4.25 "></polygon></svg>
			<div class="alert-footer-text">
				<p>secure</p>安全加密
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
function alertSet(e) {
	
	document.getElementById("js-alert-box").style.display = "block", document.getElementById("js-alert-head").innerHTML = e;
	var t = 5,
		n = document.getElementById("js-sec-circle");
	document.getElementById("js-sec-text").innerHTML = t, setInterval(function() {
		if (0 == t) location.href = getQueryVariable("url");
		else {
			t -= 1, document.getElementById("js-sec-text").innerHTML = t;
			var e = Math.round(t / 5 * 735);
			n.style.strokeDashoffset = e - 735
		}
	}, 970)
} </script>
<script>alertSet(getQueryVariable("url"));</script>
</body>
</html>
```

使用的时候链接如下：

```html
https://raycoder.me/goto/?url=https://raycoder.me
```

这里以`MemE`主题为例，批量替换网页中非本站`a标签`。打开`./blog/themes/meme/layouts/partials/custom/content.html`，写入如下内容：

```html
{{- $host := "" -}}
{{- $redirect := "/goto/" -}}

{{- $Content := .Scratch.Get "Content" -}}
{{- $regex := printf `<a href="(https?://%s[^"]+)"` $host -}}
{{- $replacement := printf `<a href="%s?url=$1"` $redirect -}}
{{- $Content := $Content | replaceRE $regex $replacement | safeHTML -}}
{{- .Scratch.Set "Content" $Content -}}
```

这个代码是让所有外链在跳转页中打开，假如你只想让特定网址在跳转页中打开，那么可以在`{{- $host := "" -}}`中填入内容，如`{{- $host := "example.com" -}}`。

---

参考资料：

- [如何让所有外链全部在一个中转页打开？ | Github Issue](https://github.com/reuixiy/hugo-theme-meme/issues/81)

- [本站自用跳转页面go.php源码 | AE博客](http://www.aeink.com/791.html)