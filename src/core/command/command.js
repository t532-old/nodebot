export default class {
    /**
     * @constructor
     * @name Command
     * @param {object} prefixes - The commands' && options' prefix
     * @param {object} handlers - do this when no avalible commands || the arguments are missing
     */
    constructor({prefixes, handlers}) { 
        this.commandPrefix = new RegExp('^' + prefixes.command)
        this.optionsPrefix = new RegExp('^' + prefixes.options)
        this.defaultHandler = handlers.default
        this.invalidHandler = handlers.invalid
        this.list = {}
    }
    /**
     * bind a command
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
        const str = this.commandPrefix.toString().slice(2, -1) + name + ' ' + args
        args = args.split(' ')
        args = {
            required: args.filter(i => i.match(/^<.+>$/))
                          .map(i => i.split(/<|>/)[1]),
            optional: args.filter(i => i.match(/^\[[^\.]+\]$/))
                          .map(i => i.split(/\[|\]/)[1]),
            group: args.filter(i => i.match(/^\[.+\.{3,3}\]$/))[0] ? args.filter(i => i.match(/^\[.+\.{3,3}\]$/))[0].split(/\[|\.{3,3}\]/)[1] : null
        }
        this.list[name] = { args, options, action, str }
    }
    /**
     * Bind a group of commands.
     * @param {object} commands 
     */
    onAll(commands) {
        for (let i of Object.keys(commands)) 
            this.on(i, commands[i])
    }
    /**
     * do a command
     * @param {string} command 
     */
    do(command, ...extraArgs) {
        if (!this.commandPrefix.test(command)) return
        command = command.trim().split(this.commandPrefix)[1].split('"').map(i => i.trim()).reduce((target, value, index) => {
            if (index % 2 == 0) target.push(...value.split(/[\r\n\s]/))
            else target.push(value)
            return target
        }, [])
        const name = command.shift()
        if (!this.list[name]) {
            if (typeof this.defaultHandler === 'function') {
                this.defaultHandler(...extraArgs, [name, ...command])
                return
            } else throw new SyntaxError('No default handler for undefined command')
        }
        const options = command.filter(i => this.optionsPrefix.test(i)).map(i => i.split(this.optionsPrefix)[1]).filter(i => this.list[name].options.includes(i))
        command = command.filter(i => !this.optionsPrefix.test(i))
        if (this.list[name].args.required.length > command.length) {
            if (typeof this.invalidHandler === 'function') {
                this.invalidHandler(...extraArgs, [name, ...command])
                return
            } else throw new SyntaxError('No default handler for invalid arguments')
        }
        const required = command.splice(0, this.list[name].args.required.length)
        const optional = command.splice(0, this.list[name].args.optional.length)
        const group = command
        const raw = { required, optional, group }
        const args = {}
        for (let i of this.list[name].args.required)
            args[i] = raw.required.shift()
        for (let i of this.list[name].args.optional)
            args[i] = raw.optional.shift()
        if (this.list[name].args.group) args[this.list[name].args.group] = raw.group
        this.list[name].action(...extraArgs, args, options)
    }
}