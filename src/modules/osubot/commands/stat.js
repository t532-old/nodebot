import util from './_util'
import { api } from '../web'
import { userdb } from '../db'
import { drawStat } from '../canvas'
import MESSAGES from './_messages'

export default {
    args: '[usr]',
    options: util.flatten(util.modes),
    /**
     * Fetch a user's status
     * @param {Message} msg The universal msg object
     * @param {string} usr username that will be queried
     * @param {string} mode the mode that will be queried
     */
    async action(msg, { usr = 'me' }, [ mode = 'o' ]) {
        mode = util.checkmode(mode)
        let status, prevStatus
        if (usr === 'me') {
            try {
                const bindDoc = await userdb.getByQQ(msg.param.user_id)
                usr = bindDoc.osuid
                prevStatus = bindDoc.data[mode]
            } catch (err) {
                msg.send(`osubot: stat: ${MESSAGES.QUERY_BIND_FAIL}`)
                return
            }
        }
        try { 
            try {
                status = await api.statQuery({
                    u: usr,
                    m: mode,
                })
            } catch (err) {
                msg.send(`osubot: stat: ${MESSAGES.QUERY_NET_FAIL}`)
                return
            }
            if (status.pp_rank === null) {
                msg.send(`osubot: stat: ${MESSAGES.QUERY_NET_FAIL}`)
                return
            }
            const path = await drawStat(status, prevStatus)
            if (path)
                msg.send([{
                    type: 'image',
                    data: {
                        file: path,
                    }
                }])
            else msg.send(`osubot: stat: ${MESSAGES.QUERY_CANVAS_FAIL}`)
        } catch (err) {
            msg.error(err)
            return
        }
    }
}