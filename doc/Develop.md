# 帮助文档 - 开发
nodebot 包含了一个命令解析器（`src/core/command/command.js`）以及一个基于该命令解析器的 qqbot 框架。因此，开发者可以~~便利地~~开发、扩展模块。

## 目录结构
模块应该置于 `modules/` 路径下，并拥有类似这样的目录结构：
```
modules/
|- sampleModule/
   |- index.js
   |- ...other files
|- ...other modules
|- exports.yml
```

## 命令编写
编写的命令应该是像这样的对象：
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
        - 其方法 `error` 接受一个 `Error` 实例，可以向目标群/用户发送在 `core/message/sender.js$Message#error()` 中设置的信息。
        - 其成员 `param` 是标准的 cqhttp 上报对象。
    - `args` 是一个包含用户输入参数的对象，其键均为 `args` 成员中指定的参数名（不包括限定符）。
    - `options` 是一个包括用户开启的选项的数组。

要导出这些命令，应在 `index.js` 中像这样导出：
```js
export const commands = {
    'command1': object1,
    'command2': object2,
    ...
}
```
其中 `command1, command2, ...` 是你想使用的命令名称，`object1, object2, ...` 是上文所说的命令对象。

## 初始化函数
你的模块还可以增加初始化函数，这些函数应在模块的 `index.js` 中这样导出：
```js
export const inits = [
    function init1() { ... },
    function init2() { ... },
    ...
]
```
数组中的函数都将在 bot 启动时运行。

## 中间件
nodebot 有类似中间件的命令处理系统。你可以编写函数并在 `index.js` 中这样导出使它们成为中间件：
```js
export const middlewares = [
    function mid1(msg) { ... },
    function mid2(msg) { ... },
    ...
]
```
中间件函数接收一个参数，该参数是用户发来消息的 `core/message/sender.js$Message` 对象，中间件可以任意处理。

## 最终导出
模块内导出并不会导致它直接被识别，要导出模块你还需要在 `modules/exports.yml` 中各项里增加你的模块名：
- 如果你的模块包含命令，则在 `commands:` 下增加你的模块名。
- 如果你的模块包含初始化函数，则在 `inits:` 下增加你的模块名。
- 如果你的模块包含中间件，则在 `middlewares:` 下增加你的模块名。
- 如果你的模块包含帮助文件（见下文），则在 `helper:` 下增加你的模块名。
- 如果你的模块包含 aliases（见下文），则在 `aliases:` 下增加你的模块名。

## 帮助文件
命令的帮助文件可以被 `helper` 模块读取并且生成对用户友好的帮助。

帮助文件的格式是 markdown 的一个子集（所有 <...> 应被替换为相应文本，并会被当做纯文本解析；其他部分必须保持不变）：
```markdown
# <CommandName>
From <ModuleName>
## Description
<Description>
## Usage
### Parameter
- <Parameter1>
- <Parameter2>
- <Parameter3>
### Option
- <Option1>
- <Option2>
- <Option3>
```
每个帮助文件应对应一个帮助关键词。要导出这些文件，在模块文件夹下编写 `helper.yml`，形如下例：
```yaml
topicName: fileName
topicName2: fileName2
...
```
每个帮助关键词 `topicName` 所返回的帮助内容为被 `helper` 模块解析过的 `fileName` 内容。

## Aliases
Aliases 功能能让你忽略命令前缀，识别特定的消息并且替换为特定命令。

复制根目录下的 `aliases.template.yml` 到模块的文件夹下制作一份 `aliases.yml`，形如下例：
```yaml
'-': '-test abc'
```
这样，当用户使用命令 `-` 时，程序就可以将其解释为命令 `-test abc`。
当然，这也可以被制作为一个简单的应答系统：
```yaml
'hime hime': '-say suki suki daisuki hime'
'-inter-': '-say wudi'
```
另外的，在根目录下的 `aliases.yml` 也会被识别（但不会被 commit）。

## 其他功能

### Logger
模块可以使用公共的 logger(src/core/log/*.js) 来将记录 log 至控制台：
```js
import { errorLog, modLog } from '(... path to src/core/log)'
```
- `errorLog` 接收一个参数 `err` 并将其作为一条错误信息 log 到控制台。
- `modLog` 接收两个参数：
    - `name` 为你的 module name
    - `text` 为你想展示的信息。

### Analyzer
nodebot 自带的统计器 analyzer(src/core/analyzer.js) 可以统计不同目标触发不同事件的次数。

import：
```js
import analyzer from '(...path to src/core/analyzer)'
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