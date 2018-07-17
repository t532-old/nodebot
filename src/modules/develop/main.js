import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'

const config = safeLoad(readFileSync('config.yml')).develop
const { injectionChecker } = safeLoad(readFileSync('config.yml'))

const test = {
    args: '[txt...]',
    options: [],
    /**
     * Returns the text directly to the user
     * @param {Message} msg The universal msg object
     * @param {array} txt The texts user sends
     */
    async action(msg, { txt }) { msg.send(txt.filter(i => new RegExp(...injectionChecker).test(i) === false).join(' ')) }
}

const about = {
    args: '',
    options: [],
    /**
     * Send bot's info.
     * @param {Message} msg The universal msg object
     */
    async action(msg) {
        msg.send(
`Nodebot v${config.version}
powered by Node.js & cqhttp.
${new Date().getFullYear()} trustgit | under MIT License
Star on GitLab if you enjoy it! https://gitlab.com/trustgit/nodebot`
        )
    }
}

const help = {
    args: '',
    options: [],
    /**
     * Send bot's help link.
     * @param {Message} msg The universal msg object
     */
    async action(msg) {
        msg.send('帮助页面： https://gitlab.com/trustgit/nodebot/wikis/Commands')
    }
}

export default { test, about, help }