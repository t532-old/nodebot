'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();

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

_message2.default.listen();

app.use((0, _koaBody2.default)());

app.use(function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _message2.default.handle(ctx.request.body);

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());

app.listen(8080);