'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function () {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)(initPaths), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            if (!_fs2.default.existsSync(i)) _fs2.default.mkdirSync(i);
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

    var time = new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() + 1));
    setTimeout(function () {
        _db.statdb.refreshAllStat();
        setInterval(_db.statdb.refreshAllStat, 86400000);
    }, time.getTime() - Date.now());
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initPaths = ['cache', 'cache/osubot', 'cache/osubot/avatar', 'cache/osubot/avatarl', 'cache/osubot/recent', 'cache/osubot/recentbg', 'cache/osubot/stat', 'cache/osubot/statbg', 'cache/osubot/mapbg', 'cache/osubot/best'];