import log from './log'
import chalk from 'chalk'
/**
 * log an outgoing message
 * @name outgo
 * @param {Message} msg the incoming message object
 * @param {array|string} text the replied text
 * @param {Date} startTime the time of the incoming message
 */
export default function outgo(msg, text, startTime) {
    log(`${chalk.green('[OUT]')} ${chalk.gray(`${new Date().toString()} ( ${new Date().getTime() - startTime.getTime()} ms )`)}\n      ${msg.type === 'group' ? `reply ${msg.type} ${msg.target}` : chalk.yellow(`reply ${msg.type} ${msg.target}`)}: ${JSON.stringify(text)}`)
}