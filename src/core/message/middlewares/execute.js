import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
import analyzer from '../../analyzer'
import { commands } from '../../../modules'
import { Command } from '../../command'
const { prefixes = { command: '-', options: '*' } } = safeLoad(readFileSync('config.yml'))
const handler = new Command({
    prefixes,
    handlers: {
        default(msg, [name]) { analyzer(msg, 'unexistCommand', name) },
        invalid(msg, [name]) {
            msg.send(
`Invalid argument(s)!
Should be: ${this.getUsage(name)}`
            )
            analyzer(msg, 'command', name)
        },
        success(msg, [name]) { analyzer(msg, 'command', name) }
    }
}).onAll(commands)
/**
 * execute a message (command).
 * @param {Message} msg 
 */
export default function execute(msg) { handler.do(msg.param.message, msg) }
