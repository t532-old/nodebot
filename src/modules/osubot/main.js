// Imports from local file
import { Message } from '../../message'
import { api } from './web'
import canvas from './canvas'
import util from './util'
import { userdb, statdb, managedb } from './db'
// Imports from modules
import fs from 'fs'
import yaml from 'js-yaml'
// Initialize settings
const { operators } = yaml.safeLoad(fs.readFileSync('config.yml'))

const MESSAGES = {
    QUERY_BIND_FAIL: '你还没有绑定你的osu!id。\n使用 `-bind <id>\' 来绑定（*一定*要去掉两边的尖括号<>），\n如果用户名有空格请将用户名*整个*用英文引号 "" 括起来！',
    QUERY_NET_FAIL: '用户不存在/最近没玩过！',
    QUERY_CANVAS_FAIL: '请求太频繁，请稍后重试！',
    BP_ARGS_FAIL: '请指定一个bp序号(1-100)！',
    AVATAR_SUCC: '清除头像缓存成功！',
    BIND_FAIL: '你绑定过id了！如果想要重新绑定，请先输入 `-unbind\' 来解绑。',
    BIND_SUCC: '绑定成功！\n如果绑定错误，想要重新绑定，请输入 `-unbind\' 解绑后再次使用本命令。',
    UNBIND_SUCC: '解绑成功！',
    DB_SUCC: '数据库操作完毕。',
    DB_FAIL: '操作错误或者没有权限！',
}

const bind = {
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

const unbind = {
    args: '',
    options: [],
    /**
     * @description unbinds an osu! id from a QQ id.
     * @param {Message} msg The universal msg object
     * @param {string} account The account
     */
    async action(msg) {
        await userdb.delUser(msg.param.user_id)
        msg.send(`osubot: unbind: ${MESSAGES.UNBIND_SUCC}`)
    }
}

const stat = {
    args: '[usr]',
    options: util.flatten(util.modes),
    /**
     * @description Fetch a user's status
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
            const path = await canvas.drawStat(status, prevStatus)
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

const rec = {
    args: '[usr]',
    options: util.flatten(util.modes),
    /**
     * @description Get a user's most recent play
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
            const path = await canvas.drawRecent(recent, map, status)
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

const bp = {
    args: '<order> [usr]',
    options: util.flatten(util.modes),
    /**
     * @description Get a user's best performance
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
            const path = await canvas.drawBest(best, map, status)
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

const roll = {
    args: '[range]',
    options: [],
    /**
     * @description Gives a random result in a specific range (default 100)
     * @param {Message} msg The universal msg object
     * @param {string} range The rolling range
     */
    async action(msg, { range = '100' }) {
        if (typeof range === 'string' && !parseInt(range)) {
            range = range.split(',')
            msg.send(range[Math.floor(Math.random() * range.length)])
        } else msg.send(Math.round(Math.random() * parseInt(range)).toString())
    }
}

const avatar = {
    args: '',
    options: [],
    async action(msg) {
        const user = await userdb.getByQQ(msg.param.user_id)
        if (user) {
            canvas.clearCachedAvatars(user.osuid)
            msg.send(`osubot: avatar: ${MESSAGES.AVATAR_SUCC}`)
        } else msg.send(`osubot: avatar: ${MESSAGES.QUERY_BIND_FAIL}`)
    }
}

const db = {
    args: '',
    options: ['backup', 'recovery'],
    async action(msg, {}, [ type ]) {
        if (operators.includes(msg.param.user_id)) {
            await managedb[type]();
            msg.send(`osubot: db: ${MESSAGES.DB_SUCC}`)
        } else msg.send(`osubot: db: ${MESSAGES.DB_FAIL}`)
    }
}

export default { bind, unbind, stat, rec, bp, roll, avatar, db }