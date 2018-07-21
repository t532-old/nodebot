// imports
import { existsSync, readFileSync, mkdirSync } from 'fs'
import Koa from 'koa'
import body from 'koa-body'
import { safeLoad } from 'js-yaml'
import message from './message'
import { inits } from '../modules'
import greet from './greeting'
import { log } from './log'
// ascii
greet()
// environment init
log(' SVR  ATTEMPTING TO START SERVER...')
const app = new Koa()
const { receivePort } = safeLoad(readFileSync('config.yml'))
if (!existsSync('cache')) mkdirSync('cache')
if (!existsSync('logs')) mkdirSync('logs')
// application init
for (let init of inits) init()
// parse the body
app.use(body())
// handle the message
app.use(async ctx => {
    const msg = ctx.request.body
    if (msg.post_type)
        message(msg)
})
// start listening
app.listen(receivePort)
log(` SVR  SUCCESS`)