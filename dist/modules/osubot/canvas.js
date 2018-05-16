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
        var uid, sid, bid, dest, bgDest, avatarDest, avatarLargerDest, avatarBGDest, mapFile, pp, mods, padding, i;
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
                        avatarLargerDest = 'cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'avatarl' + _path2.default.sep + uid + '.jpg';
                        avatarBGDest = 'cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'recentbg' + _path2.default.sep + uid + '.jpg';
                        _context.next = 10;
                        return _web.res.mapFileQuery(bid);

                    case 10:
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
                            _context.next = 18;
                            break;
                        }

                        _context.next = 16;
                        return getAvatar(uid, avatarDest, avatarLargerDest);

                    case 16:
                        if (_context.sent) {
                            _context.next = 18;
                            break;
                        }

                        return _context.abrupt('return', false);

                    case 18:
                        _context.next = 20;
                        return promisify(_fs2.default.copyFile, 'assets' + _path2.default.sep + 'image' + _path2.default.sep + 'userbg' + _path2.default.sep + 'crecent.jpg', avatarBGDest);

                    case 20:
                        _context.next = 22;
                        return promisifyGM((0, _gm2.default)(avatarBGDest).quality(100).composite(avatarDest).gravity('North').geometry('+0-50'));

                    case 22:
                        if (_fs2.default.existsSync(bgDest)) {
                            _context.next = 25;
                            break;
                        }

                        _context.next = 25;
                        return _web.res.bgQuery(sid, bgDest);

                    case 25:
                        _context.next = 27;
                        return promisify(_fs2.default.copyFile, bgDest, dest);

                    case 27:
                        _context.next = 29;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).resize(2765, 768));

                    case 29:
                        _context.next = 31;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').crop(1500, 500).blur(10, 10).fill('#888b').drawCircle(750, 250, 750, 620).tile(dest).drawCircle(750, 250, 750, 610));

                    case 31:
                        _context.next = 33;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').fill('#fff5').drawCircle(750, 250, 750, 610).fill('#fff5').drawCircle(750, 250, 750, 490).fill('#ccc5').drawCircle(750, 250, 750, 470).fill('#fff5').drawCircle(750, 250, 750, 460).tile(avatarBGDest).drawEllipse(750, 250, 210, 210, -145, -35));

                    case 33:
                        _context.next = 35;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').fill('#888a').drawEllipse(750, 250, 210, 210, -145, -35).fill('#fff').font('assets/fonts/Exo2.0-Medium.otf').fontSize(25).drawText(0, -185, Math.round(pp.total).toString() + 'pp').fontSize(30).drawText(0, -155, stat.username).font('assets/fonts/Exo2.0-BoldItalic.otf').fontSize(25).fill('#3ad').drawText(0, 35, map.title.slice(0, 35) + (map.title.length > 35 ? '...' : '')).fontSize(17).drawText(0, 60, map.artist.slice(0, 50) + (map.artist.length > 50 ? '...' : '')).font('assets/fonts/Exo2.0-Bold.otf').fontSize(30).drawText(-300, 0, rec.maxcombo + 'x').drawText(300, 0, _util2.default.accuracy(rec) + '%').fontSize(12).fill('#333').drawText(-290, 20, 'max combo').drawText(290, 20, 'accuracy').font('assets/fonts/Exo2.0-Bold.otf').fontSize(13).fill('#999').drawText(0, 85, map.version + ' - mapped by ' + map.creator).drawRectangle(675, 345, 825, 365).font('assets/fonts/Exo2.0-Regular.otf').fill('#fff').drawText(0, 105, rec.date).fontSize(25).fill('#aaa').drawLine(650, 375, 850, 375).fill('#666').drawText(-100, 140, _util2.default.fillNumber(rec.count300)).drawText(-33, 140, _util2.default.fillNumber(rec.count100)).drawText(33, 140, _util2.default.fillNumber(rec.count50)).drawText(100, 140, _util2.default.fillNumber(rec.countmiss)).font('assets/fonts/Exo2.0-ExtraBold.otf').fontSize(12).fill('#66a').drawText(-100, 160, '300').fill('#6a6').drawText(-33, 160, '100').fill('#aa6').drawText(33, 160, '50').fill('#a66').drawText(100, 160, 'X').crop(1000, 500));

                    case 35:
                        _context.next = 37;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').font('assets/fonts/Exo2.0-Bold.otf').fontSize(12).fill('#f69').drawText(0, 5, 'total score').font('assets/fonts/Venera-300.otf').fontSize(50).fill('#f69').drawText(0, -20, _util2.default.scorify(rec.score)));

                    case 37:
                        _context.next = 39;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).composite('assets/image/rank/' + rec.rank + '.png').gravity('North').geometry('+0+80'));

                    case 39:
                        padding = -(mods.length - 1) * 10, i = 0;

                    case 40:
                        if (!(i < mods.length)) {
                            _context.next = 46;
                            break;
                        }

                        _context.next = 43;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('North').composite('assets/image/mods/' + mods[i] + '.png').geometry((padding >= 0 ? '+' : '') + padding + '+170'));

                    case 43:
                        padding += 20, i++;
                        _context.next = 40;
                        break;

                    case 46:
                        return _context.abrupt('return', 'file://' + process.cwd() + _path2.default.sep + dest);

                    case 47:
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
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(stat, statPrev) {
        var uid, dest, avatarDest, avatarBGDest, avatarLargerDest;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        uid = stat.user_id;
                        dest = 'cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'stat' + _path2.default.sep + uid + '.jpg';
                        avatarDest = 'cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'avatar' + _path2.default.sep + uid + '.jpg';
                        avatarBGDest = 'cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'statbg' + _path2.default.sep + uid + '.jpg';
                        avatarLargerDest = 'cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'avatarl' + _path2.default.sep + uid + '.jpg';
                        _context2.next = 7;
                        return promisify(_fs2.default.copyFile, 'assets' + _path2.default.sep + 'image' + _path2.default.sep + 'userbg' + _path2.default.sep + 'c' + Math.ceil(Math.random() * 5) + '.jpg', dest);

                    case 7:
                        if (_fs2.default.existsSync(avatarDest)) {
                            _context2.next = 12;
                            break;
                        }

                        _context2.next = 10;
                        return getAvatar(uid, avatarDest, avatarLargerDest);

                    case 10:
                        if (_context2.sent) {
                            _context2.next = 12;
                            break;
                        }

                        return _context2.abrupt('return', false);

                    case 12:
                        _context2.next = 14;
                        return promisify(_fs2.default.copyFile, 'assets' + _path2.default.sep + 'image' + _path2.default.sep + 'userbg' + _path2.default.sep + 'cstat.jpg', avatarBGDest);

                    case 14:
                        _context2.next = 16;
                        return promisifyGM((0, _gm2.default)(avatarBGDest).quality(100).composite(avatarLargerDest).gravity('Center'));

                    case 16:
                        _context2.next = 18;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).resize(2765, 768));

                    case 18:
                        _context2.next = 20;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').crop(1500, 500).fill('#888b').drawCircle(750, 250, 750, 620).tile(dest).drawCircle(750, 250, 750, 610));

                    case 20:
                        _context2.next = 22;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').crop(750, 500).fill('#fff5').drawCircle(375, 250, 375, 610).fill('#fff5').drawCircle(375, 250, 375, 490).fill('#ccc5').drawCircle(375, 250, 375, 470).tile(avatarBGDest).drawCircle(375, 250, 375, 460));

                    case 22:
                        _context2.next = 24;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).gravity('Center').fill('#888a').drawEllipse(375, 250, 210, 210, -145, -35).fill('#fff8').drawCircle(375, 250, 375, 460).fill('#fff').font('assets/fonts/Exo2.0-Medium.otf').fontSize(30).drawText(0, -145, stat.username).font('assets/fonts/Exo2.0-Bold.otf').fontSize(12).fill('#f69').drawText(0, 0, 'global rank').font('assets/fonts/Exo2.0-BoldItalic.otf').fontSize(25).fill('#3ad').drawText(0, 35, _util2.default.scorify(parseInt(stat.pp_raw).toString()) + 'pp').fontSize(11).drawText(0, 60, 'performance points').font('assets/fonts/Exo2.0-Bold.otf').fontSize(30).drawText(-300, 0, _util2.default.scorify(stat.playcount)).drawText(300, 0, stat.accuracy.slice(0, 3 + stat.accuracy.split('.').length) + '%').fontSize(12).fill('#333').drawText(-290, 20, 'play count').drawText(290, 20, 'accuracy').font('assets/fonts/Venera-300.otf').fontSize(45).fill('#f69').drawText(0, -25, '#' + _util2.default.scorify(stat.pp_rank)).fontSize(13).fill('#999').drawRectangle(325, 345, 425, 365).font('assets/fonts/Exo2.0-Regular.otf').fill('#fff').drawText(20, 105, '#' + _util2.default.scorify(stat.pp_country_rank)).fontSize(25).fill('#aaa').drawLine(275, 375, 475, 375).fill('#666').drawText(-100, 140, _util2.default.fillNumber((parseInt(stat.count_rank_ssh) + parseInt(stat.count_rank_ss)).toString())).drawText(-33, 140, _util2.default.fillNumber(stat.count_rank_sh)).drawText(33, 140, _util2.default.fillNumber(stat.count_rank_s)).drawText(100, 140, _util2.default.fillNumber(stat.count_rank_a)).fontSize(12).drawText(-100, 160, 'SS(+)').drawText(-33, 160, 'S+').drawText(33, 160, 'S').drawText(100, 160, 'A'));

                    case 24:
                        _context2.next = 26;
                        return promisifyGM((0, _gm2.default)(dest).quality(100).composite('assets/image/flags/' + stat.country + '.png').gravity('North').geometry('-50+343'));

                    case 26:
                        if (statPrev) {
                            // TODO: Draw the increasement
                        }
                        return _context2.abrupt('return', 'file://' + process.cwd() + _path2.default.sep + dest);

                    case 28:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function drawStat(_x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}();

var getAvatar = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(uid, avatarDest, avatarLargerDest) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return _web.res.avatarQuery(uid, avatarDest);

                    case 3:
                        _context3.next = 5;
                        return promisify(_fs2.default.copyFile, avatarDest, avatarLargerDest);

                    case 5:
                        _context3.next = 7;
                        return promisifyGM((0, _gm2.default)(avatarDest).quality(100).resize(350, 350));

                    case 7:
                        _context3.next = 9;
                        return promisifyGM((0, _gm2.default)(avatarLargerDest).quality(100).resize(421, 421).blur(3, 3));

                    case 9:
                        return _context3.abrupt('return', true);

                    case 12:
                        _context3.prev = 12;
                        _context3.t0 = _context3['catch'](0);
                        _context3.next = 16;
                        return clearCachedAvatars(uid);

                    case 16:
                        return _context3.abrupt('return', false);

                    case 17:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[0, 12]]);
    }));

    return function getAvatar(_x6, _x7, _x8) {
        return _ref3.apply(this, arguments);
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
            if (err) reject(err);else resolve();
        });
    });
}

function promisify(fn) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return new _promise2.default(function (resolve, reject) {
        fn.apply(undefined, args.concat([function (err) {
            if (err) reject(err);else resolve();
        }]));
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

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = (0, _getIterator3.default)(_fs2.default.readdirSync('cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'avatarl')), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _i = _step2.value;

                _fs2.default.unlinkSync('cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'avatarl' + _path2.default.sep + _i + '.jpg');
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    } else {
        _fs2.default.unlinkSync('cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'avatar' + _path2.default.sep + uid + '.jpg');
        _fs2.default.unlinkSync('cache' + _path2.default.sep + 'osubot' + _path2.default.sep + 'avatarl' + _path2.default.sep + uid + '.jpg');
    }
}

exports.default = { drawRecent: drawRecent, drawStat: drawStat, clearCachedAvatars: clearCachedAvatars };