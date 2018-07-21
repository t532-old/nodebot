export default class Command {
    /**
     * Initialize the command list
     * @property
     */
    #list = {}
    /**
     * The commands' prefix Regex
     * @property
     */
    #commandPrefix
    /**
     * The commands' options' prefix Regex
     * @property
     */
    #optionsPrefix
    /**
     * The handler that runs when no command matches
     * @method
     */
    defaultHandler() {}
    /**
     * The handler that runs when the args are invalid
     * @method
     */
    invalidHandler() {}
    /**
     * The handler that runs when a command is recognized and parsed
     * @method
     */
    successHandler() {}
    /**
     * @constructor
     * @name Command
     * @param {object} prefixes - The commands' && options' prefix
     * @param {object} handlers - do this when no avalible commands || the arguments are missing
     */
    constructor({prefixes, handlers}) { 
        this.#commandPrefix = new RegExp('^' + prefixes.command)
        this.#optionsPrefix = new RegExp('^' + prefixes.options)
        if (handlers.default) this.defaultHandler = handlers.default
        if (handlers.invalid) this.invalidHandler = handlers.invalid
        if (handlers.success) this.successHandler = handlers.success
    }
    /**
     * bind a command
     * @method
     * @param {string} name - the command name
     * @param {object} params - {
     *      {string} args - the arguments' format, 
     *          <name> (with the angle brackets!) is a required arg, 
     *          [name] (with the square brackets, and must be given after required ones) is an optional args,
     *          [name...] (with the square brackets, must be given at last and may only appear once) is the rest args. 
     *      {array<string>} options - the option list (options starts with an asterisk) 
     *      {function} action ( 
     *          {object} args - the arguments list (e.g. '>command <a> [b] [c...]' gives { a: value, b: value, c: [values, ...] },
     *          {array<string>} options - used options (e.g. '*a *b' gives ['a', 'b'])
     *      )
     * }
     * @example 
     * CommandInstance.on('test', {
     *      args: '<a> [b] [c] [d...]',
     *      options: ['*x', '*y'],
     *      action(args, options) { return [args, options] }
     * })
     */
    on(name, {args, options, action}) {
        const str = this.#commandPrefix.toString().slice(2, -1) + name + ' ' + args
        args = args.split(' ')
        args = {
            required: args.filter(i => i.match(/^<.+>$/))
                          .map(i => i.split(/<|>/)[1]),
            optional: args.filter(i => i.match(/^\[[^\.]+\]$/))
                          .map(i => i.split(/\[|\]/)[1]),
            group: args.filter(i => i.match(/^\[.+\.{3,3}\]$/))[0] ? args.filter(i => i.match(/^\[.+\.{3,3}\]$/))[0].split(/\[|\.{3,3}\]/)[1] : null
        }
        this.#list[name] = { args, options, action, str }
        return this
    }
    /**
     * Bind a group of commands.
     * @method
     * @param {object} commands 
     */
    onAll(commands) {
        for (let i of Object.keys(commands)) 
            this.on(i, commands[i])
        return this
    }
    /**
     * do a command
     * @method
     * @param {string} command 
     */
    do(command, ...extraArgs) {
        if (!this.#commandPrefix.test(command)) return
        command = command.split(this.#commandPrefix)[1].split(/[\r\n\s]/)
        const combined = []
        let inString = false
        for (let i of command) {
            if (inString) {
                combined[combined.length - 1] += ' ' + i
                if (/["'“”‘’]$/.test(i)) {
                    combined[combined.length - 1] = combined[combined.length - 1].slice(0, -1)
                    inString = false
                }
            } else {
                combined.push(i)
                if (/^["'“”‘’]/.test(i)) {
                    combined[combined.length - 1] = combined[combined.length - 1].slice(1)
                    inString = true
                }
            }
        }
        command = combined
        const name = command.shift()
        if (!this.#list[name]) {
            if (typeof this.defaultHandler === 'function') {
                this.defaultHandler(...extraArgs, [name, ...command])
                return
            } else throw new SyntaxError('No default handler for undefined command')
        }
        const options = command.filter(i => this.#optionsPrefix.test(i)).map(i => i.split(this.#optionsPrefix)[1]).filter(i => this.#list[name].options.includes(i))
        command = command.filter(i => !this.#optionsPrefix.test(i))
        if (this.#list[name].args.required.length > command.length) {
            if (typeof this.invalidHandler === 'function') {
                this.invalidHandler(...extraArgs, [name, ...command])
                return
            } else throw new SyntaxError('No default handler for invalid arguments')
        }
        const required = command.splice(0, this.#list[name].args.required.length)
        const optional = command.splice(0, this.#list[name].args.optional.length)
        const group = command
        const raw = { required, optional, group }
        const args = {}
        for (let i of this.#list[name].args.required)
            args[i] = raw.required.shift()
        for (let i of this.#list[name].args.optional)
            args[i] = raw.optional.shift()
        if (this.#list[name].args.group) args[this.#list[name].args.group] = raw.group
        this.#list[name].action(...extraArgs, args, options)
        this.successHandler(...extraArgs, [name, [args, options]])
    }
    getUsage(name) { return this.#list[name].str }
}