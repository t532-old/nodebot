// imports
import fs from 'fs'
import Koa from 'koa'
import body from 'koa-body'
import yaml from 'js-yaml'
import message from './message'
import { inits } from '../modules'
// environment init
const app = new Koa()
const { receivePort } = yaml.safeLoad(fs.readFileSync('config.yml'))
if (!fs.existsSync('cache')) fs.mkdirSync('cache')
// application init
for (let init of inits) init()
message.listen()
// parse the body
app.use(body())
// handle the message
app.use(async ctx => {
    const msg = ctx.request.body
    if (msg.message_type)
        message.handle(msg)
})
// start listening
app.listen(receivePort)