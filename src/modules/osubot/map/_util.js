export default {
    copy(obj) {
        let res = new obj.constructor()
        for (let i in obj) {
            if (obj[i] instanceof Object) res[i] = this.copy(obj[i])
            else res[i] = obj[i]
        }
        return res
    },
    accuracy(data) {
        const rec = this.copy(data)
        for (let i in rec) rec[i] = parseInt(rec[i])
        const result = (((rec.count50 * 50 + rec.count100 * 100 + rec.count300 * 300) / 
                 ((rec.countmiss + rec.count50 + rec.count100 + rec.count300) * 300)
        ) * 100).toString()
        return result.slice(0, 3 + result.split('.')[0].length)
    },
}