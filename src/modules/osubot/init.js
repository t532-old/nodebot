import fs from 'fs'
import { statdb, userdb } from './db'

const initPaths = [
    'cache',
    'cache/osubot',
    'cache/osubot/avatar',
    'cache/osubot/avatarl',
    'cache/osubot/recent',
    'cache/osubot/recentbg',
    'cache/osubot/stat',
    'cache/osubot/statbg',
    'cache/osubot/mapbg',
    'cache/osubot/best',
]

export default async function() {
    for (let i of initPaths)
        if (!fs.existsSync(i)) fs.mkdirSync(i)
    const time = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() + 1}`)
    await statdb.refreshAllStat()
    console.log('Refreshed user status')
    setTimeout(async () => {
        await statdb.refreshAllStat()
        console.log('Refreshed user status')
        setInterval(async () => {
            await statdb.refreshAllStat()
            console.log('Refreshed user status')
        }, 86400000)
    }, time.getTime() - Date.now())
}