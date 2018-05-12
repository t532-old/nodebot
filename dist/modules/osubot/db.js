'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.statdb = exports.userdb = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var reduceSame = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(qqid) {
        var found, final;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return users.findOne({ qqid: qqid });

                    case 2:
                        found = _context.sent;
                        final = found[0];
                        _context.next = 6;
                        return users.remove({ qqid: qqid });

                    case 6:
                        return _context.abrupt('return', users.insert(final));

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function reduceSame(_x) {
        return _ref.apply(this, arguments);
    };
}();

var newUser = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(qqid, osuid) {
        var exists;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return users.findOne({ qqid: qqid });

                    case 2:
                        exists = _context2.sent;

                        if (!exists) {
                            _context2.next = 5;
                            break;
                        }

                        return _context2.abrupt('return', false);

                    case 5:
                        _context2.next = 7;
                        return users.insert({ qqid: qqid, osuid: osuid });

                    case 7:
                        initStat(uid);

                    case 8:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function newUser(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

var delUser = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(qqid) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        return _context3.abrupt('return', users.remove({ qqid: qqid }));

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function delUser(_x4) {
        return _ref3.apply(this, arguments);
    };
}();

var initStat = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(osuid) {
        var _ref5, _ref6, osu, taiko, ctb, mania;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return _promise2.default.all([_web.api.statQuery({ u: osuid, k: config.key, m: 0 }), _web.api.statQuery({ u: osuid, k: config.key, m: 1 }), _web.api.statQuery({ u: osuid, k: config.key, m: 2 }), _web.api.statQuery({ u: osuid, k: config.key, m: 3 })]);

                    case 2:
                        _ref5 = _context4.sent;
                        _ref6 = (0, _slicedToArray3.default)(_ref5, 4);
                        osu = _ref6[0];
                        taiko = _ref6[1];
                        ctb = _ref6[2];
                        mania = _ref6[3];
                        return _context4.abrupt('return', stats.insert({ osuid: osuid, data: [osu, taiko, ctb, mania] }));

                    case 9:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function initStat(_x5) {
        return _ref4.apply(this, arguments);
    };
}();

var refreshStat = function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(osuid) {
        var _ref8, _ref9, osu, taiko, ctb, mania;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return _promise2.default.all([_web.api.statQuery({ u: osuid, k: config.key, m: 0 }), _web.api.statQuery({ u: osuid, k: config.key, m: 1 }), _web.api.statQuery({ u: osuid, k: config.key, m: 2 }), _web.api.statQuery({ u: osuid, k: config.key, m: 3 })]);

                    case 2:
                        _ref8 = _context5.sent;
                        _ref9 = (0, _slicedToArray3.default)(_ref8, 4);
                        osu = _ref9[0];
                        taiko = _ref9[1];
                        ctb = _ref9[2];
                        mania = _ref9[3];
                        _context5.next = 10;
                        return stats.remove({ osuid: osuid });

                    case 10:
                        return _context5.abrupt('return', stats.insert({ osuid: osuid, data: [osu, taiko, ctb, mania] }));

                    case 11:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function refreshStat(_x6) {
        return _ref7.apply(this, arguments);
    };
}();

var getUserByQQ = function () {
    var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(qqid) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        return _context6.abrupt('return', users.findOne({ qqid: qqid }));

                    case 1:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function getUserByQQ(_x7) {
        return _ref10.apply(this, arguments);
    };
}();

var getUserByOSU = function () {
    var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(osuid) {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        return _context7.abrupt('return', users.findOne({ osuid: osuid }));

                    case 1:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));

    return function getUserByOSU(_x8) {
        return _ref11.apply(this, arguments);
    };
}();

var getStatByQQ = function () {
    var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(qqid) {
        var osuid;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _context8.next = 2;
                        return users.findOne({ qqid: qqid });

                    case 2:
                        osuid = _context8.sent.osuid;
                        return _context8.abrupt('return', stats.findOne({ osuid: osuid }));

                    case 4:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, this);
    }));

    return function getStatByQQ(_x9) {
        return _ref12.apply(this, arguments);
    };
}();

var getStatByOSU = function () {
    var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(osuid) {
        return _regenerator2.default.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        return _context9.abrupt('return', stats.findOne({ osuid: osuid }));

                    case 1:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, this);
    }));

    return function getStatByOSU(_x10) {
        return _ref13.apply(this, arguments);
    };
}();

var _monk = require('monk');

var _monk2 = _interopRequireDefault(_monk);

var _web = require('./web');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = (0, _monk2.default)('localhost:27017/botdb');
var users = db.get('users');
var stats = db.get('stats');
var config = yaml.safeLoad(fs.readFileSync('config.yml')).osubot;

var userdb = exports.userdb = { reduceSame: reduceSame, newUser: newUser, delUser: delUser, getByQQ: getUserByQQ, getByOSU: getUserByOSU };
var statdb = exports.statdb = { getByQQ: getStatByQQ, getByOSU: getStatByOSU, initStat: initStat, refreshStat: refreshStat };