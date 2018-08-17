import log from './log'
import chalk from 'chalk'
/**
 * log a request
 * @name requestLog
 * @param {RequestMessage} msg cqhttp event
 * @param {boolean} stat approved or refused
 */
export default function requestLog(msg, stat) {
    log(`${chalk.white.bgMagenta('  ?  ')} ${chalk.gray(new Date().toString())}:\n      ${stat ? chalk.green('Accepted') : chalk.red('Refused')} add request ${msg.type === 'friend' ? chalk.yellow(`${msg.type} ${msg.target}`) : `${msg.type} ${msg.target}(${msg.param.user_id})`}`)
}