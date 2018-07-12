import log from './log'
import chalk from 'chalk'
/**
 * log an error
 * @name errorLog
 * @param {Error} err the error
 */
export default function errorLog(err) {
    log(`${chalk.red('[ERR]')} ${chalk.gray(new Date().toString())}\n${err.stack || err}`, true)
}