import util from './_util'
import { api } from '../web'
import { userdb } from '../db'
import { drawRecent } from '../canvas'
import MESSAGES from './_messages'

export default {
    args: '[usr]',
    options: util.flatten(util.modes),
    /**
     * Get a user's most recent play
     * @param {Message} msg The universal msg object
     * @param {string} usr The username that'll be queried
     * @param {string} mode the mode that will be queried
     */
    async action(msg, { usr = 'me' }, [ mode = 'o' ]) {
        mode = util.checkmode(mode)
        let recent, map, status
        if (usr === 'me') {
            try {
                const doc = await userdb.getByQQ(msg.param.user_id)
                usr = doc.osuid
            } catch (err) {
                msg.send(`osubot: stat: ${MESSAGES.QUERY_BIND_FAIL}`)
                return
            }
        }
        try { 
            try {
                recent = await api.recentQuery({
                    u: usr,
                    limit: '1',
                    m: mode,
                })
                ;[map, status] = await Promise.all([
                    api.mapQuery({ b: recent.beatmap_id }),
                    api.statQuery({ u: usr }),
                ])
            } catch (err) {
                msg.send(`osubot: rec: ${MESSAGES.QUERY_NET_FAIL}`)
                return
            }
            const path = await drawRecent(recent, map, status)
            if (path)
                msg.send([{
                    type: 'image',
                    data: {
                        file: path,
                    }
                }])
            else msg.send(`osubot: rec: ${MESSAGES.QUERY_CANVAS_FAIL}`)
        } catch (err) {
            msg.error(err)
            return
        }
    }
}