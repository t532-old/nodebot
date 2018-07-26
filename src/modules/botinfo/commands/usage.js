import Monk from 'monk'
import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
const { databaseAddress, operators } = safeLoad(readFileSync('config.yml'))
const db = Monk(`${databaseAddress}/botdb`)
const data = db.get('analytics')
export default {
    args: '[queries...]',
    options: ['length', 'filter', 'identifier', 'type'],
    /**
     * Send bot's help link.
     * @param {Message} msg The universal msg object
     */
    async action(msg, { queries }, methods) {
        let reply = `== ${msg.target} 的用量统计，截至 ${new Date().toString()} ==\n`
        let length, filterFlag = false
        let query = { messageType: msg.type, messageTarget: msg.target }, result = []
        for (let i in methods) {
            if (methods[i] === 'filter') {
                if (operators.includes(msg.param.user_id) && msg.type === 'private') {
                    query = {}
                    for (let j of queries) {
                        const converted = j.split('=')
                        try { query[converted[0]] = eval(converted[1]) }
                        catch {
                            msg.send('botinfo: usage: 查询编写错误！')
                            return
                        }
                    }
                    reply += `filter: ${JSON.stringify(query)}\n`
                    filterFlag = true
                    break
                } else {
                    msg.send('botinfo: usage: 权限不足')
                    return
                }
            } else if (methods[i] === 'length') {
                length = parseInt(queries[i]) > 0 ? parseInt(queries[i]) : undefined
                reply += `length: ${length}\n`
            } else {
                query[methods[i]] = queries[i]
                reply += `${methods[i]}: ${queries[i]}\n`
            }
        }
        reply += `====================\n`
        if (!length && !filterFlag) length = 10
        result = await data.find(query, {
            sort: { counter: -1 },
            limit: length
        })
        for (let i in result)
            reply += `${parseInt(i) + 1}. ${result[i].type}【${result[i].identifier}】${filterFlag ? `in ${result[i].messageType} ${result[i].messageTarget}` : ''} - ${result[i].counter}次\n`
        msg.send(reply)
    }
}