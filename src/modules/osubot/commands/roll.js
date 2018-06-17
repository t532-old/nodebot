export default {
    args: '[range]',
    options: [],
    /**
     * @description Gives a random result in a specific range (default 100)
     * @param {Message} msg The universal msg object
     * @param {string} range The rolling range
     */
    async action(msg, { range = '100' }) {
        if (typeof range === 'string' && !parseInt(range)) {
            range = range.split(',')
            msg.send(range[Math.floor(Math.random() * range.length)])
        } else msg.send(Math.round(Math.random() * parseInt(range)).toString())
    }
}