import fs from 'fs'
import Monk from 'monk'
import yaml from 'js-yaml'
import { api } from './web'

const db = Monk('localhost:27017/botdb')
const users = db.get('users')
const stats = db.get('userstats')
const config = yaml.safeLoad(fs.readFileSync('config.yml')).osubot

async function reduceAll() {
    let docs = await users.find()
    for (let i of docs) {
        let user
        try { user = await api.statQuery({ u: i.osuid }) }
        catch (err) { 
            await users.remove({ osuid: i.osuid })
            continue
        }
        await users.update({ osuid: i.osuid }, { osuid: user.user_id })
    }
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
    return refreshStat(osuid)
}

/**
 * Remove a user from bound users' list in db
 * @param {string} qqid - The querying arg qqid
 */
async function delUser(qqid) {
    return users.remove({ qqid })
}

/**
 * refreshes a bound user's stat cache
 * @param {string} osuid - The querying arg osuid
 */
async function refreshStat(osuid) {
    let osu, taiko, ctb, mania
    try {
        [osu, taiko, ctb, mania] = await Promise.all([
            api.statQuery({ u: osuid, m: 0 }),
            api.statQuery({ u: osuid, m: 1 }),
            api.statQuery({ u: osuid, m: 2 }),
            api.statQuery({ u: osuid, m: 3 }),
        ])
    } catch (err) { return }
    if (await stats.findOne({ osuid })) return stats.update({ osuid }, { data: [osu, taiko, ctb, mania] })
    else return stats.insert({ osuid, data: [osu, taiko, ctb, mania] })
}

async function refreshAllStat() {
    const docs = await users.find()
    for (let user of docs)
        await refreshStat(user.osuid)
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

export const userdb = { newUser, delUser, getByQQ: getUserByQQ, getByOSU: getUserByOSU, reduceAll }
export const statdb = { getByQQ: getStatByQQ, getByOSU: getStatByOSU, refreshStat, refreshAllStat }