'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _monk = require('monk');

var _monk2 = _interopRequireDefault(_monk);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = (0, _monk2.default)('localhost:27017/botdb');
var users = db.get('users');

var config = _jsYaml2.default.safeLoad(_fs2.default.readFileSync('config.yml')).osubot;

exports.default = {
    bind: {
        action: function action(msg) {
            for (var _len = arguments.length, account = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                account[_key - 1] = arguments[_key];
            }

            users.insert({ qqid: msg.param.user_id, osuid: account.join(' ') });
            msg.sender('osubot: bind: bound successfully');
        },

        separator: /[\r\n\s]/
    },
    stat: {
        action: function action(msg) {
            var _this = this;

            var usr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'me';
            var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'o';
            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var data, doc;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                mode = _util2.default.checkmode(mode);
                                data = [];

                                if (_util2.default.flatten(_util2.default.modes).includes(usr.toLowerCase())) {
                                    mode = _util2.default.checkmode(usr);
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
                                _context.t2 = _stringify2.default;
                                _context.next = 19;
                                return new _api2.default.StatQuery({
                                    u: usr,
                                    m: mode,
                                    k: config.key
                                }).exec();

                            case 19:
                                _context.t3 = _context.sent;
                                _context.t4 = (0, _context.t2)(_context.t3);

                                _context.t1.sender.call(_context.t1, _context.t4);

                                _context.next = 27;
                                break;

                            case 24:
                                _context.prev = 24;
                                _context.t5 = _context['catch'](14);

                                msg.sender(_context.t5.toString());

                            case 27:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[4, 11], [14, 24]]);
            }))();
        },

        separator: /[\r\n\s]/
    },
    recent: {
        action: function action(msg) {
            var _this2 = this;

            var usr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'me';
            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
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
                                return new _api2.default.RecentQuery({
                                    u: usr,
                                    limit: '1',
                                    k: config.key
                                }).exec();

                            case 16:
                                rec = _context2.sent;
                                _context2.next = 19;
                                return new _api2.default.MapQuery({
                                    b: rec.beatmap_id,
                                    k: config.key
                                }).exec();

                            case 19:
                                map = _context2.sent;
                                _context2.next = 22;
                                return new _api2.default.StatQuery({
                                    u: usr,
                                    k: config.key
                                }).exec();

                            case 22:
                                stat = _context2.sent;
                                _context2.next = 25;
                                return _canvas2.default.drawRecent(rec, map, stat);

                            case 25:
                                path = _context2.sent;

                                console.log(path);
                                msg.sender([{
                                    type: 'image',
                                    data: {
                                        file: path
                                    }
                                }]);
                                _context2.next = 34;
                                break;

                            case 30:
                                _context2.prev = 30;
                                _context2.t1 = _context2['catch'](13);

                                msg.sender(_context2.t1.toString());
                                return _context2.abrupt('return');

                            case 34:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this2, [[2, 9], [13, 30]]);
            }))();
        },

        separator: /[\r\n\s]/
    },
    roll: {
        action: function action(msg) {
            var _this3 = this;

            var range = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '100';
            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
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
                }, _callee3, _this3);
            }))();
        },

        separator: /[\r\n\s]/
    }
};