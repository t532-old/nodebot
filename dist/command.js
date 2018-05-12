'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Command = function () {
    /**
     * @constructor
     * @param {regexp} prefix - The commands' prefix
     * @param {function} handlers - do this when no avalible commands 
     */
    function Command(_ref) {
        var prefix = _ref.prefix,
            handlers = _ref.handlers;
        (0, _classCallCheck3.default)(this, Command);

        this.prefix = prefix;
        this.defaultHandler = handlers.default;
        this.invalidHandler = handlers.invalid;
        this.list = {};
    }
    /**
     * bind a command
     * @param {string} name - the command name
     * @param {object} params - {
     *      {string} args - the arguments' format, 
     *          <name> (with the angle brackets!) is a required arg, 
     *          [name] (with the square brackets, and must be given after required ones) is an optional args,
     *          [name...] (with the square brackets, must be given at last and may only appear once) is the rest args. 
     *      {array<string>} options - the option list (options starts with an asterisk) 
     *      {function} action ( 
     *          {object} args - the arguments list (e.g. '>command <a> [b] [c...]' gives { a: value, b: value, c: [values, ...] },
     *          {array<string>} options - used options (e.g. '*a *b' gives ['a', 'b'])
     *      )
     * }
     * @example 
     * CommandInstance.on('test', {
     *      args: '<a> [b] [c] [d...]',
     *      options: ['*x', '*y'],
     *      action(args, options) { return [args, options] }
     * })
     */


    (0, _createClass3.default)(Command, [{
        key: 'on',
        value: function on(name, _ref2) {
            var args = _ref2.args,
                options = _ref2.options,
                action = _ref2.action;

            var str = this.prefix.toString().slice(1, -1) + name + ' ' + args;
            args = args.split(' ');
            args = {
                required: args.filter(function (i) {
                    return i.match(/^<.+>$/);
                }).map(function (i) {
                    return i.split(/<|>/)[1];
                }),
                optional: args.filter(function (i) {
                    return i.match(/^\[[^\.]+\]$/);
                }).map(function (i) {
                    return i.split(/\[|\]/)[1];
                }),
                group: args.filter(function (i) {
                    return i.match(/^\[.+\.{3,3}\]$/);
                })[0] ? args.filter(function (i) {
                    return i.match(/^\[.+\.{3,3}\]$/);
                })[0].split(/\[|\.{3,3}\]/)[1] : null
            };
            this.list[name] = { args: args, options: options, action: action, str: str };
        }
        /**
         * do a command
         * @param {string} command 
         */

    }, {
        key: 'do',
        value: function _do(command) {
            var _this = this,
                _list$name;

            if (!this.prefix.test(command[0])) return;
            command = command.trim().slice(1).split('"').map(function (i) {
                return i.trim();
            }).reduce(function (target, value, index) {
                if (index % 2 == 0) target.push.apply(target, (0, _toConsumableArray3.default)(value.split(/[\r\n\s]/)));else target.push(value);
                return target;
            }, []);
            var name = command.shift();

            for (var _len = arguments.length, extraArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                extraArgs[_key - 1] = arguments[_key];
            }

            if (!this.list[name]) {
                if (typeof this.defaultHandler === 'function') {
                    this.defaultHandler.apply(this, extraArgs.concat([[name].concat((0, _toConsumableArray3.default)(command))]));
                    return;
                } else throw new SyntaxError('No default handler for undefined command');
            }
            var options = command.filter(function (i) {
                return i[0] === '*';
            }).map(function (i) {
                return i.slice(1);
            }).filter(function (i) {
                return _this.list[name].options.includes(i);
            });
            command = command.filter(function (i) {
                return i[0] !== '*';
            });
            if (this.list[name].args.required.length > command.length) {
                if (typeof this.invalidHandler === 'function') {
                    this.invalidHandler.apply(this, extraArgs.concat([[name].concat((0, _toConsumableArray3.default)(command))]));
                    return;
                } else throw new SyntaxError('No default handler for invalid arguments');
            }
            var required = command.splice(0, this.list[name].args.required.length);
            var optional = command.splice(0, this.list[name].args.optional.length);
            var group = command;
            var raw = { required: required, optional: optional, group: group };
            var args = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(this.list[name].args.required), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var i = _step.value;

                    args[i] = raw.required.shift();
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
                for (var _iterator2 = (0, _getIterator3.default)(this.list[name].args.optional), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _i = _step2.value;

                    args[_i] = raw.optional.shift();
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

            if (this.list[name].args.group) args[this.list[name].args.group] = raw.group;
            (_list$name = this.list[name]).action.apply(_list$name, extraArgs.concat([args, options]));
        }
    }]);
    return Command;
}();

exports.default = Command;