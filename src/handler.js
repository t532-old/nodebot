// imports
import * as middlewares from './middlewares'
import * as initialize from './initialize'
import { errorLog } from './util/log'
/**
 * handles a command by a specific target.
 * @param {object} param A cqhttp message object
 */
export default async function handle(param) {
    const msg = initialize[param.post_type](param)
    if (middlewares[param.post_type])
        for (let middleware of middlewares[param.post_type]) {
            try { await middleware(msg) }
            catch (err) { errorLog(err) }
        }
}