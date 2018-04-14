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

var drawRecent = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(rec, map, stat) {
        var uid, sid, path, avatar, bg;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        uid = stat.user_id;
                        sid = map.beatmapset_id;
                        path = '../bot-data/cache/recent/' + uid + '.jpg';
                        _context.next = 5;
                        return (0, _axios2.default)({
                            method: 'get',
                            url: 'https://a.ppy.sh/' + uid,
                            responseType: 'stream'
                        });

                    case 5:
                        avatar = _context.sent;

                        avatar.data.pipe(_fs2.default.createWriteStream('../bot-data/cache/avatar/' + uid + '.jpg'));
                        _context.next = 9;
                        return promisifyStreamEvent(avatar.data, 'end');

                    case 9:
                        _context.next = 11;
                        return (0, _axios2.default)({
                            method: 'get',
                            url: 'https://assets.ppy.sh/beatmaps/' + sid + '/covers/cover.jpg',
                            responseType: 'stream'
                        });

                    case 11:
                        bg = _context.sent;

                        bg.data.pipe(_fs2.default.createWriteStream(path));
                        _context.next = 15;
                        return promisifyStreamEvent(bg.data, 'end');

                    case 15:
                        console.log('test');
                        _context.next = 18;
                        return promisifyGM((0, _gm2.default)(path).quality(100).resize(2765, 768));

                    case 18:
                        _context.next = 20;
                        return promisifyGM((0, _gm2.default)(path).quality(100).gravity('Center').crop(1500, 500).blur(50, 50).fill('#888b').drawCircle(750, 250, 750, 620).tile(path).drawCircle(750, 250, 750, 610));

                    case 20:
                        _context.next = 22;
                        return promisifyGM((0, _gm2.default)(path).quality(100).gravity('Center').fill('#fffa').drawCircle(750, 250, 750, 610).fill('#fff').drawCircle(750, 250, 750, 490).fill('#ccc').drawCircle(750, 250, 750, 470).fill('#fff').drawCircle(750, 250, 750, 460).fill('#aaa').drawEllipse(750, 250, 210, 210, -145, -35).fill('#fff').font('assets/fonts/Exo2.0-Regular.otf').fontSize(30).drawText(0, -145, stat.username).font('assets/fonts/Exo2.0-Bold.otf').fontSize(12).fill('#f69').drawText(0, 0, 'total score').font('assets/fonts/Exo2.0-BoldItalic.otf').fontSize(25).fill('#3ad').drawText(0, 35, map.title.slice(0, 35) + (map.title.length > 35 ? '...' : '')).fontSize(17).drawText(0, 60, map.artist.slice(0, 50) + (map.artist.length > 50 ? '...' : '')).font('assets/fonts/Exo2.0-Bold.otf').fontSize(30).drawText(-300, 0, rec.maxcombo + 'x').drawText(300, 0, _osubotUtil2.default.accuracy(rec) + '%').fontSize(12).fill('#333').drawText(-290, 20, 'max combo').drawText(290, 20, 'accuracy').font('assets/fonts/Venera-500.otf').fontSize(50).fill('#f69').drawText(0, -25, _osubotUtil2.default.scorify(rec.score)).font('assets/fonts/Exo2.0-Bold.otf').fontSize(13).fill('#999').drawText(0, 85, map.version + ' - mapped by ' + map.creator).drawRectangle(675, 345, 825, 365).font('assets/fonts/Exo2.0-Regular.otf').fill('#fff').drawText(0, 105, rec.date).fontSize(25).fill('#aaa').drawLine(650, 375, 850, 375).fill('#666').drawText(-100, 140, _osubotUtil2.default.fillNumber(rec.count300)).drawText(-33, 140, _osubotUtil2.default.fillNumber(rec.count100)).drawText(33, 140, _osubotUtil2.default.fillNumber(rec.count50)).drawText(100, 140, _osubotUtil2.default.fillNumber(rec.countmiss)).fontSize(12).drawText(-100, 160, 'Great').drawText(-33, 160, 'Good').drawText(33, 160, 'Meh').drawText(100, 160, 'Miss').crop(1200, 500));

                    case 22:
                        _context.next = 24;
                        return promisifyGM((0, _gm2.default)(path).quality(100).composite('assets/image/' + rec.rank + '.png').gravity('North').geometry('+0+90'));

                    case 24:
                        return _context.abrupt('return', path);

                    case 25:
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

var _gm = require('gm');

var _gm2 = _interopRequireDefault(_gm);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _osubotUtil = require('./osubot-util');

var _osubotUtil2 = _interopRequireDefault(_osubotUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Useful APIs 
Avatar: https://a.ppy.sh/${id}
Map Thumbnail: https://b.ppy.sh/thumb/${id}l.jpg
Map BG(Part): https://assets.ppy.sh/beatmaps/${id}/covers/cover.jpg
*/
function promisifyGM(gmO) {
    return new _promise2.default(function (resolve, reject) {
        gmO.write(gmO.source, function (err) {
            if (err) throw err;else resolve();
        });
    });
}

function promisifyStreamEvent(stream, event) {
    return new _promise2.default(function (resolve, reject) {
        stream.on(event, resolve);
    }).catch(function (err) {
        throw err;
    });
}

exports.default = { drawRecent: drawRecent };