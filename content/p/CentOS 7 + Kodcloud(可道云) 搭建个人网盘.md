---
title: "使用CentOS 7 + Kodcloud(可道云) 搭建个人网盘"
date: 2020-02-14T17:10:53+08:00
categories: ["服务器"]
tags: [服务器,CentOS,搞机,网盘,教程]
slug: "kodcloud-with-centos7"
draft: false
---

**网盘接二连三的倒下，\*度网盘又开始限速，真不让人满意🐷。。**

**还是自己搭建的网盘比较靠谱……😂**

<!--more-->

### 准备材料

---

1. 带有CentOS的服务器一份

2. 装有PHP

3. 有Apache

   ~~下锅乱炖！~~

我这里采用腾讯云的CVM。

###  Step.1 安装XMAPP

---

#### 1. 下载

下载命令：

```bash
wget -c https://www.apachefriends.org/xampp-files/7.4.2/xampp-linux-x64-7.4.2-0-installer.run
```

不过有人说连接超时(我也是)，还好我是个好博主😂(大义凛然)，提供个`我的下载源`：

```bash
wget -c http://111.229.174.206/kodexplorer/data/User/admin/home/Coding/xampp-linux-x64-7.4.2-0-installer.run
```

也许比较慢，但总比下载不了好多了

下载之后会看到一个`.run`可执行文件，先添加相应的权限：

```bash
chmod +x xampp-linux-x64-7.4.2-0-installer.run
```

#### 2.安装

运行：

```bash
sudo ./xampp-linux-x64-7.4.2-0-installer.run
```

按照提示一路`y/回车`即可

### Step 2.安装可道云

---

官方下载页面：https://kodcloud.com/download/。其中有获取最新版可道云的相关命令。

#### 下载：

```bash
wget http://static.kodcloud.com/update/download/kodexplorer4.40.zip
```

### 安装：

##### 创建目录：

```bash
sudo mkdir kodexplorer
```

##### 解压：

```bash
unzip kodexplorer4.40.zip -d ./kodexplorer
```

##### 设置权限：

```bash
cd ./kodexplorer
chmod -Rf 777 ./*
```

##### 完成安装：

```bash
sudo cp -r kodexplorer/ /opt/lampp/htdocs/
cd /opt/lampp/htdocs
chmod 777 kodexplorer
chmod -R 777 kodexplorer/data/
```

### Step 3. Enjoy!

---

```
sudo /opt/lampp/xampp start
```

浏览器打开`IP地址/kodexplorer/`，设置管理员密码，开始使用。