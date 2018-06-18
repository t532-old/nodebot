import util from './_util'
import { api } from '../web'
import { userdb } from '../db'
import { drawBest } from '../canvas'
import MESSAGES from './_messages'

export default {
    args: '<order> [usr]',
    options: util.flatten(util.modes),
    /**
     * Get a user's best performance
     * @param {Message} msg The universal msg object
     * @param {string} order The username that'll be queried
     * @param {string} usr The username that'll be queried
     * @param {string} mode the mode that will be queried
     */
    async action(msg, { order, usr = 'me' }, [ mode = 'o' ]) {
        mode = util.checkmode(mode)
        let best, map, status
        if (!parseInt(order) || parseInt(order) < 1 || parseInt(order) > 100)
            msg.send(`osubot: bp: ${MESSAGES.BP_ARGS_FAIL}`)
        if (usr === 'me') {
            try {
                const doc = await userdb.getByQQ(msg.param.user_id)
                usr = doc.osuid
            } catch (err) {
                msg.send(`osubot: bp: ${MESSAGES.QUERY_BIND_FAIL}`)
                return
            }
        }
        try {
            try {
                best = (await api.bestQuery({
                    u: usr,
                    limit: order,
                    m: mode
                }))[order - 1]
                ;[map, status] = await Promise.all([
                    api.mapQuery({ b: best.beatmap_id }),
                    api.statQuery({ u: usr }),
                ])
            } catch (err) {
                msg.send(`osubot: bp: ${MESSAGES.QUERY_NET_FAIL}`)
                return
            }
            const path = await drawBest(best, map, status)
            if (path)
                msg.send([{
                    type: 'image',
                    data: {
                        file: path,
                    }
                }])
            else msg.send(`osubot: bp: ${MESSAGES.QUERY_CANVAS_FAIL}`)
        } catch (err) {
            msg.error(err)
            return
        }
    }
}