'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    modes: [['o', 's', '0', 'osu', 'std', 'osu!', 'standard'], ['t', '1', 'tk', 'taiko'], ['c', '2', 'ctb', 'catch', 'catchthebeat'], ['m', '3', 'mania']],
    checkmode: function checkmode(mode) {
        mode = mode.toLowerCase();
        for (var i in this.modes) {
            if (this.modes[i].includes(mode)) return i;
        }return 0;
    },
    accuracy: function accuracy(data) {
        var rec = this.copy(data);
        for (var i in rec) {
            rec[i] = parseInt(rec[i]);
        }var result = ((rec.count50 * 50 + rec.count100 * 100 + rec.count300 * 300) / ((rec.countmiss + rec.count50 + rec.count100 + rec.count300) * 300) * 100).toString();
        return result.slice(0, 3 + result.split('.')[0].length);
    },
    scorify: function scorify(score) {
        var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

        var result = '';
        for (var i = score.length - 1; i >= 0; i--) {
            if ((score.length - i - 1) % sep === 0 && i !== score.length - 1) result = ',' + result;
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
        for (var i in obj) {
            if (obj[i] instanceof Object) res[i] = copy(obj[i]);else res[i] = obj[i];
        }
        return res;
    })
};