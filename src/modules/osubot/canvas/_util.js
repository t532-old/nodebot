export default {
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
     * increase a string's length to a specific one, but add 0s at the back of the number
     * @param {string} num The string
     * @param {number} len The length
     */
    fillNumberReversed(num, len = 4) {
        while (num.length < len) num = num + '0'
        return num
    },
    /**
     * Diffs the numbers in two objects
     * @param {object} differ - The base comparing object
     * @param {object} diffee - The substractors
     */
    objDiff(differ, diffee) {
        const result = this.copy(differ)
        for (let i of Object.keys(differ)) {
            if (typeof differ[i] === 'number' && typeof diffee[i] === 'number')
                result[i] = (differ[i] - diffee[i]).toString()
            else if (typeof parseFloat(differ[i]) === 'number' && typeof parseFloat(diffee[i]) === 'number')
                result[i] = (parseFloat(differ[i]) - parseFloat(diffee[i])).toString()
            else delete result[i]
        }
        return result
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
}

/**
 * return a promise that waits for the saving of the gm object
 * @param {GMStat} gmO The gm object
 */
export function promisifyGM(gmO) {
    return new Promise(function(resolve, reject) {
        gmO.write(gmO.source, err => {
            if (err) reject(err)
            else resolve()
        })
    })
}

/**
 * promisify a callback function
 * @param {function} fn 
 * @param {array} args 
 */
export function promisify(fn, ...args) {
    return new Promise((resolve, reject) => {
        fn(...args, (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}