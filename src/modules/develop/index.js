import yaml from 'js-yaml'
import fs from 'fs'
const config = yaml.safeLoad(fs.readFileSync('config.yml')).develop
export default {
    test: {
        action(msg, ...txt) { msg.sender(txt.join(' ')) },
        separator: /[\r\n\s]/
    },
    about: {
        action(msg) {
            msg.sender(
`Nodebot v${config.version.split(' ')[0]} "${config.version.split(' ')[1]}"
powered by Node.js & cqhttp.
${new Date().getFullYear()} trustgit | under MIT License`
            )
        },
        separator: /[\r\n\s]/
    },
}