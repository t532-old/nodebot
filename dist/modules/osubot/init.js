'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = function () {
    var _this = this;

    if (!_fs2.default.existsSync('cache')) {
        _fs2.default.mkdirSync('cache');
        _fs2.default.mkdirSync('cache/osubot');
        _fs2.default.mkdirSync('cache/osubot/avatar');
        _fs2.default.mkdirSync('cache/osubot/avatarl');
        _fs2.default.mkdirSync('cache/osubot/recent');
        _fs2.default.mkdirSync('cache/osubot/recentbg');
        _fs2.default.mkdirSync('cache/osubot/stat');
        _fs2.default.mkdirSync('cache/osubot/statbg');
        _fs2.default.mkdirSync('cache/osubot/mapbg');
    }
    var time = new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + (new Date().getDate() + 1));
    setTimeout((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _db.statdb.refreshAll();
                        setInterval(_db.statdb.refreshAllStat, 86400000);

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    })), time.getTime() - Date.now());
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }