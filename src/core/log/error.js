import log from './log'
import chalk from 'chalk'
/**
 * log an error
 * @param {Error} err the error
 */
export default function error(err) {
    log(`${chalk.red('[ERR]')} ${chalk.gray(new Date().toString())}\n${err.stack || err}`, true)
}