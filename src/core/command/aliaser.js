export default class {
    /**
     * An aliases processor
     * @constructor
     * @name Aliaser
     * @param {object} aliases 
     */
    constructor(aliases) { this.aliases = aliases }
    alias(from) { return this.aliases[from] || from }
}