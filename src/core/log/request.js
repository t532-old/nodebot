import log from './log'
import chalk from 'chalk'
/**
 * log an error
 * @name requestLog
 * @param {object} msg cqhttp event
 * @param {boolean} stat approved or refused
 */
export default function requestLog(msg, stat) {
    log(`${chalk.white.bgMagenta('[REQ]')} ${chalk.gray(new Date().toString())}: ${stat ? chalk.green('Accepted') : chalk.red('Refused')} add request ${msg.request_type === 'group' ? `${msg.request_type} ${msg.group_id}(${msg.user_id})` : chalk.yellow(`${msg.request_type} ${msg.user_id}`)}`)
}