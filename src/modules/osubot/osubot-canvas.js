/* Useful APIs 
Avatar: https://a.ppy.sh/${id}
Map Thumbnail: https://b.ppy.sh/thumb/${id}l.jpg
Map BG(Part): https://assets.ppy.sh/beatmaps/${id}/covers/cover.jpg
*/
import gm from 'gm'
import fs from 'fs'
import axios from 'axios'
import util from './osubot-util'

function promisifyGM(gmO) {
    return new Promise(function(resolve, reject) {
        gmO.write(gmO.source, err => {
            if (err) throw err
            else resolve()
        })
    })
}

function promisifyStreamEvent(stream, event) {
    return new Promise(function (resolve, reject) {
        stream.on(event, resolve)
    }).catch(err => { throw err })
}

async function drawRecent(rec, map, stat) {
    const uid = stat.user_id
    const sid = map.beatmapset_id
    const path = 'cache/recent/' + uid + '.jpg'
    const avatar = await axios({
        method: 'get',
        url: 'https://a.ppy.sh/' + uid,
        responseType: 'stream'
    })
    avatar.data.pipe(fs.createWriteStream('cache/avatar/' + uid + '.jpg'))
    await promisifyStreamEvent(avatar.data, 'end')
    const bg = await axios({
        method: 'get',
        url: 'https://assets.ppy.sh/beatmaps/' + sid + '/covers/cover.jpg',
        responseType: 'stream'
    })
    bg.data.pipe(fs.createWriteStream(path))
    await promisifyStreamEvent(bg.data, 'end')
    await promisifyGM(
        gm(path)
            .quality(100)
            .resize(2765, 768)
    )
    await promisifyGM(
        gm(path)
            .quality(100)
            .gravity('Center')
            .crop(1500, 500)
            .blur(50, 50)
            .fill('#888b')
            .drawCircle(750, 250, 750, 620)
            .tile(path)
            .drawCircle(750, 250, 750, 610)
    )
    await promisifyGM(
        gm(path)
            .quality(100)
            .gravity('Center')
            .fill('#fffa')
            .drawCircle(750, 250, 750, 610)
            .fill('#fff')
            .drawCircle(750, 250, 750, 490)
            .fill('#ccc')
            .drawCircle(750, 250, 750, 470)
            .fill('#fff')
            .drawCircle(750, 250, 750, 460)
            .fill('#aaa')
            .drawEllipse(750, 250, 210, 210, -145, -35)
            .fill('#fff')
            .font('assets/fonts/Exo2.0-Regular.otf')
            .fontSize(30)
            .drawText(0, -145, stat.username)
            .font('assets/fonts/Exo2.0-Bold.otf')
            .fontSize(12)
            .fill('#f69')
            .drawText(0, 0, 'total score')
            .font('assets/fonts/Exo2.0-BoldItalic.otf')
            .fontSize(25)
            .fill('#3ad')
            .drawText(0, 35, map.title.slice(0, 35) + (map.title.length > 35 ? '...' : ''))
            .fontSize(17)
            .drawText(0, 60, map.artist.slice(0, 50) + (map.artist.length > 50 ? '...' : ''))
            .font('assets/fonts/Exo2.0-Bold.otf')
            .fontSize(30)
            .drawText(-300, 0, rec.maxcombo + 'x')
            .drawText(300, 0, util.accuracy(rec) + '%')
            .fontSize(12)
            .fill('#333')
            .drawText(-290, 20, 'max combo')
            .drawText(290, 20, 'accuracy')
            .font('assets/fonts/Venera-500.otf')
            .fontSize(50)
            .fill('#f69')
            .drawText(0, -25, util.scorify(rec.score))
            .font('assets/fonts/Exo2.0-Bold.otf')
            .fontSize(13)
            .fill('#999')
            .drawText(0, 85, map.version + ' - mapped by ' + map.creator)
            .drawRectangle(675, 345, 825, 365)
            .font('assets/fonts/Exo2.0-Regular.otf')
            .fill('#fff')
            .drawText(0, 105, rec.date)
            .fontSize(25)
            .fill('#aaa')
            .drawLine(650, 375, 850, 375)
            .fill('#666')
            .drawText(-100, 140, util.fillNumber(rec.count300))
            .drawText(-33, 140, util.fillNumber(rec.count100))
            .drawText(33, 140, util.fillNumber(rec.count50))
            .drawText(100, 140, util.fillNumber(rec.countmiss))
            .fontSize(12)
            .drawText(-100, 160, 'Great')
            .drawText(-33, 160, 'Good')
            .drawText(33, 160, 'Meh')
            .drawText(100, 160, 'Miss')
            .crop(1200, 500)
    )
    await promisifyGM(
        gm(path)
            .quality(100)
            .composite('assets/image/' + rec.rank + '.png')
            .gravity('North')
            .geometry('+0+90')
    )
    return process.cwd() + '/' + path
}

export default { drawRecent }