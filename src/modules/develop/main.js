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
    async action(msg, { txt }) { console.log(txt); msg.send(txt.join(' ')) }
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
`Nodebot v${config.version.split(' ')[0]} "${config.version.split(' ')[1]}"
powered by Node.js & cqhttp.
${new Date().getFullYear()} trustgit | under MIT License`
        )
    }
}

export default { test, about }