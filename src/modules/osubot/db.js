import Monk from 'monk'
import { api } from './web'

const db = Monk('localhost:27017/botdb')
const users = db.get('users')
const stats = db.get('stats')
const config = yaml.safeLoad(fs.readFileSync('config.yml')).osubot

async function reduceSame(qqid) {
    const found = await users.findOne({ qqid })
    const final = found[0]
    await users.remove({ qqid })
    return users.insert(final)
}

async function newUser(qqid, osuid) {
    const exists = await users.findOne({ qqid })
    if (exists)
        return false
    await users.insert({ qqid, osuid })
    initStat(uid)
}

async function delUser(qqid) {
    return users.remove({ qqid })
}

async function initStat(osuid) {
    const [osu, taiko, ctb, mania] = await Promise.all([
        api.statQuery({ u: osuid, k: config.key, m: 0 }),
        api.statQuery({ u: osuid, k: config.key, m: 1 }),
        api.statQuery({ u: osuid, k: config.key, m: 2 }),
        api.statQuery({ u: osuid, k: config.key, m: 3 }),
    ])
    return stats.insert({ osuid, data: [osu, taiko, ctb, mania]})
}

async function refreshStat(osuid) {
    const [osu, taiko, ctb, mania] = await Promise.all([
        api.statQuery({ u: osuid, k: config.key, m: 0 }),
        api.statQuery({ u: osuid, k: config.key, m: 1 }),
        api.statQuery({ u: osuid, k: config.key, m: 2 }),
        api.statQuery({ u: osuid, k: config.key, m: 3 }),
    ])
    await stats.remove({ osuid })
    return stats.insert({ osuid, data: [osu, taiko, ctb, mania]})
}

async function getUserByQQ(qqid) {
    return users.findOne({ qqid })
}

async function getUserByOSU(osuid) {
    return users.findOne({ osuid })
}

async function getStatByQQ(qqid) {
    const osuid = (await users.findOne({ qqid })).osuid
    return stats.findOne({ osuid })
}

async function getStatByOSU(osuid) {
    return stats.findOne({ osuid })
}

export const userdb = { reduceSame, newUser, delUser, getByQQ: getUserByQQ, getByOSU: getUserByOSU }
export const statdb = { getByQQ: getStatByQQ, getByOSU: getStatByOSU, initStat, refreshStat }