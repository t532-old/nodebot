import axios from 'axios'
import yaml from 'js-yaml'
import fs from 'fs'
const { sendAddress } = yaml.safeLoad(fs.readFileSync('config.yml'))
const errorLog = fs.createWriteStream('log/error.log'),
      runLog = fs.createWriteStream('log/run.log')
/**
 * A class that is uses to send message asynchronously.
 * @class
 * @name Message
 * @property {function} send A cqhttp sender binds to a specific target
 * @property {object} param The message object that cqhttp gives
 */
export default class Message {
    /**
     * builds a message object
     * @param {object} param A standard cqhttp message object
     */
    constructor(param) {
        this.target = param.group_id || param.user_id
        this.type = param.message_type
        this.param = param
    }
    /**
     * Send a message back to the target
     * @param {string|array} message The message that'll be sent
     */
    send(message) { Message[this.type](this.target, message) }
    /**
     * send an error message to the target and log the error
     * @param {Error} err 
     */
    error(err) {
        const date = new Date()
        this.send([
            {
                type: 'text',
                data: {
                    text: '很遗憾，发生了一个未预料到的错误。请过会重试；同时，请您复制下面的信息：\n' +
                            date.toString() + ': ' +
                            err.toString() + 
                            '\n并到 https://gitlab.com/trustgit/nodebot/issues 提交issue或私聊' 
                }
            },
            {
                type: 'at',
                data: { qq: '2037246484' }
            },
        ])
        fs.appendFileSync('logs/error.log', `[ERR] ${date.toString()}\n${err.stack || err}\n`)
    }
    /**
     * Sends a private message
     * @param {string} user_id The target user's qq id.
     * @param {string|array} message The message
     */
    static async 'private'(user_id, message) { return axios.post(`${sendAddress}/send_private_msg`, { user_id, message }) }
    /**
     * Sends a group message
     * @param {string} group_id The target qq group id.
     * @param {string|array} message The message
     */
    static async 'group'(group_id, message) { return axios.post(`${sendAddress}/send_group_msg`, { group_id, message }) }
}

