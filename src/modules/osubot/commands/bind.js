import { userdb } from '../db'
import { api } from '../web'
import MESSAGES from './_messages'

export default {
    args: '<account>',
    options: [],
    /**
     * @description binds an osu! id with a QQ id.
     * @param {Message} msg The universal msg object
     * @param {string} account The account
     */
    async action(msg, { account }) {
        let user
        try { user = await api.statQuery({ u: account }) }
        catch (err) { 
            msg.send(`osubot: bind: ${MESSAGES.QUERY_NET_FAIL}`) 
            return
        }
        const result = await userdb.newUser(msg.param.user_id, user.user_id)
        if (!result) {
            msg.send(`osubot: bind: ${MESSAGES.BIND_FAIL}`)
            return
        }
        msg.send(`osubot: bind: ${MESSAGES.BIND_SUCC}`)
    }
}