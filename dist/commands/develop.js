'use strict';

var fs = require('fs');
var config = eval('(' + fs.readFileSync('config.json', 'utf-8') + ')').develop;
var permission = config.operators;
module.exports = {
    ">seecode": {
        action: function action(msg, path) {
            if (permission.indexOf(msg.param.user_id) > -1) {
                if (fs.existsSync(path)) {
                    var response = fs.readFileSync(path, 'utf-8');
                    msg.sender(response);
                } else msg.sender('develop: seecode: No such file or directory');
            } else msg.sender('develop: seecode: No permission');
        },

        separator: /[\s]/
    },
    ">editcode": {
        action: function action(msg, path) {
            for (var _len = arguments.length, codes = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                codes[_key - 2] = arguments[_key];
            }

            if (permission.indexOf(msg.param.user_id) > -1) {
                if (fs.existsSync(path)) {
                    codes = unescape(codes.join('\n').replace(/&#(\d+);/g, function (match, str) {
                        return '%' + parseInt(str).toString(16);
                    }));
                    fs.writeFileSync(path, codes, 'utf-8');
                    msg.sender('develop: editcode: edited successfully');
                } else msg.sender('develop: editcode: No such file or directory');
            } else msg.sender('develop: editcode: No permission');
        },

        separator: /[\r\n]/
    }
};