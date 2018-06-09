export default {
    modes: [['o', 's', '0', 'osu', 'std', 'osu!', 'standard'],
            ['t', '1', 'tk', 'taiko'],
            ['c', '2', 'ctb', 'catch', 'catchthebeat'],
            ['m', '3', 'mania']],
    /**
     * Convert a mode string to mode id.
     * @param {string} mode The mode string that's going to be converted
     */
    checkmode(mode) {
        mode = mode.toLowerCase()
        for (let i in this.modes)
            if (this.modes[i].includes(mode)) return i
        return 0
    },
    /**
     * Deep copy an object
     * @param {object} obj The object that's being copied
     */
    copy(obj) {
        let res = new obj.constructor()
        for (let i in obj) {
            if (obj[i] instanceof Object) res[i] = this.copy(obj[i])
            else res[i] = obj[i]
        }
        return res
    },
    /**
     * flatten an array (f**k tc39).
     * @param {array} arr Array to be flatten
     */
    flatten(arr) {
        let flat = []
        for (let i of arr) {
            if (i instanceof Array) flat = [...flat, ...this.flatten(i)]
            else flat.push(i)
        }
        return flat
    },
}