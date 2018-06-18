export default class Aliaser {
    /**
     * An aliases processor
     * @constructor
     * @name Aliaser
     * @param {object} aliases The keys are the aliases and the values are the converted commands
     */
    constructor(aliases) { this.aliases = aliases }
    /**
     * check if an alias can be converted to a valid command
     * if yes, return the converted command
     * otherwise it returns `from` param itself
     * @param {string} from 
     */
    alias(from) { return this.aliases[from] || from }
}