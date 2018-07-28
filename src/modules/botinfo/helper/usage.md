# usage
From botinfo
## Description
查询命令用量。
## Usage
### Param
- *length <len>: 截取多少个命令/中间件的统计
- *identifier <id>: 标识符，可以理解为命令名
- *type <typeid>: 有三种可选
    - command: 仅选择命令的统计
    - alias: 仅选择命令缩写的统计
    - middleware: 仅选择中间件（复读）的统计
- *filter [filters...]: 仅限 operators 使用，手动编写数据库的 query，格式为 abc="def"
### Options
- 无选项。