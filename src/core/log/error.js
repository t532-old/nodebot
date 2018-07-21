import log from './log'
import chalk from 'chalk'
/**
 * log an error
 * @name errorLog
 * @param {Error} err the error
 */
export default function errorLog(err) {
    fs.appendFileSync('logs/error.log', ` ERR  ${new Date().toString()}\n${err.stack || err}\n`)
    log(`${chalk.white.bgRed(' ERR ')} ${chalk.gray(new Date().toString())}\n${err.stack || err}`, true)
}