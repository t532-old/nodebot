import log from './log'
import chalk from 'chalk'
export default function outgo(msg, text, startTime) {
    log(`${chalk.green('[OUT]')} ${chalk.gray(`${new Date().toString()} ( ${new Date().getTime() - startTime.getTime()} ms )`)}\n      ${msg.type === 'group' ? `reply ${msg.type} ${msg.target}` : chalk.yellow(`reply ${msg.type} ${msg.target}`)}: ${JSON.stringify(text)}`)
}