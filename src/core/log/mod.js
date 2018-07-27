import log from './log'
import chalk from 'chalk'
/**
 * log a message from modules
 * @name modLog
 * @param {string} name the module's name
 * @param {string} message the log message
 */
export default function modLog(name, message) {
    log(`${chalk.white.bgBlue('  +  ')} ${chalk.gray(new Date().toString())} by ${name}: ${message}`)
}