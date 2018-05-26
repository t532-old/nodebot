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
    await promisify(fs.copyFile, `assets${path.sep}image${path.sep}userbg${path.sep}crecent.jpg`, avatarBGDest)
    if (fs.existsSync(avatarDest) || await getAvatar(uid, avatarDest, avatarLargerDest)) 
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

async function drawStat(stat, statPrev) {
    const uid = stat.user_id
    const dest = `cache${path.sep}osubot${path.sep}stat${path.sep}${uid}.jpg`
    const avatarDest = `cache${path.sep}osubot${path.sep}avatar${path.sep}${uid}.jpg`
    const ranks = ['XH', 'X', 'SH', 'S', 'A']
    await promisify(fs.copyFile, `assets${path.sep}image${path.sep}userbg${path.sep}c${Math.ceil(Math.random() * 5)}.jpg`, dest)
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
        .font('assets/fonts/Exo2.0-Medium.otf')
        .fontSize(40)
        .drawText(420, 100, stat.username)
        .font('assets/fonts/Exo2.0-MediumItalic.otf')
        .fill('#ddd')
        .fontSize(30)
        .drawText(420, 140, 'Lv. ' + parseInt(stat.level))
        .fill('#fff')
        .font('assets/fonts/Venera-500.otf')
        .fontSize(45)
        .drawText(30, 480, '#' + util.scorify(stat.pp_rank))
        .gravity('NorthEast')
        .fontSize(35)
        .drawText(70, 480, '#' + util.scorify(stat.pp_country_rank))
        .gravity('NorthWest')
        .fill('#ddd')
        .font('assets/fonts/Exo2.0-BoldItalic.otf')
        .fontSize(25)
        .drawText(30, 570, 'Performance points')
        .fill('#fff')
        .font('assets/fonts/Exo2.0-Bold.otf')
        .fontSize(45)
        .drawText(30, 610, util.scorify(stat.pp_raw.split('.')[0]) + (stat.pp_raw.split('.')[1] ? ('.' + util.fillNumberReversed(stat.pp_raw.split('.')[1].slice(0, 2), 2)) : '') + 'pp')
        .fill('#ddd')
        .font('assets/fonts/Exo2.0-MediumItalic.otf')
        .fontSize(25)
        .drawText(30, 660, 'Play count')
        .fill('#fff')
        .font('assets/fonts/Exo2.0-Medium.otf')
        .fontSize(45)
        .drawText(30, 700, util.scorify(stat.playcount))
        .fill('#ddd')
        .font('assets/fonts/Exo2.0-MediumItalic.otf')
        .fontSize(25)
        .drawText(30, 750, 'Accuracy')
        .fill('#fff')
        .font('assets/fonts/Exo2.0-Medium.otf')
        .fontSize(45)
        .drawText(30, 790, stat.accuracy.slice(0, 3 + stat.accuracy.split('.')[0].length) + '%')
        .fill('#ddd')
        .font('assets/fonts/Exo2.0-MediumItalic.otf')
        .fontSize(25)
        .drawText(30, 840, 'Ranked score')
        .fill('#fff')
        .font('assets/fonts/Exo2.0-Medium.otf')
        .fontSize(45)
        .drawText(30, 880, util.scorify(stat.ranked_score))
        .font('assets/fonts/Exo2.0-Bold.otf')
        .fontSize(30)
        .drawText(60, 980, stat.count_rank_ssh)
        .drawText(205, 980, stat.count_rank_ss)
        .drawText(350, 980, stat.count_rank_sh)
        .drawText(495, 980, stat.count_rank_s)
        .drawText(640, 980, stat.count_rank_a)
    )
    if (statPrev) {
        const diff = util.objDiff(stat, statPrev)
        await promisifyGM(
            gm(dest)
            .quality(100)
            .font('assets/fonts/Exo2.0-Regular.otf')
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
            .composite(`assets/image/rank/${ranks[rank]}.png`)
            .geometry(`+${30 + rank * 145}+860`)
        )
    await promisifyGM(
        gm(dest)
        .quality(100)
        .gravity('NorthEast')
        .composite('assets/image/flags/' + stat.country + '.png')
        .geometry('+30+455')
    )
    return 'file://' + process.cwd() + path.sep + dest
}

async function drawBest(bp, map, stat) {
    const uid = stat.user_id
    const sid = map.beatmapset_id
    const bid = bp.beatmap_id
    const dest = `cache${path.sep}osubot${path.sep}best${path.sep}${uid}.jpg`
    const bgDest = `cache${path.sep}osubot${path.sep}mapbg${path.sep}${sid}.jpg`
    const avatarDest = `cache${path.sep}osubot${path.sep}avatar${path.sep}${uid}.jpg`
    const avatarLargerDest = `cache${path.sep}osubot${path.sep}avatarl${path.sep}${uid}.jpg`
    const avatarBGDest = `cache${path.sep}osubot${path.sep}recentbg${path.sep}${uid}.jpg`
    const mapFile = await res.mapFileQuery(bid)
    const mods = osu.modbits.string(bp.enabled_mods).split('').reduce((target, value, index) => {
        if (index % 2) target[target.length - 1] += value
        else target.push(value)
        return target
    }, [])
    await promisify(fs.copyFile, `assets${path.sep}image${path.sep}userbg${path.sep}crecent.jpg`, avatarBGDest)
    if (fs.existsSync(avatarDest) || await getAvatar(uid, avatarDest, avatarLargerDest))
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
        .drawText(0, -185, Math.round(bp.pp).toString() + 'pp')
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
        .drawText(-300, 0, bp.maxcombo + 'x')
        .drawText(300, 0, util.accuracy(bp) + '%')
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
        .drawText(0, 105, bp.date)
        .fontSize(25)
        .fill('#aaa')
        .drawLine(650, 375, 850, 375)
        .fill('#666')
        .drawText(-100, 140, util.fillNumber(bp.count300))
        .drawText(-33, 140, util.fillNumber(bp.count100))
        .drawText(33, 140, util.fillNumber(bp.count50))
        .drawText(100, 140, util.fillNumber(bp.countmiss))
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
        .drawText(0, -20, util.scorify(bp.score))
    )
    await promisifyGM(
        gm(dest)
        .quality(100)
        .composite('assets/image/rank/' + bp.rank + '.png')
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

async function getAvatar(uid, avatarDest, avatarLargerDest) {
    try { await res.avatarQuery(uid, avatarDest) }
    catch (err) { return false }
    try {
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
        await clearCachedAvatars(uid)
        return false
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

export default { drawRecent, drawStat, drawBest, clearCachedAvatars }