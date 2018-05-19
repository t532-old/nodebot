'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initPaths = ['cache', 'cache/osubot', 'cache/osubot/avatar', 'cache/osubot/avatarl', 'cache/osubot/recent', 'cache/osubot/recentbg', 'cache/osubot/stat', 'cache/osubot/statbg', 'cache/osubot/mapbg', 'cache/osubot/best'];

exports.default = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var _this = this;

    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i, time;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context3.prev = 3;

                    for (_iterator = (0, _getIterator3.default)(initPaths); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        i = _step.value;

                        if (!_fs2.default.existsSync(i)) _fs2.default.mkdirSync(i);
                    }_context3.next = 11;
                    break;

                case 7:
                    _context3.prev = 7;
                    _context3.t0 = _context3['catch'](3);
                    _didIteratorError = true;
                    _iteratorError = _context3.t0;

                case 11:
                    _context3.prev = 11;
                    _context3.prev = 12;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 14:
                    _context3.prev = 14;

                    if (!_didIteratorError) {
                        _context3.next = 17;
                        break;
                    }

                    throw _iteratorError;

                case 17:
                    return _context3.finish(14);

                case 18:
                    return _context3.finish(11);

                case 19:
                    time = new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() + 1));
                    _context3.next = 22;
                    return _db.statdb.refreshAllStat();

                case 22:
                    console.log('Refreshed user status');
                    setTimeout((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                        return _regenerator2.default.wrap(function _callee2$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        _context2.next = 2;
                                        return _db.statdb.refreshAllStat();

                                    case 2:
                                        console.log('Refreshed user status');
                                        setInterval((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                                            return _regenerator2.default.wrap(function _callee$(_context) {
                                                while (1) {
                                                    switch (_context.prev = _context.next) {
                                                        case 0:
                                                            _context.next = 2;
                                                            return _db.statdb.refreshAllStat();

                                                        case 2:
                                                            console.log('Refreshed user status');

                                                        case 3:
                                                        case 'end':
                                                            return _context.stop();
                                                    }
                                                }
                                            }, _callee, _this);
                                        })), 86400000);

                                    case 4:
                                    case 'end':
                                        return _context2.stop();
                                }
                            }
                        }, _callee2, _this);
                    })), time.getTime() - Date.now());

                case 24:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _callee3, this, [[3, 7, 11, 19], [12,, 14, 18]]);
}));