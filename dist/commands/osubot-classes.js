'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Query = function () {
    function Query(name, params) {
        (0, _classCallCheck3.default)(this, Query);

        this.name = name;
        this.params = params;
    }

    (0, _createClass3.default)(Query, [{
        key: 'exec',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                return _context.abrupt('return', _axios2.default.get(this.url));

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function exec() {
                return _ref.apply(this, arguments);
            }

            return exec;
        }()
    }, {
        key: 'url',
        get: function get() {
            return _url2.default.format({
                protocol: 'https',
                host: 'osu.ppy.sh',
                pathname: 'api/' + this.name,
                query: this.params
            });
        }
    }]);
    return Query;
}();

var StatQuery = function (_Query) {
    (0, _inherits3.default)(StatQuery, _Query);

    function StatQuery(params) {
        (0, _classCallCheck3.default)(this, StatQuery);
        return (0, _possibleConstructorReturn3.default)(this, (StatQuery.__proto__ || (0, _getPrototypeOf2.default)(StatQuery)).call(this, 'get_user', params));
    }

    (0, _createClass3.default)(StatQuery, [{
        key: 'exec',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var result;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                result = void 0;
                                _context2.prev = 1;
                                _context2.next = 4;
                                return (0, _get3.default)(StatQuery.prototype.__proto__ || (0, _getPrototypeOf2.default)(StatQuery.prototype), 'exec', this).call(this);

                            case 4:
                                result = _context2.sent;

                                if (!(result.data[0] === undefined)) {
                                    _context2.next = 9;
                                    break;
                                }

                                throw new Error('StatQuery: user does not exist');

                            case 9:
                                return _context2.abrupt('return', result.data[0]);

                            case 10:
                                _context2.next = 15;
                                break;

                            case 12:
                                _context2.prev = 12;
                                _context2.t0 = _context2['catch'](1);
                                throw new Error('StatQuery: bad network status');

                            case 15:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[1, 12]]);
            }));

            function exec() {
                return _ref2.apply(this, arguments);
            }

            return exec;
        }()
    }]);
    return StatQuery;
}(Query);

var RecentQuery = function (_Query2) {
    (0, _inherits3.default)(RecentQuery, _Query2);

    function RecentQuery(params) {
        (0, _classCallCheck3.default)(this, RecentQuery);
        return (0, _possibleConstructorReturn3.default)(this, (RecentQuery.__proto__ || (0, _getPrototypeOf2.default)(RecentQuery)).call(this, 'get_user_recent', params));
    }

    (0, _createClass3.default)(RecentQuery, [{
        key: 'exec',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                var result;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                result = void 0;
                                _context3.prev = 1;
                                _context3.next = 4;
                                return (0, _get3.default)(RecentQuery.prototype.__proto__ || (0, _getPrototypeOf2.default)(RecentQuery.prototype), 'exec', this).call(this);

                            case 4:
                                result = _context3.sent;

                                if (!(result.data[0] === undefined)) {
                                    _context3.next = 9;
                                    break;
                                }

                                throw new Error('RecentQuery: user does not exist');

                            case 9:
                                return _context3.abrupt('return', result.data[0]);

                            case 10:
                                _context3.next = 15;
                                break;

                            case 12:
                                _context3.prev = 12;
                                _context3.t0 = _context3['catch'](1);
                                throw new Error('RecentQuery: bad network status');

                            case 15:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[1, 12]]);
            }));

            function exec() {
                return _ref3.apply(this, arguments);
            }

            return exec;
        }()
    }]);
    return RecentQuery;
}(Query);

exports.default = { Query: Query, RecentQuery: RecentQuery, StatQuery: StatQuery };