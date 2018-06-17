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
