import Monk from 'monk'
import { api } from './web'

const db = Monk('localhost:27017/botdb')
const users = db.get('users')
const stats = db.get('stats')
const config = yaml.safeLoad(fs.readFileSync('config.yml')).osubot

/**
 * reduce multi user information into one
 * @param {string} qqid - The querying arg qqid
 */
async function reduceSame(qqid) {
    const found = await users.find({ qqid })
    const final = found[0]
    await users.remove({ qqid })
    return users.insert(final)
}

/**
 * Adds a bound user to db
 * @param {string} qqid - The querying arg qqid
 * @param {string} osuid The querying arg osuid
 */
async function newUser(qqid, osuid) {
    const exists = await users.findOne({ qqid })
    if (exists)
        return false
    await users.insert({ qqid, osuid })
    initStat(uid)
}

/**
 * Remove a user from bound users' list in db
 * @param {string} qqid - The querying arg qqid
 */
async function delUser(qqid) {
    return users.remove({ qqid })
}

/**
 * inits a bound user's stat cache
 * @param {string} osuid - THe querying arg osuid
 */
async function initStat(osuid) {
    const [osu, taiko, ctb, mania] = await Promise.all([
        api.statQuery({ u: osuid, k: config.key, m: 0 }),
        api.statQuery({ u: osuid, k: config.key, m: 1 }),
        api.statQuery({ u: osuid, k: config.key, m: 2 }),
        api.statQuery({ u: osuid, k: config.key, m: 3 }),
    ])
    return stats.insert({ osuid, data: [osu, taiko, ctb, mania]})
}

/**
 * refreshes a bound user's stat cache
 * @param {string} osuid - The querying arg osuid
 */
async function refreshStat(osuid) {
    const [osu, taiko, ctb, mania] = await Promise.all([
        api.statQuery({ u: osuid, k: config.key, m: 0 }),
        api.statQuery({ u: osuid, k: config.key, m: 1 }),
        api.statQuery({ u: osuid, k: config.key, m: 2 }),
        api.statQuery({ u: osuid, k: config.key, m: 3 }),
    ])
    return stats.update({ osuid }, { data: [osu, taiko, ctb, mania] })
}

async function refreshAllStat() {
    const docs = await users.find()
    for (let user of docs)
        await refreshStat(docs.osuid)
}

/**
 * Get bind info by QQid.
 * @param {string} qqid - The querying arg qqid
 */
async function getUserByQQ(qqid) {
    return users.findOne({ qqid })
}

/**
 * Get bind info by OSUid.
 * @param {string} osuid - The querying arg osuid
 */
async function getUserByOSU(osuid) {
    return users.findOne({ osuid })
}

/**
 * Get stat cache by QQid.
 * @param {string} qqid - The querying arg qqid
 */
async function getStatByQQ(qqid) {
    const osuid = (await users.findOne({ qqid })).osuid
    return stats.findOne({ osuid })
}

/**
 * Get stat cache by OSUid.
 * @param {string} osuid - The querying arg osuid
 */
async function getStatByOSU(osuid) {
    return stats.findOne({ osuid })
}

export const userdb = { reduceSame, newUser, delUser, getByQQ: getUserByQQ, getByOSU: getUserByOSU }
export const statdb = { getByQQ: getStatByQQ, getByOSU: getStatByOSU, initStat, refreshStat, refreshAllStat }