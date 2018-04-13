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
    accuracy(rec) {
        for (let i in rec) rec[i] = parseInt(rec[i])
        return 
            parseFloat(
                ((rec.count50 * 50 + rec.count100 * 100 + rec.count300 * 300) / 
                 ((rec.countmiss + rec.count50 + rec.count100 + rec.count300) * 300))
            .toString().slice(0, 6)) * 100
    },
    scorify(score, sep = 3) {
        let result = ''
        for (let i = score.length - 1; i >= 0; i--) {
            if ((score.length - i - 1) % sep == 0) result = ',' + result
            result = score[i] + result
        }
        return result
    },
    fillNumber(num, len = 4) {
        while (num.length < len) num = '0' + num
        return num
    },
    flatten(arr) {
        const flat = []
        for (let i of arr) {
            if (i instanceof Array) flat.push(...flatten(i))
            else flat.push(i)
        }
        return flat
    },
}