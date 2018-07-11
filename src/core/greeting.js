import { version } from '../../package.json'
import chalk from 'chalk'
import { log } from './log'

const ascii = `
                    __     __          __ 
   ____  ____  ____/ /__  / /_  ____  / /_
  / __ \\/ __ \\/ __  / _ \\/ __ \\/ __ \\/ __/
 / / / / /_/ / /_/ /  __/ /_/ / /_/ / /_  
/_/ /_/\\____/\\__,_/\\___/_.___/\\____/\\__/  `

const info = `
 PACKAGE | Nodebot   v${version} 
 AUTHOR  | trustgit  (c) ${new Date().getFullYear()} MIT License `

export default function greeting() {
    const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan']
    log(chalk[colors[Math.floor(Math.random() * colors.length)]](ascii))
    log(chalk.black.bgWhite(info))
}