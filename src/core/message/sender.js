import { get, post } from 'axios'
import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
import { errorLog, incomeLog, outgoLog } from '../log'
import { AxiosResponse } from '../../../node_modules/axios';
const { sendAddress } = safeLoad(readFileSync('config.yml'))
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
     * @param {{ group_id: number, message_type: string, ... }} param A standard cqhttp message object
     */
    constructor(param) {
        this.target = param.group_id || param.discuss_id || param.user_id
        this.type = param.message_type
        this.param = param
        incomeLog(this, this.#startTime)
    }
    /**
     * Send a message back to the target
     * @method
     * @param {string|array} message The message that'll be sent
     */
    send(message) {
        Message[this.type](this.target, message)
        outgoLog(this, message, this.#startTime)
    }
    /**
     * send an error message to the target and log the error
     * @method
     * @param {Error} err 
     */
    error(err) {
        this.send([
            {
                type: 'text',
                data: {
                    text: '很遗憾，发生了一个未预料到的错误。请过会重试；同时，请您复制下面的信息：\n' +
                            new Date().toString() + ': ' +
                            err.toString() + 
                            '\n并到 https://gitlab.com/trustgit/nodebot/issues 提交issue或私聊' 
                }
            },
            {
                type: 'at',
                data: { qq: '2037246484' }
            },
        ])
        errorLog(err)
    }
    /**
     * Sends a private message
     * @static
     * @param {string} user_id The target user's qq id.
     * @param {string|array} message The message
     * @returns {AxiosResponse}
     */
    static async 'private'(user_id, message) { return post(`${sendAddress}/send_private_msg`, { user_id, message }) }
    /**
     * Sends a group message
     * @static
     * @param {string} group_id The target qq group id.
     * @param {string|array} message The message
     * @returns {AxiosResponse}
     */
    static async 'group'(group_id, message) { return post(`${sendAddress}/send_group_msg`, { group_id, message }) }
    /**
     * Sends a discuss message
     * @static
     * @param {string} discuss_id The target qq discuss id.
     * @param {string|array} message The message
     * @returns {AxiosResponse}
     */
    static async 'discuss'(discuss_id, message) { return post(`${sendAddress}/send_discuss_msg`, { discuss_id, message }) }
    /**
     * get group list
     * @static
     * @returns {{ group_id: number, group_name: string }[]}
     */
    static async 'groupList'() { return (await get(`${sendAddress}/get_group_list`)).data.data }
}

