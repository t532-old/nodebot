import botModules from '../../modules'
import fs from 'fs'
import yaml from 'js-yaml'
import { Command, Aliaser } from '../command'
import Message from './sender'
const aliases = yaml.safeLoad(fs.readFileSync('aliases.yml'))

const aliaser = new Aliaser(aliases)

const handler = new Command({
    prefixes: {
        command: '-',
        options: '\\*',
    },
    handlers: {
        default() { },
        invalid(msg, [name, commands]) {
            msg.send(
`Invalid argument(s)!
Should be: ${this.list[name].str}`
            )
        }
    }
})

/**
 * Initialize the commands listening.
 */
function listen() { handler.onAll(botModules) }

/**
 * handles a command by a specific target.
 * @param {object} param A cqhttp message object
 */
function handle(param) {
    const comm = unescape(param.message.replace(/&#(\d+);/g, (match, str) => '%' + parseInt(str).toString(16)))
    handler.do(aliaser.alias(comm), new Message(param))
}

export default { listen, handle }