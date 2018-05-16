'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _db = require('./db');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _monk = require('monk');

var _monk2 = _interopRequireDefault(_monk);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize settings
// Imports from local file
var config = _jsYaml2.default.safeLoad(_fs2.default.readFileSync('config.yml')).osubot;
// Imports from modules


var bind = {
    args: '<account>',
    options: [],
    /**
     * @description binds an osu! id with a QQ id.
     * @param {Message} msg The universal msg object
     * @param {string} account The account
     */
    action: function action(msg, _ref) {
        var _this = this;

        var account = _ref.account;
        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var user, result;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            user = void 0;
                            _context.prev = 1;
                            _context.next = 4;
                            return _web.api.statQuery({ u: account });

                        case 4:
                            user = _context.sent;
                            _context.next = 11;
                            break;

                        case 7:
                            _context.prev = 7;
                            _context.t0 = _context['catch'](1);

                            msg.send('osubot: bind: 用户名无效或bot炸了！（请注意输入用户名时不用添加帮助中示例的尖括号<>）');
                            return _context.abrupt('return');

                        case 11:
                            _context.next = 13;
                            return _db.userdb.newUser(msg.param.user_id, user.user_id);

                        case 13:
                            result = _context.sent;

                            if (result) {
                                _context.next = 17;
                                break;
                            }

                            msg.send('osubot: bind: 你绑定过id了！如果想要重新绑定，请先输入 `-unbind\' 来解绑。');
                            return _context.abrupt('return');

                        case 17:
                            msg.send('osubot: bind: 绑定成功！\n如果绑定错误，想要重新绑定，请输入 `-unbind\' 解绑后再次使用本命令。');

                        case 18:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[1, 7]]);
        }))();
    }
};

var unbind = {
    args: '',
    options: [],
    /**
     * @description unbinds an osu! id from a QQ id.
     * @param {Message} msg The universal msg object
     * @param {string} account The account
     */
    action: function action(msg) {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _db.userdb.delUser(msg.param.user_id);

                        case 2:
                            msg.send('osubot: unbind: 解绑成功！');

                        case 3:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
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
        var _this3 = this;

        var _ref2$usr = _ref2.usr,
            usr = _ref2$usr === undefined ? 'me' : _ref2$usr;

        var _ref4 = (0, _slicedToArray3.default)(_ref3, 1),
            _ref4$ = _ref4[0],
            mode = _ref4$ === undefined ? 'o' : _ref4$;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            var prevStat, bindDoc, statDoc, _stat, path;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            mode = _util2.default.checkmode(mode);
                            prevStat = void 0;

                            if (!(usr === 'me')) {
                                _context3.next = 18;
                                break;
                            }

                            _context3.prev = 3;
                            _context3.next = 6;
                            return _db.userdb.getByQQ(msg.param.user_id);

                        case 6:
                            bindDoc = _context3.sent;
                            _context3.next = 9;
                            return _db.statdb.getByQQ(msg.param.user_id);

                        case 9:
                            statDoc = _context3.sent;

                            usr = bindDoc.osuid;
                            prevStat = statDoc.data[mode];
                            _context3.next = 18;
                            break;

                        case 14:
                            _context3.prev = 14;
                            _context3.t0 = _context3['catch'](3);

                            msg.send('osubot: stat: 你还没有绑定你的osu!id。\n使用 `-bind <id>\' 来绑定（*一定*要去掉两边的尖括号<>），\n如果用户名有空格请将用户名*整个*用英文引号 " 括起来！');
                            return _context3.abrupt('return');

                        case 18:
                            _context3.prev = 18;
                            _context3.next = 21;
                            return _web.api.statQuery({
                                u: usr,
                                m: mode
                            });

                        case 21:
                            _stat = _context3.sent;
                            _context3.next = 24;
                            return _canvas2.default.drawStat(_stat, prevStat);

                        case 24:
                            path = _context3.sent;

                            if (path) msg.send([{
                                type: 'image',
                                data: {
                                    file: path
                                }
                            }]);else msg.send('osubot: stat: 请过会重试！');
                            _context3.next = 32;
                            break;

                        case 28:
                            _context3.prev = 28;
                            _context3.t1 = _context3['catch'](18);

                            msg.send(_context3.t1.stack);
                            return _context3.abrupt('return');

                        case 32:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3, [[3, 14], [18, 28]]);
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
        var _this4 = this;

        var _ref5$usr = _ref5.usr,
            usr = _ref5$usr === undefined ? 'me' : _ref5$usr;
        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            var data, doc, _rec, _ref6, _ref7, map, _stat2, path;

            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            data = [];

                            if (!(usr === 'me')) {
                                _context4.next = 13;
                                break;
                            }

                            _context4.prev = 2;
                            _context4.next = 5;
                            return _db.userdb.getByQQ(msg.param.user_id);

                        case 5:
                            doc = _context4.sent;

                            usr = doc.osuid;
                            _context4.next = 13;
                            break;

                        case 9:
                            _context4.prev = 9;
                            _context4.t0 = _context4['catch'](2);

                            msg.send('osubot: stat: 你还没有绑定你的osu!id。\n使用 `-bind <id>\' 来绑定（*不带*尖括号<>），\n如果用户名有空格请将用户名*整个*用英文引号 " 括起来！');
                            return _context4.abrupt('return');

                        case 13:
                            _context4.prev = 13;
                            _context4.next = 16;
                            return _web.api.recentQuery({
                                u: usr,
                                limit: '1'
                            });

                        case 16:
                            _rec = _context4.sent;
                            _context4.next = 19;
                            return _promise2.default.all([_web.api.mapQuery({ b: _rec.beatmap_id }), _web.api.statQuery({ u: usr })]);

                        case 19:
                            _ref6 = _context4.sent;
                            _ref7 = (0, _slicedToArray3.default)(_ref6, 2);
                            map = _ref7[0];
                            _stat2 = _ref7[1];
                            _context4.next = 25;
                            return _canvas2.default.drawRecent(_rec, map, _stat2);

                        case 25:
                            path = _context4.sent;

                            if (path) msg.send([{
                                type: 'image',
                                data: {
                                    file: path
                                }
                            }]);else msg.send('osubot: rec: 请过会重试！');
                            _context4.next = 33;
                            break;

                        case 29:
                            _context4.prev = 29;
                            _context4.t1 = _context4['catch'](13);

                            msg.send(_context4.t1.stack);
                            return _context4.abrupt('return');

                        case 33:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4, [[2, 9], [13, 29]]);
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
    action: function action(msg, _ref8) {
        var _this5 = this;

        var _ref8$range = _ref8.range,
            range = _ref8$range === undefined ? '100' : _ref8$range;
        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            if (typeof range === 'string' && !parseInt(range)) {
                                range = range.split(',');
                                msg.send(range[Math.floor(Math.random() * range.length)]);
                            } else msg.send(Math.round(Math.random() * parseInt(range)).toString());

                        case 1:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5);
        }))();
    }
};

var avatar = {
    args: '',
    options: [],
    action: function action(msg) {
        var _this6 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
            var user;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return _db.userdb.getByQQ(msg.param.user_id);

                        case 2:
                            user = _context6.sent;

                            _canvas2.default.clearCachedAvatars(user.osuid);

                        case 4:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6);
        }))();
    }
};

exports.default = { bind: bind, unbind: unbind, stat: stat, rec: rec, roll: roll, avatar: avatar };