import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
import { errorLog } from '../../log'
const { middlewares: moduleList } = safeLoad(readFileSync('src/modules/exports.yml'))
let middlewares = []
for (let i of moduleList) {
    const { middlewares: moduleMiddlewares } = require(`../../../modules/${i}`)
    middlewares = [...middlewares, ...moduleMiddlewares]
}
export default async function moduleMiddlewares(msg) {
    for (let middleware of middlewares) {
        try { await middleware(msg) }
        catch (err) { errorLog(err) }
    }
}