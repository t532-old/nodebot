import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
import chalk from 'chalk'
import { modLog } from '../../core/log'
import analyzer from '../../core/analyzer'
const { injectionChecker } = safeLoad(readFileSync('config.yml'))
const log = {
    private: {},
    group: {},
    discuss: {},
}
const { repeater: config } = safeLoad(readFileSync('config.yml')).osubot
/**
 * This middleware counts the repeated times of a message
 * if it reaches 3, the bot repeats it
 * @param {Message} msg 
 */
function repeater(msg) {
    if (new RegExp(...injectionChecker).test(msg.param.message) === false) {
        if ('notAllowed' in config && config.notAllowed.includes(msg.target)) return
        if ('allowed' in config && !config.allowed.includes(msg.target)) return
        if (!log[msg.type][msg.target]) log[msg.type][msg.target] = { count: 1, message: msg.param.message }
        else if (msg.param.message === log[msg.type][msg.target].message) log[msg.type][msg.target].count++
        else log[msg.type][msg.target] = { count: 1, message: msg.param.message }
        if (log[msg.type][msg.target].count === config.times) {
            const timeout = Math.round(Math.random() * 200000),
                  repeatTarget = log[msg.type][msg.target]
            modLog('osubot middleware', `attempting to repeat \`${msg.param.message}' in ${msg.type === 'private' ? chalk.yellow(`${msg.type} ${msg.target}`) : `${msg.type} ${msg.target}`} in ${Math.round(timeout / 1000)} secs`)
            setTimeout(() => { msg.send(repeatTarget.message) }, timeout)
            analyzer(msg, 'middleware', 'osubotRepeat')
        } 
    }
}

export default [ repeater ]