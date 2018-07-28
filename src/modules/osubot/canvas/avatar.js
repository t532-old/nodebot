// Import modules
import gm from 'gm'
import { copyFileSync, readdirSync, unlinkSync, existsSync } from 'fs'
// Import local files
import { promisifyGM, cachepath } from './_util'
import { res } from '../web'
import { errorLog } from '../../../core/log'

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
    catch { return false }
    try {
        await promisifyGM(
            gm(avatarDest)
            .quality(100)
            .resize(350, 350)
        )
        copyFileSync(avatarDest, avatarLargerDest)
        await promisifyGM(
            gm(avatarLargerDest)
            .quality(100)
            .resize(421, 421)
            .blur(3, 3)
        )
        return true
    } catch (err) {
        errorLog(err)
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
        for (let i of readdirSync(`${cachepath}/avatar`))
            unlinkSync(`${cachepath}/avatar/${i}.jpg`)
        for (let i of readdirSync(`${cachepath}/avatarl`))
            unlinkSync(`${cachepath}/avatarl/${i}.jpg`)
    } else {
        if (existsSync(`${cachepath}/avatar/${uid}.jpg`))
            unlinkSync(`${cachepath}/avatar/${uid}.jpg`)
        if (existsSync(`${cachepath}/avatarl/${uid}.jpg`))
            unlinkSync(`${cachepath}/avatarl/${uid}.jpg`)
    }
}

export { getAvatar, clearCachedAvatars }