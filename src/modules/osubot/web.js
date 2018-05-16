import fs from 'fs'
import url from 'url'
import axios from 'axios'
import osu from 'ojsama'
import yaml from 'js-yaml'

const config = yaml.safeLoad(fs.readFileSync('config.yml')).osubot

/**
 * A GET request to the ppy api.
 * @param {string} name 
 * @param {object} params 
 */
async function apiQuery(name, params) {
    return axios.get(url.format({
        protocol: 'https',
        host: 'osu.ppy.sh',
        pathname: `api/${name}`,
        query: { ...params, k: config.key },
    }))
}

/**
 * Simple sugar over apiQuery, queries user's status
 * @param {object} params 
 */
async function statQuery(params) {
    let result
    try { result = await apiQuery('get_user', params) }
    catch (err) { throw new Error('StatQuery: bad network status') }
    if (result.data[0] === undefined) throw new Error('StatQuery: user does not exist')
    else return result.data[0]
}

/**
 * Simple sugar over apiQuery, queries user's most recent play
 * @param {object} params 
 */
async function recentQuery(params) {
    let result
    try { result = await apiQuery('get_user_recent', params) }
    catch (err) { throw new Error('RecentQuery: bad network status') }
    if (result.data[0] === undefined) throw new Error('RecentQuery: user does not exist or not played recently')
    else return result.data[0]
}

/**
 * Simple sugar over apiQuery, queries user's best performance
 * @param {object} params 
 */
async function bestQuery(params) {
    let result
    try { result = await apiQuery('get_user_best', params) }
    catch (err) { throw new Error('bestQuery: bad network status') }
    if (result.data === []) throw new Error('bestQuery: user does not exist or not played enough')
    else return result.data
}

/**
 * Simple sugar over apiQuery, queries a map's info
 * @param {object} params 
 */
async function mapQuery(params) {
    let result
    try { 
        result = await apiQuery('get_beatmaps', params)
        if (result.data[0] === undefined) throw new Error('RecentQuery: user does not exist')
        else return result.data[0]
    } catch (err) { throw new Error('RecentQuery: bad network status') } 
}

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

export const api = { query: apiQuery, statQuery, recentQuery, mapQuery, bestQuery }
export const res = { query: staticQuery, avatarQuery, bgQuery, mapFileQuery }