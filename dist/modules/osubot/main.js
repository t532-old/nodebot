'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _message = require('../../message');

var _web = require('./web');

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _monk = require('monk');

var _monk2 = _interopRequireDefault(_monk);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize settings and database connection
var db = (0, _monk2.default)('localhost:27017/botdb');
// Imports from modules
// Imports from local file

var users = db.get('users');
var config = _jsYaml2.default.safeLoad(_fs2.default.readFileSync('config.yml')).osubot;

var bind = {
    args: '<account>',
    options: [],
    /**
     * @description binds an osu! id with a QQ id.
     * @param {Message} msg The universal msg object
     * @param {string} account The account, use an array because username may include spaces
     */
    action: function action(msg, _ref) {
        var _this = this;

        var account = _ref.account;
        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            users.insert({ qqid: msg.param.user_id, osuid: account.join(' ') });
                            msg.send('osubot: bind: bound successfully');

                        case 2:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    }
};

var stat = {
    args: '<usr> [mode]',
    options: [],
    /**
     * @description Fetch a user's status
     * @param {Message} msg The universal msg object
     * @param {string} usr username that will be queried
     * @param {string} mode the mode that will be queried
     */
    action: function action(msg, _ref2) {
        var _this2 = this;

        var _ref2$usr = _ref2.usr,
            usr = _ref2$usr === undefined ? 'me' : _ref2$usr,
            _ref2$mode = _ref2.mode,
            mode = _ref2$mode === undefined ? 'o' : _ref2$mode;
        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var data, doc;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            console.log(_web.api);
                            mode = _util2.default.checkmode(mode);
                            data = [];

                            if (_util2.default.flatten(_util2.default.modes).includes(usr.toLowerCase())) {
                                mode = _util2.default.checkmode(usr);
                                usr = 'me';
                            }

                            if (!(usr === 'me')) {
                                _context2.next = 15;
                                break;
                            }

                            _context2.prev = 5;
                            _context2.next = 8;
                            return users.findOne({ qqid: msg.param.user_id });

                        case 8:
                            doc = _context2.sent;

                            usr = doc.osuid;
                            _context2.next = 15;
                            break;

                        case 12:
                            _context2.prev = 12;
                            _context2.t0 = _context2['catch'](5);

                            msg.send('osubot: recent: user does not exist');

                        case 15:
                            _context2.prev = 15;
                            _context2.t1 = msg;
                            _context2.t2 = _stringify2.default;
                            _context2.next = 20;
                            return _web.api.statQuery({
                                u: usr,
                                m: mode,
                                k: config.key
                            });

                        case 20:
                            _context2.t3 = _context2.sent;
                            _context2.t4 = (0, _context2.t2)(_context2.t3);

                            _context2.t1.send.call(_context2.t1, _context2.t4);

                            _context2.next = 28;
                            break;

                        case 25:
                            _context2.prev = 25;
                            _context2.t5 = _context2['catch'](15);

                            msg.send(_context2.t5.toString());

                        case 28:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[5, 12], [15, 25]]);
        }))();
    }
};

var recent = {
    args: '<usr>',
    options: [],
    /**
     * @description Get a user's most recent play
     * @param {Message} msg The universal msg object
     * @param {string} usr The username that'll be queried
     */
    action: function action(msg, _ref3) {
        var _this3 = this;

        var _ref3$usr = _ref3.usr,
            usr = _ref3$usr === undefined ? 'me' : _ref3$usr;
        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            var data, doc, rec, map, _stat, path;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            data = [];

                            if (!(usr === 'me')) {
                                _context3.next = 13;
                                break;
                            }

                            _context3.prev = 2;
                            _context3.next = 5;
                            return users.findOne({ qqid: msg.param.user_id });

                        case 5:
                            doc = _context3.sent;

                            usr = doc.osuid;
                            _context3.next = 13;
                            break;

                        case 9:
                            _context3.prev = 9;
                            _context3.t0 = _context3['catch'](2);

                            msg.send('osubot: recent: user does not exist');
                            return _context3.abrupt('return');

                        case 13:
                            _context3.prev = 13;
                            _context3.next = 16;
                            return _web.api.recentQuery({
                                u: usr,
                                limit: '1',
                                k: config.key
                            });

                        case 16:
                            rec = _context3.sent;
                            _context3.next = 19;
                            return _web.api.mapQuery({
                                b: rec.beatmap_id,
                                k: config.key
                            });

                        case 19:
                            map = _context3.sent;
                            _context3.next = 22;
                            return _web.api.statQuery({
                                u: usr,
                                k: config.key
                            });

                        case 22:
                            _stat = _context3.sent;
                            _context3.next = 25;
                            return _canvas2.default.drawRecent(rec, map, _stat);

                        case 25:
                            path = _context3.sent;

                            msg.send([{
                                type: 'image',
                                data: {
                                    file: path
                                }
                            }]);
                            _context3.next = 33;
                            break;

                        case 29:
                            _context3.prev = 29;
                            _context3.t1 = _context3['catch'](13);
                            throw _context3.t1;

                        case 33:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3, [[2, 9], [13, 29]]);
        }))();
    }
};

var roll = {
    args: '[range]',
    options: [],
    /**
     * @description Gives a random result in a specific range (default 100)
     * @param {Message} msg The universal msg object
     * @param {string} range The rolling range
     */
    action: function action(msg, _ref4) {
        var _this4 = this;

        var _ref4$range = _ref4.range,
            range = _ref4$range === undefined ? '100' : _ref4$range;
        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            if (typeof range === 'string' && !parseInt(range)) {
                                range = range.split(',');
                                msg.send(range[Math.floor(Math.random() * range.length)]);
                            } else msg.send(Math.round(Math.random() * range).toString());

                        case 1:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4);
        }))();
    }
};

exports.default = { bind: bind, stat: stat, recent: recent, roll: roll };