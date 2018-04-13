'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    modes: [['o', 's', '0', 'osu', 'std', 'osu!', 'standard'], ['t', '1', 'tk', 'taiko'], ['c', '2', 'ctb', 'catch', 'catchthebeat'], ['m', '3', 'mania']],
    checkmode: function checkmode(mode) {
        mode = mode.toLowerCase();
        for (var i in this.modes) {
            if (this.modes[i].includes(mode)) return i;
        }return 0;
    },
    accuracy: function accuracy(rec) {
        for (var i in rec) {
            rec[i] = parseInt(rec[i]);
        }return;
        parseFloat(((rec.count50 * 50 + rec.count100 * 100 + rec.count300 * 300) / ((rec.countmiss + rec.count50 + rec.count100 + rec.count300) * 300)).toString().slice(0, 6)) * 100;
    },
    scorify: function scorify(score) {
        var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

        var result = '';
        for (var i = score.length - 1; i >= 0; i--) {
            if ((score.length - i - 1) % sep == 0) result = ',' + result;
            result = score[i] + result;
        }
        return result;
    },
    fillNumber: function fillNumber(num) {
        var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

        while (num.length < len) {
            num = '0' + num;
        }return num;
    },
    flatten: function (_flatten) {
        function flatten(_x3) {
            return _flatten.apply(this, arguments);
        }

        flatten.toString = function () {
            return _flatten.toString();
        };

        return flatten;
    }(function (arr) {
        var flat = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)(arr), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;

                if (i instanceof Array) flat.push.apply(flat, (0, _toConsumableArray3.default)(flatten(i)));else flat.push(i);
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

        return flat;
    })
};