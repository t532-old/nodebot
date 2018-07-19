import { middlewares } from '../../../modules'
import { errorLog } from '../../log'
export default async function moduleMiddlewares(msg) {
    for (let middleware of middlewares) {
        try { await middleware(msg) }
        catch (err) { errorLog(err) }
    }
}