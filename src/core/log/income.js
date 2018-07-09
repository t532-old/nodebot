import log from './log'
import chalk from 'chalk'
export default function income(msg, startTime) {
    log(`[IN ] ${chalk.gray(startTime.toString())}\n      ${msg.type === 'group' ? `${msg.type} ${msg.target}` : chalk.yellow(`${msg.type} ${msg.target}`)}: ${msg.param.message}`)
}