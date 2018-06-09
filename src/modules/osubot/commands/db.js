import { userdb } from '../db'
import MESSAGES from './_messages'
import fs from 'fs'
import yaml from 'js-yaml'
// Initialize settings
const { operators } = yaml.safeLoad(fs.readFileSync('config.yml'))

export default {
    args: '',
    options: ['backup', 'recovery'],
    async action(msg, {}, [ type ]) {
        if (operators.includes(msg.param.user_id)) {
            await managedb[type]();
            msg.send(`osubot: db: ${MESSAGES.DB_SUCC}`)
        } else msg.send(`osubot: db: ${MESSAGES.DB_FAIL}`)
    }
}