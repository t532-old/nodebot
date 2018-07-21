/**
 * Calculates a play's accuracy (f**k ppy).
 * @name accuracy
 * @param {object} data The recent play data
 */
export function accuracy(data) {
    const rec = copy(data)
    for (let i in rec) rec[i] = parseInt(rec[i])
    const result = (((rec.count50 * 50 + rec.count100 * 100 + rec.count300 * 300) / 
             ((rec.countmiss + rec.count50 + rec.count100 + rec.count300) * 300)
    ) * 100).toString()
    return result.slice(0, 3 + result.split('.')[0].length)
}

/**
 * separate a string with comma
 * @name scorify
 * @param {string} score The string
 * @param {number} sep The interval
 */
export function scorify(score, sep = 3) {
    let result = ''
    for (let i = score.length - 1; i >= 0; i--) {
        if ((score.length - i - 1) % sep === 0 && i !== score.length - 1) result = ',' + result
        result = score[i] + result
    }
    return result
}

/**
 * increase a string's length to a specific one
 * @name fillNumber
 * @param {string} num The string
 * @param {number} len The length
 */
export function fillNumber(num, len = 4) {
    while (num.length < len) num = '0' + num
    return num
}

/**
 * increase a string's length to a specific one, but add 0s at the back of the number
 * @name fillNumberReversed
 * @param {string} num The string
 * @param {number} len The length
 */
export function fillNumberReversed(num, len = 4) {
    while (num.length < len) num = num + '0'
    return num
}

/**
 * Diffs the numbers in two objects
 * @name objDiff
 * @param {object} differ - The base comparing object
 * @param {object} diffee - The substractors
 */
export function objDiff(differ, diffee) {
    const result = copy(differ)
    for (let i of Object.keys(differ)) {
        if (typeof differ[i] === 'number' && typeof diffee[i] === 'number')
            result[i] = (differ[i] - diffee[i]).toString()
        else if (typeof parseFloat(differ[i]) === 'number' && typeof parseFloat(diffee[i]) === 'number')
            result[i] = (parseFloat(differ[i]) - parseFloat(diffee[i])).toString()
        else delete result[i]
    }
    return result
}

/**
 * Deep copy an object
 * @name copy
 * @param {object} obj The object that's being copied
 */
export function copy(obj) {
    let res = new obj.constructor()
    for (let i in obj) {
        if (obj[i] instanceof Object) res[i] = copy(obj[i])
        else res[i] = obj[i]
    }
    return res
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

export const cachepath = 'cache/osubot'
export const assetspath = 'assets/osubot'