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

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var reduceAll = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var docs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i, user;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return users.find();

                    case 2:
                        docs = _context.sent;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 6;
                        _iterator = (0, _getIterator3.default)(docs);

                    case 8:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 27;
                            break;
                        }

                        i = _step.value;
                        user = void 0;
                        _context.prev = 11;
                        _context.next = 14;
                        return _web.api.statQuery({ u: i.osuid });

                    case 14:
                        user = _context.sent;
                        _context.next = 22;
                        break;

                    case 17:
                        _context.prev = 17;
                        _context.t0 = _context['catch'](11);
                        _context.next = 21;
                        return users.remove({ osuid: i.osuid });

                    case 21:
                        return _context.abrupt('continue', 24);

                    case 22:
                        _context.next = 24;
                        return users.update({ osuid: i.osuid }, { osuid: user.user_id });

                    case 24:
                        _iteratorNormalCompletion = true;
                        _context.next = 8;
                        break;

                    case 27:
                        _context.next = 33;
                        break;

                    case 29:
                        _context.prev = 29;
                        _context.t1 = _context['catch'](6);
                        _didIteratorError = true;
                        _iteratorError = _context.t1;

                    case 33:
                        _context.prev = 33;
                        _context.prev = 34;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 36:
                        _context.prev = 36;

                        if (!_didIteratorError) {
                            _context.next = 39;
                            break;
                        }

                        throw _iteratorError;

                    case 39:
                        return _context.finish(36);

                    case 40:
                        return _context.finish(33);

                    case 41:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[6, 29, 33, 41], [11, 17], [34,, 36, 40]]);
    }));

    return function reduceAll() {
        return _ref.apply(this, arguments);
    };
}();

/**
 * Adds a bound user to db
 * @param {string} qqid - The querying arg qqid
 * @param {string} osuid The querying arg osuid
 */


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
                        return _context2.abrupt('return', refreshStat(osuid));

                    case 8:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function newUser(_x, _x2) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * Remove a user from bound users' list in db
 * @param {string} qqid - The querying arg qqid
 */


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

    return function delUser(_x3) {
        return _ref3.apply(this, arguments);
    };
}();

/**
 * refreshes a bound user's stat cache
 * @param {string} osuid - The querying arg osuid
 */


var refreshStat = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(osuid) {
        var osu, taiko, ctb, mania, _ref5, _ref6;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        osu = void 0, taiko = void 0, ctb = void 0, mania = void 0;
                        _context4.prev = 1;
                        _context4.next = 4;
                        return _promise2.default.all([_web.api.statQuery({ u: osuid, m: 0 }), _web.api.statQuery({ u: osuid, m: 1 }), _web.api.statQuery({ u: osuid, m: 2 }), _web.api.statQuery({ u: osuid, m: 3 })]);

                    case 4:
                        _ref5 = _context4.sent;
                        _ref6 = (0, _slicedToArray3.default)(_ref5, 4);
                        osu = _ref6[0];
                        taiko = _ref6[1];
                        ctb = _ref6[2];
                        mania = _ref6[3];
                        _context4.next = 15;
                        break;

                    case 12:
                        _context4.prev = 12;
                        _context4.t0 = _context4['catch'](1);
                        return _context4.abrupt('return');

                    case 15:
                        _context4.next = 17;
                        return stats.findOne({ osuid: osuid });

                    case 17:
                        if (!_context4.sent) {
                            _context4.next = 21;
                            break;
                        }

                        return _context4.abrupt('return', stats.update({ osuid: osuid }, { data: [osu, taiko, ctb, mania] }));

                    case 21:
                        return _context4.abrupt('return', stats.insert({ osuid: osuid, data: [osu, taiko, ctb, mania] }));

                    case 22:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[1, 12]]);
    }));

    return function refreshStat(_x4) {
        return _ref4.apply(this, arguments);
    };
}();

var refreshAllStat = function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var docs, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, user;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return users.find();

                    case 2:
                        docs = _context5.sent;
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context5.prev = 6;
                        _iterator2 = (0, _getIterator3.default)(docs);

                    case 8:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context5.next = 15;
                            break;
                        }

                        user = _step2.value;
                        _context5.next = 12;
                        return refreshStat(user.osuid);

                    case 12:
                        _iteratorNormalCompletion2 = true;
                        _context5.next = 8;
                        break;

                    case 15:
                        _context5.next = 21;
                        break;

                    case 17:
                        _context5.prev = 17;
                        _context5.t0 = _context5['catch'](6);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context5.t0;

                    case 21:
                        _context5.prev = 21;
                        _context5.prev = 22;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 24:
                        _context5.prev = 24;

                        if (!_didIteratorError2) {
                            _context5.next = 27;
                            break;
                        }

                        throw _iteratorError2;

                    case 27:
                        return _context5.finish(24);

                    case 28:
                        return _context5.finish(21);

                    case 29:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[6, 17, 21, 29], [22,, 24, 28]]);
    }));

    return function refreshAllStat() {
        return _ref7.apply(this, arguments);
    };
}();

/**
 * Get bind info by QQid.
 * @param {string} qqid - The querying arg qqid
 */


var getUserByQQ = function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(qqid) {
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

    return function getUserByQQ(_x5) {
        return _ref8.apply(this, arguments);
    };
}();

/**
 * Get bind info by OSUid.
 * @param {string} osuid - The querying arg osuid
 */


var getUserByOSU = function () {
    var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(osuid) {
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

    return function getUserByOSU(_x6) {
        return _ref9.apply(this, arguments);
    };
}();

/**
 * Get stat cache by QQid.
 * @param {string} qqid - The querying arg qqid
 */


var getStatByQQ = function () {
    var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(qqid) {
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

    return function getStatByQQ(_x7) {
        return _ref10.apply(this, arguments);
    };
}();

/**
 * Get stat cache by OSUid.
 * @param {string} osuid - The querying arg osuid
 */


var getStatByOSU = function () {
    var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(osuid) {
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

    return function getStatByOSU(_x8) {
        return _ref11.apply(this, arguments);
    };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _monk = require('monk');

var _monk2 = _interopRequireDefault(_monk);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _web = require('./web');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = (0, _monk2.default)('localhost:27017/botdb');
var users = db.get('users');
var stats = db.get('userstats');
var config = _jsYaml2.default.safeLoad(_fs2.default.readFileSync('config.yml')).osubot;

var userdb = exports.userdb = { newUser: newUser, delUser: delUser, getByQQ: getUserByQQ, getByOSU: getUserByOSU, reduceAll: reduceAll };
var statdb = exports.statdb = { getByQQ: getStatByQQ, getByOSU: getStatByOSU, refreshStat: refreshStat, refreshAllStat: refreshAllStat };