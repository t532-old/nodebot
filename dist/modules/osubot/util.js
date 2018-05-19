'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    modes: [['o', 's', '0', 'osu', 'std', 'osu!', 'standard'], ['t', '1', 'tk', 'taiko'], ['c', '2', 'ctb', 'catch', 'catchthebeat'], ['m', '3', 'mania']],
    /**
     * Convert a mode string to mode id.
     * @param {string} mode The mode string that's going to be converted
     */
    checkmode: function checkmode(mode) {
        mode = mode.toLowerCase();
        for (var i in this.modes) {
            if (this.modes[i].includes(mode)) return i;
        }return 0;
    },

    /**
     * Calculates a play's accuracy (f**k ppy).
     * @param {object} data The recent play data
     */
    accuracy: function accuracy(data) {
        var rec = this.copy(data);
        for (var i in rec) {
            rec[i] = parseInt(rec[i]);
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
        for (var i = score.length - 1; i >= 0; i--) {
            if ((score.length - i - 1) % sep === 0 && i !== score.length - 1) result = ',' + result;
            result = score[i] + result;
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
     * increase a string's length to a specific one, but add 0s at the back of the number
     * @param {string} num The string
     * @param {number} len The length
     */
    fillNumberReversed: function fillNumberReversed(num) {
        var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

        while (num.length < len) {
            num = num + '0';
        }return num;
    },

    /**
     * Diffs the numbers in two objects
     * @param {object} differ - The base comparing object
     * @param {object} diffee - The substractors
     */
    objDiff: function objDiff(differ, diffee) {
        var result = this.copy(differ);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(differ)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;

                if (typeof differ[i] === 'number' && typeof diffee[i] === 'number') result[i] = (differ[i] - diffee[i]).toString();else if (parseFloat(differ[i]) && parseFloat(diffee[i])) result[i] = (parseFloat(differ[i]) - parseFloat(diffee[i])).toString();else delete result[i];
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

        return result;
    },

    /**
     * Deep copy an object
     * @param {object} obj The object that's being copied
     */
    copy: function copy(obj) {
        var res = new obj.constructor();
        for (var i in obj) {
            if (obj[i] instanceof Object) res[i] = this.copy(obj[i]);else res[i] = obj[i];
        }
        return res;
    },

    /**
     * flatten an array (f**k tc39).
     * @param {array} arr Array to be flatten
     */
    flatten: function flatten(arr) {
        var flat = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = (0, _getIterator3.default)(arr), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var i = _step2.value;

                if (i instanceof Array) flat = [].concat((0, _toConsumableArray3.default)(flat), (0, _toConsumableArray3.default)(this.flatten(i)));else flat.push(i);
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

        return flat;
    }
};