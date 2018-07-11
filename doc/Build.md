# 帮助文档 - 构建

## 依赖项
我并没有做过兼容性测试。你们可以试试在其他情况下能不能跑，能跑的话提个issue
### 必须
这些依赖项必须被安装，否则 nodebot 根本无法工作。
- Windows 7（在用Windows 10）或更高，docker我没试过，你们可以试试（
- Nodejs （正在使用 8.9，~~但是理论上由于经过 babel 转译所以支持 ES5 就行~~ 由于 ESNext 的一些新语法只会被 Babel 7 转译为 ES6，所以你需要支持 ES6 的 Node）& npm
- 酷Q Air
- 酷Q安装插件 [cqhttp](https://github.com/richardchien/coolq-http-api/releases)
- MongoDB

### 可选
如果你想要使用 `osubot` 模块内的功能，则你也需要安装这些依赖：
- 酷Q Pro
- GraphicsMagick

## 运行
0. 启动 `mongod`。
1. 运行 `cqhttp`。
2. 根据 `config.template.yml` 创建一个 `config.yml` 文件。
3. 运行：

```sh
$ cd <your-bot-directory>
$ npm install
$ npm start
```

## 其他命令
- 转译（通过 Babel）: `npm run build` (=> `babel src -d dist -s --verbose`)
