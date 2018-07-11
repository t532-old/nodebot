import log from './log'
import chalk from 'chalk'
/**
 * log a message from modules
 * @name mod
 * @param {string} name the module's name
 * @param {string} message the log message
 */
export default function mod(name, message) {
    log(`${chalk.blue('[MOD]')} ${chalk.gray(new Date().toString())} by ${name}: ${message}`)
}