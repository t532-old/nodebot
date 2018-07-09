import fs from 'fs'
import yaml from 'js-yaml'
import Monk from 'monk'

const { databaseAddress, osubot } = yaml.safeLoad(fs.readFileSync('config.yml'))
const db = Monk(`${databaseAddress || osubot.databaseAddress}/botdb`)

export default db