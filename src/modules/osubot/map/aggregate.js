import { getDimensions, getDifficulty, getMods } from './difficulty'
import { getPP, getFCPP } from './performance'
import { readFileSync } from 'fs'
export default function aggregatedMapInfo(mapPath, play) {
    const mapFile = readFileSync(mapPath, 'utf-8')
    const map = getDimensions(mapFile)
    const stars = getDifficulty(map)
    const mods = getMods(play.enabled_mods)
    const pp = getPP(stars, play)
    const fcpp = getFCPP(stars, play)
    return {
        pp: {
            total: pp.total,
            aim: pp.aim,
            acc: pp.acc,
            speed: pp.speed,
        },
        fcpp: fcpp.total,
        stars: stars.total.toString().slice(0, 4),
        ar: map.ar,
        cs: map.cs,
        od: map.od,
        hp: map.hp,
    }
}