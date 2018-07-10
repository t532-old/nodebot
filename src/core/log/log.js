import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
const { logMessage } = safeLoad(readFileSync('config.yml'))
export default function log(message, force = false) {
    if (force || logMessage) console.log(message)
}