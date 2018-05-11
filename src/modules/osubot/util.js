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
     * Calculates a play's accuracy (f**k ppy).
     * @param {object} data The recent play data
     */
    accuracy(data) {
        const rec = this.copy(data)
        for (let i in rec) rec[i] = parseInt(rec[i])
        const result = (((rec.count50 * 50 + rec.count100 * 100 + rec.count300 * 300) / 
                 ((rec.countmiss + rec.count50 + rec.count100 + rec.count300) * 300)
        ) * 100).toString()
        return result.slice(0, 3 + result.split('.')[0].length)
    },
    /**
     * separate a string with comma
     * @param {string} score The string
     * @param {number} sep The interval
     */
    scorify(score, sep = 3) {
        let result = ''
        for (let i = score.length - 1; i >= 0; i--) {
            if ((score.length - i - 1) % sep === 0 && i !== score.length - 1) result = ',' + result
            result = score[i] + result
        }
        return result
    },
    /**
     * increase a string's length to a specific one
     * @param {string} num The string
     * @param {number} len The length
     */
    fillNumber(num, len = 4) {
        while (num.length < len) num = '0' + num
        return num
    },
    /**
     * Deep copy an object
     * @param {object} obj The object that's being copied
     */
    copy(obj) {
        let res = new obj.constructor()
        for (let i in obj) {
            if (obj[i] instanceof Object) res[i] = copy(obj[i])
            else res[i] = obj[i]
        }
        return res
    },
    /**
     * flatten an array (f**k tc39).
     * @param {array} arr Array to be flatten
     */
    flatten(arr) {
        const flat = []
        for (let i of arr) {
            if (i instanceof Array) flat.push(...this.flatten(i))
            else flat.push(i)
        }
        return flat
    }
}