'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

/**
 * Draws a recent play image and returns its path
 * @param {object} rec 
 * @param {object} map 
 * @param {object} stat 
 */
var drawRecent = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(rec, map, stat) {
        var uid, sid, dest;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        uid = stat.user_id;
                        sid = map.beatmapset_id;
                        dest = 'cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'recent' + _path2.default.sep + uid + '.jpg';
                        _context.next = 5;
                        return _web.res.avatarQuery(uid, 'cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'avatar' + _path2.default.sep + uid + '.jpg');

                    case 5:
                        _context.next = 7;
                        return _web.res.bgQuery(sid, dest);

                    case 7:
                        _context.next = 9;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).resize(2765, 768));

                    case 9:
                        _context.next = 11;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').crop(1500, 500).blur(50, 50).fill('#888b').drawCircle(750, 250, 750, 620).tile(dest).drawCircle(750, 250, 750, 610));

                    case 11:
                        _context.next = 13;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').fill('#fffa').drawCircle(750, 250, 750, 610).fill('#fff').drawCircle(750, 250, 750, 490).fill('#ccc').drawCircle(750, 250, 750, 470).fill('#fff').drawCircle(750, 250, 750, 460).fill('#aaa').drawEllipse(750, 250, 210, 210, -145, -35).fill('#fff').font('assets/fonts/Exo2.0-Regular.otf').fontSize(30).drawText(0, -145, stat.username).font('assets/fonts/Exo2.0-Bold.otf').fontSize(12).fill('#f69').drawText(0, 0, 'total score').font('assets/fonts/Exo2.0-BoldItalic.otf').fontSize(25).fill('#3ad').drawText(0, 35, map.title.slice(0, 35) + (map.title.length > 35 ? '...' : '')).fontSize(17).drawText(0, 60, map.artist.slice(0, 50) + (map.artist.length > 50 ? '...' : '')).font('assets/fonts/Exo2.0-Bold.otf').fontSize(30).drawText(-300, 0, rec.maxcombo + 'x').drawText(300, 0, _util2.default.accuracy(rec) + '%').fontSize(12).fill('#333').drawText(-290, 20, 'max combo').drawText(290, 20, 'accuracy').font('assets/fonts/Venera-500.otf').fontSize(50).fill('#f69').drawText(0, -25, _util2.default.scorify(rec.score)).font('assets/fonts/Exo2.0-Bold.otf').fontSize(13).fill('#999').drawText(0, 85, map.version + ' - mapped by ' + map.creator).drawRectangle(675, 345, 825, 365).font('assets/fonts/Exo2.0-Regular.otf').fill('#fff').drawText(0, 105, rec.date).fontSize(25).fill('#aaa').drawLine(650, 375, 850, 375).fill('#666').drawText(-100, 140, _util2.default.fillNumber(rec.count300)).drawText(-33, 140, _util2.default.fillNumber(rec.count100)).drawText(33, 140, _util2.default.fillNumber(rec.count50)).drawText(100, 140, _util2.default.fillNumber(rec.countmiss)).fontSize(12).drawText(-100, 160, 'Great').drawText(-33, 160, 'Good').drawText(33, 160, 'Meh').drawText(100, 160, 'Miss').crop(1200, 500));

                    case 13:
                        _context.next = 15;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).composite('assets/image/rank/' + rec.rank + '.png').gravity('North').geometry('+0+90'));

                    case 15:
                        console.log('file://' + process.cwd() + _path2.default.sep + dest);
                        return _context.abrupt('return', 'file://' + process.cwd() + _path2.default.sep + dest);

                    case 17:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function drawRecent(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var drawStat = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(stat) {
        var uid, dest;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        uid = stat.user_id;
                        dest = 'cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'stat' + _path2.default.sep + uid + '.jpg';
                        _context2.next = 4;
                        return _web.res.avatarQuery(uid, 'cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'avatar' + _path2.default.sep + uid + '.jpg');

                    case 4:
                        _fs2.default.copyFileSync('assets' + _path2.default.sep + 'osubot' + _path2.default.sep + 'assets' + _path2.default.sep + 'image' + _path2.default.sep + 'userbg' + _path2.default.sep + 'c' + Math.floor(Math.random() * 6) + '.jpg', dest);
                        _context2.next = 7;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).resize(2765, 768));

                    case 7:
                        _context2.next = 9;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').crop(1500, 500).fill('#888b').drawCircle(750, 250, 750, 620).tile(dest).drawCircle(750, 250, 750, 610));

                    case 9:
                        _context2.next = 11;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').fill('#fffa').drawCircle(750, 250, 750, 610).fill('#fff').drawCircle(750, 250, 750, 490).fill('#ccc').drawCircle(750, 250, 750, 470).fill('#fff').drawCircle(750, 250, 750, 460).fill('#aaa').drawEllipse(750, 250, 210, 210, -145, -35).fill('#fff').font('assets/fonts/Exo2.0-Regular.otf').fontSize(30).drawText(0, -145, stat.username).font('assets/fonts/Exo2.0-Bold.otf').fontSize(12).fill('#f69').drawText(0, 0, 'global rank').font('assets/fonts/Exo2.0-BoldItalic.otf').fontSize(25).fill('#3ad').drawText(0, 35, map.title.slice(0, 35) + (map.title.length > 35 ? '...' : '')).fontSize(17).drawText(0, 60, map.artist.slice(0, 50) + (map.artist.length > 50 ? '...' : '')).font('assets/fonts/Exo2.0-Bold.otf').fontSize(30).drawText(-300, 0, rec.maxcombo + 'x').drawText(300, 0, stat.accuracy.slice(0, 3 + stat.accuracy.split('.').length) + '%').fontSize(12).fill('#333').drawText(-290, 20, 'max combo').drawText(290, 20, 'accuracy').font('assets/fonts/Venera-500.otf').fontSize(50).fill('#f69').drawText(0, -25, _util2.default.scorify(stat.pp_rank)).font('assets/fonts/Exo2.0-Bold.otf').fontSize(13).fill('#999').drawText(0, 85, map.version + ' - mapped by ' + map.creator).drawRectangle(675, 345, 825, 365).font('assets/fonts/Exo2.0-Regular.otf').fill('#fff').drawText(0, 105, rec.date).fontSize(25).fill('#aaa').drawLine(650, 375, 850, 375).fill('#666').drawText(-100, 140, _util2.default.fillNumber(rec.count300)).drawText(-33, 140, _util2.default.fillNumber(rec.count100)).drawText(33, 140, _util2.default.fillNumber(rec.count50)).drawText(100, 140, _util2.default.fillNumber(rec.countmiss)).fontSize(12).drawText(-100, 160, 'Great').drawText(-33, 160, 'Good').drawText(33, 160, 'Meh').drawText(100, 160, 'Miss').crop(1200, 500));

                    case 11:
                        _context2.next = 13;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).composite('assets/image/' + rec.rank + '.png').gravity('North').geometry('+0+90'));

                    case 13:
                        console.log('file://' + process.cwd() + _path2.default.sep + dest);
                        return _context2.abrupt('return', 'file://' + process.cwd() + _path2.default.sep + dest);

                    case 15:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function drawStat(_x4) {
        return _ref2.apply(this, arguments);
    };
}();

var _gm = require('gm');

var _gm2 = _interopRequireDefault(_gm);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _web = require('./web');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Simple sugar over gm

// Import local files
function promisifyGM(gmO) {
    return new _promise2.default(function (resolve, reject) {
        gmO.write(gmO.source, function (err) {
            if (err) throw err;else resolve();
        });
    });
} // Import modules
exports.default = { drawRecent: drawRecent };