// imports
import fs from 'fs'
import Koa from 'koa'
import body from 'koa-body'
import yaml from 'js-yaml'
import message from './message'
import { inits } from '../modules'
// ascii
console.log(`
                    __     __          __ 
   ____  ____  ____/ /__  / /_  ____  / /_
  / __ \\/ __ \\/ __  / _ \\/ __ \\/ __ \\/ __/
 / / / / /_/ / /_/ /  __/ /_/ / /_/ / /_  
/_/ /_/\\____/\\__,_/\\___/_.___/\\____/\\__/  `
)
console.log(`
PACKAGE | Nodebot   v${require('../../package.json').version}
AUTHOR  | trustgit  (c) ${new Date().getFullYear()} MIT License

[SVR] ATTEMPTING TO START SERVER...`
)
// environment init
const app = new Koa()
const { receivePort } = yaml.safeLoad(fs.readFileSync('config.yml'))
if (!fs.existsSync('cache')) fs.mkdirSync('cache')
if (!fs.existsSync('logs')) fs.mkdirSync('logs')
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
console.log(`[SVR] SUCCESS`)