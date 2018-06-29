import { version } from '../../package.json'

const ascii = `
                    __     __          __ 
   ____  ____  ____/ /__  / /_  ____  / /_
  / __ \\/ __ \\/ __  / _ \\/ __ \\/ __ \\/ __/
 / / / / /_/ / /_/ /  __/ /_/ / /_/ / /_  
/_/ /_/\\____/\\__,_/\\___/_.___/\\____/\\__/  `

const info = `
PACKAGE | Nodebot   v${version}
AUTHOR  | trustgit  (c) ${new Date().getFullYear()} MIT License`

export default function greeting() {
    console.log(ascii)
    console.log(info)
}