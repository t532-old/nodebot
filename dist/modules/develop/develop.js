'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _yaml = require('yaml');

var _yaml2 = _interopRequireDefault(_yaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _yaml2.default.eval(fs.readFileSync('config.yml')).develop;
exports.default = {
    test: {
        action: function action(msg) {
            for (var _len = arguments.length, txt = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                txt[_key - 1] = arguments[_key];
            }

            msg.sender(txt.join(' '));
        },

        separator: /[\r\n\s]/
    },
    about: {
        action: function action(msg) {
            msg.sender('Nodebot v' + config.version.split(' ')[0] + ' "' + config.version.split(' ')[1] + '"\npowered by Node.js & cqhttp.\n' + new Date().getFullYear() + ' trustgit | under MIT License');
        },

        separator: /[\r\n\s]/
    }
};