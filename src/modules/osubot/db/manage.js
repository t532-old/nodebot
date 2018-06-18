import fs from 'fs'
import Monk from 'monk'
import yaml from 'js-yaml'

const config = yaml.safeLoad(fs.readFileSync('config.yml')).osubot
const db = Monk(`localhost:${config.databasePort}/botdb`)
const users = db.get('users')
const usersBackup = db.get('backup')

/**
 * backups the db
 */
async function backup() {
    const values = await users.find()
    await usersBackup.remove({})
    for (let user of values)
        await usersBackup.insert(user)
}

/**
 * recoveries the db
 */
async function recovery() {
    const values = await usersBackup.find()
    await users.remove({})
    for (let user of values)
        await users.insert(user)
}

export default { backup, recovery }