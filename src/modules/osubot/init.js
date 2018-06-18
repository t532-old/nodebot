import fs from 'fs'
import { statdb } from './db'

const initPaths = [
    'cache/osubot',
    'cache/osubot/avatar',
    'cache/osubot/avatarl',
    'cache/osubot/recent',
    'cache/osubot/recentbg',
    'cache/osubot/stat',
    'cache/osubot/mapbg',
    'cache/osubot/best',
]

/**
 * This sets an interval function that 
 * refreshes bound users' status every 0:00
 */
export default async function() {
    for (let i of initPaths)
        if (!fs.existsSync(i)) fs.mkdirSync(i)
    const time = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() + 1}`)
    setTimeout(async () => {
        statdb.refreshAllStat()
              .then(() => console.log(`${new Date().toString()}: Refreshed user status`))
        setInterval(async () => {
            statdb.refreshAllStat()
                  .then(() => console.log(`${new Date().toString()}: Refreshed user status`))
        }, 86400000)
    }, time.getTime() - Date.now())
}