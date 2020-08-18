---
title: "从零开始写一个音乐爬虫-4：QQ音乐"
date: 2020-03-05T10:43:15+08:00
categories: ["Python","爬虫"]
tags: [Python,爬虫,QQ音乐,福利,破解,音乐,会员,Python进阶]
slug: "qqmusic-spider-artlist"
weight: 0
draft: false
---

划了这么多天水，我终于回来了……
![](https://raycoder.me/post-images/1583376357108.jpg)
毕竟博主也是要上课的,QwQ。
最近终于抽出一些时间了，研究研究QQ音乐的爬虫。
我们随便打开一个歌单(<https://y.qq.com/n/yqq/playlist/6809716883.html>)，登录自己的QQ：
![https://y.qq.com/n/yqq/playlist/6809716883.html](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200316130255.png "https://y.qq.com/n/yqq/playlist/6809716883.html")
？QQ音乐竟然还对网页端做限制！![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200316130506.png)
根据我多年的前(摸)端(爬)开(滚)发(打)经验，这种网站一定是通过`JS`做限制，并且在浏览器的`Network`中一定会有相关的数据。
我们先打开一个音乐链接(<https://y.qq.com/n/yqq/song/004WKx9W0E7skj.html> ==> 播放)：
![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200316130739.png)
发现所有的音乐最后都指向<https://y.qq.com/portal/player.html>这个网址。所以我们可以做如下判断：这个东西是通过传`Cookie`来播放音乐的，所以它的`Network`中绝对会有相应的`音乐文件`    。
果不其然，里边有一个如下的链接：
`https://isure.stream.qqmusic.qq.com/C400003jblv923cckE.m4a?guid=2092345306&vkey=0C2C0214E13FDAA60DF4560C8CAFB591C5C8D31854F25B79A59E07FE292AFF133E2B053C4A96C190ACA1582BD0476710ECCF87F6826D15A2&uin=4354&fromtag=66`
经过观察，发现它的格式如下：
`https://isure.stream.qqmusic.qq.com/C400<MID>.m4a?guid=<GUID>&vkey=<VKEY>&uin=4354&fromtag=66`，`uin`和`fromtag`是不变的。
所以我们再返回歌单页，打开控制台，找到了如下文件：
![](https://cdn.jsdelivr.net/gh/FFRaycoder/cdn/imgs/20200316130803.png)
好的，我们通过观察，发现这是一个格式类似于如下的文件：

```json
{'accessed_favbase': 1,
 'accessed_plaza_cache': 0,
 'cdlist': [{'album_pic_mid': '',
             'buynum': 0,
             'cmtnum': 0,
             'coveradurl': '',
             'ctime': 1552789122,
             'cur_song_num': 70,
             'desc': 'YouTuber阿神背景音乐，Bob们快来听听吧！阿神加油，我们会永远支持你的！',
             'dir_pic_url2': '',
             'dir_show': 1,
             'dirid': 2,
             'dissid': 6809716,
             'dissname': '阿神常用BGM',
             'disstid': '6809716883',
             'disstype': 0,
             'encrypt_uin': 'oK6kowEAoK4z7eSiNevzoivlov**',
             'headurl': 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK1iaxx2AdrAQDGlibrNZicyaYspzibEWTeCIHOGHPpMOau3MFofE1e5oJwEGHTrBUzrLegbPYiaNOicPaQ/132',
             'ifpicurl': '',
             'isAd': 0,
             'isdj': 0,
             'isvip': 0,
             'login': 'oK-57KEA7w4ion**',
             'logo': 'http://qpic.y.qq.com/music_cover/huYTu7R6ZfqKlvicEsOAPc5D6PTtzz0caVENpSkmJnF4IbCCI7iaWqnz7SQXcf474k/300?n=1',
             'mtime': 0,
             'nick': 'Max',
             'nickname': 'Max',
             'owndir': 0,
             'pic_dpi': 300,
             'pic_mid': '',
             'scoreavage': '0.0',
             'scoreusercount': 0,
             'singerid': 0,
             'singermid': '',
             'song_begin': 0,
             'song_update_num': 0,
             'song_update_time': 0,
             'songids': '108412441,108412318,236593788,212656442,204897711,203546728,101688454,201272163,215240933,201272176,105055346,125803989,201287859,4998977,220183309,1875424,200448238,107600922,202985843,201272151,102994348,4941179,200980117,102179620,108412364,1144219,108920995,4799526,200316483,125586926,108547678,214531352,214483351,108412363,225361408,201272168,201272164,213407792,215240934,108031940,109296153,102215437,203021286,104769082,201272157,200980118,213407791,201272160,200980114,201272153,200980111,201438505,201272165,109996034,202916713,202617948,109296152,201422059,200604508,203836723,9072513,201255271,201287877,102222132,105389125,108412359,215360418,109225063,102206145,219032454',
             'songlist': [{'action': {'alert': 2,
                                      'icons': 8535932,
                                      'msgid': 14,
                                      'msgpay': 6,
                                      'switch': 17409795},
                           'album': {'id': 1594129,
                                     'mid': '001j2IHy2CkIaz',
                                     'name': 'UNDERTALE Soundtrack',
                                     'pmid': '001j2IHy2CkIaz_2',
                                     'subtitle': '',
                                     'title': 'UNDERTALE Soundtrack'},
                           'file': {'b_30s': 0,
                                    'e_30s': 0,
                                    'media_mid': '003jblv923cckE',
                                    'size_128': 724989,
                                    'size_128mp3': 724989,
                                    'size_192aac': 1046138,
                                    'size_192ogg': 807221,
                                    'size_24aac': 0,
                                    'size_320': 1812101,
                                    'size_320mp3': 1812101,
                                    'size_48aac': 264852,
                                    'size_96aac': 523498,
                                    'size_aac': 264852,
                                    'size_ape': 0,
                                    'size_dts': 0,
                                    'size_flac': 2120013,
                                    'size_ogg': 807221,
                                    'size_try': 0,
                                    'try_begin': 0,
                                    'try_end': 0},
                           'fnote': 4009,
                           'genre': 37,
                           'id': 108412441,
                           'index_album': 44,
                           'index_cd': 0,
                           'interval': 45,
                           'isonly': 0,
                           'ksong': {'id': 0, 'mid': ''},
                           'language': 9,
                           'mid': '004WKx9W0E7skj',
                           'mv': {'id': 0, 'vid': ''},
                           'name': 'Tem Shop',
                           'ov': 0,
                           'pay': {'pay_down': 1,
                                   'pay_month': 1,
                                   'pay_play': 0,
                                   'pay_status': 0,
                                   'price_album': 0,
                                   'price_track': 200,
                                   'time_free': 0},
                           'sa': 16,
                           'singer': [{'id': 1204192,
                                       'mid': '0045aGTp3XRXLD',
                                       'name': 'Toby Fox',
                                       'title': 'Toby Fox'}],
                           'songtype': 13,
                           'status': 0,
                           'subtitle': '',
                           'tid': 0,
                           'time_public': '2015-09-15',
                           'title': 'Tem Shop',
                           'type': 0,
                           'url': '',
                           'volume': {'gain': 0.0, 'lra': 0.0, 'peak': 0.0}},
             'songnum': 70,
             'songtypes': '13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13',
             'tags': [{'id': 199, 'name': '背景音乐', 'pid': 199},
                      {'id': 117, 'name': '快乐', 'pid': 117},
                      {'id': 116, 'name': '治愈', 'pid': 116}],
             'total_song_num': 70,
             'type': 0,
             'uin': 'oK6kowEAoK4z7eSiNevzoivlov**',
             'visitnum': 170366}],
 'cdnum': 1,
 'code': 0,
 'login': 'oK-57KEA7w4ion**',
 'realcdnum': 1,
 'subcode': 0}
```

很容易看出，里面有我们所需的`<MID>`。但是`<VKEY>`并没有出现。所以，我们必须换一种思路了。
查找了网络上的资料，发现有一个音乐信息外链：
`https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&data=%7B%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%22358840384%22%2C%22songmid%22%3A%5B%22<MID>%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%221443481947%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A%2218585073516%22%2C%22format%22%3A%22json%22%2C%22ct%22%3A24%2C%22cv%22%3A0%7D%7D`
这个是经过`URL编码`的，解密后结果如下：
`https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&data={"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"358840384","songmid":["<MID>"],"songtype":[0],"uin":"1443481947","loginflag":1,"platform":"20"}},"comm":{"uin":"18585073516","format":"json","ct":24,"cv":0}}`
好的，看来我们只需要这个`<MID>`即可。
我们在上面的步骤已经获得了`<MID>`，把它放进那个URL，会找到一个数据文件。如下(链接：<https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&data=%7B%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%22358840384%22%2C%22songmid%22%3A%5B%22004WKx9W0E7skj%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%221443481947%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A%2218585073516%22%2C%22format%22%3A%22json%22%2C%22ct%22%3A24%2C%22cv%22%3A0%7D%7D>)：

```json
{"code":0,"ts":1583379252481,"req_0":{"code":0,"data":{ "expiration": 80400, "login_key": "", "midurlinfo": [ { "common_downfromtag": 0, "errtype": "", "filename": "C400003jblv923cckE.m4a", "flowfromtag": "", "flowurl": "", "hisbuy": 0, "hisdown": 0, "isbuy": 0, "isonly": 0, "onecan": 0, "opi128kurl": "", "opi192koggurl": "", "opi192kurl": "", "opi30surl": "", "opi48kurl": "", "opi96kurl": "", "opiflackurl": "", "p2pfromtag": 0, "pdl": 0, "pneed": 0, "pneedbuy": 0, "premain": 0, "purl": "C400003jblv923cckE.m4a?guid=358840384&vkey=9B9B50B3B25F0A5B339075E830EDE2E10FDC429A412FD272C65C2C0BA96846C98CF95F046C4B6E76BB16191F791104AB1B949E0C5168C3D0&uin=0&fromtag=66", "qmdlfromtag": 0, "result": 0, "songmid": "004WKx9W0E7skj", "tips": "", "uiAlert": 0, "vip_downfromtag": 0, "vkey": "9B9B50B3B25F0A5B339075E830EDE2E10FDC429A412FD272C65C2C0BA96846C98CF95F046C4B6E76BB16191F791104AB1B949E0C5168C3D0", "wififromtag": "", "wifiurl": "" } ], "msg": "<IP>", "retcode": 0, "servercheck": "0502f67d8cf451662c4b46417d571295", "sip": [ "http:\/\/ws.stream.qqmusic.qq.com\/", "http:\/\/isure.stream.qqmusic.qq.com\/" ], "testfile2g": "C400003mAan70zUy5O.m4a?guid=358840384&vkey=62F3CE198C73F66E7207E03BFB4F4C29BC086BF77E55DDC7C81ECEB156B8736E26F5B8360E5C63E0B6ADAB89779732648AF943136A70DC05&uin=&fromtag=3", "testfilewifi": "C400003mAan70zUy5O.m4a?guid=358840384&vkey=62F3CE198C73F66E7207E03BFB4F4C29BC086BF77E55DDC7C81ECEB156B8736E26F5B8360E5C63E0B6ADAB89779732648AF943136A70DC05&uin=&fromtag=3", "thirdip": [ "", "" ], "uin": "", "verify_type": 0 }}}
```

再把`purl`代入外链`https://isure.stream.qqmusic.qq.com`(`http://ws.stream.qqmusic.qq.com`也可以)，得到如下链接：
`https://isure.stream.qqmusic.qq.com/C400003jblv923cckE.m4a?guid=358840384&vkey=9B9B50B3B25F0A5B339075E830EDE2E10FDC429A412FD272C65C2C0BA96846C98CF95F046C4B6E76BB16191F791104AB1B949E0C5168C3D0&uin=0&fromtag=66`
打开，便是我们想要的音乐文件了。下载音乐，请参考我的前两篇文章：
<a href="/post/CUlLXMwcx/" class="LinkCard">从零开始写一个音乐爬虫-2-网易云音乐：下载音乐文件</a>
<a href="/post/lOWHTeAPC/" class="LinkCard">从零开始写一个音乐爬虫-3-酷狗音乐</a>
代码之后放上来。