import Monk from 'monk'
import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
const { databaseAddress, analyzeMessage } = safeLoad(readFileSync('config.yml'))
const db = Monk(`${databaseAddress}/botdb`)
const data = db.get('analytics')
export default async function analyzer({ type: messageType, target: messageTarget }, type, identifier) {
    if (analyzeMessage) {
        if (await data.findOne({ messageType, messageTarget, type, identifier }))
            return data.update({ messageType, messageTarget, type, identifier }, { $inc: { counter: 1 }})
        else
            return data.insert({ messageType, messageTarget, type, identifier, counter: 1 })
    }
}