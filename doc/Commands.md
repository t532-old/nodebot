# 帮助文档 - 指令

- **提示：** 当你的用户名包含空格时，你需要使用英文双引号 `""` 来包裹你的用户名。

## -test *[txt...]*
测试指令，将发送出去的信息逐个分开（在空格和换行处），再用空格拼接起来。

|输入           |输出       |
|--------------|-----------|
|-test a b<br>c|a b c      |

## -about
查看关于机器人的信息（版本，开发者等）。

|输入       |输出      |
|----------|----------|
|-about    |nodebot v1.0.0 <br>powered by Nodejs &amp; cqhttp. <br>2018 trustgit | under MIT license|

## -bind *<account>*
将你的 qq 号与 osu!id 绑定。

|输入               |输出                      |
|------------------|--------------------------|
|-bind Trustless532|osubot: bind: 绑定成功！...|

## -unbind
将你的 qq 号与 osu!id 解除绑定。

|输入                 |输出                        |
|--------------------|----------------------------|
|-unbind             |osubot: unbind: 解绑成功！...|

## -avatar
清除头像缓存（刷新头像）。

|输入                 |输出                            |
|--------------------|---------------------------------|
|-avatar             |osubot: avatar: 清除头像缓存成功！|

## -stat *<user=me> \*std/taiko/ctb/mania*
查询你的（或者`<user>`的）用户信息，并且返回一张带有信息的，osu!lazer风格的图片。命令中的星号选项可选，星号后跟的单词为模式。

如果想要查询你自己，那就使用 `-stat`。

请注意只有绑定过id的用户查询自己时才会有增量显示。

|输入                 |输出                            |
|---------------------|---------------------------------|
|-stat -inter-        |![A sample osu!user status image.](https://gitlab.com/trustgit/nodebot/raw/master/doc/static/sample-stat.jpg)|

### --/—
是 `-stat` 的一个缩写。

## -rec *<user=me> \*std/taiko/ctb/mania*
查询你的（或者`<user>`的）最近一张游玩的beatmap（包括中途fail或quit的），并且返回一张带有这次游玩信息的，osu!lazer风格的图片。命令中的星号选项可选，星号后跟的单词为模式。

如果想要查询你自己，那就使用 `-rec`。

|输入                 |输出                            |
|--------------------|---------------------------------|
|-rec -inter-        |![A sample osu!user recent play image.](https://gitlab.com/trustgit/nodebot/raw/master/doc/static/sample-rec.jpg)|

### -
是 `-rec` 的一个缩写。

## -bp *< order > <user=me> \*std/taiko/ctb/mania*
查询你的（或者`<user>`的）排名第`<order>`的bp，并且返回一张带有这张bp信息的，osu!lazer风格的图片。命令中的星号选项可选，星号后跟的单词为模式。

如果想要查询你自己，那就使用 `-bp <order>`。

|输入                  |输出                             |
|---------------------|---------------------------------|
|-bp 1 -inter-        |![A sample osu!user recent play image.](https://gitlab.com/trustgit/nodebot/raw/master/doc/static/sample-bp.jpg)|

## -roll *[range]*
取一个随机数值。若没有指定range，则数值的区间为0-100；若range是一个数字，则数值区间为0-range；若range的格式为`a,b,c,d,...`，则可能的值在这个列表里选定。

|输入                                     |输出                            |
|----------------------------------------|--------------------------------|
|-roll                                   |37                              |
|-roll int100,kj415j45,interBot,Noerusagi|kj415j45                        |

## -db *\*backup/recovery*
备份/修复数据库。
