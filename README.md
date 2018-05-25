# nodebot
[![license](https://img.shields.io/github/license/trustgit/nodebot.svg)](https://github.com/trustgit/nodebot/blob/master/LICENSE)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/github/trustgit/nodebot?svg=true)](https://ci.appveyor.com/project/trustgit/nodebot)
[![凑badge（](https://img.shields.io/badge/developed%20for-osu!-ff6699.svg)](https://osu.ppy.sh/home)

**WORKING IN PROGRESS:** 一个用来查询osu!账号信息的qqbot。

- Bot 用户需要帮助时，请查看：[帮助文档 - 指令](https://github.com/trustgit/nodebot/blob/master/doc/commands.md)

## 依赖项
我并没有做过兼容性测试。你们可以试试在其他情况下能不能跑，能跑的话提个issue
- Windows 7（在用Windows 10）或更高，docker我没试过，你们可以试试（
- MongoDB
- Nodejs 8.9（正在用的）& npm
- 酷Q Pro
- GraphicsMagick

**酷Q一定要装 [cqhttp](https://github.com/richardchien/coolq-http-api/releases)**
## 运行
根据 `config.template.yml` 创建一个 `config.yml` 文件，并在27017端口上运行mongod，在5700端口上运行cqhttp。然后在命令行中输入：
```sh
$ cd <your-bot-directory>
$ npm install
$ npm start
```
## 其他命令
- 转译(通过 Babel): `npm run build` (=> `babel src -d dist`)
- 提交文档更改: `git subtree push --prefix=doc origin gh-pages`

## 声明
- 本项目使用的所有 package 均可见 `package.json`。
- 本项目不使用 `package-lock.json`。
- 本项目遵循 [semver 语义化版本规则](https://semver.org)。