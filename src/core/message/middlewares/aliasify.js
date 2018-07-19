import { Aliaser } from '../../command'
import analyzer from '../../analyzer'
import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
const aliases = safeLoad(readFileSync('aliases.yml'))
const aliaser = new Aliaser(aliases)
/**
 * Make a message its alias.
 * @param {Message} msg 
 */
export default function aliasify(msg) {
    const alias = aliaser.alias(msg.param.message)
    if (msg.param.message !== alias) {
        analyzer(msg, 'alias', `${msg.param.message}:${alias}`)
        msg.param.message = alias
    }
}