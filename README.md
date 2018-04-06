# nodebot
[![license](https://img.shields.io/github/license/trustgit/nodebot.svg)](https://github.com/trustgit/nodebot/blob/master/LICENSE)
[![AppVeyor](https://img.shields.io/appveyor/ci/trustgit/nodebot.svg)](https://ci.appveyor.com/project/trustgit/nodebot)
[![凑badge（](https://img.shields.io/badge/developed%20for-osu!-ff6699.svg)](https://osu.ppy.sh/home)

**IN PROGRESS**

A bot developed for qureying osu! info.
## Dependencies
- MongoDB 3.6.0 (currently in use) or higher
- Node.js 8.9.3 (currently in use) or higher
- npm 5.5.1 (currently in use) or higher
- CoolQ Air 5.11.12A (currently in use) or higher

**Be sure your CoolQ has already installed [cqhttp](https://github.com/richardchien/coolq-http-api/releases) and is in the same directory that your bot's directory is in.**
## Run
### Console 1
```sh
$ cd <your-bot-directory>
$ npm install
$ npm run run
```
### Console 2 (For database)
```sh
$ cd <your-mongodb-directory>
$ bin/mongod
```

