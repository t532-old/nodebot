'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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
                            users.insert({ qqid: msg.param.user_id, osuid: account });
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
    args: '[usr]',
    options: _util2.default.flatten(_util2.default.modes),
    /**
     * @description Fetch a user's status
     * @param {Message} msg The universal msg object
     * @param {string} usr username that will be queried
     * @param {string} mode the mode that will be queried
     */
    action: function action(msg, _ref2, _ref3) {
        var _this2 = this;

        var _ref2$usr = _ref2.usr,
            usr = _ref2$usr === undefined ? 'me' : _ref2$usr;

        var _ref4 = (0, _slicedToArray3.default)(_ref3, 1),
            _ref4$ = _ref4[0],
            mode = _ref4$ === undefined ? 'o' : _ref4$;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var data, doc, _stat, path;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            mode = _util2.default.checkmode(mode);
                            data = [];

                            if (!(usr === 'me')) {
                                _context2.next = 13;
                                break;
                            }

                            _context2.prev = 3;
                            _context2.next = 6;
                            return users.findOne({ qqid: msg.param.user_id });

                        case 6:
                            doc = _context2.sent;

                            usr = doc.osuid;
                            _context2.next = 13;
                            break;

                        case 10:
                            _context2.prev = 10;
                            _context2.t0 = _context2['catch'](3);

                            msg.send('osubot: recent: user does not exist');

                        case 13:
                            _context2.prev = 13;
                            _context2.next = 16;
                            return _web.api.statQuery({
                                u: usr,
                                k: config.key,
                                m: mode
                            });

                        case 16:
                            _stat = _context2.sent;
                            _context2.next = 19;
                            return _canvas2.default.drawStat(_stat);

                        case 19:
                            path = _context2.sent;

                            msg.send([{
                                type: 'image',
                                data: {
                                    file: path
                                }
                            }]);
                            _context2.next = 27;
                            break;

                        case 23:
                            _context2.prev = 23;
                            _context2.t1 = _context2['catch'](13);

                            msg.send(_context2.t1.toString());
                            return _context2.abrupt('return');

                        case 27:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[3, 10], [13, 23]]);
        }))();
    }
};

var rec = {
    args: '[usr]',
    options: [],
    /**
     * @description Get a user's most recent play
     * @param {Message} msg The universal msg object
     * @param {string} usr The username that'll be queried
     */
    action: function action(msg, _ref5) {
        var _this3 = this;

        var _ref5$usr = _ref5.usr,
            usr = _ref5$usr === undefined ? 'me' : _ref5$usr;
        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            var time, data, doc, _rec, map, _stat2, path;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            time = Date.now();
                            data = [];

                            if (!(usr === 'me')) {
                                _context3.next = 14;
                                break;
                            }

                            _context3.prev = 3;
                            _context3.next = 6;
                            return users.findOne({ qqid: msg.param.user_id });

                        case 6:
                            doc = _context3.sent;

                            usr = doc.osuid;
                            _context3.next = 14;
                            break;

                        case 10:
                            _context3.prev = 10;
                            _context3.t0 = _context3['catch'](3);

                            msg.send('osubot: recent: didn\'t bind your osu!id. use `>bind <id>\' to bind');
                            return _context3.abrupt('return');

                        case 14:
                            _context3.prev = 14;
                            _context3.next = 17;
                            return _web.api.recentQuery({
                                u: usr,
                                limit: '1',
                                k: config.key
                            });

                        case 17:
                            _rec = _context3.sent;
                            _context3.next = 20;
                            return _web.api.mapQuery({
                                b: _rec.beatmap_id,
                                k: config.key
                            });

                        case 20:
                            map = _context3.sent;
                            _context3.next = 23;
                            return _web.api.statQuery({
                                u: usr,
                                k: config.key
                            });

                        case 23:
                            _stat2 = _context3.sent;
                            _context3.next = 26;
                            return _canvas2.default.drawRecent(_rec, map, _stat2);

                        case 26:
                            path = _context3.sent;

                            console.log(Date.now() - time);
                            msg.send([{
                                type: 'image',
                                data: {
                                    file: path
                                }
                            }]);
                            _context3.next = 35;
                            break;

                        case 31:
                            _context3.prev = 31;
                            _context3.t1 = _context3['catch'](14);

                            msg.send(_context3.t1.toString());
                            return _context3.abrupt('return');

                        case 35:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3, [[3, 10], [14, 31]]);
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
    action: function action(msg, _ref6) {
        var _this4 = this;

        var _ref6$range = _ref6.range,
            range = _ref6$range === undefined ? '100' : _ref6$range;
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

exports.default = { bind: bind, stat: stat, rec: rec, roll: roll };