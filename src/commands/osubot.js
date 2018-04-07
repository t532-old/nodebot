const axios = require('axios')
const fs = require('fs')
const config = eval('(' + fs.readFileSync('config.json') + ')').osubot
const db = require('monk')('localhost:27017/botdb')
const gm = require('gm')
const { StatQuery, RecentQuery } = require('./osubot-classes')

const users = db.get('users')

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

module.exports = {
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
                data = (await axios.get(`https://osu.ppy.sh/api/get_user?k=${config.key}&u=${usr}&m=${mode}`)).data 
            } catch (err) { 
                msg.sender('osubot: stat: bad network status') 
                return
            }
            if (data[0] !== undefined) msg.sender(JSON.stringify(data[0]))
            else msg.sender('osubot: stat: user does not exist')
        },
        separator: /[\r\n\s]/
    },
    recent: {
        async action(msg, usr = 'me', mode = 'o') {
            mode = util.checkmode(mode)
            let data = []
            if (util.modes.flatten().includes(usr.toLowerCase())) {
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
                data = (await axios.get(`https://osu.ppy.sh/api/get_user_recent?k=${config.key}&u=${usr}&m=${mode}&limit=1`)).data
            } catch(err) {
                msg.sender('osubot: stat: bad network status')
                return
            }
            if (data[0] !== undefined) msg.sender(JSON.stringify(data[0]))
            else msg.sender('osubot: recent: user does not exist')
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