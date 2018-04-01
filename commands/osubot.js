const axios = require('axios')
const fs = require('fs')
const config = eval('(' + fs.readFileSync('config.json') + ')').osubot
module.exports = {
    test: {
        action(sender, ...txt) { sender(txt.join(' ')) },
        separator: /[\r\n\s]/
    },
    stat: {
        action(sender, usr, mode = 'o') {
            switch(mode) {
                case 'o': mode = 0; break;
                case 't': mode = 1; break;
                case 'c': mode = 2; break;
                case 'm': mode = 3; break;
            }
            axios.get(`https://osu.ppy.sh/api/get_user?k=${config.key}&u=${usr}&m=${mode}`)
                 .then(res => sender(JSON.stringify(res.data[0])))
        },
        separator: /[\r\n\s]/
    }
}