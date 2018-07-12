import axios from 'axios'
import { requestLog } from './log'
import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'

const { autoAccept = 'none', sendAddress } = safeLoad(readFileSync('config.yml'))

async function send(approve, type, flag) {
    return axios.post(`${sendAddress}/set_${type}_add_request`, {
        flag,
        approve,
        type: 'invite', // only for group requests
    })
}

async function handle(msg) {
    if (
        msg.request_type === autoAccept ||
        autoAccept === 'both' &&
        (msg.sub_type === 'invite' ||
         !msg.sub_type)
    ) {
        send(true, msg.request_type, msg.flag)
        requestLog(msg, true)
    } else {
        send(false, msg.request_type, msg.flag)
        requestLog(msg, false)
    }
}

export default { handle }