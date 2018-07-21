import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
const config = safeLoad(readFileSync('config.yml')).botinfo
export default {
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