// Imports from local file
import { Message } from '../../message'
import { api } from './web'
import canvas from './canvas'
import util from './util'
import { userdb, statdb } from './db'
// Imports from modules
import fs from 'fs'
import yaml from 'js-yaml'
// Initialize settings
const config = yaml.safeLoad(fs.readFileSync('config.yml')).osubot

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
            msg.send('osubot: bind: 用户名无效或bot炸了！（请注意输入用户名时不用添加帮助中示例的尖括号<>）') 
            return
        }
        const result = await userdb.newUser(msg.param.user_id, user.user_id)
        if (!result) {
            msg.send('osubot: bind: 你绑定过id了！如果想要重新绑定，请先输入 `-unbind\' 来解绑。')
            return
        }
        msg.send('osubot: bind: 绑定成功！\n如果绑定错误，想要重新绑定，请输入 `-unbind\' 解绑后再次使用本命令。')
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
        msg.send('osubot: unbind: 解绑成功！')
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
        let prevStat
        if (usr === 'me') {
            try {
                const bindDoc = await userdb.getByQQ(msg.param.user_id)
                usr = bindDoc.osuid
            } catch (err) {
                msg.send('osubot: stat: 你还没有绑定你的osu!id。\n使用 `-bind <id>\' 来绑定（*一定*要去掉两边的尖括号<>），\n如果用户名有空格请将用户名*整个*用英文引号 " 括起来！')
                return
            }
            try {
                const statDoc = await statdb.getByQQ(msg.param.user_id)
                prevStat = statDoc.data[mode]
            } catch (err) {
                msg.send('osubot: stat: 数据库波动，请稍后再试！')
                return
            }
        }
        try { 
            const stat = await api.statQuery({
                u: usr,
                m: mode,
            })
            const path = await canvas.drawStat(stat, prevStat)
            if (path)
                msg.send([{
                    type: 'image',
                    data: {
                        file: path,
                    }
                }])
            else msg.send('osubot: stat: 请过会重试！')
        } catch (err) {
            console.log(err)
            msg.send(err.toString())
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
     */
    async action(msg, { usr = 'me' }, [ mode = 'o' ]) {
        mode = util.checkmode(mode)
        if (usr === 'me') {
            try {
                const doc = await userdb.getByQQ(msg.param.user_id)
                usr = doc.osuid
            } catch (err) {
                msg.send('osubot: stat: 你还没有绑定你的osu!id。\n使用 `-bind <id>\' 来绑定（*不带*尖括号<>），\n如果用户名有空格请将用户名*整个*用英文引号 " 括起来！')
                return
            }
        }
        try { 
            const rec = await api.recentQuery({
                u: usr,
                limit: '1',
                m: mode,
            })
            const [map, stat] = await Promise.all([
                api.mapQuery({ b: rec.beatmap_id }),
                api.statQuery({ u: usr }),
            ])
            const path = await canvas.drawRecent(rec, map, stat)
            if (path)
                msg.send([{
                    type: 'image',
                    data: {
                        file: path,
                    }
                }])
            else msg.send('osubot: rec: 请过会重试！')
        } catch (err) {
            msg.send(err.toString())
            return
        }
    }
}

const bp = {
    args: '<order> [usr]',
    options: [],
    /**
     * @description Get a user's best performance
     * @param {Message} msg The universal msg object
     * @param {string} order The username that'll be queried
     * @param {string} usr The username that'll be queried
     */
    async action(msg, { order, usr = 'me' }) {
        if (!parseInt(order) || parseInt(order) < 1 || parseInt(order) > 100)
            msg.send('osubot: bp: 请指定一个bp序号(1-100)！')
        if (usr === 'me') {
            try {
                const doc = await userdb.getByQQ(msg.param.user_id)
                usr = doc.osuid
            } catch (err) {
                msg.send('osubot: bp: 你还没有绑定你的osu!id。\n使用 `-bind <id>\' 来绑定（*不带*尖括号<>），\n如果用户名有空格请将用户名*整个*用英文引号 " 括起来！')
                return
            }
        }
        try { 
            const rec = (await api.bestQuery({
                u: usr,
                limit: order,
            }))[order - 1]
            const [map, stat] = await Promise.all([
                api.mapQuery({ b: rec.beatmap_id }),
                api.statQuery({ u: usr }),
            ])
            const path = await canvas.drawBest(rec, map, stat)
            if (path)
                msg.send([{
                    type: 'image',
                    data: {
                        file: path,
                    }
                }])
            else msg.send('osubot: bp: 请过会重试！')
        } catch (err) {
            msg.send(err.toString())
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
            msg.send('osubot: avatar: 清除头像缓存成功！')
        } else msg.send('osubot: avatar: 你还没有绑定你的osu!id。\n使用 `-bind <id>\' 来绑定（*不带*尖括号<>），\n如果用户名有空格请将用户名*整个*用英文引号 " 括起来！')
    }
}

export default { bind, unbind, stat, rec, bp, roll, avatar }