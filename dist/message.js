'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _exports = require('./modules/exports.js');

var _exports2 = _interopRequireDefault(_exports);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    send: {
        private: function _private(user_id, message) {
            return _axios2.default.post('http://localhost:5700/send_private_msg', { user_id: user_id, message: message });
        },
        group: function group(group_id, message) {
            return _axios2.default.post('http://localhost:5700/send_group_msg', { group_id: group_id, message: message });
        }
    },
    handle: function handle(param) {
        // Check if this is command format
        if (!param.message.match(/^[>》][^]+$/m)) return;
        // Declare shorthands for message type and target user
        var type = param.message_type;
        var target = param.group_id || param.user_id;
        // The response
        var response = '';
        // This splits the command into parts
        var raw = unescape(param.message.replace(/&#(\d+);/g, function (match, str) {
            return '%' + parseInt(str).toString(16);
        })).trim().slice(1).split(/[\r\n\s]/).filter(function (i) {
            return i;
        });
        // Main & sub Command
        var main = raw[0].toLowerCase();
        var sub = raw.slice(1);
        // The sender
        var sender = this.send[type].bind(this, target);
        // Is this an existing Command?
        if ((0, _typeof3.default)(_exports2.default[main]) === 'object') {
            var _botModules$main;

            (_botModules$main = _exports2.default[main]).action.apply(_botModules$main, [{ sender: sender, param: param }].concat((0, _toConsumableArray3.default)(sub)));
        } else sender('Unknown Command!');
    }
};