// Import modules
import gm from 'gm'
import fs from 'fs'
import path from 'path'
import osu from 'ojsama'
// Import local files
import util from './util'
import { res } from './web'

// Simple sugar over gm
function promisifyGM(gmO) {
    return new Promise(function(resolve, reject) {
        gmO.write(gmO.source, err => {
            if (err) throw err
            else resolve()
        })
    })
}

/**
 * Draws a recent play image and returns its path
 * @param {object} rec 
 * @param {object} map 
 * @param {object} stat 
 */
async function drawRecent(rec, map, stat) {
    const uid = stat.user_id
    const sid = map.beatmapset_id
    const bid = rec.beatmap_id
    const dest = `cache${path.sep}osubot${path.sep}recent${path.sep}${uid}.jpg`
    const avatarDest = `cache${path.sep}osubot${path.sep}avatar${path.sep}${uid}.jpg`
    const avatarBGDest = `cache${path.sep}osubot${path.sep}recentbg${path.sep}${uid}.jpg`
    const mapFile = await res.mapFileQuery(bid)
    const pp = osu.ppv2({
        combo: parseInt(rec.maxcombo),
        nmiss: parseInt(rec.countmiss),
        acc_percent: parseFloat(util.accuracy(rec)),
        stars: new osu.diff().calc({
            map: mapFile,
            mods: parseInt(rec.enabled_mods)
        })
    })
    await res.avatarQuery(uid, avatarDest)
    await res.bgQuery(sid, dest)
    fs.copyFileSync(`assets${path.sep}image${path.sep}userbg${path.sep}crecent.jpg`, avatarBGDest)
    await promisifyGM(
        gm(dest)
        .quality(100)
        .resize(2765, 768)
    )
    await promisifyGM(
        gm(dest)
        .quality(100)
        .gravity('Center')
        .crop(1500, 500)
        .blur(50, 50)
        .fill('#888b')
        .drawCircle(750, 250, 750, 620)
        .tile(dest)
        .drawCircle(750, 250, 750, 610)
    )
    await promisifyGM(
        gm(avatarDest)
        .quality(100)
        .resize(350, 350)
    )
    await promisifyGM(
        gm(avatarBGDest)
        .quality(100)
        .composite(avatarDest)
        .gravity('North')
        .geometry('+0-50')
    )
    await promisifyGM(
        gm(dest)
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
        .tile(avatarBGDest)
        .drawEllipse(750, 250, 210, 210, -145, -35)
    )
    await promisifyGM(
        gm(dest)
        .quality(100)
        .gravity('Center')
        .fill('#aaaa')
        .drawEllipse(750, 250, 210, 210, -145, -35)
        .fill('#fff')
        .font('assets/fonts/Exo2.0-Medium.otf')
        .fontSize(25)
        .drawText(0, -175, Math.round(pp.total).toString() + 'pp')
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
        gm(dest)
        .quality(100)
        .composite('assets/image/rank/' + rec.rank + '.png')
        .gravity('North')
        .geometry('+0+90')
    )
    return 'file://' + process.cwd() + path.sep + dest
}

async function drawStat(stat) {
    const uid = stat.user_id
    const dest = `cache${path.sep}osubot${path.sep}stat${path.sep}${uid}.jpg`
    const avatarDest = `cache${path.sep}osubot${path.sep}avatar${path.sep}${uid}.jpg`
    const avatarBGDest = `cache${path.sep}osubot${path.sep}statbg${path.sep}${uid}.jpg`
    await res.avatarQuery(uid, avatarDest)
    fs.copyFileSync(`assets${path.sep}image${path.sep}userbg${path.sep}c${Math.ceil(Math.random() * 5)}.jpg`, dest)
    fs.copyFileSync(`assets${path.sep}image${path.sep}userbg${path.sep}cstat.jpg`, avatarBGDest)
    await promisifyGM(
        gm(dest)
        .quality(100)
        .resize(2765, 768)
    )
    await promisifyGM(
        gm(dest)
        .quality(100)
        .gravity('Center')
        .crop(1500, 500)
        .fill('#888b')
        .drawCircle(750, 250, 750, 620)
        .tile(dest)
        .drawCircle(750, 250, 750, 610)
    )
    await promisifyGM(
        gm(avatarDest)
        .quality(100)
        .resize(350, 350)
    )
    await promisifyGM(
        gm(avatarBGDest)
        .quality(100)
        .composite(avatarDest)
        .gravity('North')
        .geometry('+0-50')
    )
    await promisifyGM(
        gm(dest)
        .quality(100)
        .gravity('Center')
        .crop(750, 500)
        .fill('#fffa')
        .drawCircle(375, 250, 375, 610)
        .fill('#fff')
        .drawCircle(375, 250, 375, 490)
        .fill('#ccc')
        .drawCircle(375, 250, 375, 470)
        .fill('#fff')
        .drawCircle(375, 250, 375, 460)
        .tile(avatarBGDest)
        .drawEllipse(375, 250, 210, 210, -145, -35)
    )
    await promisifyGM(
        gm(dest)
        .quality(100)
        .gravity('Center')
        .fill('#aaaa')
        .drawEllipse(375, 250, 210, 210, -145, -35)
        .fill('#fff')
        .font('assets/fonts/Exo2.0-Medium.otf')
        .fontSize(30)
        .drawText(0, -145, stat.username)
        .font('assets/fonts/Exo2.0-Bold.otf')
        .fontSize(12)
        .fill('#f69')
        .drawText(0, 0, 'global rank')
        .font('assets/fonts/Exo2.0-BoldItalic.otf')
        .fontSize(25)
        .fill('#3ad')
        .drawText(0, 35, util.scorify(parseInt(stat.pp_raw).toString()) + 'pp')
        .fontSize(11)
        .drawText(0, 60, 'performance points')
        .font('assets/fonts/Exo2.0-Bold.otf')
        .fontSize(30)
        .drawText(-300, 0, util.scorify(stat.playcount))
        .drawText(300, 0, stat.accuracy.slice(0, 3 + stat.accuracy.split('.').length) + '%')
        .fontSize(12)
        .fill('#333')
        .drawText(-290, 20, 'play count')
        .drawText(290, 20, 'accuracy')
        .font('assets/fonts/Venera-500.otf')
        .fontSize(45)
        .fill('#f69')
        .drawText(0, -25, '#' + util.scorify(stat.pp_rank))
        .fontSize(13)
        .fill('#999')
        .drawRectangle(300, 345, 450, 365)
        .font('assets/fonts/Exo2.0-Regular.otf')
        .fill('#fff')
        .drawText(0, 105, stat.country + ' #' + util.scorify(stat.pp_country_rank))
        .fontSize(25)
        .fill('#aaa')
        .drawLine(275, 375, 475, 375)
        .fill('#666')
        .drawText(-100, 140, util.fillNumber(stat.count_rank_ssh + stat.count_rank_ss))
        .drawText(-33, 140, util.fillNumber(stat.count_rank_sh))
        .drawText(33, 140, util.fillNumber(stat.count_rank_s))
        .drawText(100, 140, util.fillNumber(stat.count_rank_a))
        .fontSize(12)
        .drawText(-100, 160, 'SS(+)')
        .drawText(-33, 160, 'S+')
        .drawText(33, 160, 'S')
        .drawText(100, 160, 'A')
    )
    return 'file://' + process.cwd() + path.sep + dest
}

export default { drawRecent, drawStat }