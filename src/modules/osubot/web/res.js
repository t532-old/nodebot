import fs from 'fs'
import axios from 'axios'
import osu from 'ojsama'

/**
 * A GET requrest that gets a file stream, and writes it to another stream
 * @param {string} url 
 * @param {string} dest 
 */
async function staticQuery(url, dest) {
    const res = await axios({
        method: 'get',
        url,
        responseType: 'stream'
    })
    if (res.status === 403) return false
    res.data.pipe(fs.createWriteStream(dest))
    return new Promise(function (resolve, reject) {
        res.data.on('end', resolve)
    }).catch(err => { throw err })
}

/**
 * Simple sugar over staticQuery, queries a user's avatar
 * @param {string} uid 
 */
async function avatarQuery(uid, dest) { return staticQuery('https://a.ppy.sh/' + uid, dest) }

/**
 * Simple sugar over staticQuery, queries a map's background
 * @param {string} sid 
 */
async function bgQuery(sid, dest) { return staticQuery('https://assets.ppy.sh/beatmaps/' + sid + '/covers/cover.jpg', dest) }

async function mapFileQuery(bid) {
    const parser = new osu.parser()
    const res = (await axios.get('https://osu.ppy.sh/osu/' + bid)).data
    parser.feed(res)
    return parser.map
}

export default { query: staticQuery, avatarQuery, bgQuery, mapFileQuery }