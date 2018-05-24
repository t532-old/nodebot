import { Message } from '../../message'
import yaml from 'js-yaml'
import fs from 'fs'

const config = yaml.safeLoad(fs.readFileSync('config.yml')).develop

const test = {
    args: '[txt...]',
    options: [],
    /**
     * Returns the text directly to the user
     * @param {Message} msg The universal msg object
     * @param {array} txt The texts user sends
     */
    async action(msg, { txt }) { msg.send(txt.filter(i => i.trim()).join(' ')) }
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
${new Date().getFullYear()} trustgit | under MIT License`
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
        msg.send('帮助页面： https://github.com/trustgit/nodebot/blob/master/doc/commands.md')
    }
}

export default { test, about, help }