// imports
import middlewares from 'middlewares'
import Message from './sender'
/**
 * handles a command by a specific target.
 * @param {object} param A cqhttp message object
 */
export default function handle(param) {
    const msg = new Message(param)
    for (let middleware of middlewares[param.post_type])
        await middleware(msg)
}
// exports
export { listen, handle }