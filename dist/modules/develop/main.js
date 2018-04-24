'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _message = require('../../message');

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _jsYaml2.default.safeLoad(_fs2.default.readFileSync('config.yml')).develop;

/**
 * Returns the text directly to the user
 * @param {Message} msg The universal msg object
 * @param {array} txt The texts user sends
 */
function test(msg) {
  for (var _len = arguments.length, txt = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    txt[_key - 1] = arguments[_key];
  }

  msg.send(txt.join(' '));
}

/**
 * Send bot's info.
 * @param {Message} msg The universal msg object
 */
function about(msg) {
  msg.send('Nodebot v' + config.version.split(' ')[0] + ' "' + config.version.split(' ')[1] + '"\npowered by Node.js & cqhttp.\n' + new Date().getFullYear() + ' trustgit | under MIT License');
}

exports.default = { test: test, about: about };