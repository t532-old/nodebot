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
import { serverLog } from './log'
import { inits } from '../modules'
// import main handler
import message from './message'

if (cluster.isMaster) {
    // ascii
    greet()
    // environment init
    serverLog('Initializing...')
    if (!existsSync('cache')) mkdirSync('cache')
    if (!existsSync('logs')) mkdirSync('logs')
    // application init
    for (let init of inits) init()
    serverLog('Attempting to start server...')
    for (let i = 0; i < countCPUs; i++) cluster.fork()
    serverLog(chalk.gray.bold(`Master process #${process.pid} forking ${countCPUs} workers`))
    cluster.on('exit', worker => 
        serverLog(chalk.gray(`    Exited ${worker.process.pid}`))
    )
} else {
    // environment init
    const app = new Koa()
    const { receivePort } = safeLoad(readFileSync('config.yml'))
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
    serverLog(chalk.gray(`    Worker process #${process.pid} forked`))
}