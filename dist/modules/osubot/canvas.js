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
        var uid, sid, bid, dest, bgDest, avatarDest, avatarBGDest, mapFile, pp, mods, padding, i;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        uid = stat.user_id;
                        sid = map.beatmapset_id;
                        bid = rec.beatmap_id;
                        dest = 'cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'recent' + _path2.default.sep + uid + '.jpg';
                        bgDest = 'cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'mapbg' + _path2.default.sep + sid + '.jpg';
                        avatarDest = 'cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'avatar' + _path2.default.sep + uid + '.jpg';
                        avatarBGDest = 'cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'recentbg' + _path2.default.sep + uid + '.jpg';
                        _context.next = 9;
                        return _web.res.mapFileQuery(bid);

                    case 9:
                        mapFile = _context.sent;
                        pp = _ojsama2.default.ppv2({
                            combo: parseInt(rec.maxcombo),
                            nmiss: parseInt(rec.countmiss),
                            acc_percent: parseFloat(_util2.default.accuracy(rec)),
                            stars: new _ojsama2.default.diff().calc({
                                map: mapFile,
                                mods: parseInt(rec.enabled_mods)
                            })
                        });
                        mods = _ojsama2.default.modbits.string(rec.enabled_mods).split('').reduce(function (target, value, index) {
                            if (index % 2) target[target.length - 1] += value;else target.push(value);
                            return target;
                        }, []);

                        if (_fs2.default.existsSync(avatarDest)) {
                            _context.next = 20;
                            break;
                        }

                        _fs2.default.copyFileSync('assets' + _path2.default.sep + 'image' + _path2.default.sep + 'userbg' + _path2.default.sep + 'crecent.jpg', avatarBGDest);
                        _context.next = 16;
                        return _web.res.avatarQuery(uid, avatarDest);

                    case 16:
                        _context.next = 18;
                        return promisifyGM((0, _gm2.default)(avatarDest).quality(100).resize(350, 350));

                    case 18:
                        _context.next = 20;
                        return promisifyGM((0, _gm2.default)(avatarBGDest).quality(100).composite(avatarDest).gravity('North').geometry('+0-50'));

                    case 20:
                        if (_fs2.default.existsSync(bgDest)) {
                            _context.next = 23;
                            break;
                        }

                        _context.next = 23;
                        return _web.res.bgQuery(sid, bgDest);

                    case 23:
                        _fs2.default.copyFileSync(bgDest, dest);
                        _context.next = 26;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).resize(2765, 768));

                    case 26:
                        _context.next = 28;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').crop(1500, 500).blur(50, 50).fill('#888b').drawCircle(750, 250, 750, 620).tile(dest).drawCircle(750, 250, 750, 610));

                    case 28:
                        _context.next = 30;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').fill('#fffa').drawCircle(750, 250, 750, 610).fill('#fff').drawCircle(750, 250, 750, 490).fill('#ccc').drawCircle(750, 250, 750, 470).fill('#fff').drawCircle(750, 250, 750, 460).tile(avatarBGDest).drawEllipse(750, 250, 210, 210, -145, -35));

                    case 30:
                        _context.next = 32;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').fill('#aaaa').drawEllipse(750, 250, 210, 210, -145, -35).fill('#fff').font('assets/fonts/Exo2.0-Medium.otf').fontSize(25).drawText(0, -185, Math.round(pp.total).toString() + 'pp').fontSize(30).drawText(0, -155, stat.username).font('assets/fonts/Exo2.0-BoldItalic.otf').fontSize(25).fill('#3ad').drawText(0, 35, map.title.slice(0, 35) + (map.title.length > 35 ? '...' : '')).fontSize(17).drawText(0, 60, map.artist.slice(0, 50) + (map.artist.length > 50 ? '...' : '')).font('assets/fonts/Exo2.0-Bold.otf').fontSize(30).drawText(-300, 0, rec.maxcombo + 'x').drawText(300, 0, _util2.default.accuracy(rec) + '%').fontSize(12).fill('#333').drawText(-290, 20, 'max combo').drawText(290, 20, 'accuracy').font('assets/fonts/Exo2.0-Bold.otf').fontSize(13).fill('#999').drawText(0, 85, map.version + ' - mapped by ' + map.creator).drawRectangle(675, 345, 825, 365).font('assets/fonts/Exo2.0-Regular.otf').fill('#fff').drawText(0, 105, rec.date).fontSize(25).fill('#aaa').drawLine(650, 375, 850, 375).fill('#666').drawText(-100, 140, _util2.default.fillNumber(rec.count300)).drawText(-33, 140, _util2.default.fillNumber(rec.count100)).drawText(33, 140, _util2.default.fillNumber(rec.count50)).drawText(100, 140, _util2.default.fillNumber(rec.countmiss)).fontSize(12).drawText(-100, 160, 'Great').drawText(-33, 160, 'Good').drawText(33, 160, 'Meh').drawText(100, 160, 'Miss').crop(1200, 500));

                    case 32:
                        _context.next = 34;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').font('assets/fonts/Exo2.0-Bold.otf').fontSize(12).fill('#f69').drawText(0, 5, 'total score').font('assets/fonts/Venera-300.otf').fontSize(50).fill('#f69').drawText(0, -20, _util2.default.scorify(rec.score)));

                    case 34:
                        _context.next = 36;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).composite('assets/image/rank/' + rec.rank + '.png').gravity('North').geometry('+0+80'));

                    case 36:
                        padding = -(mods.length - 1) * 10, i = 0;

                    case 37:
                        if (!(i < mods.length)) {
                            _context.next = 43;
                            break;
                        }

                        _context.next = 40;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('North').composite('assets/image/mods/' + mods[i] + '.png').geometry((padding >= 0 ? '+' : '') + padding + '+170'));

                    case 40:
                        padding += 20, i++;
                        _context.next = 37;
                        break;

                    case 43:
                        return _context.abrupt('return', 'file://' + process.cwd() + _path2.default.sep + dest);

                    case 44:
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
        var uid, dest, avatarDest, avatarBGDest;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        uid = stat.user_id;
                        dest = 'cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'stat' + _path2.default.sep + uid + '.jpg';
                        avatarDest = 'cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'avatar' + _path2.default.sep + uid + '.jpg';
                        avatarBGDest = 'cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'statbg' + _path2.default.sep + uid + '.jpg';
                        _context2.next = 6;
                        return _web.res.avatarQuery(uid, avatarDest);

                    case 6:
                        _fs2.default.copyFileSync('assets' + _path2.default.sep + 'image' + _path2.default.sep + 'userbg' + _path2.default.sep + 'c' + Math.ceil(Math.random() * 5) + '.jpg', dest);

                        if (_fs2.default.existsSync(avatarDest)) {
                            _context2.next = 15;
                            break;
                        }

                        _fs2.default.copyFileSync('assets' + _path2.default.sep + 'image' + _path2.default.sep + 'userbg' + _path2.default.sep + 'cstat.jpg', avatarBGDest);
                        _context2.next = 11;
                        return _web.res.avatarQuery(uid, avatarDest);

                    case 11:
                        _context2.next = 13;
                        return promisifyGM((0, _gm2.default)(avatarDest).quality(100).resize(350, 350));

                    case 13:
                        _context2.next = 15;
                        return promisifyGM((0, _gm2.default)(avatarBGDest).quality(100).composite(avatarDest).gravity('North').geometry('+0-50'));

                    case 15:
                        _context2.next = 17;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).resize(2765, 768));

                    case 17:
                        _context2.next = 19;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').crop(1500, 500).fill('#888b').drawCircle(750, 250, 750, 620).tile(dest).drawCircle(750, 250, 750, 610));

                    case 19:
                        _context2.next = 21;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').crop(750, 500).fill('#fffa').drawCircle(375, 250, 375, 610).fill('#fff').drawCircle(375, 250, 375, 490).fill('#ccc').drawCircle(375, 250, 375, 470).fill('#fff').drawCircle(375, 250, 375, 460).tile(avatarBGDest).drawEllipse(375, 250, 210, 210, -145, -35));

                    case 21:
                        _context2.next = 23;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').fill('#aaaa').drawEllipse(375, 250, 210, 210, -145, -35).fill('#fff').font('assets/fonts/Exo2.0-Medium.otf').fontSize(30).drawText(0, -145, stat.username).font('assets/fonts/Exo2.0-Bold.otf').fontSize(12).fill('#f69').drawText(0, 0, 'global rank').font('assets/fonts/Exo2.0-BoldItalic.otf').fontSize(25).fill('#3ad').drawText(0, 35, _util2.default.scorify(parseInt(stat.pp_raw).toString()) + 'pp').fontSize(11).drawText(0, 60, 'performance points').font('assets/fonts/Exo2.0-Bold.otf').fontSize(30).drawText(-300, 0, _util2.default.scorify(stat.playcount)).drawText(300, 0, stat.accuracy.slice(0, 3 + stat.accuracy.split('.').length) + '%').fontSize(12).fill('#333').drawText(-290, 20, 'play count').drawText(290, 20, 'accuracy').font('assets/fonts/Venera-300.otf').fontSize(45).fill('#f69').drawText(0, -25, '#' + _util2.default.scorify(stat.pp_rank)).fontSize(13).fill('#999').drawRectangle(325, 345, 425, 365).font('assets/fonts/Exo2.0-Regular.otf').fill('#fff').drawText(20, 105, '#' + _util2.default.scorify(stat.pp_country_rank)).fontSize(25).fill('#aaa').drawLine(275, 375, 475, 375).fill('#666').drawText(-100, 140, _util2.default.fillNumber(stat.count_rank_ssh + stat.count_rank_ss)).drawText(-33, 140, _util2.default.fillNumber(stat.count_rank_sh)).drawText(33, 140, _util2.default.fillNumber(stat.count_rank_s)).drawText(100, 140, _util2.default.fillNumber(stat.count_rank_a)).fontSize(12).drawText(-100, 160, 'SS(+)').drawText(-33, 160, 'S+').drawText(33, 160, 'S').drawText(100, 160, 'A'));

                    case 23:
                        _context2.next = 25;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).composite('assets/image/flags/' + stat.country + '.png').gravity('North').geometry('-50+343'));

                    case 25:
                        return _context2.abrupt('return', 'file://' + process.cwd() + _path2.default.sep + dest);

                    case 26:
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

/**
 * deletes a cached avatar. If uid is not specified, then delete all of them
 * @param {string} uid 
 */


var _gm = require('gm');

var _gm2 = _interopRequireDefault(_gm);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ojsama = require('ojsama');

var _ojsama2 = _interopRequireDefault(_ojsama);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _web = require('./web');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Simple sugar over gm

// Import local files
// Import modules
function promisifyGM(gmO) {
    return new _promise2.default(function (resolve, reject) {
        gmO.write(gmO.source, function (err) {
            if (err) throw err;else resolve();
        });
    });
}function clearCachedAvatars(uid) {
    if (!uid) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)(_fs2.default.readdirSync('cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'avatar')), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;

                _fs2.default.unlinkSync('cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'avatar' + _path2.default.sep + i + '.jpg');
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    } else _fs2.default.unlinkSync('cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'avatar' + _path2.default.sep + uid + '.jpg');
}

exports.default = { drawRecent: drawRecent, drawStat: drawStat, clearCachedAvatars: clearCachedAvatars };