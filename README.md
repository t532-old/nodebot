# nodebot
![nodebot Icon](https://gitlab.com/trustgit/nodebot/raw/master/doc/static/backgrounded-icon.jpg)

[![license](https://img.shields.io/badge/license-MIT-55aa55.svg)](https://gitlab.com/trustgit/nodebot/blob/master/LICENSE)
[![pipeline status](https://gitlab.com/trustgit/nodebot/badges/master/pipeline.svg)](https://gitlab.com/trustgit/nodebot/commits/master)
[![GitLab (pre-)release](https://img.shields.io/badge/see-latest%20release-5555ff.svg)](https://gitlab.com/trustgit/nodebot/tags)
[![GitLab repo wiki](https://img.shields.io/badge/read-repo%20wiki-ffaa55.svg)](https://gitlab.com/trustgit/nodebot/wikis)
[![凑badge（](https://img.shields.io/badge/developed%20for-osu!-ff6699.svg)](https://osu.ppy.sh/home)

**nodebot 是一个模块化，轻量化 (~350 sloc) 的，基于命令的 Node.js qqbot 框架。**

nodebot 同时附带了模块 `osubot`，`botinfo`，`helper` 与 `utility` (共 ~1400 sloc)，包含了 osu! qq bot 所需的基础功能。

## 使用
该框架 **没有** 上传至 npm。请使用 git clone 来将本框架下载到本地：

```shell
git clone https://gitlab.com/trustgit/nodebot.git
cd nodebot
```

之后参考 [Bot 开发：构建](https://gitlab.com/trustgit/nodebot/wikis/Build)。

~~其实主要是因为 nodebot 这个 package name 被抢了~~

## 帮助中心
- **[Bot 用户：指令](https://gitlab.com/trustgit/nodebot/wikis/Commands)**
- [Bot 开发：构建](https://gitlab.com/trustgit/nodebot/wikis/Build)
- [Bot 开发：扩展](https://gitlab.com/trustgit/nodebot/wikis/Development)
- [？？？：关于 Bot](https://gitlab.com/trustgit/nodebot/wikis/About)

## 一些废话
nodebot 缓存导致错误的命令消息。  
nodebot 同时为开发者提供将所有消息 log 到控制台的功能，这些信息是临时的，每次控制台被关闭时就会被清除。  
自 3.3.0 后，nodebot 为开发者提供统计命令使用次数的功能。我们只会统计命令名称和次数，不会存储任何参数和其他聊天信息。  
~~不过说实话，你消息都发出来了还怕你 :horse: 缓存呢？~~