import fs from 'fs'
import Monk from 'monk'
import yaml from 'js-yaml'
import { api } from './web'

const config = yaml.safeLoad(fs.readFileSync('config.yml')).osubot
const db = Monk(`localhost:${config.databasePort}/botdb`)
const users = db.get('users')
const usersBackup = db.get('backup')

/**
 * Adds a bound user to db
 * @param {string} qqid - The querying arg qqid
 * @param {string} osuid The querying arg osuid
 */
async function newUser(qqid, osuid) {
    const exists = await users.findOne({ qqid })
    let osu, taiko, ctb, mania
    if (exists)
        return false
    try {
        [osu, taiko, ctb, mania] = await Promise.all([
            api.statQuery({ u: osuid, m: 0 }),
            api.statQuery({ u: osuid, m: 1 }),
            api.statQuery({ u: osuid, m: 2 }),
            api.statQuery({ u: osuid, m: 3 }),
        ])
    } catch (err) { 
        return false
    }
    return users.insert({ qqid, osuid, data: [osu, taiko, ctb, mania] })
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

async function refreshAllStat() {
    const docs = await users.find()
    for (let user of docs)
        await refreshStat(user.qqid)
}

/**
 * Get bind info by QQid.
 * @param {string} qqid - The querying arg qqid
 */
async function getByQQ(qqid) {
    return users.findOne({ qqid })
}

/**
 * Get bind info by OSUid.
 * @param {string} osuid - The querying arg osuid
 */
async function getByOSU(osuid) {
    return users.findOne({ osuid })
}

async function backup() {
    const values = await users.find()
    await usersBackup.remove({})
    for (let user of values)
        await usersBackup.insert(user)
}

async function recovery() {
    const values = await usersBackup.find()
    await users.remove({})
    for (let user of values)
        await users.insert(user)
}

export const userdb = { newUser, delUser, getByQQ, getByOSU }
export const statdb = { getByQQ, getByOSU, refreshStat, refreshAllStat }
export const managedb = { backup, recovery }