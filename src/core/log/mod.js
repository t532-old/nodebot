import log from './log'
import chalk from 'chalk'
export default function mod(name, message) {
    log(`${chalk.blue('[MOD]')} ${chalk.gray(new Date().toString())} by ${name}: ${message}`)
}