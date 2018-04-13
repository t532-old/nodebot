'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _monk = require('monk');

var _monk2 = _interopRequireDefault(_monk);

var _osubotApi = require('./osubot-api');

var _osubotApi2 = _interopRequireDefault(_osubotApi);

var _osubotCanvas = require('./osubot-canvas');

var _osubotCanvas2 = _interopRequireDefault(_osubotCanvas);

var _osubotUtil = require('./osubot-util');

var _osubotUtil2 = _interopRequireDefault(_osubotUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = (0, _monk2.default)('localhost:27017/botdb');
var users = db.get('users');

var config = eval('(' + _fs2.default.readFileSync('config.json') + ')').osubot;

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
    bind: {
        action: function action(msg) {
            for (var _len2 = arguments.length, account = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                account[_key2 - 1] = arguments[_key2];
            }

            users.insert({ qqid: msg.param.user_id, osuid: account.join(' ') });
            msg.sender('osubot: bind: bound successfully');
        },

        separator: /[\r\n\s]/
    },
    stat: {
        action: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(msg) {
                var usr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'me';
                var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'o';
                var data, doc;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                mode = _osubotUtil2.default.checkmode(mode);
                                data = [];

                                if (_osubotUtil2.default.flatten(_osubotUtil2.default.modes).includes(usr.toLowerCase())) {
                                    mode = _osubotUtil2.default.checkmode(usr);
                                    usr = 'me';
                                }

                                if (!(usr === 'me')) {
                                    _context.next = 14;
                                    break;
                                }

                                _context.prev = 4;
                                _context.next = 7;
                                return users.findOne({ qqid: msg.param.user_id });

                            case 7:
                                doc = _context.sent;

                                usr = doc.osuid;
                                _context.next = 14;
                                break;

                            case 11:
                                _context.prev = 11;
                                _context.t0 = _context['catch'](4);

                                msg.sender('osubot: recent: user does not exist');

                            case 14:
                                _context.prev = 14;
                                _context.t1 = msg;
                                _context.next = 18;
                                return new _osubotApi2.default.StatQuery({
                                    u: usr,
                                    m: mode,
                                    k: config.key
                                }).exec();

                            case 18:
                                _context.t2 = _context.sent;

                                _context.t1.sender.call(_context.t1, _context.t2);

                                _context.next = 25;
                                break;

                            case 22:
                                _context.prev = 22;
                                _context.t3 = _context['catch'](14);

                                msg.sender(_context.t3.toString());

                            case 25:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[4, 11], [14, 22]]);
            }));

            function action(_x3) {
                return _ref.apply(this, arguments);
            }

            return action;
        }(),

        separator: /[\r\n\s]/
    },
    recent: {
        action: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(msg) {
                var usr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'me';
                var data, doc, rec, map, stat, path;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                data = [];

                                if (!(usr === 'me')) {
                                    _context2.next = 13;
                                    break;
                                }

                                _context2.prev = 2;
                                _context2.next = 5;
                                return users.findOne({ qqid: msg.param.user_id });

                            case 5:
                                doc = _context2.sent;

                                usr = doc.osuid;
                                _context2.next = 13;
                                break;

                            case 9:
                                _context2.prev = 9;
                                _context2.t0 = _context2['catch'](2);

                                msg.sender('osubot: recent: user does not exist');
                                return _context2.abrupt('return');

                            case 13:
                                _context2.prev = 13;
                                _context2.next = 16;
                                return new _osubotApi2.default.RecentQuery({
                                    u: usr,
                                    limit: '1',
                                    k: config.key
                                }).exec();

                            case 16:
                                rec = _context2.sent;
                                _context2.next = 19;
                                return new _osubotApi2.default.MapQuery({
                                    b: rec.beatmap_id,
                                    k: config.key
                                }).exec();

                            case 19:
                                map = _context2.sent;
                                _context2.next = 22;
                                return new _osubotApi2.default.StatQuery({
                                    u: usr,
                                    k: config.key
                                }).exec();

                            case 22:
                                stat = _context2.sent;
                                _context2.next = 25;
                                return _osubotCanvas2.default.drawRecent(rec, map, stat);

                            case 25:
                                path = _context2.sent;

                                msg.sender([{
                                    type: "image",
                                    data: {
                                        file: "../"
                                    }
                                }]);
                                _context2.next = 34;
                                break;

                            case 29:
                                _context2.prev = 29;
                                _context2.t1 = _context2['catch'](13);
                                _context2.next = 33;
                                return _osubotCanvas2.default.drawErrRecent();

                            case 33:
                                return _context2.abrupt('return');

                            case 34:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[2, 9], [13, 29]]);
            }));

            function action(_x5) {
                return _ref2.apply(this, arguments);
            }

            return action;
        }(),

        separator: /[\r\n\s]/
    },
    roll: {
        action: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(msg) {
                var range = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '100';
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (typeof range === 'string' && !parseInt(range)) {
                                    range = range.split(',');
                                    msg.sender(range[Math.floor(Math.random() * range.length)]);
                                } else msg.sender(Math.round(Math.random() * range).toString());

                            case 1:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function action(_x7) {
                return _ref3.apply(this, arguments);
            }

            return action;
        }(),

        separator: /[\r\n\s]/
    }
};