---
title: "Hugo-MemE/Hexo(真)自动推送部署至Netlify"
date: 2020-03-24T08:52:21+08:00
description: "Hugo/Hexo博客自动推送部署至Netlify"
categories: ["博客"]
tags: ["Hugo","Git","Netlify"]
slug: "deploy-your-hugo-and-hexo-blog-to-netlify"
draft: false
---

### Hugo

---

我之前写了一个蠢蠢的脚本，用于自动推送生成完的静态网站：

<a href="https://raycoder.me/p/hugo-auto-deploy/">Hugo-Python(伪)自动部署</a>

自以为很好……

不过在看了[reuixiy大佬的博客](https://io-oi.me/)后，才发现他有一个`Edit Me`：

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200324085718.png)

点击后发现可以`Fork`这个`Markdown`文件来修改。

不过俺们这个静态网页好像就不太行……这个脚本<heimu>有毛用！！！！</heimu>

果然是我太嫩了

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200324085950.gif)

研究了下人家的[博客Repo](https://github.com/reuixiy/io-oi.me)

没错他是直接推送一个源代码的！

咱们打开[netlify.toml](https://github.com/reuixiy/io-oi.me/blob/master/netlify.toml)

自己也新建一个`netlify.toml`(`~blog/netlify.toml`)

填入如下内容：

```toml
[build]
  publish = "public"
  command = "npm run build"

[build.environment]
  HUGO_VERSION = "YOUR_HUGO_VERSION"
  HUGO_ENV = "production"
  HUGO_ENABLEGITINFO = "true"
```

很愉快的`push`~

`push`成功啦！

`Netlify`失败了...

```
Executing user command: npm run build
npm
 ERR! code ENOENT
npm
 ERR! syscall open
npm ERR!
 path /opt/build/repo/package.json
npm ERR! errno -2
npm
 ERR! enoent ENOENT: no such file or directory, open '/opt/build/repo/package.json'
npm
ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent
npm ERR!
 A complete log of this run can be found in:
npm ERR!     /opt/buildhome/.npm/_logs/2020-03-23T23_50_59_667Z-debug.log
```

是`build`出了问题。于是我们似乎需要`npm init`，再对`package.json`进行修改：

```json
{
  "name": "blog",
  "version": "1.0.0",
  "description": "Ray's Blog",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "git config --global core.quotePath false && hugo --gc --minify --cleanDestinationDir && ./node_modules/gulp/bin/gulp.js build",
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/FFRaycoder/blog.git"
  },
  "keywords": [
    "blog",
    "hugo",
    "hugo-theme-meme"
  ],
  "author": "FFRaycoder",
  "license": "CC-BY-NC-SA-4.0",
  "bugs": {
    "url": "https://github.com/FFRaycoder/blog/issues"
  },
  "homepage": "https://github.com/FFRaycoder/blog",
  "devDependencies": {
    "gulp": "^4.0.2",
    "gulp-uglify": "^3.0.2",
    "readable-stream": "^3.6.0",
    "uglify-es": "^3.3.9",
    "workbox-build": "^5.0.0"
  }
}
```

当然，`./node_modules/gulp/bin/gulp.js build`是可选的：因为我使用了`gulp`来创建`sw.js`。

其中的配置请自己修改。

每次推送时Netlify会{{< udpoint "自动运行" >}}`hugo`指令，并且部署至他们的`CDN`~

好哒我们这就成功了~想修改的人可以直接点击下面的`Edit Me`，提个PR给我！

### Hexo

---

Hexo倒要比Hugo简单：Hexo的`node_moudles`会在执行Hexo命令时自动运行。实现Hexo甚至不需要修改`~blog/packages.json`。

修改你的`Deploy Settings`，更改成如图：

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200325075659.png)

只需你推送博客源码，Netlify就会{{< udpoint "自动帮你部署博客" >}}！！！太贴心了吧~

这样的好处是什么呢？我们都知道`hexo g`生成文件很慢，`hexo d`比你自己推送都慢🙃貌似是因为hexo要推送全部的静态文件。使用Netlify自动部署后，你只需要推送一篇新的博文，你的网站就自动帮你部署好啦~~~

{{< notice success >}}

还有一点：如果你的网站`hexo g`出现了错误，Netlify会自动回滚到前一个版本，保持你网站的正常访问！

{{< /notice >}}

赶快入坑~

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200325081213.gif)

---

2020/4/8更新：

有兴趣的同学可以使用[Forestry CMS](https://forestry.io/)，可以给静态博客加上个后台。自己捣鼓。

