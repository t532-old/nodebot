import botModules from './modules'
import axios from 'axios'

/**
 * A class that is uses to send message asynchronously.
 * @class
 * @property {function} send A cqhttp sender binds to a specific target
 * @property {object} param The message object that cqhttp gives
 */
class Message {
    /**
     * builds a message object
     * @param {object} param 
     */
    constructor(param) {
        this.send = message => Message[param.message_type](param.group_id || param.user_id, message)
        this.param = param
    }
    /**
     * Sends a private message
     * @param {string} user_id The target user's qq id.
     * @param {string|array} message The message
     */
    static async 'private'(user_id, message) { return axios.post('http://localhost:5700/send_private_msg', { user_id, message }) }
    /**
     * Sends a group message
     * @param {*} group_id The target qq group id.
     * @param {*} message The message
     */
    static async 'group'(group_id, message) { return axios.post('http://localhost:5700/send_group_msg', { group_id, message }) }
}

function handle(param) {
    // Check if this is command format
    if (!param.message.match(/^[>》][^]+$/m)) return 
    // This splits the command into parts
    const raw = unescape(param.message.replace(/&#(\d+);/g, (match, str) => '%' + parseInt(str).toString(16))).trim().slice(1).split(/[\r\n\s]/).filter(i => i)
    // Main & sub Command
    const main = raw[0].toLowerCase()
    const sub = raw.slice(1)
    // The Message object
    const msg = new Message(param)
    // Is this an existing Command?
    if (typeof botModules[main] === 'function') botModules[main](msg, ...sub)
    else send('Unknown Command!')
}

export default { Message, handle }