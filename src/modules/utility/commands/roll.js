import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
const { injectionChecker } = safeLoad(readFileSync('config.yml'))
export default {
    args: '[range...]',
    options: [],
    /**
     * Gives a random result in a specific range (default 100)
     * @param {Message} msg The universal msg object
     * @param {{ range: string }} - The rolling range
     */
    async action(msg, { range }) {
        range = range.map(i => i.trim()).join(',') || '100'
        if (typeof range === 'string' && !parseInt(range)) {
            range = range.split(',').filter(i => new RegExp(...injectionChecker).test(i) === false)
            msg.send(range[Math.floor(Math.random() * range.length)])
        } else msg.send(Math.round(Math.random() * parseInt(range)).toString())
    }
}