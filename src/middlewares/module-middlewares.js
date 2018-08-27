import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
import { errorLog } from '../util/log'
const { middlewares: moduleList } = safeLoad(readFileSync('config/exports.yml'))
let middlewares = []
for (let i of moduleList) {
    const { middlewares: moduleMiddlewares } = require(`nodebot-module-${i}`)
    middlewares = [...middlewares, ...moduleMiddlewares]
}
export default async function moduleMiddlewares(msg) {
    for (let middleware of middlewares) {
        try { await middleware(msg) }
        catch (err) { errorLog(err) }
    }
}