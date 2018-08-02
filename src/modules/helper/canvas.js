import { subClass } from 'gm'
import { copyFileSync } from 'fs'
const gm = subClass({ imageMagick: true })
function promisifyGM(gmO) {
    return new Promise(function(resolve, reject) {
        gmO.write(gmO.source, err => {
            if (err) reject(err)
            else resolve()
        })
    })
}
const cachepath = 'cache/helper'
export async function drawHelp(name, help) {
    const dest = `${cachepath}/${name}.jpg`
    const description = []
    copyFileSync(`assets/helper/image/template.jpg`, dest)
    help.description = help.description.split('\n').map(i => i.split(''))
    for (let i of help.description)
        while (i.length) description.push(i.splice(0, 20).join(''))
    await promisifyGM(
        gm(dest)
        .quality(100)
        .font('assets/helper/fonts/Microsoft-YaHei.ttc')
        .fill('#777')
        .fontSize(50)
        .drawText(0, 50, help.name)
        .fill('#aaa')
        .fontSize(30)
        .drawText(20, 70, '用途')
        .drawText(20, 320, '示例')
        .drawText(370, 40, '参数')
        .drawText(370, 220, '选项')
        .fill('#fff')
        .fontSize(15)
        .drawText(20, 110, description.join('\n'))
        .drawText(20, 350, help.example.map(i => `    ›  ${i}`).join('\n').slice(4))
        .drawText(370, 70, help.parameters.map(i => `›  ${i}`).join('\n'))
        .drawText(370, 250, help.options.map(i => `›  ${i}`).join('\n'))
        .fontSize(15)
        .fill('#aaa')
        .gravity('SouthEast')
        .drawText(20, 20, `来自模块 ${help.module}`)
    )
}
export async function drawHelpList(list) {
    const dest = `${cachepath}/_main.jpg`
    copyFileSync(`assets/helper/image/template.jpg`, dest)
    await promisifyGM(
        gm(dest)
        .quality(100)
        .font('assets/helper/fonts/Microsoft-YaHei.ttc')
        .fill('#777')
        .fontSize(50)
        .drawText(0, 50, '帮助中心')
        .fill('#aaa')
        .fontSize(30)
        .drawText(20, 70, '可用的帮助列表：')
        .fill('#fff')
        .fontSize(20)
        .drawText(20, 110, list.slice(0, 10).map(i => `· ${i}`).join('\n'))
        .drawText(220, 110, list.slice(10, 20).map(i => `· ${i}`).join('\n'))
        .drawText(420, 110, list.slice(20, 30).map(i => `· ${i}`).join('\n'))
        .drawText(620, 110, list.slice(30, 40).map(i => `· ${i}`).join('\n'))
        .fontSize(20)
        .fill('#aaa')
        .gravity('SouthEast')
        .drawText(20, 20, '使用 -help <命令名称> 来查询帮助。')
    )
}