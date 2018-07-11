import fs from 'fs'
import { safeLoad } from 'js-yaml'
import Monk from 'monk'

const { databaseAddress, osubot } = safeLoad(fs.readFileSync('config.yml'))
const db = Monk(`${databaseAddress || osubot.databaseAddress}/botdb`)

export default db