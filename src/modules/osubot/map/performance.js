import { ppv2 } from 'ojsama'

export function getPP(diff, play) {
    return ppv2({
        combo: parseInt(play.maxcombo),
        nmiss: parseInt(play.countmiss),
        acc_percent: parseFloat(util.accuracy(play)),
        stars: diff
    })
}

export function getFCPP(diff, play) {
    return ppv2({
        acc_percent: parseFloat(util.accuracy(play)),
        stars: diff
    })
}