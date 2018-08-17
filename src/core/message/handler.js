// imports
import * as middlewares from './middlewares'
import Message from './sender'
import { errorLog } from '../log'
/**
 * handles a command by a specific target.
 * @param {object} param A cqhttp message object
 */
export default async function handle(param) {
    if (middlewares[param.post_type])
        for (let middleware of middlewares[param.post_type]) {
            try { await middleware(msg) }
            catch (err) { errorLog(err) }
        }
}