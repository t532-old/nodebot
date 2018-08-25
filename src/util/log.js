import chalk from 'chalk'
import { safeLoad } from 'js-yaml'
import { appendFileSync, readFileSync } from 'fs'
const { logMessage } = safeLoad(readFileSync('config/config.yml'))

/**
 * log to console if `logMessage` in config is true
 * @name log
 * @param {string} message the log message
 * @param {boolean?} force force log the message if true and ignore the configuration
 */
export function log(message, force = false) {
    if (force || logMessage) console.log(`${message}\n`)
    appendFileSync('logs/message.log', `${message}\n\n`)
}

/**
 * log an error
 * @name errorLog
 * @param {Error} err the error
 */
export function errorLog(err) {
    appendFileSync('logs/error.log', ` ERR  ${new Date().toString()}\n${err.stack || err}\n`)
    log(`${chalk.white.bgRed('  !  ')} ${chalk.gray(new Date().toString())}\n${err.stack || err}`, true)
}

/**
 * log an incoming message
 * @name incomeLog
 * @param {ContentMessage} msg the message object
 * @param {Date} startTime the time of the message
 */
export function incomeLog(msg, startTime) {
    log(`${chalk.black.bgWhite('  <  ')} ${chalk.gray(startTime.toString())}\n      ${msg.type === 'private' ? chalk.yellow(`${msg.type} ${msg.target}`) : `${msg.type} ${msg.target}(${msg.targetUser})`}: ${msg.content}`)
}

/**
 * log a message from modules
 * @name modLog
 * @param {string} name the module's name
 * @param {string} message the log message
 */
export function modLog(name, message) {
    log(`${chalk.white.bgBlue('  +  ')} ${chalk.gray(new Date().toString())} by ${name}:\n      ${message}`)
}

/**
 * log an outgoing message
 * @name outgoLog
 * @param {ContentMessage} msg the incoming message object
 * @param {array|string} text the replied text
 * @param {Date} startTime the time of the incoming message
 */
export function outgoLog(msg, text, startTime) {
    log(`${chalk.white.bgGreen('  >  ')} ${chalk.gray(`${new Date().toString()} ( ${new Date().getTime() - startTime.getTime()} ms )`)}\n      ${msg.type === 'private' ? chalk.yellow(`reply ${msg.type} ${msg.target}`) : `reply ${msg.type} ${msg.target}`}: ${JSON.stringify(text)}`)
}

/**
 * log a request
 * @name requestLog
 * @param {RequestMessage} msg cqhttp event
 * @param {boolean} stat approved or refused
 */
export function requestLog(msg, stat) {
    log(`${chalk.white.bgMagenta('  ?  ')} ${chalk.gray(new Date().toString())}:\n      ${stat ? chalk.green('Accepted') : chalk.red('Refused')} add request ${msg.type === 'friend' ? chalk.yellow(`${msg.type} ${msg.target}`) : `${msg.type} ${msg.target}(${msg.param.user_id})`}`)
}

/**
 * log a message from the main server process
 * @name serverLog
 * @param {string} message the log message
 */
export function serverLog(message) {
    log(`${chalk.black.bgCyan('  *  ')} ${message}`)
}