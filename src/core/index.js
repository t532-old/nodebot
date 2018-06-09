import fs from 'fs'
import Koa from 'koa'
import body from 'koa-body'
import yaml from 'js-yaml'

import message from './message'
import inits from '../modules/init'
const app = new Koa()
const { receivePort } = yaml.safeLoad(fs.readFileSync('config.yml'))

if (!fs.existsSync('cache')) fs.mkdirSync('cache')
for (let init of inits) init()

message.listen()

app.use(body())

app.use(async ctx => {
    if (ctx.request.body.message_type)
        message.handle(ctx.request.body)
})

app.listen(receivePort)