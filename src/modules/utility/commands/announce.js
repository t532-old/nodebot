import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
import { modLog } from '../../../core/log'
import Message from '../../../core/message/sender'
const { operators } = safeLoad(readFileSync('config.yml'))
export default {
    args: '<announcement> [groups...]',
    options: ['include', 'except'],
    /**
     * Runs a batch command
     * @param {Message} msg The universal msg object
     * @param {{ announcement: string|{ type: string, data }[], groups: string[] }} - the announcement info
     */
    async action(msg, { announcement, groups }, [ type ]) {
        if (operators.includes(msg.param.user_id)) {
            const groupList = (await Message.groupList()).map(i => i.group_id.toString())
            for (let i of groupList)
                if (
                    (type === 'include' && groups.includes(i)) ||
                    (type === 'except' && !groups.includes(i)) ||
                    !type
                ) {
                    Message.group(i, announcement)
                    modLog('utility[announce]', `sent announcement ${JSON.stringify(announcement)} to group ${i}`)
                }
        }
    }
}