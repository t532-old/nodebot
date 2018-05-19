'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.statdb = exports.userdb = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Adds a bound user to db
 * @param {string} qqid - The querying arg qqid
 * @param {string} osuid The querying arg osuid
 */
var newUser = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(qqid, osuid) {
        var exists, osu, taiko, ctb, mania, _ref2, _ref3;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return users.findOne({ qqid: qqid });

                    case 2:
                        exists = _context.sent;
                        osu = void 0, taiko = void 0, ctb = void 0, mania = void 0;

                        if (!exists) {
                            _context.next = 6;
                            break;
                        }

                        return _context.abrupt('return', false);

                    case 6:
                        _context.prev = 6;
                        _context.next = 9;
                        return _promise2.default.all([_web.api.statQuery({ u: osuid, m: 0 }), _web.api.statQuery({ u: osuid, m: 1 }), _web.api.statQuery({ u: osuid, m: 2 }), _web.api.statQuery({ u: osuid, m: 3 })]);

                    case 9:
                        _ref2 = _context.sent;
                        _ref3 = (0, _slicedToArray3.default)(_ref2, 4);
                        osu = _ref3[0];
                        taiko = _ref3[1];
                        ctb = _ref3[2];
                        mania = _ref3[3];
                        _context.next = 20;
                        break;

                    case 17:
                        _context.prev = 17;
                        _context.t0 = _context['catch'](6);
                        return _context.abrupt('return', false);

                    case 20:
                        return _context.abrupt('return', users.insert({ qqid: qqid, osuid: osuid, data: [osu, taiko, ctb, mania] }));

                    case 21:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[6, 17]]);
    }));

    return function newUser(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * Remove a user from bound users' list in db
 * @param {string} qqid - The querying arg qqid
 */


var delUser = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(qqid) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', users.remove({ qqid: qqid }));

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function delUser(_x3) {
        return _ref4.apply(this, arguments);
    };
}();

/**
 * refreshes a bound user's stat cache
 * @param {string} osuid - The querying arg osuid
 */


var refreshStat = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(qqid) {
        var osuid, osu, taiko, ctb, mania, _ref6, _ref7;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return users.findOne({ qqid: qqid });

                    case 2:
                        osuid = _context3.sent.osuid;
                        osu = void 0, taiko = void 0, ctb = void 0, mania = void 0;
                        _context3.prev = 4;
                        _context3.next = 7;
                        return _promise2.default.all([_web.api.statQuery({ u: osuid, m: 0 }), _web.api.statQuery({ u: osuid, m: 1 }), _web.api.statQuery({ u: osuid, m: 2 }), _web.api.statQuery({ u: osuid, m: 3 })]);

                    case 7:
                        _ref6 = _context3.sent;
                        _ref7 = (0, _slicedToArray3.default)(_ref6, 4);
                        osu = _ref7[0];
                        taiko = _ref7[1];
                        ctb = _ref7[2];
                        mania = _ref7[3];
                        _context3.next = 19;
                        break;

                    case 15:
                        _context3.prev = 15;
                        _context3.t0 = _context3['catch'](4);

                        console.log('Not found');
                        return _context3.abrupt('return');

                    case 19:
                        return _context3.abrupt('return', users.update({ qqid: qqid }, { data: [osu, taiko, ctb, mania] }));

                    case 20:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[4, 15]]);
    }));

    return function refreshStat(_x4) {
        return _ref5.apply(this, arguments);
    };
}();

var refreshAllStat = function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var docs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, user;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return users.find();

                    case 2:
                        docs = _context4.sent;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context4.prev = 6;
                        _iterator = (0, _getIterator3.default)(docs);

                    case 8:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context4.next = 15;
                            break;
                        }

                        user = _step.value;
                        _context4.next = 12;
                        return refreshStat(user.qqid);

                    case 12:
                        _iteratorNormalCompletion = true;
                        _context4.next = 8;
                        break;

                    case 15:
                        _context4.next = 21;
                        break;

                    case 17:
                        _context4.prev = 17;
                        _context4.t0 = _context4['catch'](6);
                        _didIteratorError = true;
                        _iteratorError = _context4.t0;

                    case 21:
                        _context4.prev = 21;
                        _context4.prev = 22;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 24:
                        _context4.prev = 24;

                        if (!_didIteratorError) {
                            _context4.next = 27;
                            break;
                        }

                        throw _iteratorError;

                    case 27:
                        return _context4.finish(24);

                    case 28:
                        return _context4.finish(21);

                    case 29:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[6, 17, 21, 29], [22,, 24, 28]]);
    }));

    return function refreshAllStat() {
        return _ref8.apply(this, arguments);
    };
}();

/**
 * Get bind info by QQid.
 * @param {string} qqid - The querying arg qqid
 */


var getByQQ = function () {
    var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(qqid) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        return _context5.abrupt('return', users.findOne({ qqid: qqid }));

                    case 1:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function getByQQ(_x5) {
        return _ref9.apply(this, arguments);
    };
}();

/**
 * Get bind info by OSUid.
 * @param {string} osuid - The querying arg osuid
 */


var getByOSU = function () {
    var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(osuid) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        return _context6.abrupt('return', users.findOne({ osuid: osuid }));

                    case 1:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function getByOSU(_x6) {
        return _ref10.apply(this, arguments);
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
var config = _jsYaml2.default.safeLoad(_fs2.default.readFileSync('config.yml')).osubot;var userdb = exports.userdb = { newUser: newUser, delUser: delUser, getByQQ: getByQQ, getByOSU: getByOSU };
var statdb = exports.statdb = { getByQQ: getByQQ, getByOSU: getByOSU, refreshStat: refreshStat, refreshAllStat: refreshAllStat };