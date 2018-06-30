import * as osubot from './osubot'
import * as develop from './develop'

export const commands = { ...(osubot.commands), ...(develop.commands) }
export const inits = [ osubot.inits ]
export const middlewares = [ osubot.middlewares ]
