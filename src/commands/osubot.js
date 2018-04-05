const axios = require('axios')
const fs = require('fs')
const config = eval('(' + fs.readFileSync('config.json') + ')').osubot
const db = require('monk')('localhost:27017/botdb')
const gm = require('gm')

const users = db.get('users')

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
        action(msg, usr = 'me', mode = 'o') {
            new Promise(function(resolve, reject) {
                function checkmode(mode) {
                    switch(mode) {
                        case 'o': mode = 0; break;
                        case 't': mode = 1; break;
                        case 'c': mode = 2; break;
                        case 'm': mode = 3; break;
                    }
                    return mode
                }
                mode = checkmode(mode)
                if (['o', 't', 'c', 'm'].includes(usr)) {
                    mode = checkmode(usr)
                    usr = 'me'
                }
                if (usr === 'me') users.findOne({ qqid: msg.param.user_id }).then(doc => { usr = doc.osuid }).then(resolve).catch(reject)
                else resolve()
            }).then(() => axios.get(`https://osu.ppy.sh/api/get_user?k=${config.key}&u=${usr}&m=${mode}`))
              .then(res => {
                if (res.data !== []) msg.sender(JSON.stringify(res.data[0]))
                else msg.sender('osubot: stat: user not exist or bad network status')
              })
        },
        separator: /[\r\n\s]/
    },
    recent: {
        action(msg, usr = 'me', mode = 'o') {
            new Promise(function(resolve, reject) {
                function checkmode(mode) {
                    switch(mode) {
                        case 'o': mode = 0; break;
                        case 't': mode = 1; break;
                        case 'c': mode = 2; break;
                        case 'm': mode = 3; break;
                    }
                    return mode
                }
                mode = checkmode(mode)
                if (['o', 't', 'c', 'm'].includes(usr)) {
                    mode = checkmode(usr)
                    usr = 'me'
                }
                if (usr === 'me') users.findOne({ qqid: msg.param.user_id }).then(doc => { usr = doc.osuid }).then(resolve).catch(reject)
                else resolve()
            }).then(() => axios.get(`https://osu.ppy.sh/api/get_user_recent?k=${config.key}&u=${usr}&m=${mode}&limit=1`))
              .then(res => {
                if (res.data !== []) msg.sender(JSON.stringify(res.data[0]))
                else msg.sender('osubot: recent: user not exist or bad network status')
              })
        },
        separator: /[\r\n\s]/
    },
    roll: {
        action(msg, range = '100') {
            if (typeof range === 'string' && !parseInt(range)) {
                range = range.split(',')
                msg.sender(range[Math.floor(Math.random() * range.length)])
            } else msg.sender(Math.round(Math.random() * range).toString())
        },
        separator: /[\r\n\s]/
    }
}