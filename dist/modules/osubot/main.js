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

/**
 * @description Fetch a user's status
 * @param {Message} msg The universal msg object
 * @param {string} usr username that will be queried
 * @param {string} mode the mode that will be queried
 */
var stat = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(msg) {
        var usr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'me';
        var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'o';
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
                        return _web.api.statQuery({
                            u: usr,
                            m: mode,
                            k: config.key
                        });

                    case 19:
                        _context.t3 = _context.sent;
                        _context.t4 = (0, _context.t2)(_context.t3);

                        _context.t1.send.call(_context.t1, _context.t4);

                        _context.next = 27;
                        break;

                    case 24:
                        _context.prev = 24;
                        _context.t5 = _context['catch'](14);

                        msg.send(_context.t5.toString());

                    case 27:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 11], [14, 24]]);
    }));

    return function stat(_x) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * @description Get a user's most recent play
 * @param {Message} msg The universal msg object
 * @param {string} usr The username that'll be queried
 */


var recent = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(msg) {
        var usr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'me';

        var data, doc, rec, map, _stat, path;

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
                        return _web.api.recentQuery({
                            u: usr,
                            limit: '1',
                            k: config.key
                        });

                    case 16:
                        rec = _context2.sent;
                        _context2.next = 19;
                        return _web.api.mapQuery({
                            b: rec.beatmap_id,
                            k: config.key
                        });

                    case 19:
                        map = _context2.sent;
                        _context2.next = 22;
                        return _web.api.statQuery({
                            u: usr,
                            k: config.key
                        });

                    case 22:
                        _stat = _context2.sent;
                        _context2.next = 25;
                        return _canvas2.default.drawRecent(rec, map, _stat);

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
        }, _callee2, this, [[2, 9], [13, 30]]);
    }));

    return function recent(_x4) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * @description Gives a random result in a specific range (default 100)
 * @param {Message} msg The universal msg object
 * @param {string} range The rolling range
 */


var roll = function () {
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

    return function roll(_x6) {
        return _ref3.apply(this, arguments);
    };
}();

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
     * @param {array} account The account, use an array because username may include spaces
     */
    action: function action(msg, account) {
        users.insert({ qqid: msg.param.user_id, osuid: account.join(' ') });
        msg.send('osubot: bind: bound successfully');
    }
};exports.default = { bind: bind, stat: stat, recent: recent, roll: roll };