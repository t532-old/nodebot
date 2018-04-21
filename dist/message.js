'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _exports = require('./modules/exports');

var _exports2 = _interopRequireDefault(_exports);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    send: {
        private: function _private(user_id, message) {
            var _this = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _axios2.default.post('http://localhost:5700/send_private_msg', { user_id: user_id, message: message });

                            case 2:
                                return _context.abrupt('return', _context.sent);

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }))();
        },
        group: function group(group_id, message) {
            var _this2 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return _axios2.default.post('http://localhost:5700/send_group_msg', { group_id: group_id, message: message });

                            case 2:
                                return _context2.abrupt('return', _context2.sent);

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this2);
            }))();
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