---
title: "Vue3的改变有哪些？"
date: 2020-07-19T18:39:22+08:00
draft: false
keywords: ["Vue", "Vue3", "前端"]
categories: ["前端", "Vue"]
tags: ["前端", "Vue", "Vue3"]
slug: "vue3-design"
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

> **写作不易，资瓷一下呗！本文首发于个人博客：<https://raycoder.me>**
>

### 咕了这么久，我干了什么？

呼，俺前些天在准备**期末考试**，终于放假了~~~😍😍😍🎉🎉🎉可以更新一下博客了！

### 学 了 什 么（活 到 老 学 到 老）

哦，`JS`、`Vue`和`React`。

### 为什么关注`Vue3`？

不巧的是，我刚刚掌握`Vue2`的时候，`Vue3.0`RC🤢🤔

### 正文开始

（`Vue3`英文文档：<https://v3.vuejs.org>）

#### Vue3重写原因？

- `Tree shaking support`：可以将无用模块“剪辑”，仅打包需要的。

- `Composition API`：组合`API`

- `Better TypeScript support`：更优秀的Ts支持

- 更好的`Virtual DOM Diff算法`
- 代码的`聚集性`

##### `Composition API`：组合`API`

在`Vue 2.x`中，浏览器端和`webpack`都可以使用一个Vue对象（`import Vue from "vue"`）。

而在`Vue3`中（`webpack`环境），你可以通过从Vue中导入所需功能来使用，有助于减小代码体积）

```vue
<template>
  <button @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}
  </button>
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })

    function increment() {
      state.count++
    }

    return {
      state,
      increment
    }
  }
}
</script>
```

参阅：<https://composition-api.vuejs.org/>

##### 代码的`聚集性`

使用组件时，一个HTML节点可能会与多个选项相关：

```vue
<template>
	<input v-model="inputVal" @blur="handleBlur" :style="inputStyle"></input>
</template>

<script>
    prefixCls = `test-input`
    export default {
        data () {
            return {
                inputVal: '',
                prefixCls: prefixCls
                // ...
            }
        },
        methods: {
            handleBlur () {
                // Handle Blur
            }
            // ...
        },
        computed: {
            inputStyle () {
                return [`${prefixCls}`]
            },
            // ...
        },
        watch: {
            inputVal () {
                handleInput()
            },
            // ...
        },
        // ...
    }
</script>

<style>...</style>
```

如是，一个`input`的代码被分散到了许多选项中：`data`，`methods`，`computed`，`watch`，如Vue官方图：

<p align="center">
<img src="https://gitee.com/RACD/cdn/raw/master/imgs/20200719190119.png" style="width:131px">
</p>

Vue官方示例如下：

```js
function useCreateFolder (openFolder) {
  // originally data properties
  const showNewFolder = ref(false)
  const newFolderName = ref('')

  // originally computed property
  const newFolderValid = computed(() => isValidMultiName(newFolderName.value))

  // originally a method
  async function createFolder () {
    if (!newFolderValid.value) return
    const result = await mutate({
      mutation: FOLDER_CREATE,
      variables: {
        name: newFolderName.value
      }
    })
    openFolder(result.data.folderCreate.path)
    newFolderName.value = ''
    showNewFolder.value = false
  }

  return {
    showNewFolder,
    newFolderName,
    newFolderValid,
    createFolder
  }
}
```

![](https://gitee.com/RACD/cdn/raw/master/imgs/20200719191506.png)

---

Q.是不是`Vue3`就不能使用选项API了？

A.可以用，这是两个并存的API。

推荐视频：<https://www.bilibili.com/video/BV1ke411W7WB/?spm_id_from=333.788.videocard.6>

