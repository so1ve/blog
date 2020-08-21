---
title: "Vue中的{ __ob__: Observer }问题解决"
date: 2020-08-21T07:47:32+08:00
draft: false
keywords: ['Vue', 'Vue问题', '前端', '{ __ob__: Observer }']
categories: ['前端', 'Vue']
tags: ['前端', 'Vue', 'Vue问题']
slug: "vue-ob-observer-problem"
categoryLink: "/"
toc: true
comments: true
buy: false
buyLink: ""
buyName: ""
buyInfo: ""
buyImage: ""
buyButtonText: ""
---

> **写作不易，资瓷一下呗！本文首发于个人博客：<https://raycoder.me>**

在Vue的开发中，我们经常有异步获取数据的情况，在没有数据的时候使用骨架装载器占位，比如（[LeanBook](https://github.com/FFRaycoder/leanbook/blob/master/src/views/Home.vue#L51)）：

```html
<template>
    <div>
        <v-row>
            <template v-if="books">
            </template>
            <template v-else>
                <v-card
                    min-width="344"
                    min-height="286"
                    class="mx-4"
                >
                    <v-skeleton-loader
                        class="mx-auto"
                        type="card, list-item"
                    ></v-skeleton-loader>
                </v-card>
            </template>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: 'HomePage',
        data () {
            return {
                books: []
            }
        },
        components: {
            Item
        },
        mounted () {
            document.title = 'Leanbook - Index'
            this.$store.dispatch('mock/getBooksData')
        }
    }
</script>
```

然后通过axios之类的异步库（Vuex）来获取数据。

嘶，然后，出问题了。

`Skeleton Loader`没显示啊！

咦，啥情况？！我们来打印一下`books`：

![](https://s1.ax1x.com/2020/08/21/dYEIrF.png)

好吧，原来Vue为了监视数值的变化加了一个`Observer`……

那么我们就有思路了，用`JSON.stringify`来监测这个数组是不是空数组。

```html
<template>
    <div>
        <v-row>
            <template v-if="JSON.stringify(books) !== '[]'">
            </template>
            <template v-else>
                <v-card
                    min-width="344"
                    min-height="286"
                    class="mx-4"
                >
                    <v-skeleton-loader
                        class="mx-auto"
                        type="card, list-item"
                    ></v-skeleton-loader>
                </v-card>
            </template>
        </v-row>
    </div>
</template>
```

> 网上的教程都是使用`JSON.parse(JSON.stringfy())`来取值，相当于深拷贝。但是我们这里的值可能会变动，所以不能深拷贝，只能使用`JSON.stringify()`。
>
> 如果需要在其他地方取值，那么需要深拷贝。

好的，加入完`JSON.stringify`之后，`Skeleton Loader`工作了！

全文完