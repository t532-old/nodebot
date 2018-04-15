import botModules from './modules/exports.js'
import axios from 'axios'
export default {
    send: {
        private(user_id, message) {
            return axios.post('http://localhost:5700/send_private_msg', { user_id, message })
        },
        group(group_id, message) {
            return axios.post('http://localhost:5700/send_group_msg', { group_id, message })
        }
    },
    handle(param) {
        // Check if this is command format
        if (!param.message.match(/^[>》][^]+$/m)) return 
        // Declare shorthands for message type and target user
        const type = param.message_type
        const target = param.group_id || param.user_id
        // The response
        let response = ''
        // This splits the command into parts
        const raw = unescape(param.message.replace(/&#(\d+);/g, (match, str) => '%' + parseInt(str).toString(16))).trim().slice(1).split(/[\r\n\s]/).filter(i => i)
        // Main & sub Command
        const main = raw[0].toLowerCase()
        const sub = raw.slice(1)
        // The sender
        const sender = this.send[type].bind(this, target)
        // Is this an existing Command?
        if (typeof botModules[main] === 'object') {
            botModules[main].action({ sender, param }, ...sub)
        } else sender('Unknown Command!')
    }
}