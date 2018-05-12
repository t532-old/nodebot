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
            if (err) reject(err)
            else resolve()
        })
    })
}

function promisify(fn, ...args) {
    return new Promise((resolve, reject) => {
        fn(...args, (err) => {
            if (err) reject(err)
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
    const bgDest = `cache${path.sep}osubot${path.sep}mapbg${path.sep}${sid}.jpg`
    const avatarDest = `cache${path.sep}osubot${path.sep}avatar${path.sep}${uid}.jpg`
    const avatarLargerDest = `cache${path.sep}osubot${path.sep}avatarl${path.sep}${uid}.jpg`
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
    const mods = osu.modbits.string(rec.enabled_mods).split('').reduce((target, value, index) => {
        if (index % 2) target[target.length - 1] += value
        else target.push(value)
        return target
    }, [])
    if (!fs.existsSync(avatarDest))
        await getAvatar(uid, avatarDest, avatarLargerDest)
    await promisify(fs.copyFile, `assets${path.sep}image${path.sep}userbg${path.sep}crecent.jpg`, avatarBGDest)
    await promisifyGM(
        gm(avatarBGDest)
        .quality(100)
        .composite(avatarDest)
        .gravity('North')
        .geometry('+0-50')
    )
    if (!fs.existsSync(bgDest))
        await res.bgQuery(sid, bgDest)
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
        .fill('#888b')
        .drawCircle(750, 250, 750, 620)
        .tile(dest)
        .drawCircle(750, 250, 750, 610)
    )
    await promisifyGM(
        gm(dest)
        .quality(100)
        .gravity('Center')
        .fill('#fff5')
        .drawCircle(750, 250, 750, 610)
        .fill('#fff5')
        .drawCircle(750, 250, 750, 490)
        .fill('#ccc5')
        .drawCircle(750, 250, 750, 470)
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
        .font('assets/fonts/Exo2.0-Medium.otf')
        .fontSize(25)
        .drawText(0, -185, Math.round(pp.total).toString() + 'pp')
        .fontSize(30)
        .drawText(0, -155, stat.username)
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
        .font('assets/fonts/Exo2.0-ExtraBold.otf')
        .fontSize(12)
        .fill('#66a')
        .drawText(-100, 160, '300')
        .fill('#6a6')
        .drawText(-33, 160, '100')
        .fill('#aa6')
        .drawText(33, 160, '50')
        .fill('#a66')
        .drawText(100, 160, 'X')
        .crop(1000, 500)
    )
    await promisifyGM(
        gm(dest)
        .quality(100)
        .gravity('Center')
        .font('assets/fonts/Exo2.0-Bold.otf')
        .fontSize(12)
        .fill('#f69')
        .drawText(0, 5, 'total score')
        .font('assets/fonts/Venera-300.otf')
        .fontSize(50)
        .fill('#f69')
        .drawText(0, -20, util.scorify(rec.score))
    )
    await promisifyGM(
        gm(dest)
        .quality(100)
        .composite('assets/image/rank/' + rec.rank + '.png')
        .gravity('North')
        .geometry('+0+80')
    )
    for (let padding = -(mods.length - 1) * 10, i = 0; i < mods.length; padding += 20, i++) {
        await promisifyGM(
            gm(dest)
            .quality(100)
            .gravity('North')
            .composite('assets/image/mods/' + mods[i] + '.png')
            .geometry((padding >= 0 ? '+' : '') + padding + '+170')
        )
    }
    return 'file://' + process.cwd() + path.sep + dest
}

async function drawStat(stat) {
    const uid = stat.user_id
    const dest = `cache${path.sep}osubot${path.sep}stat${path.sep}${uid}.jpg`
    const avatarDest = `cache${path.sep}osubot${path.sep}avatar${path.sep}${uid}.jpg`
    const avatarBGDest = `cache${path.sep}osubot${path.sep}statbg${path.sep}${uid}.jpg`
    const avatarLargerDest = `cache${path.sep}osubot${path.sep}avatarl${path.sep}${uid}.jpg`
    await promisify(fs.copyFile, `assets${path.sep}image${path.sep}userbg${path.sep}c${Math.ceil(Math.random() * 5)}.jpg`, dest)
    if (!fs.existsSync(avatarDest))
        await getAvatar(uid, avatarDest, avatarLargerDest)
    await promisify(fs.copyFile, `assets${path.sep}image${path.sep}userbg${path.sep}cstat.jpg`, avatarBGDest)
    await promisifyGM(
        gm(avatarBGDest)
        .quality(100)
        .composite(avatarLargerDest)
        .gravity('Center')
    )
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
        gm(dest)
        .quality(100)
        .gravity('Center')
        .crop(750, 500)
        .fill('#fff5')
        .drawCircle(375, 250, 375, 610)
        .fill('#fff5')
        .drawCircle(375, 250, 375, 490)
        .fill('#ccc5')
        .drawCircle(375, 250, 375, 470)
        .tile(avatarBGDest)
        .drawCircle(375, 250, 375, 460)
    )
    await promisifyGM(
        gm(dest)
        .quality(100)
        .gravity('Center')
        .fill('#888a')
        .drawEllipse(375, 250, 210, 210, -145, -35)
        .fill('#fff8')
        .drawCircle(375, 250, 375, 460)
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
        .font('assets/fonts/Venera-300.otf')
        .fontSize(45)
        .fill('#f69')
        .drawText(0, -25, '#' + util.scorify(stat.pp_rank))
        .fontSize(13)
        .fill('#999')
        .drawRectangle(325, 345, 425, 365)
        .font('assets/fonts/Exo2.0-Regular.otf')
        .fill('#fff')
        .drawText(20, 105, '#' + util.scorify(stat.pp_country_rank))
        .fontSize(25)
        .fill('#aaa')
        .drawLine(275, 375, 475, 375)
        .fill('#666')
        .drawText(-100, 140, util.fillNumber((parseInt(stat.count_rank_ssh) + parseInt(stat.count_rank_ss)).toString()))
        .drawText(-33, 140, util.fillNumber(stat.count_rank_sh))
        .drawText(33, 140, util.fillNumber(stat.count_rank_s))
        .drawText(100, 140, util.fillNumber(stat.count_rank_a))
        .fontSize(12)
        .drawText(-100, 160, 'SS(+)')
        .drawText(-33, 160, 'S+')
        .drawText(33, 160, 'S')
        .drawText(100, 160, 'A')
    )
    await promisifyGM(
        gm(dest)
        .quality(100)
        .composite('assets/image/flags/' + stat.country + '.png')
        .gravity('North')
        .geometry('-50+343')
    )
    return 'file://' + process.cwd() + path.sep + dest
}

async function getAvatar(uid, avatarDest, avatarLargerDest) {
    let errCount = 0;
    try {
        await res.avatarQuery(uid, avatarDest)
        await promisify(fs.copyFile, avatarDest, avatarLargerDest)
        await promisifyGM(
            gm(avatarDest)
            .quality(100)
            .resize(350, 350)
        )
        await promisifyGM(
            gm(avatarLargerDest)
            .quality(100)
            .resize(421, 421)
            .blur(3, 3)
        )
        return true
    } catch(err) {
        clearCachedAvatars(uid)
    }
}

/**
 * deletes a cached avatar. If uid is not specified, then delete all of them
 * @param {string} uid 
 */
function clearCachedAvatars(uid) {
    if (!uid) {
        for (let i of fs.readdirSync(`cache${path.sep}osubot${path.sep}avatar`))
            fs.unlinkSync(`cache${path.sep}osubot${path.sep}avatar${path.sep}${i}.jpg`)
        for (let i of fs.readdirSync(`cache${path.sep}osubot${path.sep}avatarl`))
            fs.unlinkSync(`cache${path.sep}osubot${path.sep}avatarl${path.sep}${i}.jpg`)
    } else {
        fs.unlinkSync(`cache${path.sep}osubot${path.sep}avatar${path.sep}${uid}.jpg`)
        fs.unlinkSync(`cache${path.sep}osubot${path.sep}avatarl${path.sep}${uid}.jpg`)
    }
}

export default { drawRecent, drawStat, clearCachedAvatars }