// Import modules
import gm from 'gm'
import fs from 'fs'
import path from 'path'
// Import local files
import { promisify, promisifyGM } from './_util'
import { res } from '../web'

/**
 * get a user's avatar
 * saves 350*350 version to avatarDest
 * saves 421*421 version with a bit blur to avatarLargerDest
 * @param {string} uid 
 * @param {string} avatarDest 
 * @param {string} avatarLargerDest 
 */
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
        if (fs.existsSync(`cache${path.sep}osubot${path.sep}avatar${path.sep}${uid}.jpg`))
            fs.unlinkSync(`cache${path.sep}osubot${path.sep}avatar${path.sep}${uid}.jpg`)
        if (fs.existsSync(`cache${path.sep}osubot${path.sep}avatarl${path.sep}${uid}.jpg`))
            fs.unlinkSync(`cache${path.sep}osubot${path.sep}avatarl${path.sep}${uid}.jpg`)
    }
}

export { getAvatar, clearCachedAvatars }