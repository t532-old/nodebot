import { readdirSync } from 'fs'
const path = `file://${process.cwd()}`
export const commands = {
    help: {
        args: '[topic]',
        options: [],
        /**
         * Send bot's help link.
         * @param {ContentMessage} msg The universal msg object
         * @param {{ topic?: string }} - the help topic
         */
        async action(msg, { topic }) {
            if (topic && readdirSync('cache/helper').includes(`${topic}.jpg`)) {
                msg.send([{
                    type: 'image',
                    data: {
                        file: `${path}/cache/helper/${topic}.jpg`
                    }
                }])
            } else {
                msg.send([{
                    type: 'image',
                    data: {
                        file: `${path}/cache/helper/_main.jpg`
                    }
                }])
            }
        }
    },
}
export inits from './init'