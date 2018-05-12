// Imports from local file
import { Message } from '../../message'
import { api } from './web'
import canvas from './canvas'
import util from './util'
// Imports from modules
import fs from 'fs'
import Monk from 'monk'
import yaml from 'js-yaml'
import { WSAECONNRESET } from 'constants';
// Initialize settings and database connection
const db = Monk('localhost:27017/botdb')
const users = db.get('users')
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
        const exists = await users.findOne({ qqid: msg.param.user_id })
        if (exists) {
            msg.send('osubot: bind: 你绑定过id了！如果想要重新绑定，请先输入 `-unbind\' 来解绑。')
            return
        }
        users.insert({ qqid: msg.param.user_id, osuid: account })
        msg.send('osubot: bind: 绑定成功！\n请注意如果你的用户名包含空格，则要用英文双引号 " 将用户名括起来。\n如果绑定错误，想要重新绑定，请输入 `-unbind\' 解绑后再次使用本命令。')
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
        users.remove({ qqid: msg.param.user_id })
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
        let data = []
        if (usr === 'me') {
            try {
                const doc = await users.findOne({ qqid: msg.param.user_id })
                usr = doc.osuid
            } catch (err) {
                msg.send('osubot: stat: 你还没有绑定你的osu!id。使用 `-bind <id>\' 来绑定')
                return
            }
        }
        try { 
            const stat = await api.statQuery({
                u: usr,
                k: config.key,
                m: mode,
            })
            const path = await canvas.drawStat(stat)
            msg.send([{
                type: 'image',
                data: {
                    file: path,
                }
            }])
        } catch(err) {
            msg.send(err.toString())
            return
        }
    }
}

const rec = {
    args: '[usr]',
    options: [],
    /**
     * @description Get a user's most recent play
     * @param {Message} msg The universal msg object
     * @param {string} usr The username that'll be queried
     */
    async action(msg, { usr = 'me' }) {
        let data = []
        if (usr === 'me') {
            try {
                const doc = await users.findOne({ qqid: msg.param.user_id })
                usr = doc.osuid
            } catch (err) {
                msg.send('osubot: recent: 你还没有绑定你的osu!id。使用 `-bind <id>\' 来绑定')
                return
            }
        }
        try { 
            const rec = await api.recentQuery({
                u: usr,
                limit: '1',
                k: config.key
            })
            const [map, stat] = await Promise.all([
                api.mapQuery({
                    b: rec.beatmap_id,
                    k: config.key
                }),
                api.statQuery({
                    u: usr,
                    k: config.key
                }),
            ])
            const path = await canvas.drawRecent(rec, map, stat)
            msg.send([{
                type: 'image',
                data: {
                    file: path,
                }
            }])
        } catch(err) {
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

export default { bind, unbind, stat, rec, roll }