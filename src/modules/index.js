import osubot from './osubot'
import develop from './develop'

export const commands = { ...(osubot.commands), ...(develop.commands) }
export const inits = [ osubot.inits ]
export const middlewares = [ osubot.middlewares ]
