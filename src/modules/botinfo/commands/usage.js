export default {
    args: '[len] [queries...]',
    options: ['filter', 'name', 'type'],
    /**
     * Send bot's help link.
     * @param {Message} msg The universal msg object
     */
    async action(msg, { len = 10, queries }, methods) { }
}