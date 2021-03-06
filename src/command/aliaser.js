export default class Aliaser {
    /**
     * Aliases list
     * @property
     */
    #aliases = {}
    /**
     * An aliases processor
     * @constructor
     * @name Aliaser
     * @param {object} aliases The keys are the aliases and the values are the converted commands
     */
    constructor(aliases) { this.#aliases = aliases }
    /**
     * check if an alias can be converted to a valid command
     * if yes, return the converted command
     * otherwise it returns `from` param itself
     * @method
     * @param {string} from 
     * @returns {string}
     */
    alias(from) { return this.#aliases[from] || from }
}