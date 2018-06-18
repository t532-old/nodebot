import { userdb } from '../db'
import MESSAGES from './_messages'

export default {
    args: '',
    options: [],
    /**
     * unbinds an osu! id from a QQ id.
     * @param {Message} msg The universal msg object
     * @param {string} account The account
     */
    async action(msg) {
        await userdb.delUser(msg.param.user_id)
        msg.send(`osubot: unbind: ${MESSAGES.UNBIND_SUCC}`)
    }
}