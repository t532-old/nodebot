import fs from 'fs'
import Monk from 'monk'
import yaml from 'js-yaml'
import { api } from '../web'
import find from './find'

const config = yaml.safeLoad(fs.readFileSync('config.yml')).osubot
const db = Monk(`localhost:${config.databasePort}/botdb`)
const users = db.get('users')

/**
 * refreshes a bound user's stat cache
 * @param {string} osuid - The querying arg osuid
 */
async function refreshStat(qqid) {
    const osuid = (await users.findOne({ qqid })).osuid
    let osu, taiko, ctb, mania
    try {
        [osu, taiko, ctb, mania] = await Promise.all([
            api.statQuery({ u: osuid, m: 0 }),
            api.statQuery({ u: osuid, m: 1 }),
            api.statQuery({ u: osuid, m: 2 }),
            api.statQuery({ u: osuid, m: 3 }),
        ])
    } catch (err) { 
        return 
    }
    if (!osu.pp_rank && !taiko.pp_rank && !ctb.pp_rank && !mania.pp_rank) return users.remove({ qqid })
    else return users.update({ qqid }, { $set: { data: [osu, taiko, ctb, mania] } })
}

/**
 * refreshes all bound user's status
 */
async function refreshAllStat() {
    const docs = await users.find()
    for (let user of docs)
        await refreshStat(user.qqid)
}

export default { ...find, refreshStat, refreshAllStat }