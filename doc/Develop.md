# 帮助文档 - 开发
nodebot 包含了一个命令解析器（`src/core/command/command.js`）以及一个基于该命令解析器的 qqbot 框架。因此，开发者可以~~便利地~~开发、扩展模块。
## Modules
模块应该置于 `modules/` 路径下，并拥有类似这样的目录结构：
```
modules/
|- sampleModule/
   |- index.js
   |- (optional) init.js
   |- (optional) middleware.js
   |- ...other files
|- ...other modules
|- index.js
```
### `index.js`
各 module 中的 index.js 应保证导出的都是形如下述（即 `command.js` 所要求的）的对象：
```js
{
    args: '<required> [optional] [optional_list...]',
    options: ['option1', 'option2', ...],
    action(msg, args, options) {
        // do something...
    }
}
```
- `args` 成员应该且只应包含被空格分割的选项。选项应为被以下任意一组限定符包裹的合法 ECMAScript 变量名：
    - `<name>`意为必填参数；若用户没有输入该参数，则会调用 `invalidHandler`。
    - `[name]`意为选填参数，其必须被放置在必填参数之后。
    - `[name...]`是参数列表；其应该只出现一次，且必须被放置在 `args` 尾部。
- `options` 成员中的每一项是用户可以开启的选项，**不应**包含空格。用户可在命令中嵌入形如 `*name` 的字符串来开启选项（本例中是 `name`）。
- 在 `action` 方法的参数中：
    - `msg` 是一个 `core/message/sender.js#Message` 类对象。
        - 其方法 `send` 接受由 [`cqhttp`](https://cqhttp.cc) 定义的 `CQ码` 超集，可以向发送信息的群/用户返回信息；
        - 其方法 `error` 接受一个 `Error` 实例，可以向目标群/用户发送在 `core/message/sender.js#Message#error()` 中设置的信息。
        - 其成员 `param` 是标准的 cqhttp 上报对象。
    - `args` 是一个包含用户输入参数的对象，其键均为 `args` 成员中指定的参数名（不包括限定符）。
    - `options` 是一个包括用户开启的选项的数组。

### 导出
使用 `modules/index.js` 来导出模块。

导出应分为三部分：

```js
export commands = { ... }
export inits = [ ... ]
export middlewares = [ ... ]
```

`commands` 中，每个成员的键应该是你想使用的命令名称；而对应的值应该是上一段（`### index.js`）所要求的的对象。

`inits` 数组中的每一项都应该是函数，这些函数将在 bot 启动时首先运行。

`middlewares` 数组中的每一项都应该是函数，这些函数将在 bot 接收到消息时自动调用，并且提供一个 `core/message/sender.js#Message` 类对象作为参数。

## Aliases
Aliases 功能能让你忽略命令前缀，识别特定的消息并且替换为特定命令。

复制 `aliases.template.yml` 制作一份 `aliases.yml`，形如下例：
```yaml
'-': '-test abc'
```
这样，当用户使用命令 `-` 时，程序就可以将其解释为命令 `-test abc`。
当然，这也可以被制作为一个简单的应答系统：
```yaml
'hime hime': '-say suki suki daisuki hime'
'-inter-': '-say wudi'
```

## Logs
模块可以使用公共的 logger 来将记录 log 至控制台：
```js
import { error, mod } from '(... path to dist/core/log)'
```
- `error` 接收一个参数 `err` 并将其作为一条错误信息 log 到控制台。
- `mod` 接收两个参数：
    - `name` 为你的 module name
    - `text` 为你想展示的信息。

## Analyzer
nodebot 自带的统计器 analyzer(src/core/analyzer) 可以统计不同目标触发不同事件的次数。

import：
```js
import analyzer from '(...path to dist/core/analyzer)'
```
之后若想记录一次事件，调用：
```js
//      the Message object | type of this event      | the event's name
analyzer(MessageObject,    'command/middleware/init', 'eventName'     )
```
在 `botdb` 数据库的 collection `analytics` 中可以查询到所有统计：
```js
// input
use botdb
db.analytics.find()
// =======================
// output
{ "_id" : ObjectId("..."), "messageType" : "private", "messageTarget" : 2037246484, "type" : "command", "identifier" : "stat", "counter" : 2 }
{ "_id" : ObjectId("..."), "messageType" : "group", "messageTarget" : 204228752, "type" : "middleware", "identifier" : "osubotRepeat", "counter" : 1 }
...
```

自动监听的事件：
- 命令调用
- 不存在的命令调用
- aliases