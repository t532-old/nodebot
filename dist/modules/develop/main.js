'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _message = require('../../message');

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _jsYaml2.default.safeLoad(_fs2.default.readFileSync('config.yml')).develop;

var test = {
    args: '[txt...]',
    options: [],
    /**
     * Returns the text directly to the user
     * @param {Message} msg The universal msg object
     * @param {array} txt The texts user sends
     */
    action: function action(msg, _ref) {
        var _this = this;

        var txt = _ref.txt;
        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            console.log(txt);msg.send(txt.join(' '));
                        case 2:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    }
};

var about = {
    args: '',
    options: [],
    /**
     * Send bot's info.
     * @param {Message} msg The universal msg object
     */
    action: function action(msg) {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            msg.send('Nodebot v' + config.version.split(' ')[0] + ' "' + config.version.split(' ')[1] + '"\npowered by Node.js & cqhttp.\n' + new Date().getFullYear() + ' trustgit | under MIT License');

                        case 1:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    }
};

exports.default = { test: test, about: about };