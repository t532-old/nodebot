const gm = require('gm')
const { copyFileSync } = require('fs')
function promisifyGM(gmO) {
    return new Promise(function(resolve, reject) {
        gmO.write(gmO.source, err => {
            if (err) reject(err)
            else resolve()
        })
    })
}
const cachepath = 'cache/helper'
export default async function drawHelp(help) {
    const dest = `${cachepath}/${help.name}.jpg`
    copyFileSync(`assets/helper/image/template.jpg`, dest)
    await promisifyGM(
        gm(dest)
        .quality(100)
        .font('assets/helper/fonts/Microsoft-YaHei.ttc')
        .fill('#fff')
        .drawText(100, 100, 'Test')
    )
}