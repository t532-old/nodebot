import fs from 'fs'
import Koa from 'koa'
import body from 'koa-body'

import message from './message'
const app = new Koa()

if (!fs.existsSync('cache')) {
    fs.mkdirSync('cache')
    fs.mkdirSync('cache/osubot')
    fs.mkdirSync('cache/osubot/avatar')
    fs.mkdirSync('cache/osubot/recent')
    fs.mkdirSync('cache/osubot/recentbg')
    fs.mkdirSync('cache/osubot/stat')
    fs.mkdirSync('cache/osubot/statbg')
    fs.mkdirSync('cache/osubot/mapbg')
}

app.use(body())

app.use(async ctx => {
    message.listen()
    message.handle(ctx.request.body)
})

app.listen(8080)