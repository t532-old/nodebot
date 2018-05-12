'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Message = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _modules = require('./modules');

var _modules2 = _interopRequireDefault(_modules);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _command = require('./command');

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = new _command2.default({
    prefix: /-/,
    handlers: {
        default: function _default(msg) {
            msg.send('Command not found!');
        },
        invalid: function invalid(msg) {
            msg.send('Invalid argument(s)!');
        }
    }
});

/**
 * A class that is uses to send message asynchronously.
 * @class
 * @property {function} send A cqhttp sender binds to a specific target
 * @property {object} param The message object that cqhttp gives
 */

var Message = function () {
    /**
     * builds a message object
     * @param {object} param 
     */
    function Message(param) {
        (0, _classCallCheck3.default)(this, Message);

        this.send = function (message) {
            return Message[param.message_type](param.group_id || param.user_id, message);
        };
        this.param = param;
    }
    /**
     * Sends a private message
     * @param {string} user_id The target user's qq id.
     * @param {string|array} message The message
     */


    (0, _createClass3.default)(Message, null, [{
        key: 'private',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user_id, message) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                return _context.abrupt('return', _axios2.default.post('http://localhost:5700/send_private_msg', { user_id: user_id, message: message }));

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function _private(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return _private;
        }()
        /**
         * Sends a group message
         * @param {string} group_id The target qq group id.
         * @param {string|array} message The message
         */

    }, {
        key: 'group',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(group_id, message) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                return _context2.abrupt('return', _axios2.default.post('http://localhost:5700/send_group_msg', { group_id: group_id, message: message }));

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function group(_x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return group;
        }()
    }]);
    return Message;
}();

function listen() {
    for (var i in _modules2.default) {
        handler.on(i, _modules2.default[i]);
    }
}

function handle(param) {
    var comm = unescape(param.message.replace(/&#(\d+);/g, function (match, str) {
        return '%' + parseInt(str).toString(16);
    })).trim();
    handler.do(comm, new Message(param));
}

exports.Message = Message;
exports.default = { listen: listen, handle: handle };