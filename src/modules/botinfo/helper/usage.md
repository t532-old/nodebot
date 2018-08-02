# usage
From botinfo
## Description
查询命令用量。
## Usage
### Param
- [params...]: 每项参数的用途根据其在哪个选项后决定。
        选项为 length 时，参数为统计数量；
        选项为 identifier 时，为标识符；
        选项为 type 时，为 command/alias/middleware；
        选项为 filter 时，为格式是 abc="def" 的 query。
### Options
- *length <len>: 截取多少个命令/中间件的统计
- *identifier <id>: 标识符，可以理解为命令名
- *type <typeid>: 类型
- *filter [filters...]: 仅限 operators 使用，
    手动编写数据库的 query
## Example
- * -usage *length <len> *identifier <id> *type <typeid> *
- -usage *length 10 *type command
- -usage *identifier rec