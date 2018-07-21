export default {
    args: '',
    options: [],
    /**
     * Send bot's help link.
     * @param {Message} msg The universal msg object
     */
    async action(msg) {
        msg.send('帮助页面： https://gitlab.com/trustgit/nodebot/wikis/Commands')
    }
}