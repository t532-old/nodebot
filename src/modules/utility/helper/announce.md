# announce
From utility
## Description
群发信息。仅限 operators 使用。
## Usage
### Param
- <announcement>: 群发的信息。
- [group]: 对该列表中的群特殊处理。
具体操作由 option 指定。
### Option
- *include: 仅发送在 group 列表里的群。
- *except: 仅发送不在 group 列表里的群。
## Example
- * -announce <announcement> *include/except [group...] *
- -announce test1
- -announce test2 *except 1234567