import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'

const { autoAccept = 'none' } = safeLoad(readFileSync('config/config.yml'))
export default async function request(msg) {
    if (
        (msg.type === autoAccept ||
         autoAccept === 'both') &&
        (msg.param.sub_type === 'invite' ||
         !msg.param.sub_type)
    ) msg.send(true)
    else msg.send(false)
}