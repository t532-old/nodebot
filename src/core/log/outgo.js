import log from './log'
import chalk from 'chalk'
/**
 * log an outgoing message
 * @name outgoLog
 * @param {Message} msg the incoming message object
 * @param {array|string} text the replied text
 * @param {Date} startTime the time of the incoming message
 */
export default function outgoLog(msg, text, startTime) {
    log(`${chalk.white.bgGreen('  >  ')} ${chalk.gray(`${new Date().toString()} ( ${new Date().getTime() - startTime.getTime()} ms )`)}\n      ${msg.type === 'private' ? chalk.yellow(`reply ${msg.type} ${msg.target}`) : `reply ${msg.type} ${msg.target}`}: ${JSON.stringify(text)}`)
}