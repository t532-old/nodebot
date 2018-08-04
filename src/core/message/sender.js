import { post } from 'axios'
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
     * @param {number} user_id The target user's qq id.
     * @param {string|array} message The message
     * @returns {AxiosPromise}
     */
    static async 'private'(user_id, message) { return post(`${sendAddress}/send_private_msg`, { user_id, message }) }
    /**
     * Sends a group message
     * @static
     * @param {number} group_id The target qq group id.
     * @param {string|array} message The message
     * @returns {AxiosPromise}
     */
    static async 'group'(group_id, message) { return post(`${sendAddress}/send_group_msg`, { group_id, message }) }
    /**
     * Sends a discuss message
     * @static
     * @param {number} discuss_id The target qq discuss id.
     * @param {string|array} message The message
     * @returns {AxiosPromise}
     */
    static async 'discuss'(discuss_id, message) { return post(`${sendAddress}/send_discuss_msg`, { discuss_id, message }) }
    /**
     * get group list
     * @static
     * @returns {{ group_id: number, group_name: string }[]}
     */
    static async 'groupList'() { return (await post(`${sendAddress}/get_group_list`)).data.data }
    /**
     * get user info
     * @static
     * @param {number} user_id
     * @param {number?} group_id
     * @returns {{ user_id: number, nickname: string, sex: string, age: number, group_id?: number, card?: number, area?: string, join_time?: number, last_sent_time?: number, level?: string, role?: string, unfriendly?: boolean, title?: string, title_expire_time?: number, card_changeable?: boolean }}
     */
    static async 'userInfo'(user_id, group_id) { 
        return group_id ? 
               (await post(`${sendAddress}/get_stranger_info`), { user_id }).data.data : 
               (await post(`${sendAddress}/get_group_member_info`), { user_id, group_id }).data.data 
    }
    /**
     * kick a user
     * @static
     * @param {number} group_id
     * @param {number} user_id
     * @param {boolean} reject_add_request = false (true => reject, false => don't reject)
     * @returns {AxiosPromise}
     */
    static async 'kick'(group_id, user_id, reject_add_request = false) { return post(`${sendAddress}/set_group_kick`, { group_id, user_id, reject_add_request }) }
    /**
     * ban a user
     * @static
     * @param {number} group_id
     * @param {number} user_id
     * @param {number} duration = 10 * 60
     * @returns {AxiosPromise}
     */
    static async 'ban'(group_id, user_id, duration = 10 * 60) { return post(`${sendAddress}/set_group_ban`, { group_id, user_id, duration }) }
    /**
     * ban a whole group
     * @static
     * @param {number} group_id
     * @param {boolean} enable = true (true => ban, false => unban)
     * @returns {AxiosPromise}
     */
    static async 'wholeBan'(group_id, enable = true) { return post(`${sendAddress}/set_group_whole_ban`, { group_id, enable }) }
    /**
     * leave a group
     * @static
     * @param {number} group_id 
     * @returns {AxiosPromise}
     */
    static async 'leave'(group_id) { return post(`${sendAddress}/set_group_leave`, { group_id }) }
    /**
     * leave a discuss
     * @static
     * @param {number} discuss_id
     * @returns {AxiosPromise}
     */
    static async 'leaveDiscuss'(discuss_id) { return post(`${sendAddress}/set_discuss_leave`, { discuss_id }) }
}

