import fs from 'fs'
import Monk from 'monk'
import yaml from 'js-yaml'

const config = yaml.safeLoad(fs.readFileSync('config.yml')).osubot
const db = Monk(`localhost:${config.databasePort}/botdb`)
const users = db.get('users')
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

export default { getByQQ, getByOSU }