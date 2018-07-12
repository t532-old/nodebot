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
 * draws a user's bp and returns its path
 * @param {object} bp 
 * @param {object} map 
 * @param {object} stat 
 */
export default async function drawBest(bp, map, stat) {
    const uid = stat.user_id
    const sid = map.beatmapset_id
    const bid = bp.beatmap_id
    const dest = `cache${path.sep}osubot${path.sep}best${path.sep}${uid}.jpg`
    const bgDest = `cache${path.sep}osubot${path.sep}mapbg${path.sep}${sid}.jpg`
    const avatarDest = `cache${path.sep}osubot${path.sep}avatar${path.sep}${uid}.jpg`
    const avatarLargerDest = `cache${path.sep}osubot${path.sep}avatarl${path.sep}${uid}.jpg`
    const avatarBGDest = `cache${path.sep}osubot${path.sep}recentbg${path.sep}${uid}.jpg`
    const mods = osu.modbits.string(bp.enabled_mods).split('').reduce((target, value, index) => {
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
        .fill('#fff')
        .font('assets/osubot/fonts/Exo2.0-Medium.otf')
        .fontSize(25)
        .drawText(0, -185, Math.round(bp.pp).toString() + 'pp')
        .fontSize(30)
        .drawText(0, -155, stat.username)
        .font('assets/osubot/fonts/Exo2.0-BoldItalic.otf')
        .fontSize(25)
        .fill('#3ad')
        .drawText(0, 35, map.title.slice(0, 35) + (map.title.length > 35 ? '...' : ''))
        .fontSize(17)
        .drawText(0, 60, map.artist.slice(0, 50) + (map.artist.length > 50 ? '...' : ''))
        .font('assets/osubot/fonts/Exo2.0-Bold.otf')
        .fill('#aaa')
        .fontSize(30)
        .drawText(-300, 2, bp.maxcombo + 'x')
        .drawText(300, 2, util.accuracy(bp) + '%')
        .fill('#3ad')
        .drawText(-300, 0, bp.maxcombo + 'x')
        .drawText(300, 0, util.accuracy(bp) + '%')
        .fontSize(12)
        .fill('#333')
        .drawText(-290, 20, 'max combo')
        .drawText(290, 20, 'accuracy')
        .fontSize(13)
        .fill('#999')
        .drawText(0, 85, map.version + ' - mapped by ' + map.creator)
        .drawRectangle(675, 345, 825, 365)
        .fontSize(12)
        .fill('#f69')
        .drawText(0, 5, 'total score')
        .font('assets/osubot/fonts/Exo2.0-Regular.otf')
        .fill('#fff')
        .drawText(0, 105, bp.date)
        .fontSize(25)
        .fill('#aaa')
        .drawLine(650, 375, 850, 375)
        .fill('#666')
        .drawText(-100, 140, util.fillNumber(bp.count300))
        .drawText(-33, 140, util.fillNumber(bp.count100))
        .drawText(33, 140, util.fillNumber(bp.count50))
        .drawText(100, 140, util.fillNumber(bp.countmiss))
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
        .drawText(0, -20, util.scorify(bp.score))
        .crop(1000, 500)
    )
    await promisifyGM(
        gm(dest)
        .quality(100)
        .composite('assets/osubot/image/rank/' + bp.rank + '.png')
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