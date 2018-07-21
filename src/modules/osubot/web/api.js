import { readFileSync } from 'fs'
import { format } from 'url'
import { get } from 'axios'
import { safeLoad } from 'js-yaml'

const config = safeLoad(readFileSync('config.yml')).osubot

/**
 * A GET request to the ppy api.
 * @param {string} name 
 * @param {object} params 
 */
async function apiQuery(name, params) {
    return get(format({
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
    catch { throw new Error('statQuery: bad network status') }
    if (result.data[0] === undefined) throw new Error('statQuery: user does not exist')
    else return result.data[0]
}

/**
 * Simple sugar over apiQuery, queries user's most recent play
 * @param {object} params 
 */
async function recentQuery(params) {
    let result
    try { result = await apiQuery('get_user_recent', params) }
    catch { throw new Error('recentQuery: bad network status') }
    if (result.data[0] === undefined) throw new Error('recentQuery: user does not exist or not played recently')
    else return result.data[0]
}

/**
 * Simple sugar over apiQuery, queries user's best performance
 * @param {object} params 
 */
async function bestQuery(params) {
    let result
    try { result = await apiQuery('get_user_best', params) }
    catch { throw new Error('bestQuery: bad network status') }
    if (result.data === []) throw new Error('bestQuery: user does not exist or not played enough')
    else return result.data
}

/**
 * Simple sugar over apiQuery, queries a map's info
 * @param {object} params 
 */
async function mapQuery(params) {
    let result
    try { result = await apiQuery('get_beatmaps', params) } 
    catch { throw new Error('mapQuery: bad network status') } 
    if (result.data[0] === undefined) throw new Error('mapQuery: map does not exist')
    else return result.data[0]
}

export default { query: apiQuery, statQuery, recentQuery, mapQuery, bestQuery }