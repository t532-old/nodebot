import log from './log'
import chalk from 'chalk'
import { appendFileSync } from 'fs'
/**
 * log an error
 * @name errorLog
 * @param {Error} err the error
 */
export default function errorLog(err) {
    appendFileSync('logs/error.log', ` ERR  ${new Date().toString()}\n${err.stack || err}\n`)
    log(`${chalk.white.bgRed('  !  ')} ${chalk.gray(new Date().toString())}\n${err.stack || err}`, true)
}