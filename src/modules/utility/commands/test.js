import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
const { injectionChecker } = safeLoad(readFileSync('config.yml'))
export default {
    args: '[txt...]',
    options: [],
    /**
     * Returns the text directly to the user
     * @param {Message} msg The universal msg object
     * @param {{ txt: string[] }} txt The texts user sends
     */
    async action(msg, { txt }) { msg.send(txt.filter(i => new RegExp(...injectionChecker).test(i) === false).join(' ')) }
}