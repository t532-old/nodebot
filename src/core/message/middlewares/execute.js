import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
import analyzer from '../../analyzer'
import { Command } from '../../command'
const { prefixes = { command: '[!！]', options: '-' } } = safeLoad(readFileSync('config.yml'))
const { commands: moduleList } = safeLoad(readFileSync('src/modules/exports.yml'))
let commands = {}
for (let i of moduleList) {
    const { commands: moduleCommands } = require(`../../../modules/${i}`)
    commands = { ...commands, ...moduleCommands }
}
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
 * @param {ContentMessage} msg 
 */
export default function execute(msg) { handler.do(msg.content, msg) }
