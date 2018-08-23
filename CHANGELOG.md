# v4.2.0

## Features
- 新命令 -bpm
- 修改了 stat 绘制的样式并增加了 tth 信息
- 改善了 helper 的绘制
- 增加了 ContentMessage 的 content 属性，在读取和编辑信息时推荐使用此属性

## Bugs
- 修复了其他三模式 accuracy 计算错误的问题
- 增加绘制 pp 时的稳定性
- 修复了 Command 对象不设置命令前缀时的解析 bug

## P.S.
这 **可能是** nodebot 的最后一个版本。

---

# v4.1.0

## Features
- 增加了 helper 文档的 Example 字段
- 大幅度修改了 sender (即 Message) 的结构，具体见源代码（core/message/sender）。

## Bugs
- 修复了其他模式查询 bp 和 rec 时不显示四维（与 pp）的 bug
- 修复了 helper 绘制 description 时换行处理不正确的 bug

---

# v4.0.0

## Features
- 对 log 进行了一些修改并增加了主进程专用 log 函数 `serverLog`
- 使用 cluster 来增强性能
- 增加对讨论组的支持
- **非向下兼容：更改了模块导出方式。具体见开发文档。**
- 模块级 aliases
- 增加了帮助系统（模块 `helper`）和配套命令 `-help`
- 增加了命令 announce 用来群发信息
- 去除了 commands.md 文档

## Bugs
- 修复了 avatar 拷贝顺序不正确导致 gm 更容易出错的问题

---

# v3.7.0

## Features
- config 支持自定义命令/选项前缀
- 修复了命令解析中的 bug
- 若使用 *filter，usage 会提供 messageTarget
- 新命令：batch，接收一条参数，作为 batch command 运行并返回运行结果（需要 operator 权限）

---

# v3.6.0

## Features
- 重构了 import/export，最终运行时引入包的总体积减少
- 久违的更新了测试脚本
- 对 log 颜色稍加修改
- 更新了命令解析的分割参数部分，现在对于带引号参数的分割更加严格/正常
- 重构了模块，将 develop 分为 botinfo 和 utility，并将 osubot 中的 -roll 分割到 utility 中
- 添加命令 -usage，具体请查看文档

---

# v3.5.0

## Features
- 更加宽松的 roll 指令
- 实现了更宽松的用户名匹配，现在用户输入带有空格的 id 时不必用引号括起来
- 重构了自动处理 request 的部分，使其作为 `core/message/handle.js$handle()` 的中间件
- 源码：将 `core/message/handle.js` 中的内置中间件分割为多个文件置于 `core/message/middlewares` 下

## Known Bug
- 有时接收到的信息类型与消息均为 `undefined`，然而 `post_type` 与 `group_id`/`user_id` 均正常。尚未查出是 cqhttp 还是 bot 的锅

---

# v3.4.1

## Features
- 更新了防注入机制，开发者现在可以在 config.yml 的 `injectionChecker` 字段中自定义注入检测

---

# v3.4.0

## Features
- 在 config 内增加选项 `autoAccept` (值可为`'none', 'friend', 'group', 'both'`) 来配置是否自动同意好友请求/加群请求。
- 因为 log 模块的函数名称过于容易重复，特此更改。
- 在 log 模块中增加了专门 log add request 的 `requestLog()`。
- 为 recent 与 bp 图片中的 acc 与 cb 增加了（伪）阴影。
- 把 -bp 与 -rec 中心圆圈的背景模糊删除以更好的模仿 lazer。
- recent 与 bp 现在会提供图的链接。
- stat 现在会提供用户页的链接。
- 源码：重构了一部分画图脚本。

---

# v3.3.0

## Features
- 优化 `-rec` 命令绘制，增加铺面四维显示
- logger 划分为单独的模块
- 添加 analyzer
- 缓存用于计算铺面信息的 .osu 文件
- **移动 `databaseAddress` 至顶层配置，在 `osubot` 内的仍然对 osubot module 可用，但是已经被废弃，且 analyzer 不识别**
- 源码：对 `Command` 类增加新的 method `successHandler`，在命令解析完毕开始执行时时调用

---

# v3.2.1

# Bugs
- 修复了复读功能 log 中的 bug

---

# v3.2.0

## Features
- 复读相关配置
- 配置文件中增加类型说明
- log 增加了不同的颜色

---

# v3.1.0

## Features
- ~~启动时字符画~~
- 迁移到 Babel 7
- 更加完善的核心类定义（新语法，private 成员与更多注释）
- 应用新导入语法

## P.S.
由于使用了仍是 proposal 的语法，编辑器可能会报错。

---

# v3.0.0

## Features
- 延迟复读功能
- 把 -bp 与 -rec 的背景模糊加回去

## Bugs
- 修复了一些 bugs
- 由于正式发布，标志了之后修 bug 要开始动 patch 位了

---

# v3.0.0-rc2

## Features
- 将错误 log 到 `logs/error.log` 中，而不是 console。
- 支持向 console log 消息。

---

# v3.0.0-rc1

## Features
- 更改了 assets 的一些结构。
- **非向后兼容：将 `config.yml` 中的 cqhttp api 和 mongod database 的端口字段改为地址。**
- 增加了 Source maps
- 将参数分割时使用的英文引号(")改为多种引号("'“”‘’)

---

# v3.0.0-beta

## Features
- 增加了中间件（见wiki）（#29）
- 增加了 osubot 模块的复读功能。
- **不向后兼容：更改了模块的导出格式。**

## Bugs
- 修复了数据库连接时会同时开四个 client 的 bug。

---

# v2.0.2

## Bugs
- 修复了 `-roll` 与 `-test` 命令的重大漏洞。

---

# v2.0.1

## Features
- 添加了一些注释 (~75 lines)
- 完善了一些注释

## Bugs
- 修复 `-avatar` 命令可能出现的错误

## P.S.
这是 nodebot 的第一个非 beta 版本，这表明快速迭代期已经结束。

---

# v2.0.0-beta

## Features
- **不向后兼容**：更改 aliases.yml 格式
- 源码：重构
- 改善 recent 与 bp 的绘制

---

# v1.3.2-beta

## Bugs
- 修复了部分 Errors 被 log 为 `undefined` 的 bug
- 修复了查询其他模式 recent 无法计算 pp 的 bug

---

# v1.3.1-beta

## Bugs
- 修复了 `-bp` 指令绘制颜色异常的bug
- 修复了 `web.js#res.bgQuery()` 抛出的异常未 catch 的 bug

---

# v1.3.0-beta

## Features
- 更有效率的绘制（删除了多余的fonts）
- 添加 aliases （#20）
- 源码：支持自定义 options 前缀

## P.S.
暂时搁置了 charts 计划，因为开发难度太大了 :thinking:

---

# v1.2.0-beta

## Feature
- 修改了 `-stat` 命令的绘制 (#19)

## Bugs
- 修改了 `-stat` 命令的一些 bugs


---

# v1.1.2-beta

## Bugs
- 修复了 1.1.0-beta 发布时仍存在的另一些 bugs

---

# v1.1.1-beta

## Bugs
- 修复了 1.1.0-beta 发布时仍存在的一些 bugs

---

# v1.1.0-beta

## Features
- 增加数据库备份指令：`-db`
- 大幅度更改文档

## Bugs
- 修复大量bug

---

# v1.0.0-beta

## Features
- Not backward-compatible: Change command prefix to `-` | 不向后兼容: 将命令前缀更改为 `-`
- Add -bp command | 添加 `-bp` 指令
- Add increasement display | 添加增量显示

## Bugs
- Fixed lots of bugs | 修了一堆bug

## P.S.
This may be unstable because it's a beta version. We've already noticed some bugs and they'll be fixed in the next release.

这个版本可能会出bug。我们已经发现了一些bug，并打算在下个版本（不是pre-release）中修复它们。

