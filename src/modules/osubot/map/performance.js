import { ppv2 } from 'ojsama'
import { accuracy } from './_util'

export function getPP(diff, play) {
    return ppv2({
        combo: parseInt(play.maxcombo),
        nmiss: parseInt(play.countmiss),
        acc_percent: parseFloat(accuracy(play)),
        stars: diff
    })
}

export function getFCPP(diff, play) {
    return ppv2({
        acc_percent: parseFloat(accuracy(play)),
        stars: diff
    })
}