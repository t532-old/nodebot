/* Useful APIs 
Avatar: https://a.ppy.sh/${id}
Map Thumbnail: https://b.ppy.sh/thumb/${id}l.jpg
Map BG(Part): https://assets.ppy.sh/beatmaps/${id}/covers/cover.jpg
*/
import gm from 'gm'
import fs from 'fs'
import axios from 'axios'

function gmP(gmO) {
    return new Promise(function(resolve, reject) {
        gmO.write(gmO.source, err => {
            if (err) reject(err)
            else resolve()
        })
    })
}

async function drawRecent(rec, map, stat) {
    const id = stat.user_id
    const avatar = await axios({
        method: 'get',
        url: 'https://a.ppy.sh/' + id,
        responseType: 'stream'
    })
    avatar.data.pipe(fs.createWriteStream('../bot-data/' + id + 'a.jpg'))
    /*gmP(
        gm('../bot-data/' + id + '.jpg')
            .resize(1800, 500)
    ).then(() =>
        gmP(
            gm('test/test.jpg')
                .gravity('Center')
                .crop(1500, 500)
                .blur(50, 50)
                .fill('#888b')
                .drawCircle(750, 250, 750, 620)
                .tile('test/test.jpg')
                .drawCircle(750, 250, 750, 610)
        )
    ).then(() =>
        gmP(
            gm('test/test.jpg')
                .gravity('Center')
                .fill('#fffa')
                .drawCircle(750, 250, 750, 610)
                .fill('#fff')
                .drawCircle(750, 250, 750, 490)
                .fill('#ccc')
                .drawCircle(750, 250, 750, 470)
                .fill('#fff')
                .drawCircle(750, 250, 750, 460)
                .fill('#aaa')
                .drawEllipse(750, 250, 210, 210, -145, -35)
                .fill('#fff')
                .font('test/resource/fonts/Exo2.0-Regular.otf')
                .fontSize(30)
                .drawText(0, -145, 'Playererererererer')
                .font('test/resource/fonts/Exo2.0-Bold.otf')
                .fontSize(12)
                .fill('#f69')
                .drawText(0, 0, 'total score')
                .font('test/resource/fonts/Exo2.0-BoldItalic.otf')
                .fontSize(25)
                .fill('#3ad')
                .drawText(0, 35, 'Song Title')
                .fontSize(17)
                .drawText(0, 60, 'Artist')
                .font('test/resource/fonts/Exo2.0-Bold.otf')
                .fontSize(30)
                .drawText(-300, 0, '123x')
                .drawText(300, 0, '98.76%')
                .fontSize(12)
                .fill('#333')
                .drawText(-290, 20, 'max combo')
                .drawText(290, 20, 'accuracy')
                .font('test/resource/fonts/Venera-500.otf')
                .fontSize(50)
                .fill('#f69')
                .drawText(0, -25, '1,234,567')
                .font('test/resource/fonts/Exo2.0-Bold.otf')
                .fontSize(13)
                .fill('#999')
                .drawText(0, 85, 'Diff - mapped by Author')
                .drawRectangle(675, 345, 825, 365)
                .font('test/resource/fonts/Exo2.0-Regular.otf')
                .fill('#fff')
                .drawText(0, 105, 'YYYY/M/D H:MM')
                .fontSize(25)
                .fill('#aaa')
                .drawLine(650, 375, 850, 375)
                .fill('#666')
                .drawText(-100, 140, '0123')
                .drawText(-33, 140, '0045')
                .drawText(33, 140, '0006')
                .drawText(100, 140, '0007')
                .fontSize(12)
                .drawText(-100, 160, 'Great')
                .drawText(-33, 160, 'Good')
                .drawText(33, 160, 'Meh')
                .drawText(100, 160, 'Miss')
                .crop(1000, 500)
        )
    ).then(() => gmP(
            gm('test/test.jpg')
                .composite('test/resource/rankings/A.png')
                .gravity('North')
                .geometry('+0+90')
        )
    )*/
    
    
}

export default { drawRecent }