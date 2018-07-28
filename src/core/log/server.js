import log from './log'
import chalk from 'chalk'
/**
 * log a message from the main server process
 * @name serverLog
 * @param {string} message the log message
 */
export default function serverLog(message) {
    log(`${chalk.black.bgCyan('  *  ')} ${message}`)
}