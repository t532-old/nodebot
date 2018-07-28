import { safeLoad } from 'js-yaml'
import { readFileSync, appendFileSync } from 'fs'
const { logMessage } = safeLoad(readFileSync('config.yml'))
/**
 * log to console if `logMessage` in config is true
 * @name log
 * @param {string} message the log message
 * @param {boolean?} force force log the message if true and ignore the configuration
 */
export default function log(message, force = false) {
    if (force || logMessage) console.log(`${message}\n`)
    appendFileSync('logs/message.log', `${message}\n\n`)
}