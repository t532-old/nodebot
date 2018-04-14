import fs from 'fs'
import Koa from 'koa'
import body from 'koa-body'

import message from './message'

if (!fs.existsSync('../bot-data')) {
    fs.mkdirSync('../bot-data')
    fs.mkdirSync('../bot-data/cache')
    fs.mkdirSync('../bot-data/cache/avatar')
    fs.mkdirSync('../bot-data/cache/recent')
}

const app = new Koa()

app.use(body())

app.use(async ctx => {
    message.handle(ctx.request.body)
})

app.listen(8080)