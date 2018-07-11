// Import modules
import gm from 'gm'
import fs from 'fs'
import path from 'path'
import osu from 'ojsama'
// Import local files
import util from './_util'
import { promisify, promisifyGM } from './_util'
import { getAvatar } from './avatar'
import { res } from '../web'

/**
 * Draws a recent play image and returns its path
 * @param {object} rec 
 * @param {object} map 
 * @param {object} stat 
 */
export default async function drawRecent(rec, map, stat) {
    const uid = stat.user_id
    const sid = map.beatmapset_id
    const bid = rec.beatmap_id
    const dest = `cache${path.sep}osubot${path.sep}recent${path.sep}${uid}.jpg`
    const bgDest = `cache${path.sep}osubot${path.sep}mapbg${path.sep}${sid}.jpg`
    const avatarDest = `cache${path.sep}osubot${path.sep}avatar${path.sep}${uid}.jpg`
    const avatarLargerDest = `cache${path.sep}osubot${path.sep}avatarl${path.sep}${uid}.jpg`
    const avatarBGDest = `cache${path.sep}osubot${path.sep}recentbg${path.sep}${uid}.jpg`
    const mapFileDest = `cache${path.sep}osubot${path.sep}mapfile${path.sep}${bid}.osu`
    const mods = osu.modbits.string(rec.enabled_mods).split('').reduce((target, value, index) => {
        if (index % 2) target[target.length - 1] += value
        else target.push(value)
        return target
    }, [])
    await promisify(fs.copyFile, `assets${path.sep}osubot${path.sep}image${path.sep}userbg${path.sep}crecent.jpg`, avatarBGDest)
    if (fs.existsSync(avatarDest) || await getAvatar(uid, avatarDest, avatarLargerDest)) 
        await promisifyGM(
            gm(avatarBGDest)
            .quality(100)
            .composite(avatarDest)
            .gravity('North')
            .geometry('+0-50')
        )
    if (!fs.existsSync(bgDest)) {
        try { await res.bgQuery(sid, bgDest) }
        catch { await promisify(fs.copyFile, `assets${path.sep}osubot${path.sep}image${path.sep}userbg${path.sep}c${Math.ceil(Math.random() * 5)}.jpg`, bgDest) }
    }
    await promisify(fs.copyFile, bgDest, dest)
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
        .blur(10, 10)
        .fill('#fffb')
        .drawCircle(750, 250, 750, 620)
        .fill('#fff8')
        .drawCircle(750, 250, 750, 610)
        .fill('#fff8')
        .drawCircle(750, 250, 750, 490)
        .fill('#fff5')
        .drawCircle(750, 250, 750, 460)
        .tile(avatarBGDest)
        .drawEllipse(750, 250, 210, 210, -145, -35)
    )
    await promisifyGM(
        gm(dest)
        .quality(100)
        .gravity('Center')
        .fill('#888a')
        .drawEllipse(750, 250, 210, 210, -145, -35)
        .gravity('West')
        .fill('#fff')
        .font('assets/osubot/fonts/Exo2.0-Medium.otf')
        .fontSize(20)
        .drawText(600, -137, stat.username)
        .gravity('Center')
        .font('assets/osubot/fonts/Exo2.0-BoldItalic.otf')
        .fontSize(25)
        .fill('#3ad')
        .drawText(0, 40, map.title.slice(0, 35) + (map.title.length > 35 ? '...' : ''))
        .fontSize(17)
        .drawText(0, 65, map.artist.slice(0, 50) + (map.artist.length > 50 ? '...' : ''))
        .font('assets/osubot/fonts/Exo2.0-Bold.otf')
        .fontSize(30)
        .drawText(-300, 0, rec.maxcombo + 'x')
        .drawText(300, 0, util.accuracy(rec) + '%')
        .fontSize(12)
        .fill('#333')
        .drawText(-290, 20, 'max combo')
        .drawText(290, 20, 'accuracy')
        .fontSize(13)
        .fill('#999')
        .drawText(0, 85, map.version + ' - mapped by ' + map.creator)
        .drawRectangle(675, 345, 825, 365)
        .font('assets/osubot/fonts/Exo2.0-Regular.otf')
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
        .font('assets/osubot/fonts/Exo2.0-ExtraBold.otf')
        .fontSize(12)
        .fill('#66a')
        .drawText(-100, 160, '300')
        .fill('#6a6')
        .drawText(-33, 160, '100')
        .fill('#aa6')
        .drawText(33, 160, '50')
        .fill('#a66')
        .drawText(100, 160, 'X')
        .font('assets/osubot/fonts/Venera-300.otf')
        .fontSize(50)
        .fill('#f69')
        .drawText(0, 0, util.scorify(rec.score))
        .crop(1000, 500)
    )
    try {
        if (!fs.existsSync(mapFileDest)) await res.mapFileQuery(bid, mapFileDest)
        const parser = new osu.parser()
        const mapFile = parser.feed(fs.readFileSync(mapFileDest, 'utf-8')).map
        const stars = new osu.diff().calc({
            map: mapFile,
            mods: parseInt(rec.enabled_mods)
        })
        const pp = osu.ppv2({
            combo: parseInt(rec.maxcombo),
            nmiss: parseInt(rec.countmiss),
            acc_percent: parseFloat(util.accuracy(rec)),
            stars
        })
        const fcpp = osu.ppv2({
            acc_percent: parseFloat(util.accuracy(rec)),
            stars
        })
        await promisifyGM(
            gm(dest)
            .quality(100)
            .gravity('West')
            .fill('#fff')
            .font('assets/osubot/fonts/Venera-700.otf')
            .fontSize(25)
            .drawText(410, -165, Math.round(pp.total).toString() + 'PP')
            .gravity('East')
            .font('assets/osubot/fonts/Venera-900.otf')
            .fontSize(12)
            .drawText(410, -177, Math.round(pp.aim).toString() + ' AIM')
            .drawText(410, -165, Math.round(pp.speed).toString() + ' SPD')
            .drawText(410, -153, Math.round(pp.acc).toString() + ' ACC')
            .gravity('Center')
            .drawText(0, -190, Math.round(fcpp.total).toString() + 'pp if FC')
            .font('assets/osubot/fonts/Exo2.0-Bold.otf')
            .fontSize(14)
            .fill('#aaa')
            .drawText(0, -42, `${stars.total.toString().slice(0, 4)} Stars [AR${mapFile.ar}  CS${mapFile.cs}  OD${mapFile.od}  HP${mapFile.hp}]`)
        )
    } catch (err) { console.log(err) }
    await promisifyGM(
        gm(dest)
        .quality(100)
        .composite('assets/osubot/image/rank/' + rec.rank + '.png')
        .gravity('North')
        .geometry('+0+80')
    )
    for (let padding = -(mods.length - 1) * 10, i = 0; i < mods.length; padding += 20, i++) {
        await promisifyGM(
            gm(dest)
            .quality(100)
            .gravity('North')
            .composite('assets/osubot/image/mods/' + mods[i] + '.png')
            .geometry((padding >= 0 ? '+' : '') + padding + '+170')
        )
    }
    return 'file://' + process.cwd() + path.sep + dest
}