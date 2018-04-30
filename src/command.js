a = {a:1}

class Command {
    /**
     * @constructor
     * @param {regexp} prefix - The commands' prefix
     * @param {function} handler - do this when no avalible commands 
     */
    constructor({prefix, handler}) { 
        this.prefix = prefix
        this.defaultHandler = handler
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
            group: args.filter(i => i.match(/^\[.+\.{3,3}\]$/))[0]
                       .split(/\[|\.{3,3}\]/)[1],
        }
        options = options.filter(i => i.match(/^\*.+$/)).map(i => i.slice(1))
        this.list[name] = { args, options, action }
    }
    /**
     * do a command
     * @param {string} command 
     */
    do(command, ...extraArgs) {
        if (!this.prefix.test(command.charAt(0))) return
        command = command.slice(1).split(/[\r\n\s]/).reduce((target, value) => {
            if (target[target.length - 1] &&
                target[target.length - 1].charAt(0) === '"' &&
                target[target.length - 1].charAt(target[target.length - 1].length - 1) !== '"')  
                target[target.length - 1] += value
            else target.push(value)
            return target
        }, [])
        const name = command.shift()
        if (!this.list[name]) this.defaultHandler(...extraArgs)
        const options = command.filter(i => i.charAt(0) === '*').map(i => i.slice(1)).filter(i => this.list[name].options.includes(i))
        command = command.filter(i => i.charAt(0) !== '*')
        const required = command.splice(0, this.list[name].args.required.length)
        const optional = command.splice(0, this.list[name].args.optional.length)
        const group = command
        const raw = { required, optional, group }
        const args = {}
        for (let i of this.list[name].args.required)
            args[i] = raw.required.shift()
        for (let i of this.list[name].args.optional)
            args[i] = raw.optional.shift()
        args[this.list[name].args.group] = raw.group
        this.list[name].action(...extraArgs, args, options)
    }
}

export default Command