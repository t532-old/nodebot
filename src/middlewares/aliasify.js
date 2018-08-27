import { Aliaser } from '../command'
import analyzer from '../util/analyzer'
import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
const { aliases: moduleList } = safeLoad(readFileSync('config/exports.yml'))
let aliases
try { aliases = safeLoad(readFileSync('config/aliases.yml')) }
catch { aliases = {} }
for (let i of moduleList) {
    const moduleAliases = safeLoad(readFileSync(`node_modules/nodebot-module-${i}/aliases.yml`))
    aliases = { ...aliases, ...moduleAliases }
}
const aliaser = new Aliaser(aliases)
/**
 * Make a message its alias.
 * @param {ContentMessage} msg 
 */
export default function aliasify(msg) {
    const alias = aliaser.alias(msg.content)
    if (msg.content !== alias) {
        analyzer(msg, 'alias', `${msg.content}:${alias}`)
        msg.content = alias
    }
}