const log = {
    private: {},
    group: {},
}
/**
 * This middleware counts the repeated times of a message
 * if it reaches 3, the bot repeats it
 * @param {Message} msg 
 */
export default function repeater(msg) {
    if (/!|！/.test(msg.param.message) === false) {
        if (!log[msg.type][msg.target]) log[msg.type][msg.target] = { count: 1, message: msg.param.message }
        else if (msg.param.message === log[msg.type][msg.target].message) log[msg.type][msg.target].count++
        else log[msg.type][msg.target] = { count: 1, message: msg.param.message }
        if (log[msg.type][msg.target].count === 3) {
            const timeout = Math.round(Math.random() * 200000),
                  repeatTarget = log[msg.type][msg.target]
            console.log(`[MOD] ${new Date().toString()} by osubot middleware: attempting to repeat \`${msg.param.message}' in ${msg.type} ${msg.target} in ${Math.round(timeout / 1000)} secs`)
            setTimeout(() => { msg.send(repeatTarget.message) }, timeout)
            delete log[msg.type][msg.target]
        }
    }
}