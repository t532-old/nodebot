// Import modules
import gm from 'gm'
import { copyFileSync, existsSync } from 'fs'
import { sep } from 'path'
// Import local files
import { accuracy, fillNumber, scorify } from './_util'
import { promisifyGM, cachepath, assetspath } from './_util'
import { getAvatar } from './avatar'
import { res } from '../web'
import { getMods } from '../map'

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
    const dest = `${cachepath}/best/${uid}.jpg`
    const bgDest = `${cachepath}/mapbg/${sid}.jpg`
    const avatarDest = `${cachepath}/avatar/${uid}.jpg`
    const avatarLargerDest = `${cachepath}/avatarl/${uid}.jpg`
    const avatarBGDest = `${cachepath}/recentbg/${uid}.jpg`
    const mods = getMods(bp.enabled_mods)
    copyFileSync(`${assetspath}/image/userbg/crecent.jpg`, avatarBGDest)
    if (existsSync(avatarDest) || await getAvatar(uid, avatarDest, avatarLargerDest))
        await promisifyGM(
            gm(avatarBGDest)
            .quality(100)
            .composite(avatarDest)
            .gravity('North')
            .geometry('+0-50')
        )
    if (!existsSync(bgDest)) {
        try { await res.bgQuery(sid, bgDest) }
        catch { copyFileSync(`${assetspath}/image/userbg/c${Math.ceil(Math.random() * 5)}.jpg`, bgDest) }
    }
    copyFileSync(bgDest, dest)
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
        .tile(dest)
        .drawCircle(750, 250, 750, 610)
    )
    await promisifyGM(
        gm(dest)
        .fill('#fffa')
        .drawCircle(750, 250, 750, 610)
        .fill('#fff5')
        .drawCircle(750, 250, 750, 490)
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
        .font(`${assetspath}/fonts/Exo2.0-Medium.otf`)
        .fontSize(25)
        .drawText(0, -185, Math.round(bp.pp).toString() + 'pp')
        .fontSize(30)
        .drawText(0, -155, stat.username)
        .font(`${assetspath}/fonts/Exo2.0-BoldItalic.otf`)
        .fontSize(25)
        .fill('#3ad')
        .drawText(0, 35, map.title.slice(0, 35) + (map.title.length > 35 ? '...' : ''))
        .fontSize(17)
        .drawText(0, 60, map.artist.slice(0, 50) + (map.artist.length > 50 ? '...' : ''))
        .font(`${assetspath}/fonts/Exo2.0-Bold.otf`)
        .fill('#aaa')
        .fontSize(30)
        .drawText(-300, 2, bp.maxcombo + 'x')
        .drawText(300, 2, accuracy(bp) + '%')
        .fill('#3ad')
        .drawText(-300, 0, bp.maxcombo + 'x')
        .drawText(300, 0, accuracy(bp) + '%')
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
        .font(`${assetspath}/fonts/Exo2.0-Regular.otf`)
        .fill('#fff')
        .drawText(0, 105, bp.date)
        .fontSize(25)
        .fill('#aaa')
        .drawLine(650, 375, 850, 375)
        .fill('#666')
        .drawText(-100, 140, fillNumber(bp.count300))
        .drawText(-33, 140, fillNumber(bp.count100))
        .drawText(33, 140, fillNumber(bp.count50))
        .drawText(100, 140, fillNumber(bp.countmiss))
        .font(`${assetspath}/fonts/Exo2.0-ExtraBold.otf`)
        .fontSize(12)
        .fill('#66a')
        .drawText(-100, 160, '300')
        .fill('#6a6')
        .drawText(-33, 160, '100')
        .fill('#aa6')
        .drawText(33, 160, '50')
        .fill('#a66')
        .drawText(100, 160, 'X')
        .font(`${assetspath}/fonts/Venera-300.otf`)
        .fontSize(50)
        .fill('#f69')
        .drawText(0, -20, scorify(bp.score))
        .crop(1000, 500)
    )
    await promisifyGM(
        gm(dest)
        .quality(100)
        .composite(`${assetspath}/image/rank/${bp.rank}.png`)
        .gravity('North')
        .geometry('+0+80')
    )
    for (let padding = -(mods.length - 1) * 10, i = 0; i < mods.length; padding += 20, i++) {
        await promisifyGM(
            gm(dest)
            .quality(100)
            .gravity('North')
            .composite(`${assetspath}/image/mods/${mods[i]}.png`)
            .geometry((padding >= 0 ? '+' : '') + padding + '+170')
        )
    }
    return 'file://' + process.cwd() + sep + dest
}