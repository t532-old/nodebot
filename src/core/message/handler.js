// imports
import { commands, middlewares } from '../../modules'
import fs from 'fs'
import yaml from 'js-yaml'
import { Command, Aliaser } from '../command'
import Message from './sender'
// configuration
const aliases = yaml.safeLoad(fs.readFileSync('aliases.yml'))
// Aliaser & Command
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

// These are middlewares for processing messages.
/**
 * formats a message.
 * @param {Message} msg 
 */
function format(msg) { msg.param.message = unescape(msg.param.message.replace(/&#(\d+);/g, (match, str) => '%' + parseInt(str).toString(16))) }
/**
 * Make a message its alias.
 * @param {Message} msg 
 */
function aliasify(msg) { msg.param.message = aliaser.alias(msg.param.message) }
/**
 * execute a message (command).
 * @param {Message} msg 
 */
function execute(msg) { handler.do(msg.param.message, msg) }

// These are APIs.
/**
 * Initialize the commands listening.
 */
function listen() { handler.onAll(commands) }
/**
 * handles a command by a specific target.
 * @param {object} param A cqhttp message object
 */
function handle(param) {
    const msg = new Message(param)
    format(msg)
    for (let middleware of middlewares)
        middleware(msg)
    aliasify(msg)
    execute(msg)
}
// exports
export { listen, handle }