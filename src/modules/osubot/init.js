import fs from 'fs'
import { statdb } from './db'

export default function() {
    if (!fs.existsSync('cache')) {
        fs.mkdirSync('cache')
        fs.mkdirSync('cache/osubot')
        fs.mkdirSync('cache/osubot/avatar')
        fs.mkdirSync('cache/osubot/avatarl')
        fs.mkdirSync('cache/osubot/recent')
        fs.mkdirSync('cache/osubot/recentbg')
        fs.mkdirSync('cache/osubot/stat')
        fs.mkdirSync('cache/osubot/statbg')
        fs.mkdirSync('cache/osubot/mapbg')
        fs.mkdirSync('cache/osubot/best')
    }
    const time = new Date(`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate() + 1}`)
    setTimeout(async () => {
        statdb.refreshAll()
        setInterval(statdb.refreshAllStat, 86400000)
    }, time.getTime() - Date.now())
}