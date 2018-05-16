// I didn't use ES6/7 Syntax here because babel seems wouldn't support importing after some other statements.
require('fs').copyFileSync('config.template.yml', 'config.yml')
require('../dist/message')
require('../dist/modules/init')