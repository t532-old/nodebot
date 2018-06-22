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
            msg.send(log[msg.type][msg.target].message)
            delete log[msg.type][msg.target]
        }
    }
}