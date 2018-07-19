import axios from 'axios'
import { requestLog } from '../../log'
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

export default async function request(msg) {
    msg.send = approve => send(approve, msg.request_type, msg.flag)
    if (
        msg.request_type === autoAccept ||
        autoAccept === 'both' &&
        (msg.sub_type === 'invite' ||
         !msg.sub_type)
    ) {
        msg.send(true)
        requestLog(msg, true)
    } else {
        msg.send(false)
        requestLog(msg, false)
    }
}