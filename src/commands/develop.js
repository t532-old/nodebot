const fs = require('fs')
const config = eval('(' + fs.readFileSync('config.json', 'utf-8') + ')').develop
const permission = config.operators
module.exports = {
    ">seecode": {
        action(msg, path) {
            if (permission.indexOf(msg.param.user_id) > -1) {
                if (fs.existsSync(path)) {
                    const response = fs.readFileSync(path, 'utf-8')
                    msg.sender(response)
                } else msg.sender('develop: seecode: No such file or directory')
            } else msg.sender('develop: seecode: No permission')
        },
        separator: /[\s]/
    },
    ">editcode": {
        action(msg, path, ...codes) {
            if (permission.indexOf(msg.param.user_id) > -1) {
                if (fs.existsSync(path)) {
                    codes = unescape(codes.join('\n').replace(/&#(\d+);/g, (match, str) => '%' + parseInt(str).toString(16)))
                    fs.writeFileSync(path, codes, 'utf-8')
                    msg.sender('develop: editcode: edited successfully')
                } else msg.sender('develop: editcode: No such file or directory')
            } else msg.sender('develop: editcode: No permission')
        },
        separator: /[\r\n]/
    }
}