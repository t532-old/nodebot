'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require('axios');
var fs = require('fs');
var config = eval('(' + fs.readFileSync('config.json') + ')').osubot;
var db = require('monk')('localhost:27017/botdb');
var gm = require('gm');

var users = db.get('users');

var util = {
    modes: [['o', 's', '0', 'osu', 'std', 'osu!', 'standard'], ['t', '1', 'tk', 'taiko'], ['c', '2', 'ctb', 'catch', 'catchthebeat'], ['m', '3', 'mania']],
    checkmode: function checkmode(mode) {
        mode = mode.toLowerCase();
        for (var i in this.modes) {
            if (this.modes[i].includes(mode)) return i;
        }return 0;
    }
};

function flatten(arr) {
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
}

module.exports = {
    test: {
        action: function action(msg) {
            for (var _len = arguments.length, txt = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                txt[_key - 1] = arguments[_key];
            }

            msg.sender(txt.join(' '));
        },

        separator: /[\r\n\s]/
    },
    bind: {
        action: function action(msg) {
            for (var _len2 = arguments.length, account = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                account[_key2 - 1] = arguments[_key2];
            }

            users.insert({ qqid: msg.param.user_id, osuid: account.join(' ') });
            msg.sender('osubot: bind: bound successfully');
        },

        separator: /[\r\n\s]/
    },
    stat: {
        action: function action(msg) {
            var usr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'me';
            var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'o';

            new _promise2.default(function (resolve, reject) {
                mode = util.checkmode(mode);
                if (flatten(util.modes).includes(usr.toLowerCase())) {
                    mode = util.checkmode(usr);
                    usr = 'me';
                }
                if (usr === 'me') users.findOne({ qqid: msg.param.user_id }).then(function (doc) {
                    usr = doc.osuid;
                }).then(resolve).catch(reject);else resolve();
            }).then(function () {
                return axios.get('https://osu.ppy.sh/api/get_user?k=' + config.key + '&u=' + usr + '&m=' + mode);
            }).then(function (res) {
                if (res.data[0] !== undefined) msg.sender((0, _stringify2.default)(res.data[0]));else msg.sender('osubot: stat: user does not exist');
            }).catch(function () {
                return msg.sender('osubot: stat: bad network status');
            });
        },

        separator: /[\r\n\s]/
    },
    recent: {
        action: function action(msg) {
            var usr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'me';
            var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'o';

            new _promise2.default(function (resolve, reject) {
                mode = util.checkmode(mode);
                if (util.modes.flatten().includes(usr.toLowerCase())) {
                    mode = util.checkmode(usr);
                    usr = 'me';
                }
                if (usr === 'me') users.findOne({ qqid: msg.param.user_id }).then(function (doc) {
                    usr = doc.osuid;
                }).then(resolve).catch(reject);else resolve();
            }).then(function () {
                return axios.get('https://osu.ppy.sh/api/get_user_recent?k=' + config.key + '&u=' + usr + '&m=' + mode + '&limit=1');
            }).then(function (res) {
                if (res.data[0] !== undefined) msg.sender((0, _stringify2.default)(res.data[0]));else msg.sender('osubot: recent: user does not exist');
            }).catch(function () {
                return msg.sender('osubot: stat: bad network status');
            });
        },

        separator: /[\r\n\s]/
    },
    roll: {
        action: function action(msg) {
            var range = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '100';

            if (typeof range === 'string' && !parseInt(range)) {
                range = range.split(',');
                msg.sender(range[Math.floor(Math.random() * range.length)]);
            } else msg.sender(Math.round(Math.random() * range).toString());
        },

        separator: /[\r\n\s]/
    }
};