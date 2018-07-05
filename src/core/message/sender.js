import axios from 'axios'
import yaml from 'js-yaml'
import fs from 'fs'
import chalk from 'chalk'
const { sendAddress, logMessage } = yaml.safeLoad(fs.readFileSync('config.yml'))
/**
 * A class that is uses to send message asynchronously.
 * @class
 * @name Message
 * @property {function} send A cqhttp sender binds to a specific target
 * @property {object} param The message object that cqhttp gives
 */
export default class Message {
    /**
     * When is the message created
     * @property
     */
    #startTime = new Date()
    /**
     * The target qqid or group id
     * @property
     */
    target
    /**
     * The send() type
     * @property
     */
    type
    /**
     * the cqhttp POST message
     * @property
     */
    param
    /**
     * builds a message object
     * @constructor
     * @param {object} param A standard cqhttp message object
     */
    constructor(param) {
        this.target = param.group_id || param.user_id
        this.type = param.message_type
        this.param = param
        console.log(`[IN ] ${chalk.gray(this.#startTime.toString())}\n      ${this.type === 'group' ? `${this.type} ${this.target}` : chalk.yellow(`${this.type} ${this.target}`)}: ${this.param.message}`)
    }
    /**
     * Send a message back to the target
     * @method
     * @param {string|array} message The message that'll be sent
     */
    send(message) {
        const endTime = new Date()
        Message[this.type](this.target, message)
        if (logMessage) console.log(`[OUT] ${endTime.toString()}( ${endTime.getTime() - this.#startTime.getTime()} ms )\n      reply ${this.type} ${this.target}: ${JSON.stringify(message)}`)
    }
    /**
     * send an error message to the target and log the error
     * @method
     * @param {Error} err 
     */
    error(err) {
        const endTime = new Date()
        this.send([
            {
                type: 'text',
                data: {
                    text: '很遗憾，发生了一个未预料到的错误。请过会重试；同时，请您复制下面的信息：\n' +
                            endTime.toString() + ': ' +
                            err.toString() + 
                            '\n并到 https://gitlab.com/trustgit/nodebot/issues 提交issue或私聊' 
                }
            },
            {
                type: 'at',
                data: { qq: '2037246484' }
            },
        ])
        if (logMessage) console.log(`[ERR] ${endTime.toString()}\n${err.stack || err}`)
        fs.appendFileSync('logs/error.log', `[ERR] ${endTime.toString()}\n${err.stack || err}\n`)
    }
    /**
     * Sends a private message
     * @static
     * @param {string} user_id The target user's qq id.
     * @param {string|array} message The message
     */
    static async 'private'(user_id, message) { return axios.post(`${sendAddress}/send_private_msg`, { user_id, message }) }
    /**
     * Sends a group message
     * @static
     * @param {string} group_id The target qq group id.
     * @param {string|array} message The message
     */
    static async 'group'(group_id, message) { return axios.post(`${sendAddress}/send_group_msg`, { group_id, message }) }
}

