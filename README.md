# nodebot
[![license](https://img.shields.io/github/license/trustgit/nodebot.svg)](https://github.com/trustgit/nodebot/blob/master/LICENSE)
[![AppVeyor](https://img.shields.io/appveyor/ci/trustgit/nodebot.svg)](https://ci.appveyor.com/project/trustgit/nodebot)
[![凑badge（](https://img.shields.io/badge/developed%20for-osu!-ff6699.svg)](https://osu.ppy.sh/home)

**IN PROGRESS**

**咕咕咕 马上就写好了**

## Languages
- [中文](#Chinese)
- [English](#English)

# Chinese
一个用来查询osu!账号信息的qqbot。
## 依赖项
我并没有做过兼容性测试。你们可以试试在其他情况下能不能跑，能跑的话提个issue
- Windows 7（在用Windows 10）或更高，docker我没试过，你们可以试试（
- MongoDB
- Nodejs 8.9（正在用的）& npm
- 酷Q 5.x.x（现在在用5.11.12A）
- GraphicsMagick

**酷Q一定要装 [cqhttp](https://github.com/richardchien/coolq-http-api/releases)**
## 运行
根据config.template.yml创建一个config.yml文件，并在27017端口上运行mongod，在5700端口上运行cqhttp。然后在命令行中输入：
```sh
$ cd <your-bot-directory>
$ npm install
$ npm run run
```
## 其他命令
- 转译(通过 Babel): `npm run build` (=> `babel src -d dist`)
- 造个文档(通过 JSDoc): `npm run doc` (=> `jsdoc src -r -d doc -R README.md`)

# English
A bot developed for qureying osu! info.
## Dependencies
I didn't do compatibility tests. You can try if it can run in other environments.
- Windows 7 (Windows 10 in use) or higher
- MongoDB
- Node.js 8.9.x (8.9.3 in use) or higher & npm
- CoolQ 5.x.x (5.11.12A in use) or higher
- GraphicsMagick

**Be sure your CoolQ has already installed [cqhttp](https://github.com/richardchien/coolq-http-api/releases).**
## Run
Create a `config.yml` file based on the given `config.template.yml`, Run mongod on port 27017 and cqhttp on port 5700, and enter:
```sh
$ cd <your-bot-directory>
$ npm install
$ npm run run
```
## Other commands
- Compile(through Babel): `npm run build` (=> `babel src -d dist`)
- Build docs(through JSDoc): `npm run doc` (=> `jsdoc src -r -d doc -R README.md`)
