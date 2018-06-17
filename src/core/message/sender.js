import axios from 'axios'
import yaml from 'js-yaml'
import fs from 'fs'
const { sendPort } = yaml.safeLoad(fs.readFileSync('config.yml'))
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
     * @param {object} param 
     */
    constructor(param) {
        this.target = param.group_id || param.user_id
        this.type = param.message_type
        this.param = param
    }
    send(message) { Message[this.type](this.target, message) }
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
            console.log(`${date.toString()} error:`)
            console.log(err)
    }
    /**
     * Sends a private message
     * @param {string} user_id The target user's qq id.
     * @param {string|array} message The message
     */
    static async 'private'(user_id, message) { return axios.post(`http://localhost:${sendPort}/send_private_msg`, { user_id, message }) }
    /**
     * Sends a group message
     * @param {string} group_id The target qq group id.
     * @param {string|array} message The message
     */
    static async 'group'(group_id, message) { return axios.post(`http://localhost:${sendPort}/send_group_msg`, { group_id, message }) }
}

