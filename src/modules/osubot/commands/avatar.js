import { userdb } from '../db'
import { clearCachedAvatars } from '../canvas'
import MESSAGES from './_messages'

export default {
    args: '',
    options: [],
    /**
     * clear a user's cached avatar
     * @param {Message} msg The universal msg object
     */
    async action(msg) {
        const user = await userdb.getByQQ(msg.param.user_id)
        if (user) {
            clearCachedAvatars(user.osuid)
            msg.send(`osubot: avatar: ${MESSAGES.AVATAR_SUCC}`)
        } else msg.send(`osubot: avatar: ${MESSAGES.QUERY_BIND_FAIL}`)
    }
}