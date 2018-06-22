import fs from 'fs'
import yaml from 'js-yaml'
import Monk from 'monk'

const config = yaml.safeLoad(fs.readFileSync('config.yml')).osubot
const db = Monk(`localhost:${config.databasePort}/botdb`)

export default db