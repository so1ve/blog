---
title: "Hugo博客搭配Algolia实现站内搜索"
date: 2020-04-28T10:15:15+08:00
description: "Hugo博客搭配Algolia实现站内搜索,Hugo博客站内搜索"
keywords: ["Hugo","博客","站内搜索","Algolia"]
categories: ["博客","功能添加","站内搜索"]
tags: ["Hugo","博客","站内搜索","Algolia"]
slug: "hugo-search-with-algolia"
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

### 一些闲话

Hugo博客较Hexo博客有一点不好，就是无法生成`content.json`供JS实现站内搜索。一个博客怎么可以没有站内搜索呢，找文章很不方便。

之前也捣鼓了很久Algolia站内搜索，但总是觉得大材小用了，不过不得不说，Algolia的体验真的不错。

Algolia的站内搜索实现也很简单，一起看看罢！

### 淦

#### 生成索引

##### Algolia创建空索引

###### 打开[Algolia](https://www.algolia.com)创建应用，自取名字(比如说blog)，注册这里便不再赘述

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200428105807.png)

###### 创建索引，自取名字(比如说blog)

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200428105843.png)

###### 点击侧栏 `API Keys`，记录信息(Application ID, Search-Only API Key, Admin API Key)

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200428105855.png)

##### 本地生成Algolia索引文件

在`blog/layouts/_default`里新建`list.algolia.json`，内容如下：

```go
{{/* 生成Algolia搜索索引文件 */}}
{{- $.Scratch.Add "index" slice -}}
{{/* content/p目录下的博文才生成索引，这是我的博客 */}}
{{- range where (where .Site.Pages "Type" "in" (slice "p")) "IsPage" true -}}
  {{- if not .Draft -}}
    {{- $.Scratch.Add "index" (dict "objectID" .File.UniqueID "url" .Permalink "content" (.Summary | plainify) "tags" .Params.Tags "lvl0" .Title "lvl1" .Params.Categories "lvl2" .Description) -}}
  {{- end -}}
{{- end -}}
{{- $.Scratch.Get "index" | jsonify -}}
```

里面的`"p"`需要自己修改，我的博客比较特殊，使用的Permalink为`p/<slug>/`，这个根据自己的情况自行修改，如`posts`等。多个的话只需要把`slice "p"`改为如`slice "posts" "post"`即可。

然后打开`config.toml`，进行如下修改：

```diff
[outputs]
-    home = ["HTML", "SectionsAtom", "SectionsRSS"]
+    home = ["HTML", "SectionsAtom", "SectionsRSS", "Algolia"]

...

+[outputFormats.Algolia]
+  baseName = "algolia"
+  isPlainText = true
+  mediaType = "application/json"
+  notAlternative = true
  
+[params.algolia]
+  appId = "你的Application ID"
+  indexName = "你的索引名字"
+  searchOnlyKey = "你的Search-Only API Key"
```

然后可以运行一下`hugo`命令，确认是否生成了`algolia.json`如果没有报错就行了。

#### 上传索引测试

这一步是可选的，不过还是建议跟着做一下。

点击侧栏 `Indices` ，点击 `Upload record(s)` 按钮上传上一步生成的 `algolia.json` 文件。

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200428110248.png)

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200428110433.png)

上传成功之后，我们就可以马上尝试搜索了：

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200428110742.png)

#### 自动上传

每次写完博文都手动上传索引文件无疑是痛苦的、无意义的重复劳动。

因此我们需要把上传索引文件的操作自动化，在自动部署的时候顺便完成即可。

这里我们采用npm包 [atomic-algolia](https://www.npmjs.com/package/atomic-algolia) 来完成上传操作。

##### 安装 atomic-algolia 包

```bash
npm init  // 不懂的就回车好了
npm install atomic-algolia --save
```

修改目录下的 `package.json` 文件，在 `scripts` 下添加 `"algolia": "atomic-algolia"`

```bash
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "algolia": "atomic-algolia"
},
```

注意 `"test"` 那一行末尾有个英文逗号，不要漏了。

##### 根目录下新建 `.env` 文件，内容如下：

```
ALGOLIA_APP_ID=你的Application ID
ALGOLIA_INDEX_NAME=你的索引名字
ALGOLIA_INDEX_FILE=public/algolia.json
ALGOLIA_ADMIN_KEY=你的Admin API Key
```

注意替换你自己Algolia索引的信息。

另外特别注意 `ALGOLIA_ADMIN_KEY` 可以用来管理你的索引，所以尽量不要提交到公共仓库。

##### Travis CI实现

嗯，说过了尽量不要把这些推上去，所以我们可以在Travis CI里添加变量，如图。

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200428120209.png)

然后把`.env`修改一下：

```
ALGOLIA_APP_ID=${ALGOLIA_APP_ID}
ALGOLIA_INDEX_NAME=${ALGOLIA_INDEX_NAME}
ALGOLIA_INDEX_FILE=${ALGOLIA_INDEX_FILE}
ALGOLIA_ADMIN_KEY=${ALGOLIA_ADMIN_KEY}
```

搞定了。

##### 上传索引

你可以本地执行 `npm run algolia` 查看运行效果：

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200428111122.png)

可以看到我们成功添加了记录。

后续就是把下面的命令加到你的部署脚本即可：

```bash
npm install
npm run algolia // 在hugo命令后面执行 
```

至此，如果你运行 `npm run algolia` 没有报错的话，就可以继续下一步了。

#### 添加搜索框

剩下的工作就是添加搜索框了，这一步是跟主题相关的，不过其他主题应该只需要小的调整就可以了。

###### 引入CSS文件

在主题 `layouts/partials/custom` 目录下的 `head.html` 中引入`docsearch`的CSS文件：

```go
{{- if .Site.Params.algolia.appId -}}
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css" />
{{- end -}}
```

###### 引入JS文件并初始化

在主题 `layouts/partials/custom`目录下的 `scripts.html` 中引入`docsearch`的JS文件并初始化：

```go
{{- if .Site.Params.algolia.appId -}}
<script src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"></script>
<script>
    docsearch({
    apiKey: {{ .Site.Params.algolia.searchOnlyKey }},
    indexName: {{ .Site.Params.algolia.indexName }},
    appId: {{ .Site.Params.algolia.appId }},
    inputSelector: '.docsearch-input',
    debug: false,
    });
</script>
{{- end -}}
```

###### 添加搜索框入口

在主题 `layouts/partials` 目录下的 `menu.html` 中导航栏合适的位置添加搜索框。

```go
{{- if .Site.Params.algolia.appId -}}
  <li style="display:inline-block;margin-right:10px;">
    <input type="search" class="docsearch-input" placeholder="Search" />
  </li>
{{- end -}}
```

主要是添加`<input>` 元素，`<li>` 元素根据各自主题的情况确定是否添加。
另外注意外层如果有 `overflow:hidden` 的CSS样式，可能会导致搜索结果框显示不了。😅

好辣，那么我们的站内搜索就完成了！撒花~🎉🎉🎉

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200428112156.gif)

---

参考：

- [Hugo添加Algolia搜索支持](https://edward852.github.io/post/hugo添加algolia搜索支持/)

