---
title: "【转】适合爬虫使用的API"
date: 2020-03-08T17:04:23+08:00
tags: [爬虫, Api]
slug: "spider-api"
draft: false
original: false
---

### 一、网易云音乐

【转】<https://zhuanlan.zhihu.com/p/30246788>
调用地址：<https://api.imjad.cn/cloudmusic/>
在以上网址后紧跟两个参数完成具体请求：

1. type （默认值为type=song）
2. id（歌曲的id）
   其中type的所有可取的值如下：

|   type    |       含义       |
| :-------: | :--------------: |
|   song    |       单曲       |
|   lyric   |       歌词       |
| comments  |       评论       |
|  detail   |     歌曲详情     |
|  artist   |       歌手       |
|   album   |       专辑       |
| playlist  |       歌单       |
|    mv     |        MV        |
|  djradio  |     主播电台     |
|    dj     |  主播电台单曲ID  |
| detail_dj | 主播电台单曲详情 |
|  search   |       搜索       |

1. type=song
   当type=song时，返回歌曲的下载地址信息（和其他不是特别有用的信息）.
   所以当我们知道一首歌的id后，就可以用type=song来获取到这首歌的下载链接.
   完整请求示例：
   请求id为28012031的歌曲下载地址
   https://api.imjad.cn/cloudmusic/?type=song&id=28012031
   应当指出：此时返回的歌曲比特率为默认值128000，如果你需要音质更高的资源，可以再尾部再跟上参数br,br的取值决定音质，大概是这样：

| 参数名 |                           含义                           |  默认  |
| :----: | :------------------------------------------------------: | :----: |
|   br   | `int`，指定歌曲码率，可选：64000，128000，198000，320000 | 128000 |

完整请求示例：
请求id为28012031的歌曲下载地址，br为320000
https://api.imjad.cn/cloudmusic/?type=song&id=28012031&br=320000
我不确定是不是每一首歌都有br=320000的版本哦...(￣▽￣")

2.type=lyric
当我们知道一首歌的id后，就可以用type=lyric来获取到这首歌的歌词
完整请求示例：
请求id为28012031歌曲的歌词信息
https://api.imjad.cn/cloudmusic/?type=lyric&id=28012031
返回的歌词信息中会带有时间轴0.0

3.type=comments
当我们知道一首歌的id后，就可以用type=comments来获取到这首歌的评论信息
完整请求示例：
请求id为28012031歌曲的评论信息
https://api.imjad.cn/cloudmusic/?type=comments&id=28012031
返回的数据中有一个json数组专门存储热评，另一个json数组专门存储最新评论。
每一条评论中包含非常多的重要信息，你需要用到的里面基本上都有 ・㉨・

4.type=detail
返回一些比较基本的信息，歌曲名歌曲id，歌手名歌手id，专辑封面图之类的
完整请求示例：
请求id为28012031歌曲的detail信息
https://api.imjad.cn/cloudmusic/?type=detail&id=28012031
你试试把detail加个s...居然也有数据返回...(´・ω・`)

5.type=playlist
（playlist前面的几个值我就不具体说了，有需要的人自己试试就行）
当我们知道一个歌单的id后，就可以用type=playlist来获取到这个歌单的相关信息，例如创建者的信息啊，封面图啊，歌单被播放的次数啊....当然还有最重要的歌单内所有歌曲的简略信息（包含歌曲id等等）
完整请求示例：
请求歌单id为309390784的歌单信息
https://api.imjad.cn/cloudmusic/?type=playlist&id=309390784
当然你也可以把id改成你自己喜欢的一个歌单，至于歌单id怎么获取嘛，你在网易云音乐的歌单上按右键，复制链接，拿去浏览器里打开，地址栏里面可以看到这个歌单的id┌( ಠ_ಠ)┘

6.type=search
这个我感觉挺重要的，仔细看好了
当你指定type=search时，后面需要紧跟参数search_type，用来确定你到底需要搜个什么
search_type可以取的值如下：

| search_type |   含义   |
| :---------: | :------: |
|      1      |   单曲   |
|     10      |   专辑   |
|     100     |   歌手   |
|    1000     |   歌单   |
|    1002     |   用户   |
|    1004     |    mv    |
|    1006     |   歌词   |
|    1009     | 主播电台 |

1.search_type=1
默认情况下search_type的值为1，搜索单曲。后面紧跟s=xxxxx来指定搜索的关键字
完整请求示例：
搜索单曲，关键字为cocoon（歌名）
https://api.imjad.cn/cloudmusic/?type=search&search_type=1&s=cocoon
返回很多歌名为cocoon的歌曲信息，大概返回多少首我不知道，你需要的里面应该有..

2.search_type=1000
搜索歌单。用歌单名用作关键字，来搜索歌单这样的简单东西就不说了，这里提一下另外一点，出了歌单名之外，你可以用用户名来作为关键字，这样返回的是该用户创建的所有歌单
完整请求示例：
搜索歌单，用户CeuiLiSA所创建的所有歌单（我自己的用户名）
https://api.imjad.cn/cloudmusic/?type=search&search_type=1000&s=CeuiLiSA
返回的是歌单的简略信息，没有歌单内的具体的歌。只有id啊封面啊之类的内容，但是你只要有了歌单id，那就可以取得所有你需要的信息啦。。

3.search_type=1002
这样就可以搜索到网易云音乐的某个用户信息了。返回的用户信息不多不少，刚好可以用来做用户信息展示的页面。
完整请求示例：
搜索用户，关键字为CeuiLiSA。
https://api.imjad.cn/cloudmusic/?type=search&search_type=1002&s=CeuiLiSA

