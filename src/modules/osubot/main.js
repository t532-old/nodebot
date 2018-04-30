// Imports from local file
import { Message } from '../../message'
import { api } from './web'
import canvas from './canvas'
import util from './util'
// Imports from modules
import fs from 'fs'
import Monk from 'monk'
import yaml from 'js-yaml'
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
     * @param {array} account The account, use an array because username may include spaces
     */
    action(msg, account) {
        users.insert({ qqid: msg.param.user_id, osuid: account.join(' ')})
        msg.send('osubot: bind: bound successfully')
    }
}
/**
 * @description Fetch a user's status
 * @param {Message} msg The universal msg object
 * @param {string} usr username that will be queried
 * @param {string} mode the mode that will be queried
 */
async function stat(msg, usr = 'me', mode = 'o') {
    mode = util.checkmode(mode)
    let data = []
    if (util.flatten(util.modes).includes(usr.toLowerCase())) {
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
        msg.send(JSON.stringify(await api.statQuery({
            u: usr,
            m: mode,
            k: config.key
        })))
    } catch(err) {
        msg.send(err.toString())
    }
}

/**
 * @description Get a user's most recent play
 * @param {Message} msg The universal msg object
 * @param {string} usr The username that'll be queried
 */
async function recent(msg, usr = 'me') {
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
        const rec = await api.recentQuery({
            u: usr,
            limit: '1',
            k: config.key
        })
        const map = await api.mapQuery({
            b: rec.beatmap_id,
            k: config.key
        })
        const stat = await api.statQuery({
            u: usr,
            k: config.key
        })
        const path = await canvas.drawRecent(rec, map, stat)
        console.log(path)
        msg.sender([{
            type: 'image',
            data: {
                file: path,
            }
        }])
    } catch(err) {
        msg.sender(err.toString())
        return
    }
}

/**
 * @description Gives a random result in a specific range (default 100)
 * @param {Message} msg The universal msg object
 * @param {string} range The rolling range
 */
async function roll(msg, range = '100') {
    if (typeof range === 'string' && !parseInt(range)) {
        range = range.split(',')
        msg.sender(range[Math.floor(Math.random() * range.length)])
    } else msg.sender(Math.round(Math.random() * range).toString())
}

export default { bind, stat, recent, roll }