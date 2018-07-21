import * as osubot from './osubot'
import * as botinfo from './botinfo'
import * as utility from './utility'

export const commands = { 
    ...(osubot.commands),
    ...(botinfo.commands),
    ...(utility.commands),
}
export const inits = [
    osubot.inits
]
export const middlewares = [
    osubot.middlewares
]
