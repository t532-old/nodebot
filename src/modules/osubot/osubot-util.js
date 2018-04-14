export default {
    modes: [['o', 's', '0', 'osu', 'std', 'osu!', 'standard'],
            ['t', '1', 'tk', 'taiko'],
            ['c', '2', 'ctb', 'catch', 'catchthebeat'],
            ['m', '3', 'mania']],
    checkmode(mode) {
        mode = mode.toLowerCase()
        for (let i in this.modes)
            if (this.modes[i].includes(mode)) return i
        return 0
    },
    accuracy(data) {
        const rec = this.copy(data)
        for (let i in rec) rec[i] = parseInt(rec[i])
        const result = (((rec.count50 * 50 + rec.count100 * 100 + rec.count300 * 300) / 
                 ((rec.countmiss + rec.count50 + rec.count100 + rec.count300) * 300)
        ) * 100).toString()
        return result.slice(0, 3 + result.split('.')[0].length)
    },
    scorify(score, sep = 3) {
        let result = ''
        for (let i = score.length - 1; i >= 0; i--) {
            if ((score.length - i - 1) % sep === 0 && i !== score.length - 1) result = ',' + result
            result = score[i] + result
        }
        return result
    },
    fillNumber(num, len = 4) {
        while (num.length < len) num = '0' + num
        return num
    },
    copy(obj) {
        let res = new obj.constructor()
        for (let i in obj) {
            if (obj[i] instanceof Object) res[i] = copy(obj[i], obj[i].constructor)
            else res[i] = obj[i]
        }
        return res
    }
}