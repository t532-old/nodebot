import fs from 'fs'
import Monk from 'monk'
import api from './osubot-api'
import canvas from './osubot-canvas'

const db = Monk('localhost:27017/botdb')
const users = db.get('users')

const config = eval('(' + fs.readFileSync('config.json') + ')').osubot
const util = {
    modes: [['o', 's', '0', 'osu', 'std', 'osu!', 'standard'],
            ['t', '1', 'tk', 'taiko'],
            ['c', '2', 'ctb', 'catch', 'catchthebeat'],
            ['m', '3', 'mania']],
    checkmode(mode) {
        mode = mode.toLowerCase()
        for (let i in this.modes)
            if (this.modes[i].includes(mode)) return i
        return 0
    }
}

function flatten(arr) {
    const flat = []
    for (let i of arr) {
        if (i instanceof Array) flat.push(...flatten(i))
        else flat.push(i)
    }
    return flat
}

export default {
    test: {
        action(msg, ...txt) { msg.sender(txt.join(' ')) },
        separator: /[\r\n\s]/
    },
    bind: {
        action(msg, ...account) { 
            users.insert({ qqid: msg.param.user_id, osuid: account.join(' ')})
            msg.sender('osubot: bind: bound successfully')
        },
        separator: /[\r\n\s]/
    },
    stat: {
        async action(msg, usr = 'me', mode = 'o') {
            mode = util.checkmode(mode)
            let data = []
            if (flatten(util.modes).includes(usr.toLowerCase())) {
                mode = util.checkmode(usr)
                usr = 'me'
            }
            if (usr === 'me') {
                try {
                    const doc = await users.findOne({ qqid: msg.param.user_id })
                    usr = doc.osuid
                } catch (err) {
                    msg.sender('osubot: recent: user does not exist')
                }
            }
            try { 
                msg.sender(await new api.StatQuery({
                    u: usr,
                    m: mode,
                    k: config.key
                }).exec())
            } catch(err) {
                msg.sender(err.toString())
            }
        },
        separator: /[\r\n\s]/
    },
    recent: {
        async action(msg, usr = 'me') {
            let data = []
            if (usr === 'me') {
                try {
                    const doc = await users.findOne({ qqid: msg.param.user_id })
                    usr = doc.osuid
                } catch (err) {
                    msg.sender('osubot: recent: user does not exist')
                    return
                }
            }
            try { 
                const rec = await new api.RecentQuery({
                    u: usr,
                    limit: '1',
                    k: config.key
                }).exec()
                const map = await new api.MapQuery({
                    b: rec.beatmap_id,
                    k: config.key
                }).exec()
                const stat = await new api.StatQuery({
                    u: usr,
                    k: config.key
                }).exec()
                const path = await canvas.drawRecent(rec, map, stat)
                msg.sender([{
                    type: "image",
                    data: {
                        file: "../",
                    }
                }])
            } catch(err) {
                await canvas.drawErrRecent()
                return
            }
        },
        separator: /[\r\n\s]/
    },
    roll: {
        async action(msg, range = '100') {
            if (typeof range === 'string' && !parseInt(range)) {
                range = range.split(',')
                msg.sender(range[Math.floor(Math.random() * range.length)])
            } else msg.sender(Math.round(Math.random() * range).toString())
        },
        separator: /[\r\n\s]/
    }
}