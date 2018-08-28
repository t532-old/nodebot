# nodebot
![nodebot Icon](https://gitlab.com/trustgit/nodebot/raw/master/doc/static/backgrounded-icon.jpg)

[![license](https://img.shields.io/badge/license-MIT-55aa55.svg)](https://gitlab.com/trustgit/nodebot/blob/master/LICENSE)
[![pipeline status](https://gitlab.com/trustgit/nodebot/badges/master/pipeline.svg)](https://gitlab.com/trustgit/nodebot/commits/master)
[![npm package](https://img.shields.io/npm/v/nodebot-core.svg)](https://www.npmjs.com/package/nodebot-core)
[![nodebot project](https://img.shields.io/badge/part%20of-nodebot-5555ff.svg)](https://gitlab.com/trustgit/nodebot)
[![GitLab repo wiki](https://img.shields.io/badge/read-repo%20wiki-ffaa55.svg)](https://gitlab.com/trustgit/nodebot/wikis)
[![凑badge（](https://img.shields.io/badge/developed%20for-osu!-ff6699.svg)](https://osu.ppy.sh/home)

**nodebot 是一个模块化，轻量化 (~450 sloc) 的，基于命令的 Node.js qqbot 框架。**

nodebot 核心现已与模块分割。原本附带的模块应参考 [osubot](https://gitlab.com/trustgit/nodebot-module-osubot), [botinfo](https://gitlab.com/trustgit/nodebot-module-botinfo), [helper](https://gitlab.com/trustgit/nodebot-module-helper), [utility](https://gitlab.com/trustgit/nodebot-module-utility)。

## 使用
我们推荐使用 [nodebot-cli](https://gitlab.com/trustgit/nodebot-cli) 进行安装：
```shell
npm install nodebot-cli
nodebot
```

你也可以使用 git clone 来将本框架下载到本地：
```shell
git clone https://gitlab.com/trustgit/nodebot.git
cd nodebot
```

之后参考 [Bot 开发：构建](https://gitlab.com/trustgit/nodebot/wikis/Build)。

## 帮助中心
- **Bot 用户应使用 `help` 命令查询帮助。**
- [Bot 开发：构建](https://gitlab.com/trustgit/nodebot/wikis/Build)
- [Bot 开发：扩展](https://gitlab.com/trustgit/nodebot/wikis/Development)
- [？？？：关于 Bot](https://gitlab.com/trustgit/nodebot/wikis/About)

## 一些废话
nodebot 缓存导致错误的命令消息。  
nodebot 同时为开发者提供将所有消息 log 到控制台的功能，这些信息是临时的，每次控制台被关闭时就会被清除。  
自 3.3.0 后，nodebot 为开发者提供统计命令使用次数的功能。我们只会统计命令名称和次数，不会存储任何参数和其他聊天信息。  
~~不过说实话，你消息都发出来了还怕你 :horse: 缓存呢？~~