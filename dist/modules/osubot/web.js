'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.res = exports.api = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * A GET request to the ppy api.
 * @param {string} name 
 * @param {object} params 
 */
var apiQuery = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(name, params) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt('return', _axios2.default.get(_url2.default.format({
                            protocol: 'https',
                            host: 'osu.ppy.sh',
                            pathname: 'api/' + name,
                            query: (0, _extends3.default)({}, params, { k: config.key })
                        })));

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function apiQuery(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * Simple sugar over apiQuery, queries user's status
 * @param {object} params 
 */


var statQuery = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(params) {
        var result;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        result = void 0;
                        _context2.prev = 1;
                        _context2.next = 4;
                        return apiQuery('get_user', params);

                    case 4:
                        result = _context2.sent;
                        _context2.next = 10;
                        break;

                    case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2['catch'](1);
                        throw new Error('StatQuery: bad network status');

                    case 10:
                        if (!(result.data[0] === undefined)) {
                            _context2.next = 14;
                            break;
                        }

                        throw new Error('StatQuery: user does not exist');

                    case 14:
                        return _context2.abrupt('return', result.data[0]);

                    case 15:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[1, 7]]);
    }));

    return function statQuery(_x3) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * Simple sugar over apiQuery, queries user's most recent play
 * @param {object} params 
 */


var recentQuery = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(params) {
        var result;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        result = void 0;
                        _context3.prev = 1;
                        _context3.next = 4;
                        return apiQuery('get_user_recent', params);

                    case 4:
                        result = _context3.sent;
                        _context3.next = 10;
                        break;

                    case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3['catch'](1);
                        throw new Error('RecentQuery: bad network status');

                    case 10:
                        if (!(result.data[0] === undefined)) {
                            _context3.next = 14;
                            break;
                        }

                        throw new Error('RecentQuery: user does not exist or not played recently');

                    case 14:
                        return _context3.abrupt('return', result.data[0]);

                    case 15:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[1, 7]]);
    }));

    return function recentQuery(_x4) {
        return _ref3.apply(this, arguments);
    };
}();

/**
 * Simple sugar over apiQuery, queries a map's info
 * @param {object} params 
 */


var mapQuery = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(params) {
        var result;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        result = void 0;
                        _context4.prev = 1;
                        _context4.next = 4;
                        return apiQuery('get_beatmaps', params);

                    case 4:
                        result = _context4.sent;

                        if (!(result.data[0] === undefined)) {
                            _context4.next = 9;
                            break;
                        }

                        throw new Error('RecentQuery: user does not exist');

                    case 9:
                        return _context4.abrupt('return', result.data[0]);

                    case 10:
                        _context4.next = 15;
                        break;

                    case 12:
                        _context4.prev = 12;
                        _context4.t0 = _context4['catch'](1);
                        throw new Error('RecentQuery: bad network status');

                    case 15:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[1, 12]]);
    }));

    return function mapQuery(_x5) {
        return _ref4.apply(this, arguments);
    };
}();

/**
 * A GET requrest that gets a file stream, and writes it to another stream
 * @param {string} url 
 * @param {string} dest 
 */


var staticQuery = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(url, dest) {
        var res;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return (0, _axios2.default)({
                            method: 'get',
                            url: url,
                            responseType: 'stream'
                        });

                    case 2:
                        res = _context5.sent;

                        res.data.pipe(_fs2.default.createWriteStream(dest));
                        return _context5.abrupt('return', new _promise2.default(function (resolve, reject) {
                            res.data.on('end', resolve);
                        }).catch(function (err) {
                            throw err;
                        }));

                    case 5:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function staticQuery(_x6, _x7) {
        return _ref5.apply(this, arguments);
    };
}();

/**
 * Simple sugar over staticQuery, queries a user's avatar
 * @param {string} uid 
 */


var avatarQuery = function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(uid, dest) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        return _context6.abrupt('return', staticQuery('https://a.ppy.sh/' + uid, dest));

                    case 1:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function avatarQuery(_x8, _x9) {
        return _ref6.apply(this, arguments);
    };
}();

/**
 * Simple sugar over staticQuery, queries a map's background
 * @param {string} sid 
 */


var bgQuery = function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(sid, dest) {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        return _context7.abrupt('return', staticQuery('https://assets.ppy.sh/beatmaps/' + sid + '/covers/cover.jpg', dest));

                    case 1:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));

    return function bgQuery(_x10, _x11) {
        return _ref7.apply(this, arguments);
    };
}();

var mapFileQuery = function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(bid) {
        var parser, res;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        parser = new _ojsama2.default.parser();
                        _context8.next = 3;
                        return _axios2.default.get('https://osu.ppy.sh/osu/' + bid);

                    case 3:
                        res = _context8.sent.data;

                        parser.feed(res);
                        return _context8.abrupt('return', parser.map);

                    case 6:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, this);
    }));

    return function mapFileQuery(_x12) {
        return _ref8.apply(this, arguments);
    };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _ojsama = require('ojsama');

var _ojsama2 = _interopRequireDefault(_ojsama);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _jsYaml2.default.safeLoad(_fs2.default.readFileSync('config.yml')).osubot;var api = exports.api = { query: apiQuery, statQuery: statQuery, recentQuery: recentQuery, mapQuery: mapQuery };
var res = exports.res = { query: staticQuery, avatarQuery: avatarQuery, bgQuery: bgQuery, mapFileQuery: mapFileQuery };