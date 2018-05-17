'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    modes: [['o', 's', '0', 'osu', 'std', 'osu!', 'standard'], ['t', '1', 'tk', 'taiko'], ['c', '2', 'ctb', 'catch', 'catchthebeat'], ['m', '3', 'mania']],
    /**
     * Convert a mode string to mode id.
     * @param {string} mode The mode string that's going to be converted
     */
    checkmode: function checkmode(mode) {
        mode = mode.toLowerCase();
        for (var _i in this.modes) {
            if (this.modes[_i].includes(mode)) return _i;
        }return 0;
    },

    /**
     * Calculates a play's accuracy (f**k ppy).
     * @param {object} data The recent play data
     */
    accuracy: function accuracy(data) {
        var rec = this.copy(data);
        for (var _i2 in rec) {
            rec[_i2] = parseInt(rec[_i2]);
        }var result = ((rec.count50 * 50 + rec.count100 * 100 + rec.count300 * 300) / ((rec.countmiss + rec.count50 + rec.count100 + rec.count300) * 300) * 100).toString();
        return result.slice(0, 3 + result.split('.')[0].length);
    },

    /**
     * separate a string with comma
     * @param {string} score The string
     * @param {number} sep The interval
     */
    scorify: function scorify(score) {
        var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

        var result = '';
        for (var _i3 = score.length - 1; _i3 >= 0; _i3--) {
            if ((score.length - _i3 - 1) % sep === 0 && _i3 !== score.length - 1) result = ',' + result;
            result = score[_i3] + result;
        }
        return result;
    },

    /**
     * increase a string's length to a specific one
     * @param {string} num The string
     * @param {number} len The length
     */
    fillNumber: function fillNumber(num) {
        var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

        while (num.length < len) {
            num = '0' + num;
        }return num;
    },

    /**
     * Diffs the numbers in two objects
     * @param {object} differ - The base comparing object
     * @param {object} diffee - The substractors
     */
    objDiff: function objDiff(differ, diffee) {
        var result = this.copy(differ);
        for (i in (0, _keys2.default)(differ)) {
            if (typeof differ[i] === 'number' && typeof diffee[i] === 'number') result[i] = differ[i] - diffee[i];
        }if (parseFloat(differ[i]) && parseFloat(diffee[i])) result[i] = parseFloat(differ[i]) - parseFloat(diffee[i]);else delete result[i];
        return result;
    },

    /**
     * Deep copy an object
     * @param {object} obj The object that's being copied
     */
    copy: function (_copy) {
        function copy(_x3) {
            return _copy.apply(this, arguments);
        }

        copy.toString = function () {
            return _copy.toString();
        };

        return copy;
    }(function (obj) {
        var res = new obj.constructor();
        for (var _i4 in obj) {
            if (obj[_i4] instanceof Object) res[_i4] = copy(obj[_i4]);else res[_i4] = obj[_i4];
        }
        return res;
    }),

    /**
     * flatten an array (f**k tc39).
     * @param {array} arr Array to be flatten
     */
    flatten: function flatten(arr) {
        var flat = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)(arr), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _i5 = _step.value;

                if (_i5 instanceof Array) flat = [].concat((0, _toConsumableArray3.default)(flat), (0, _toConsumableArray3.default)(this.flatten(_i5)));else flat.push(_i5);
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
    }
};