class Command {
    /**
     * @constructor
     * @param {regexp} prefix - The commands' prefix
     * @param {function} handlers - do this when no avalible commands 
     */
    constructor({prefix, handlers}) { 
        this.prefix = prefix
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
        args = args.split(' ')
        args = {
            required: args.filter(i => i.match(/^<.+>$/))
                          .map(i => i.split(/<|>/)[1]),
            optional: args.filter(i => i.match(/^\[[^\.]+\]$/))
                          .map(i => i.split(/\[|\]/)[1]),
            group: args.filter(i => i.match(/^\[.+\.{3,3}\]$/))[0] ? args.filter(i => i.match(/^\[.+\.{3,3}\]$/))[0].split(/\[|\.{3,3}\]/)[1] : null
        }
        this.list[name] = { args, options, action }
    }
    /**
     * do a command
     * @param {string} command 
     */
    do(command, ...extraArgs) {
        if (!this.prefix.test(command.charAt(0))) return
        command = command.trim().slice(1).split('"').map(i => i.trim()).reduce((target, value, index) => {
            if (index % 2 == 0) target.push(...value.split(/[\r\n\s]/))
            else target.push(value)
            return target
        }, [])
        const name = command.shift()
        if (!this.list[name]) {
            if (typeof this.defaultHandler === 'function')
                this.defaultHandler(...extraArgs)
            else throw new SyntaxError('No default handler for undefined command')
        }
        const options = command.filter(i => i.charAt(0) === '*').map(i => i.slice(1)).filter(i => this.list[name].options.includes(i))
        command = command.filter(i => i.charAt(0) !== '*')
        if (this.list[name].args.required.length > command.length) {
            if (typeof this.invalidHandler === 'function')
                this.invalidHandler(...extraArgs)
            else throw new SyntaxError('No default handler for invalid arguments')
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

export default Command