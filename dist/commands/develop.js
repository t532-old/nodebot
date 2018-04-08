'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = eval('(' + _fs2.default.readFileSync('config.json', 'utf-8') + ')').develop;
var permission = config.operators;

exports.default = {
    ">seecode": {
        action: function action(msg, path) {
            if (permission.indexOf(msg.param.user_id) > -1) {
                if (_fs2.default.existsSync(path)) {
                    var response = _fs2.default.readFileSync(path, 'utf-8');
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
                if (_fs2.default.existsSync(path)) {
                    codes = unescape(codes.join('\n').replace(/&#(\d+);/g, function (match, str) {
                        return '%' + parseInt(str).toString(16);
                    }));
                    _fs2.default.writeFileSync(path, codes, 'utf-8');
                    msg.sender('develop: editcode: edited successfully');
                } else msg.sender('develop: editcode: No such file or directory');
            } else msg.sender('develop: editcode: No permission');
        },

        separator: /[\r\n]/
    }
};