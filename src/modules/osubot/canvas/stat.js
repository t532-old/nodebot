// Import modules
import gm from 'gm'
import fs from 'fs'
import path from 'path'
// Import local files
import util from './_util'
import { promisify, promisifyGM, cachepath, assetspath } from './_util'
import { getAvatar } from './avatar'

/**
 * Draws a user's status
 * also draws the increasement if statPrev exists
 * @param {object} stat
 * @param {object?} statPrev
 */
export default async function drawStat(stat, statPrev) {
    const uid = stat.user_id
    const dest = `${cachepath}/stat/${uid}.jpg`
    const avatarDest = `${cachepath}/avatar/${uid}.jpg`
    const avatarLargerDest = `${cachepath}/avatarl/${uid}.jpg`
    const ranks = ['XH', 'X', 'SH', 'S', 'A']
    await promisify(fs.copyFile, `${assetspath}/image/userbg/c${Math.ceil(Math.random() * 5)}.jpg`, dest)
    await promisifyGM(
        gm(dest)
        .quality(100)
        .resize(4800, 1000)
        .crop(750, 1000)
        .fill('#0005')
        .drawRectangle(30, 20, 400, 390)
    )
    if (fs.existsSync(avatarDest) || await getAvatar(uid, avatarDest, avatarLargerDest))
        await promisifyGM(
            gm(dest)
            .quality(100)
            .composite(avatarDest)
            .geometry('+40+30')
        )
    await promisifyGM(
        gm(dest)
        .quality(100)
        .fill('#0005')
        .drawRectangle(0, 410, 750, 510)
        .drawRectangle(0, 530, 750, 1000)
        .drawRectangle(400, 50, 750, 160)
        .fill('#fff')
        .font(`${assetspath}/fonts/Exo2.0-Medium.otf`)
        .fontSize(40)
        .drawText(420, 100, stat.username)
        .fontSize(45)
        .drawText(30, 700, util.scorify(stat.playcount))
        .drawText(30, 790, stat.accuracy.slice(0, 3 + stat.accuracy.split('.')[0].length) + '%')
        .drawText(30, 880, util.scorify(stat.ranked_score))
        .font(`${assetspath}/fonts/Exo2.0-Bold.otf`)
        .drawText(30, 610, util.scorify(stat.pp_raw.split('.')[0]) + (stat.pp_raw.split('.')[1] ? ('.' + util.fillNumberReversed(stat.pp_raw.split('.')[1].slice(0, 2), 2)) : '') + 'pp')
        .fontSize(30)
        .drawText(60, 980, stat.count_rank_ssh)
        .drawText(205, 980, stat.count_rank_ss)
        .drawText(350, 980, stat.count_rank_sh)
        .drawText(495, 980, stat.count_rank_s)
        .drawText(640, 980, stat.count_rank_a)
        .font(`${assetspath}/fonts/Exo2.0-MediumItalic.otf`)
        .fill('#ddd')
        .drawText(420, 140, 'Lv. ' + parseInt(stat.level))
        .fontSize(25)
        .drawText(30, 660, 'Play count')
        .drawText(30, 750, 'Accuracy')
        .drawText(30, 840, 'Ranked score')
        .drawText(30, 570, 'Performance points')
        .fill('#fff')
        .font(`${assetspath}/fonts/Venera-700.otf`)
        .fontSize(45)
        .drawText(30, 480, '#' + util.scorify(stat.pp_rank))
        .gravity('NorthEast')
        .fontSize(35)
        .drawText(70, 480, '#' + util.scorify(stat.pp_country_rank))
    )
    if (statPrev) {
        const diff = util.objDiff(stat, statPrev)
        await promisifyGM(
            gm(dest)
            .quality(100)
            .font(`${assetspath}/fonts/Exo2.0-Regular.otf`)
            .fill('#ddd')
            .fontSize(30)
            .drawText(30, 440, (-parseInt(diff.pp_rank) >= 0 ? '+' : '') + (-diff.pp_rank))
            .gravity('NorthEast')
            .drawText(30, 610, (parseFloat(diff.pp_raw) >= 0 ? '+' : '') + diff.pp_raw.slice(0, 3 + diff.pp_raw.split('.')[0].length))
            .drawText(30, 700, '+' + parseInt(diff.playcount).toString())
            .drawText(30, 790, (parseFloat(diff.accuracy) >= 0 ? '+' : '') + diff.accuracy.slice(0, 3 + diff.accuracy.split('.').length) + '%')
            .drawText(30, 880, '+' + parseInt(diff.ranked_score).toString())
            .fontSize(20)
            .gravity('NorthWest')
            .drawText(120, 980, (parseInt(diff.count_rank_ssh) >= 0 ? '+' : '') + (diff.count_rank_ssh || '0'))
            .drawText(265, 980, (parseInt(diff.count_rank_ss) >= 0 ? '+' : '') + (diff.count_rank_ss || '0'))
            .drawText(410, 980, (parseInt(diff.count_rank_sh) >= 0 ? '+' : '') + (diff.count_rank_sh || '0'))
            .drawText(555, 980, (parseInt(diff.count_rank_s) >= 0 ? '+' : '') + (diff.count_rank_s || '0'))
            .drawText(700, 980, (parseInt(diff.count_rank_a) >= 0 ? '+' : '') + (diff.count_rank_a || '0'))
        )
    }
    for (let rank in ranks)
        await promisifyGM(
            gm(dest)
            .quality(100)
            .composite(`${assetspath}/image/rank/${ranks[rank]}.png`)
            .geometry(`+${30 + rank * 145}+860`)
        )
    await promisifyGM(
        gm(dest)
        .quality(100)
        .gravity('NorthEast')
        .composite(`${assetspath}/image/flags/${stat.country}.png`)
        .geometry('+30+455')
    )
    return 'file://' + process.cwd() + path.sep + dest
}