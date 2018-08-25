// import server
import Koa from 'koa'
import body from 'koa-body'
// import cluster
import cluster from 'cluster'
import { cpus } from 'os'
const countCPUs = cpus().length
// import file system
import { existsSync, readFileSync, mkdirSync } from 'fs'
// import config
import { safeLoad } from 'js-yaml'
// import startup
import greet from './greeting'
import chalk from 'chalk'
import { serverLog } from './util/log'
// import main handler
import handle from './handler'
// import message class
import { Message } from './sender'

if (cluster.isMaster) {
    // ascii
    greet()
    // environment init
    serverLog(`Module initialized`)
    if (!existsSync('cache')) mkdirSync('cache')
    if (!existsSync('logs')) mkdirSync('logs')
    serverLog(`Files initialized`)
    // application init
    const { inits: moduleList } = safeLoad(readFileSync('config/exports.yml'))
    let inits = []
    for (let i of moduleList) {
        const { inits: moduleInits } = require(`nodebot-module-${i}`)
        inits = [...inits, ...moduleInits]
    }
    for (let init of inits) init(new Message())
    serverLog(`Bot modules initialized`)
    for (let i = 0; i < countCPUs; i++) cluster.fork()
    serverLog(`${chalk.gray(`Master process #${process.pid} initializing ${countCPUs} workers`)}`)
    cluster.on('exit', worker => 
        serverLog(chalk.gray(`    Exited ${worker.process.pid}`))
    )
} else {
    const { receivePort } = safeLoad(readFileSync('./config/config.yml'))
    // environment init
    const app = new Koa()
    // parse the body
    app.use(body())
    // handle the message
    app.use(async ctx => {
        const msg = ctx.request.body
        if (msg.post_type)
            handle(msg)
    })
    // start listening
    app.listen(receivePort)
    serverLog(chalk.gray(`    Worker process #${process.pid} forked`))
}